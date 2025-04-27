import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  ReferenceLine,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";
import { useEffect, useState, useMemo } from "react";

interface AnalysisChartProps {
  type: 'mic' | 'nasal' | 'resp';
  title: string;
  className?: string;
  color?: string;
}

interface DataPoint {
  timeMinutes: number;  // Minutes since start
  displayTime: string;  // HH:mm format for display
  mic: number;
  nasal: number;
  resp: number;
}

interface EventPoint {
  timeMinutes: number;
  displayTime: string;
  value: number;
}

// Helper function to format minutes to HH:mm
const formatMinutes = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const AnalysisChart = ({
  type,
  title,
  className,
  color = "#9b87f5",
}: AnalysisChartProps) => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [events, setEvents] = useState<EventPoint[]>([]);

  // Sample data to reduce number of points
  const sampledData = useMemo(() => {
    if (data.length === 0) return [];
    
    // Take every 200th point to reduce data density (increased from 50)
    const sampleRate = 200;
    const sampled = data.filter((_, index) => index % sampleRate === 0);

    // Apply simple moving average smoothing
    const smoothingWindow = 3;
    const smoothed = sampled.map((point, index) => {
      if (index < smoothingWindow - 1 || index >= sampled.length - smoothingWindow + 1) {
        return point; // Keep edge points as is
      }

      // Calculate average of surrounding points
      let sum = 0;
      for (let i = index - Math.floor(smoothingWindow/2); i <= index + Math.floor(smoothingWindow/2); i++) {
        sum += sampled[i].mic;
      }
      return {
        ...point,
        mic: sum / smoothingWindow
      };
    });

    console.log('Sampled and smoothed data first few points:', JSON.stringify(smoothed.slice(0, 5)));
    return smoothed;
  }, [data]);

  // Normalize mic values to 0-100 scale
  const normalizedData = useMemo(() => {
    if (sampledData.length === 0) return [];
    
    // Find min and max values
    const values = sampledData.map(d => d.mic);
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // Find time range
    const timeMin = Math.min(...sampledData.map(d => d.timeMinutes));
    const timeMax = Math.max(...sampledData.map(d => d.timeMinutes));
    console.log('Time range:', { min: timeMin, max: timeMax });
    
    // Normalize to 0-100 scale with some padding
    const normalized = sampledData.map(d => {
      const normalizedValue = Math.min(100, Math.max(0, ((d.mic - min) / (max - min)) * 90 + 5));
      // Check if this point has an event
      const hasEvent = type !== 'mic' && events.some(e => Math.abs(e.timeMinutes - d.timeMinutes) < 0.1);
      
      return {
        ...d,
        mic: normalizedValue,
        isEvent: hasEvent
      };
    });
    
    console.log('Normalized data first few points:', JSON.stringify(normalized.slice(0, 5)));
    return normalized;
  }, [sampledData, events, type]);

  // Sample and normalize events to match data sampling
  const normalizedEvents = useMemo(() => {
    if (events.length === 0) return [];
    
    console.log('Original events:', JSON.stringify(events.slice(0, 5)));
    console.log('Event time range:', {
      min: Math.min(...events.map(e => e.timeMinutes)),
      max: Math.max(...events.map(e => e.timeMinutes))
    });
    
    // Find min and max values from sampled data for consistent normalization
    const values = sampledData.map(d => d.mic);
    const min = Math.min(...values);
    const max = Math.max(...values);

    // For each event, find the closest data point and use its mic value
    const normalized = events.map(event => {
      const closestPoint = sampledData.reduce((prev, curr) => {
        return Math.abs(curr.timeMinutes - event.timeMinutes) < Math.abs(prev.timeMinutes - event.timeMinutes) ? curr : prev;
      });
      
      return {
        timeMinutes: event.timeMinutes,
        displayTime: event.displayTime,
        value: ((closestPoint.mic - min) / (max - min)) * 90 + 5 // Use same normalization as the line
      };
    });

    console.log('Normalized events:', JSON.stringify(normalized.slice(0, 5)));
    
    return normalized;
  }, [events, sampledData]);

  // Get event marker color based on type
  const getEventColor = () => {
    switch (type) {
      case 'nasal':
        return '#D3E4FD'; // Soft blue for snoring events
      case 'resp':
        return '#B4A5FD'; // Soft purple for breath events
      default:
        return '#9b87f5';
    }
  };

  // Get event marker label based on type
  const getEventLabel = () => {
    switch (type) {
      case 'nasal':
        return 'Snore'; // Full word instead of just 'S'
      case 'resp':
        return 'Breath'; // Full word instead of just 'B'
      default:
        return '';
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/signal_compressed_total.csv');
        const csvText = await response.text();
        const rows = csvText.split('\n').slice(1); // Skip header row
        
        // Calculate total duration in hours
        const totalSeconds = rows.length - 1; // -1 for header
        const totalHours = totalSeconds / 3600;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        console.log(`Recording duration: ${totalSeconds} seconds (${hours}:${minutes.toString().padStart(2, '0')} hours)`);
        
        // Generate timestamps starting from 00:00:00
        const parsedData = rows.map((row, index) => {
          // File format is: Tracheal,Mic,nasal,resp
          const columns = row.split(',');
          if (columns.length !== 4) return null;

          const [tracheal, mic, nasal, resp] = columns.map(val => {
            const num = parseFloat(val);
            return isNaN(num) ? 0 : num;
          });
          
          const seconds = index;
          const timeMinutes = seconds / 60;
          
          return {
            timeMinutes,
            displayTime: formatMinutes(timeMinutes),
            mic,
            nasal,
            resp
          };
        }).filter(Boolean);
        
        setData(parsedData);

        // Update Analysis.tsx with correct duration
        const actualDuration = totalHours;
        console.log('Please update duration in Analysis.tsx to:', actualDuration.toFixed(2), 'hours');

        // Process events based on type
        if (type === 'nasal' || type === 'resp') {
          const eventPoints: EventPoint[] = [];
          let lastEventIndex = -10; // Minimum gap between events
          
          // Look for exact 1.0 values and create event markers
          parsedData.forEach((point, idx) => {
            const val = point[type];
            // Look for exact 1.0 values with some spacing between markers
            if (Math.abs(val - 1.0) < 0.0001 && idx - lastEventIndex >= 10) {
              // Add the event point
              eventPoints.push({
                timeMinutes: point.timeMinutes,
                displayTime: point.displayTime,
                value: point.mic  // Use mic value for y-coordinate to match the line
              });
              lastEventIndex = idx;
            }
          });

          console.log(`${type} events found:`, eventPoints.length);
          if (eventPoints.length > 0) {
            console.log(`First few ${type} events:`, eventPoints.slice(0, 5));
          }
          
          setEvents(eventPoints);
        }
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    };

    loadData();
  }, [type]);

  // Log when rendering
  console.log('Chart type:', type);
  console.log('Number of events:', normalizedEvents.length);
  console.log('First few events:', JSON.stringify(normalizedEvents.slice(0, 5)));
  console.log('First data point minutes:', normalizedData[0]?.timeMinutes);

  return (
    <Card
      className={cn("bg-sleep-charcoal border-sleep-purple/20 p-5", className)}
    >
      <h3 className="text-lg font-medium text-white mb-4">{title}</h3>
      <div className="text-xs text-white/50 mb-2">
        {type === 'mic' ? (
          `${normalizedData.length} samples`
        ) : (
          `${normalizedData.length} samples • ${events.length} ${type === 'nasal' ? 'snoring' : 'breath'} events detected`
        )}
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={normalizedData}
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#403E43" />
            <XAxis
              dataKey="timeMinutes"
              stroke="#e5deff"
              tick={{ fill: "#e5deff80" }}
              interval={Math.floor(normalizedData.length / 10)}
              minTickGap={50}
              tickFormatter={(value) => formatMinutes(value)}
              domain={[0, 'dataMax']}
              type="number"
              allowDataOverflow={false}
              scale="linear"
            />
            <YAxis 
              stroke="#e5deff" 
              tick={{ fill: "#e5deff80" }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#221F26",
                border: "1px solid #9b87f5",
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: color }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Noise Level']}
              labelFormatter={(value) => formatMinutes(value)}
            />
            <Line
              type="monotone"
              dataKey="mic"
              stroke={color}
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props;
                if (payload.isEvent) {
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill={getEventColor()}
                      stroke="white"
                      strokeWidth={1}
                    />
                  );
                }
                return null;
              }}
              activeDot={{ r: 6, fill: "#fff", stroke: color }}
              isAnimationActive={false}
              connectNulls={true}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Event markers */}
            {type !== 'mic' && (
              <Scatter
                data={normalizedEvents}
                fill={getEventColor()}
                shape="circle"
                dataKey="timeMinutes"
                name="Events"
                isAnimationActive={false}
              >
                {normalizedEvents.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={getEventColor()}
                    stroke="white"
                    strokeWidth={1}
                    r={4}
                  />
                ))}
              </Scatter>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AnalysisChart;
