import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import SleepRecordingCard from "@/components/SleepRecordingCard";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import AnalysisChart from "@/components/AnalysisChart";
import StarryBackgroundSimple from "@/components/StarryBackgroundSimple";

const Dashboard = () => {
  // Sample data for recordings
  const recordings = [
    {
      id: "rec1",
      title: "Last Night's Sleep",
      date: "April 25, 2025",
      duration: 7.2,
      AHI: 99,
    },
    {
      id: "rec2",
      title: "Nap After Work",
      date: "April 24, 2025",
      duration: 1.5,
      AHI: 82,
    },
    {
      id: "rec3",
      title: "Night with CPAP",
      date: "April 23, 2025",
      duration: 6.8,
      AHI: 14,
    },
    {
      id: "rec4",
      title: "Regular Night",
      date: "April 22, 2025",
      duration: 8.1,
      AHI: 68,
    },
  ];

  // Sample data for charts
  const sleepQualityData = [
    { time: "Apr 19", value: 78 },
    { time: "Apr 20", value: 85 },
    { time: "Apr 21", value: 89 },
    { time: "Apr 22", value: 91 },
    { time: "Apr 23", value: 62 },
    { time: "Apr 24", value: 68 },
    { time: "Apr 25", value: 82 },
  ];

  // Data at a Glance for the most recent data
  const snoringEvents = 71;
  const breathEvents = 421;
  const totalEvents = snoringEvents + breathEvents;
  const duration = 4.97;
  const eventsPerHour = (totalEvents / duration).toFixed(1);
  const getAHISeverity = (eventsPerHour) => {
    const eph = parseFloat(eventsPerHour);
    if (eph < 5) return "Normal";
    if (eph < 15) return "Mild";
    if (eph < 30) return "Moderate";
    return "Severe";
  };
  const severity = getAHISeverity(eventsPerHour);

  return (
    <div className="min-h-screen flex flex-col">
      <StarryBackgroundSimple />
      <Navbar />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-10 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Sleep Dashboard
              </h1>
              <p className="text-white/70">
                Track and analyze your sleep recordings
              </p>
            </div>

            <Link to="/upload">
              <Button className="bg-sleep-purple hover:bg-sleep-light-purple text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Recording
              </Button>
            </Link>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <AnalysisChart
              key="dashboard-mic"
              type="mic"
              title="Overall Noise Level"
              color="#9b87f5"
            />
            {/* Data at a Glance Card */}
            <div className="bg-sleep-charcoal border-sleep-purple/20 rounded-lg p-6 flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-white mb-4">Data at a Glance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sleep-purple text-sm font-medium mb-1">Snoring Events</div>
                  <div className="text-white text-2xl font-bold">{snoringEvents}</div>
                </div>
                <div>
                  <div className="text-sleep-purple text-sm font-medium mb-1">Obstructed Breath Events</div>
                  <div className="text-white text-2xl font-bold">{breathEvents}</div>
                </div>
                <div>
                  <div className="text-sleep-purple text-sm font-medium mb-1">Events/Hour</div>
                  <div className="text-white text-2xl font-bold">{eventsPerHour}</div>
                </div>
                <div>
                  <div className="text-sleep-purple text-sm font-medium mb-1">AHI</div>
                  <div className="text-white text-2xl font-bold">{severity}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recordings Section */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Recent Recordings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recordings.map((recording) => (
                <SleepRecordingCard
                  key={recording.id}
                  id={recording.id}
                  title={recording.title}
                  date={recording.date}
                  duration={recording.duration}
                  AHI={recording.AHI}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
