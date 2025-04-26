
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Check, CloudMoon } from "lucide-react";
import { cn } from "@/lib/utils";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recordingName, setRecordingName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleRecordingNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecordingName(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a sleep recording file to upload.",
        variant: "destructive",
      });
      return;
    }

    if (!recordingName.trim()) {
      toast({
        title: "Recording name required",
        description: "Please provide a name for your sleep recording.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload successful!",
        description: "Your sleep recording has been uploaded and is being processed.",
      });
      setSelectedFile(null);
      setRecordingName("");
    }, 2000);
  };

  return (
    <Card className="bg-sleep-charcoal border-sleep-purple/20 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="recording-name" className="text-white">Recording Name</Label>
          <Input
            id="recording-name"
            value={recordingName}
            onChange={handleRecordingNameChange}
            placeholder="Night of April 25, 2023"
            className="bg-sleep-gray/30 border-sleep-purple/20 text-white"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="file-upload" className="text-white">Sleep Recording</Label>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all",
              dragActive 
                ? "border-sleep-purple bg-sleep-purple/10" 
                : "border-sleep-purple/30 hover:border-sleep-purple/60",
              selectedFile ? "bg-sleep-purple/5" : ""
            )}
          >
            <Input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              accept=".mp3,.wav,.mp4,.aac"
              className="hidden"
            />
            
            <div className="flex flex-col items-center gap-2">
              {selectedFile ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-sleep-purple/20 flex items-center justify-center">
                    <Check className="h-6 w-6 text-sleep-purple" />
                  </div>
                  <p className="text-white font-medium">{selectedFile.name}</p>
                  <p className="text-white/60 text-sm">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-sleep-purple/20 flex items-center justify-center mb-2">
                    <Upload className="h-6 w-6 text-sleep-purple" />
                  </div>
                  <p className="text-white font-medium">Drag and drop your file here</p>
                  <p className="text-white/60 text-sm">Or click to browse</p>
                  <p className="text-white/40 text-xs mt-2">Supported formats: MP3, WAV, MP4, AAC</p>
                </>
              )}
            </div>
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-sleep-purple hover:bg-sleep-light-purple text-white"
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <CloudMoon className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload Recording"
          )}
        </Button>
      </form>
    </Card>
  );
};

export default UploadForm;
