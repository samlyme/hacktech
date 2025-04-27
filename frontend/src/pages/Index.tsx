// import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AudioLines, NotebookIcon, LineChart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CloudCard from "@/components/CloudCard";
import StarryBackground from "@/components/StarryBackground";

const Index = () => {
  const features = [
    {
      icon: <AudioLines className="h-8 w-8 text-sleep-purple" />,
      title: "Audio to Answers",
      description:
        "Transform smartphone audio into powerful sleep health diagnostics, detecting breathing abnormalities and snoring patterns."
    },
    {
      icon: <LineChart className="h-8 w-8 text-sleep-purple" />,
      title: "Sleep Insights",
      description:
        "Analyze your sleep evolution, spot apnea risk patterns, and quantify improvements from CPAP therapy or lifestyle modifications.",
    },
    {
      icon: <NotebookIcon className="h-8 w-8 text-sleep-purple" />,
      title: "Clinical Collaboration",
      description:
        "Sleep analytics delivered as a professional PDF report for seamless physician collaboration and expedited clinical assessment.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      <StarryBackground />
      <Navbar />

      <main className="flex-grow">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                 <span className="text-sleep-purple">Skip</span> the sleep study
                </h1>
                <p className="text-lg text-white/80 max-w-xl">
                  Nea analyzes your overnight sleep sounds using advanced deep learning technology, identifying potential sleep apnea episodes from the comfort of your home. Get valuable insights at home before committing to overnight lab studies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link to="/upload">
                    <Button
                      size="lg"
                      className="bg-sleep-purple hover:bg-sleep-light-purple text-white"
                    >
                      Upload Recording
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-sleep-purple/40 text-sleep-purple hover:bg-sleep-purple/10"
                    >
                      View Dashboard
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2 relative">
                <div className="relative p-1 rounded-2xl bg-gradient-to-br from-sleep-purple/30 to-sleep-soft-blue/30">
                  <div className="bg-sleep-dark-purple/70 rounded-xl overflow-hidden backdrop-blur-sm">
                    <div className="p-6 bg-gradient-to-br from-transparent to-sleep-purple/5">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            Last Night's Sleep
                          </h3>
                          <p className="text-white/60 text-sm">
                            April 25, 2025
                          </p>
                        </div>
                        <span className="text-2xl font-bold text-sleep-purple">
                          231 total episodes
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="h-20 w-full overflow-hidden">
                            <div className="animate-wave">
                              <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="w-[200%] h-full">
                                {/* First set of waves (original) */}
                                <path
                                  fill="none"
                                  stroke="#9b87f5"
                                  strokeWidth="0.5"
                                  d="M0,8 Q10,3 20,8 T40,8 T60,8 T80,8 T100,8 Q110,3 120,8 T140,8 T160,8 T180,8 T200,8"
                                />
                                <path
                                  fill="none"
                                  stroke="#9b87f5"
                                  strokeWidth="0.5"
                                  d="M0,8 Q5,13 10,8 T20,8 T30,8 T40,8 T50,12 T60,8 T70,4 T80,8 T90,10 T100,8 Q105,13 110,8 T120,8 T130,8 T140,8 T150,12 T160,8 T170,4 T180,8 T190,10 T200,8"
                                />
                                <path
                                  fill="none"
                                  stroke="#D3E4FD"
                                  strokeWidth="0.5"
                                  d="M0,8 Q25,16 50,8 T100,8 Q125,16 150,8 T200,8"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-sleep-purple/10 rounded-lg p-3">
                            <p className="text-white/60 text-xs mb-1">
                              Snoring
                            </p>
                            <p className="text-white font-medium">15 per hour</p>
                          </div>
                          <div className="bg-sleep-purple/10 rounded-lg p-3">
                            <p className="text-white/60 text-xs mb-1">
                              Breath Obstructions
                            </p>
                            <p className="text-white font-medium">18 per hour</p>
                          </div>
                          <div className="bg-sleep-purple/10 rounded-lg p-3">
                            <p className="text-white/60 text-xs mb-1">
                              Total Episodes
                            </p>
                            <p className="text-white font-medium">33 per hour</p>
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

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                A sleep lab in your pocket
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Sleep labs are uncomfortable. Your best sleep analysis happens where you sleep best.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <CloudCard key={index} className="bg-sleep-dark-purple/70">
                  <div className="h-full flex flex-col items-center text-center p-2">
                    <div className="w-16 h-16 rounded-full bg-sleep-purple/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-white/70">{feature.description}</p>
                  </div>
                </CloudCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="cloud-card bg-sleep-dark-purple/70 max-w-3xl mx-auto">
              <div className="py-10 px-6 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-sleep-purple/20 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-sleep-purple"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Track Apneic Episodes
                </h2>
                <p className="text-white/70 mb-8 max-w-lg mx-auto">
                  Sleep apnea occurs when breathing repeatedly stops and starts during sleep. Our advanced AI analyzes your sleep sounds to detect these episodes, classifying them by severity and duration. We track patterns over time, helping you and your healthcare provider understand your sleep health better.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div className="bg-sleep-purple/10 rounded-lg p-4">
                    <h3 className="text-sleep-purple font-semibold mb-2">Detection</h3>
                    <p className="text-white/70 text-sm">Advanced audio analysis identifies breathing pauses and irregularities</p>
                  </div>
                  <div className="bg-sleep-purple/10 rounded-lg p-4">
                    <h3 className="text-sleep-purple font-semibold mb-2">Classification</h3>
                    <p className="text-white/70 text-sm">Episodes are categorized by severity and duration for accurate tracking</p>
                  </div>
                  <div className="bg-sleep-purple/10 rounded-lg p-4">
                    <h3 className="text-sleep-purple font-semibold mb-2">Patterns</h3>
                    <p className="text-white/70 text-sm">Long-term analysis reveals trends and potential risk factors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="cloud-card bg-sleep-dark-purple/70 max-w-3xl mx-auto">
              <div className="py-10 px-6 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Sleep Answers Await
                </h2>
                <p className="text-white/70 mb-8 max-w-lg mx-auto">
                  Get answers with one overnight recording upload. Receive easy-to-share screening results that help you and your doctor make informed decisions about sleep apnea.
                </p>
                <Link to="/upload">
                  <Button
                    size="lg"
                    className="bg-sleep-purple hover:bg-sleep-light-purple text-white"
                  >
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
