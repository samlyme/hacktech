# import torch
# from torch.utils.data import Dataset, DataLoader
# import pandas as pd
# import torch
# import torch.nn as nn
# from torch.utils.data import Dataset, DataLoader
# import pandas as pd
# import numpy as np
# from torch.optim.lr_scheduler import ReduceLROnPlateau
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import accuracy_score

# # 1) Load your CSV
# df_inf = pd.read_csv("signal_compressed_total.csv")

# class CNN_GRU_Single(nn.Module):
#     def __init__(self, input_dim=2, cnn_hidden=256, cnn_layers=16, kernel_size=3,
#                  gru_hidden=256, gru_layers=16, bidirectional=True, num_classes=2):
#         super().__init__()
#         # CNN
#         blocks, in_ch = [], input_dim
#         for _ in range(cnn_layers):
#             blocks += [
#                 nn.Conv1d(in_ch, cnn_hidden, kernel_size, padding=kernel_size//2),
#                 nn.BatchNorm1d(cnn_hidden),
#                 nn.ReLU(inplace=True),
#                 nn.Dropout(0.1),
#             ]
#             in_ch = cnn_hidden
#         self.cnn = nn.Sequential(*blocks)
#         # GRU
#         self.gru = nn.GRU(
#             cnn_hidden, gru_hidden, gru_layers,
#             batch_first=True, bidirectional=bidirectional
#         )
#         out_dim = gru_hidden * (2 if bidirectional else 1)
#         self.head = nn.Linear(out_dim, num_classes)
#     def forward(self, x):
#         h = x.permute(0,2,1)      # (B,2,T)
#         h = self.cnn(h)           # (B,cnn_hidden,T)
#         h = h.permute(0,2,1)      # (B,T,cnn_hidden)
#         o, _ = self.gru(h)        # (B,T,out_dim)
#         return self.head(o)       # (B,T,2)

# device     = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# # nasal_model = CNN_GRU_Single().to(device).float()
# resp_model  = CNN_GRU_Single().to(device).float()
# # nasal_model.load_state_dict(torch.load("nasal_model.pth", map_location=device))
# resp_model.load_state_dict(torch.load("resp_model.pth",  map_location=device))


# # 2) A dataset that only returns the feature windows
# class InferenceDataset(Dataset):
#     def __init__(self, df: pd.DataFrame, seq_len: int):
#         self.X       = df.iloc[:, 0:2].values.astype('float32')  # Tracheal & Mic
#         self.seq_len = seq_len

#     def __len__(self):
#         return max(len(self.X) - self.seq_len + 1, 0)

#     def __getitem__(self, idx):
#         x_seq = self.X[idx : idx + self.seq_len]                 # (seq_len, 2)
#         return torch.from_numpy(x_seq)

# # 3) Build DataLoader
# seq_len  = 50
# batch_sz = 256
# inf_ds    = InferenceDataset(df_inf, seq_len)
# inf_loader = DataLoader(inf_ds, batch_size=batch_sz, shuffle=False, drop_last=False)

# # 4) Run inference
# # nasal_model.eval()
# resp_model.eval()

# all_preds_n, all_preds_r = [], []
# with torch.no_grad():
#     for x_batch in inf_loader:
#         x = x_batch.to(device).float()         # (B, seq_len, 2)
#         # ln = nasal_model(x)                   # (B, seq_len, 2)
#         lr = resp_model(x)                    # (B, seq_len, 2)
#         # all_preds_n.append(ln.argmax(-1).cpu())  
#         all_preds_r.append(lr.argmax(-1).cpu())

# # 5) Concatenate & flatten to length N
# # pred_n = torch.cat(all_preds_n, dim=0).reshape(-1).numpy()[:len(df_inf)]
# pred_r = torch.cat(all_preds_r, dim=0).reshape(-1).numpy()[:len(df_inf)]

# # 6) Attach back and save
# # df_inf['pred_nasal'] = pred_n
# df_inf['pred_resp']  = pred_r
# df_inf.to_csv("signal_with_preds.csv", index=False)

import torch
from torch.utils.data import Dataset, DataLoader
import pandas as pd
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
import pandas as pd
import numpy as np
from torch.optim.lr_scheduler import ReduceLROnPlateau
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

class CNN_GRU_Single(nn.Module):
    def __init__(self, input_dim=2, cnn_hidden=256, cnn_layers=16, kernel_size=3,
                 gru_hidden=256, gru_layers=16, bidirectional=True, num_classes=2):
        super().__init__()
        blocks, in_ch = [], input_dim
        for _ in range(cnn_layers):
            blocks += [
                nn.Conv1d(in_ch, cnn_hidden, kernel_size, padding=kernel_size//2),
                nn.BatchNorm1d(cnn_hidden),
                nn.ReLU(inplace=True),
                nn.Dropout(0.1),
            ]
            in_ch = cnn_hidden
        self.cnn = nn.Sequential(*blocks)
        self.gru = nn.GRU(
            cnn_hidden, gru_hidden, gru_layers,
            batch_first=True, bidirectional=bidirectional
        )
        out_dim = gru_hidden * (2 if bidirectional else 1)
        self.head = nn.Linear(out_dim, num_classes)

    def forward(self, x):
        h = x.permute(0,2,1)
        h = self.cnn(h)
        h = h.permute(0,2,1)
        o, _ = self.gru(h)
        return self.head(o)


class InferenceDataset(Dataset):
    def __init__(self, df: pd.DataFrame, seq_len: int):
        self.X = df.iloc[:, 0:2].values.astype('float32')
        self.seq_len = seq_len

    def __len__(self):
        return max(len(self.X) - self.seq_len + 1, 0)

    def __getitem__(self, idx):
        x_seq = self.X[idx : idx + self.seq_len]
        return torch.from_numpy(x_seq)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = CNN_GRU_Single().to(device).float()
model.load_state_dict(torch.load("./resp_model.pth", map_location=device))

def run_inference(df_inf, seq_len=50, batch_sz=256, device=None):
    model.eval()

    inf_ds = InferenceDataset(df_inf, seq_len)
    inf_loader = DataLoader(inf_ds, batch_size=batch_sz, shuffle=False, drop_last=False)

    all_preds = []
    with torch.no_grad():
        for x_batch in inf_loader:
            x = x_batch.to(device).float()
            logits = model(x)
            preds = logits.argmax(-1).cpu()
            all_preds.append(preds)

    pred_r = torch.cat(all_preds, dim=0).reshape(-1).numpy()[:len(df_inf)]
    df_inf['pred_resp'] = pred_r

    return df_inf['pred_resp'].values