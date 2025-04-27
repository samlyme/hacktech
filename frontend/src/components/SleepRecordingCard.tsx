
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { CloudMoon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SleepRecordingCardProps {
  id: string;
  title: string;
  date: string;
  duration: number;
  quality: number;
  className?: string;
}

const SleepRecordingCard = ({
  id,
  title,
  date,
  duration,
  quality,
  className,
}: SleepRecordingCardProps) => {
  const qualityColor =
    quality >= 80 ? "bg-green-500" :
      quality >= 60 ? "bg-yellow-500" :
        "bg-red-500";

  return (
    <Card className={cn(
      "overflow-hidden bg-sleep-charcoal border border-sleep-purple/20 hover:border-sleep-purple/40 transition-all",
      className
    )}>
      <h1>{title}</h1>
    </Card>
  );
};

export default SleepRecordingCard;
