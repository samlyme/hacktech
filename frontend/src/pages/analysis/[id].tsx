import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnalysisChart from '@/components/AnalysisChart';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Moon, Bed, CloudMoon } from 'lucide-react';

interface AnalysisData {
  id: string;
  duration: number;
  totalEvents: number;
  eventsPerHour: number;
  severity: string;
  events: {
    snoring: number;
    breath: number;
  };
}

const AnalysisPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`/api/analysis/${id}`);
        if (!response.ok) throw new Error('Analysis not found');
        const data = await response.json();
        setAnalysis(data);
      } catch (error) {
        console.error('Error fetching analysis:', error);
        // TODO: Show error message to user
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sleep-dark-purple">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sleep-dark-purple">
        <div className="text-white">Analysis not found</div>
      </div>
    );
  }

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

  const insights = [
    {
      title: "Total Episodes",
      value: analysis.totalEvents,
      description: "Combined snoring and breath events",
      category: "warning"
    },
    {
      title: "Episodes/Hour",
      value: analysis.eventsPerHour.toFixed(1),
      description: "Events detected per hour of sleep (AHI)",
      category: analysis.severity === "Severe" ? "severe" : 
                analysis.severity === "Moderate" ? "warning" : 
                analysis.severity === "Mild" ? "warning" : "good"
    },
    {
      title: "Recording Length",
      value: `${Math.floor(analysis.duration)}h ${Math.round((analysis.duration % 1) * 60)}m`,
      description: "Total duration of sleep recording",
      category: "good"
    },
    {
      title: "AHI",
      value: analysis.severity,
      description: "Apnea-Hypopnea Index severity",
      category: analysis.severity === "Severe" ? "severe" : 
                analysis.severity === "Moderate" ? "warning" : 
                analysis.severity === "Mild" ? "warning" : "good"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-sleep-dark-purple">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Sleep Analysis</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-white/70">April 25, 2025</p>
                <Badge className="bg-sleep-purple hover:bg-sleep-purple">
                  Poor Quality
                </Badge>
                <Badge variant="outline" className="border-sleep-purple/50 text-sleep-purple">
                  {Math.floor(analysis.duration)}h {Math.round((analysis.duration % 1) * 60)}m
                </Badge>
                <Badge className={
                  analysis.severity === "Severe" ? "bg-red-600 hover:bg-red-700" :
                  analysis.severity === "Moderate" ? "bg-orange-600 hover:bg-orange-700" :
                  analysis.severity === "Mild" ? "bg-yellow-600 hover:bg-yellow-700" :
                  "bg-green-600 hover:bg-green-700"
                }>
                  {analysis.severity} AHI
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
                  Your AHI score of {analysis.eventsPerHour.toFixed(1)} events per hour indicates {analysis.severity.toLowerCase()} sleep apnea. Here are immediate steps to take:
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

export default AnalysisPage; 