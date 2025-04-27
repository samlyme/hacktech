
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadButton } from "./UploadButton";
import { createRecordingRecordingsPost } from "@/client";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const UploadForm = () => {
  const date = new Date()
  const [recordingName, setRecordingName] = useState(date.toDateString());
  const { token } = useAuth()
  const navigate = useNavigate()

  const handleRecordingNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecordingName(e.target.value);
  };

  return (
    <Card className="bg-sleep-charcoal border-sleep-purple/20 p-6">
      <div className="space-y-2">
        <Label htmlFor="recording-name" className="text-white">Recording Name</Label>
        <Input
          id="recording-name"
          value={recordingName}
          onChange={handleRecordingNameChange}
          placeholder="Recording name"
          className="bg-sleep-gray/30 border-sleep-purple/20 text-white"
        />
      </div>
      <UploadButton
        endpoint={"audioUploader"}
        onClientUploadComplete={async (res) => {
          console.log(res);
          const fileUrl = res[0]['ufsUrl']
          const thing = await createRecordingRecordingsPost({
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: {
              name: recordingName,
              file_url: fileUrl,
            }
          })
          console.log(thing);
          navigate("/dashboard")
        }}
      />

    </Card>
  );
};

export default UploadForm;
