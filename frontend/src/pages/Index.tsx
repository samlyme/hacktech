import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CloudMoon, Moon, Bed } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CloudCard from "@/components/CloudCard";

const Index = () => {
  const features = [
    {
      icon: <CloudMoon className="h-8 w-8 text-sleep-purple" />,
      title: "Sleep Pattern Analysis",
      description: "Discover patterns and trends in your sleep recordings with advanced audio processing."
    },
    {
      icon: <Moon className="h-8 w-8 text-sleep-purple" />,
      title: "Quality Assessment",
      description: "Get detailed insights about your sleep quality, including snoring detection and sleep disturbances."
    },
    {
      icon: <Bed className="h-8 w-8 text-sleep-purple" />,
      title: "Personalized Recommendations",
      description: "Receive tailored suggestions to improve your sleep based on your recording analysis."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Rest <span className="text-sleep-purple">Assured</span>
                </h1>
                <p className="text-lg text-white/80 max-w-xl">
                  Transform your home sleep data into valuable insights with our specialized analysis that detects sleep apnea patterns in minutes
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link to="/upload">
                    <Button size="lg" className="bg-sleep-purple hover:bg-sleep-light-purple text-white">
                      Upload Recording
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button variant="outline" size="lg" className="border-sleep-purple/40 text-sleep-purple hover:bg-sleep-purple/10">
                      View Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/2 relative">
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-sleep-purple/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-sleep-soft-blue/20 rounded-full blur-3xl" />
                
                <div className="relative p-1 rounded-2xl bg-gradient-to-br from-sleep-purple/30 to-sleep-soft-blue/30">
                  <div className="bg-sleep-dark-purple rounded-xl overflow-hidden backdrop-blur-sm">
                    <div className="p-6 bg-gradient-to-br from-transparent to-sleep-purple/5">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-xl font-semibold text-white">Last Night's Sleep</h3>
                          <p className="text-white/60 text-sm">April 25, 2025</p>
                        </div>
                        <span className="text-2xl font-bold text-sleep-purple">82%</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="h-20 w-full overflow-hidden">
                            <svg viewBox="0 0 100 20" className="w-full h-full">
                              <path
                                fill="none"
                                stroke="#9b87f5"
                                strokeWidth="0.5"
                                d="M0,10 Q10,5 20,10 T40,10 T60,10 T80,10 T100,10"
                              />
                              <path
                                fill="none"
                                stroke="#9b87f5"
                                strokeWidth="0.5"
                                d="M0,10 Q5,15 10,10 T20,10 T30,10 T40,10 T50,14 T60,10 T70,6 T80,10 T90,12 T100,10"
                              />
                              <path
                                fill="none"
                                stroke="#D3E4FD"
                                strokeWidth="0.5"
                                d="M0,10 Q25,18 50,10 T100,10"
                              />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-sleep-purple/10 rounded-lg p-3">
                            <p className="text-white/60 text-xs mb-1">Duration</p>
                            <p className="text-white font-medium">7.2 hrs</p>
                          </div>
                          <div className="bg-sleep-purple/10 rounded-lg p-3">
                            <p className="text-white/60 text-xs mb-1">Snoring</p>
                            <p className="text-white font-medium">12 min</p>
                          </div>
                          <div className="bg-sleep-purple/10 rounded-lg p-3">
                            <p className="text-white/60 text-xs mb-1">Disruptions</p>
                            <p className="text-white font-medium">2 times</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-sleep-charcoal">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Unlock the Secrets of Your Sleep
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Our advanced technology analyzes your sleep recordings to provide meaningful insights and actionable recommendations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <CloudCard key={index} className="bg-sleep-dark-purple/70">
                  <div className="h-full flex flex-col items-center text-center p-2">
                    <div className="w-16 h-16 rounded-full bg-sleep-purple/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-white/70">{feature.description}</p>
                  </div>
                </CloudCard>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="cloud-card bg-sleep-charcoal/70 max-w-3xl mx-auto">
              <div className="py-10 px-6 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Improve Your Sleep?
                </h2>
                <p className="text-white/70 mb-8 max-w-lg mx-auto">
                  Start tracking and analyzing your sleep patterns today. Upload your first recording and discover insights that can transform your rest.
                </p>
                <Link to="/upload">
                  <Button size="lg" className="bg-sleep-purple hover:bg-sleep-light-purple text-white">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
