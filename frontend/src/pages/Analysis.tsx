// @ts-nocheck
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalysisChart from "@/components/AnalysisChart";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Moon, Bed, CloudMoon } from "lucide-react";

const Analysis = () => {
  const { id } = useParams<{ id: string }>();
  
  // Sample data for the analysis
  // In a real app, fetch this based on the ID
  const recording = {
    id,
    title: id === "rec1" ? "Last Night's Sleep" : "Sleep Recording",
    date: "April 25, 2025",
    duration: 7.2,
    quality: 82,
    insights: [
      { label: "Deep Sleep", value: "2.1 hours", category: "good" },
      { label: "Light Sleep", value: "4.3 hours", category: "neutral" },
      { label: "REM", value: "0.8 hours", category: "warning" },
      { label: "Awake", value: "18 minutes", category: "neutral" },
      { label: "Snoring", value: "12 minutes", category: "warning" },
      { label: "Disruptions", value: "2 times", category: "neutral" },
    ],
    notes: [
      { text: "Significant deep sleep phase detected between 1-3 AM", category: "positive" },
      { text: "Snoring detected primarily in the early sleep phase", category: "neutral" },
      { text: "Two minor sleep disruptions recorded", category: "neutral" },
      { text: "Below average REM sleep - may affect memory consolidation", category: "warning" },
    ],
  };
  
  // Sample data for charts
  const sleepStagesData = [
    { time: "10:00 PM", value: 1 },
    { time: "11:00 PM", value: 2 },
    { time: "12:00 AM", value: 3 },
    { time: "01:00 AM", value: 4 },
    { time: "02:00 AM", value: 4 },
    { time: "03:00 AM", value: 3 },
    { time: "04:00 AM", value: 2 },
    { time: "05:00 AM", value: 2 },
    { time: "06:00 AM", value: 1 },
  ];
  
  const noiseLevelData = [
    { time: "10:00 PM", value: 20 },
    { time: "11:00 PM", value: 35 },
    { time: "12:00 AM", value: 40 },
    { time: "01:00 AM", value: 22 },
    { time: "02:00 AM", value: 18 },
    { time: "03:00 AM", value: 15 },
    { time: "04:00 AM", value: 28 },
    { time: "05:00 AM", value: 35 },
    { time: "06:00 AM", value: 42 },
  ];
  
  const movementData = [
    { time: "10:00 PM", value: 30 },
    { time: "11:00 PM", value: 10 },
    { time: "12:00 AM", value: 5 },
    { time: "01:00 AM", value: 2 },
    { time: "02:00 AM", value: 3 },
    { time: "03:00 AM", value: 8 },
    { time: "04:00 AM", value: 12 },
    { time: "05:00 AM", value: 18 },
    { time: "06:00 AM", value: 25 },
  ];

  const getBadgeColor = (category: string) => {
    switch (category) {
      case "good":
        return "bg-green-600 hover:bg-green-700";
      case "positive":
        return "bg-green-600 hover:bg-green-700";
      case "warning":
        return "bg-yellow-600 hover:bg-yellow-700";
      default:
        return "bg-slate-600 hover:bg-slate-700";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{recording.title}</h1>
              <div className="flex items-center gap-3">
                <p className="text-white/70">{recording.date}</p>
                <Badge className="bg-sleep-purple hover:bg-sleep-purple">
                  {recording.quality}% Quality
                </Badge>
                <Badge variant="outline" className="border-sleep-purple/50 text-sleep-purple">
                  {recording.duration} hours
                </Badge>
              </div>
            </div>
            
            <Button variant="outline" className="border-sleep-purple/40 text-sleep-purple hover:bg-sleep-purple/10">
              <Download className="h-4 w-4 mr-2" />
              Download Analysis
            </Button>
          </div>
          
          {/* Analysis Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
            <AnalysisChart 
              data={sleepStagesData} 
              title="Sleep Stages" 
              color="#9b87f5"
              className="xl:col-span-3"
            />
            <AnalysisChart 
              data={noiseLevelData} 
              title="Noise Levels" 
              color="#33C3F0"
            />
            <AnalysisChart 
              data={movementData} 
              title="Movement Activity" 
              color="#D6BCFA"
            />
            <Card className="bg-sleep-charcoal border-sleep-purple/20 p-5">
              <h3 className="text-lg font-medium text-white mb-4">Sleep Quality Score</h3>
              <div className="flex items-center justify-center h-48">
                <div className="relative">
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="transparent"
                      stroke="#403E43"
                      strokeWidth="12"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="transparent"
                      stroke="#9b87f5"
                      strokeWidth="12"
                      strokeDasharray="439.6"
                      strokeDashoffset={439.6 - (439.6 * recording.quality) / 100}
                      strokeLinecap="round"
                      transform="rotate(-90 80 80)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl font-bold text-white">{recording.quality}</span>
                      <span className="text-xl text-white/80">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Insights and Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-sleep-charcoal border-sleep-purple/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-sleep-purple/20 flex items-center justify-center">
                  <Bed className="h-5 w-5 text-sleep-purple" />
                </div>
                <h2 className="text-xl font-semibold text-white">Key Insights</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {recording.insights.map((insight, index) => (
                  <div 
                    key={index} 
                    className="bg-sleep-gray/20 backdrop-blur-sm rounded-lg p-4"
                  >
                    <Badge className={getBadgeColor(insight.category)}>
                      {insight.label}
                    </Badge>
                    <p className="text-white font-medium mt-2">{insight.value}</p>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="bg-sleep-charcoal border-sleep-purple/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-sleep-purple/20 flex items-center justify-center">
                  <CloudMoon className="h-5 w-5 text-sleep-purple" />
                </div>
                <h2 className="text-xl font-semibold text-white">Analysis Notes</h2>
              </div>
              
              <ul className="space-y-3">
                {recording.notes.map((note, index) => (
                  <li 
                    key={index} 
                    className="bg-sleep-gray/20 backdrop-blur-sm rounded-lg p-4 flex items-start"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                      note.category === "positive" ? "bg-green-500" :
                      note.category === "warning" ? "bg-yellow-500" :
                      "bg-slate-400"
                    }`} />
                    <p className="text-white/90">{note.text}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          
          {/* Recommendations */}
          <Card className="bg-sleep-charcoal border-sleep-purple/20 p-6 mt-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-sleep-purple/20 flex items-center justify-center">
                <Moon className="h-5 w-5 text-sleep-purple" />
              </div>
              <h2 className="text-xl font-semibold text-white">Sleep Improvement Recommendations</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-sleep-gray/20 backdrop-blur-sm rounded-lg p-5">
                <h3 className="text-lg font-medium text-white mb-3">Increase REM Sleep</h3>
                <p className="text-white/80 mb-4">
                  Your REM sleep is below average. Consider these strategies to improve it:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-sleep-purple mr-2">•</span>
                    <span className="text-white/80">Maintain a consistent sleep schedule</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sleep-purple mr-2">•</span>
                    <span className="text-white/80">Avoid alcohol before bed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sleep-purple mr-2">•</span>
                    <span className="text-white/80">Practice relaxation techniques before sleep</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-sleep-gray/20 backdrop-blur-sm rounded-lg p-5">
                <h3 className="text-lg font-medium text-white mb-3">Reduce Snoring</h3>
                <p className="text-white/80 mb-4">
                  We detected snoring in your recording. Try these strategies:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-sleep-purple mr-2">•</span>
                    <span className="text-white/80">Sleep on your side instead of your back</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sleep-purple mr-2">•</span>
                    <span className="text-white/80">Use a humidifier to keep air moist</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sleep-purple mr-2">•</span>
                    <span className="text-white/80">Elevate your head slightly while sleeping</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};


export default Analysis;
