import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

interface AnalysisChartProps {
  data: {
    time: string;
    value: number;
  }[];
  title: string;
  className?: string;
  color?: string;
}

const AnalysisChart = ({
  data,
  title,
  className,
  color = "#9b87f5",
}: AnalysisChartProps) => {
  return (
    <Card
      className={cn("bg-sleep-charcoal border-sleep-purple/20 p-5", className)}
    >
      <h3 className="text-lg font-medium text-white mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#403E43" />
            <XAxis
              dataKey="time"
              stroke="#e5deff"
              tick={{ fill: "#e5deff80" }}
            />
            <YAxis stroke="#e5deff" tick={{ fill: "#e5deff80" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#221F26",
                border: "1px solid #9b87f5",
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: color }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, r: 4 }}
              activeDot={{ r: 6, fill: "#fff", stroke: color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AnalysisChart;
