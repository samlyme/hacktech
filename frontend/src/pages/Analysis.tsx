// @ts-nocheck
import React from "react";
import { useParams, Link } from "react-router-dom";
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
  const duration = 4.97; // Updated from CSV data (17,891 seconds)
  const totalEvents = 492; // 71 snoring + 421 breath events
  const eventsPerHour = (totalEvents / duration).toFixed(1);

  const getBadgeColor = (category: string) => {
    switch (category) {
      case "good":
        return "bg-green-600 hover:bg-green-700";
      case "positive":
        return "bg-green-600 hover:bg-green-700";
      case "warning":
        return "bg-yellow-600 hover:bg-yellow-700";
      case "severe":
        return "bg-red-600 hover:bg-red-700";
      default:
        return "bg-slate-600 hover:bg-slate-700";
    }
  };

  const getAHISeverity = (eventsPerHour: number) => {
    if (eventsPerHour < 5) return "Normal";
    if (eventsPerHour < 15) return "Mild";
    if (eventsPerHour < 30) return "Moderate";
    return "Severe";
  };

  // Calculate severity once for use in multiple places
  const severity = getAHISeverity(parseFloat(eventsPerHour));

  const insights = [
    {
      title: "Total Episodes",
      value: totalEvents,
      description: "Combined snoring and breath events",
      category: "warning"
    },
    {
      title: "Episodes/Hour",
      value: eventsPerHour,
      description: "Events detected per hour of sleep (AHI)",
      category: severity === "Severe" ? "severe" : 
                severity === "Moderate" ? "warning" : 
                severity === "Mild" ? "warning" : "good"
    },
    {
      title: "Recording Length",
      value: `${Math.floor(duration)}h ${Math.round((duration % 1) * 60)}m`,
      description: "Total duration of sleep recording",
      category: "good"
    },
    {
      title: "AHI",
      value: severity,
      description: "Apnea-Hypopnea Index severity",
      category: severity === "Severe" ? "severe" : 
                severity === "Moderate" ? "warning" : 
                severity === "Mild" ? "warning" : "good"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-sleep-dark-purple">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{id === "rec1" ? "Last Night's Sleep" : "Sleep Recording"}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-white/70">April 25, 2025</p>
                <Badge className="bg-sleep-purple hover:bg-sleep-purple">
                  Poor Quality
                </Badge>
                <Badge variant="outline" className="border-sleep-purple/50 text-sleep-purple">
                  {Math.floor(duration)}h {Math.round((duration % 1) * 60)}m
                </Badge>
                <Badge className={
                  severity === "Severe" ? "bg-red-600 hover:bg-red-700" :
                  severity === "Moderate" ? "bg-orange-600 hover:bg-orange-700" :
                  severity === "Mild" ? "bg-yellow-600 hover:bg-yellow-700" :
                  "bg-green-600 hover:bg-green-700"
                }>
                  {severity} AHI
                </Badge>
              </div>
            </div>
            
            <Button variant="outline" className="border-sleep-purple/40 text-sleep-purple hover:bg-sleep-purple/10">
              <Download className="h-4 w-4 mr-2" />
              Download Analysis
            </Button>
          </div>
          
          {/* Analysis Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
            <AnalysisChart 
              type="mic"
              title="Overall Noise Level" 
              color="#9b87f5"
              className="xl:col-span-2"
            />
            <AnalysisChart 
              type="nasal"
              title="Snoring Events" 
              color="#9b87f5"
            />
            <AnalysisChart 
              type="resp"
              title="Obstructed Breath Events" 
              color="#9b87f5"
            />
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
                {insights.map((insight, index) => (
                  <div 
                    key={index} 
                    className="bg-sleep-gray/20 backdrop-blur-sm rounded-lg p-4"
                  >
                    <Badge className={getBadgeColor(insight.category)}>
                      {insight.title}
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
                {insights.map((insight, index) => (
                  <li 
                    key={index} 
                    className="bg-sleep-gray/20 backdrop-blur-sm rounded-lg p-4 flex items-start"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                      insight.category === "positive" ? "bg-green-500" :
                      insight.category === "warning" ? "bg-yellow-500" :
                      "bg-slate-400"
                    }`} />
                    <p className="text-white/90">{insight.description}</p>
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
                <h3 className="text-lg font-medium text-white mb-3">Sleep Apnea Management</h3>
                <p className="text-white/80 mb-4">
                  Your AHI score of {eventsPerHour} events per hour indicates {severity.toLowerCase()} sleep apnea. Here are immediate steps to take:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-sleep-purple mr-2">•</span>
                    <span className="text-white/80">Schedule a consultation with a sleep specialist</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sleep-purple mr-2">•</span>
                    <span className="text-white/80">Consider a professional sleep study for detailed diagnosis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sleep-purple mr-2">•</span>
                    <span className="text-white/80">Discuss CPAP therapy options with your healthcare provider</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sleep-purple mr-2">•</span>
                    <span className="text-white/80">Maintain a healthy weight and sleep position</span>
                  </li>
                </ul>
              </div>
              <div className="bg-sleep-gray/20 backdrop-blur-sm rounded-lg p-5">
                <h3 className="text-lg font-medium text-white mb-3">Important Disclaimer</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-sleep-purple mr-2">•</span>
                    <span className="text-white/80">This analysis is for informational purposes only</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sleep-purple mr-2">•</span>
                    <span className="text-white/80">We are not medical professionals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sleep-purple mr-2">•</span>
                    <span className="text-white/80">Not intended to diagnose or treat sleep apnea</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sleep-purple mr-2">•</span>
                    <span className="text-white/80">Always consult a healthcare provider for medical advice</span>
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
