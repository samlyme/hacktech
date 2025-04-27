import { cn } from "@/lib/utils";

interface CloudCardProps {
  children: React.ReactNode;
  className?: string;
}

const CloudCard = ({ children, className }: CloudCardProps) => {
  return (
    <div className={cn(
      "cloud-card p-6",
      className
    )}>
      {children}
    </div>
  );
};

export default CloudCard;
