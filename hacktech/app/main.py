from inferenceWithoutNoise import run_inference
import pandas as pd

input = pd.read_csv('signal_compressed_total.csv')

print("df", input)

output = run_inference(input)

print("output", output)