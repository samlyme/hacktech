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
  AHI: number;
  className?: string;
}

const SleepRecordingCard = ({
  id,
  title,
  date,
  duration,
  AHI,
  className,
}: SleepRecordingCardProps) => {
  const ahiColor = 
    AHI >= 80 ? "bg-red-500" : 
    AHI >= 60 ? "bg-yellow-500" : 
    "bg-green-500";
  
  return (
    <Card className={cn(
      "overflow-hidden bg-sleep-charcoal border border-sleep-purple/20 hover:border-sleep-purple/40 transition-all",
      className
    )}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CloudMoon className="h-5 w-5 text-sleep-soft-blue" />
            <h3 className="font-semibold text-lg text-white">{title}</h3>
          </div>
          <span className="text-white/60 text-sm">{date}</span>
        </div>
        
        <div className="space-y-4 mb-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-white/80 text-sm">Duration</span>
              <span className="text-white font-medium">{duration} hrs</span>
            </div>
            <Progress value={duration * 10} className="h-2 bg-sleep-gray" />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-white/80 text-sm">AHI</span>
              <span className="text-white font-medium">{AHI}</span>
            </div>
            <div className="h-2 w-full bg-sleep-gray rounded-full overflow-hidden">
              <div 
                className={`h-full ${ahiColor} transition-all`}
                style={{ width: `${AHI}%` }}
              />
            </div>
          </div>
        </div>
        
        <Link to={`/analysis/${id}`}>
          <Button variant="outline" className="w-full border-sleep-purple/30 text-sleep-purple hover:bg-sleep-purple/10 hover:text-sleep-light-purple">
            View Analysis
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default SleepRecordingCard;
