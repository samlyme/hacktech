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
      quality: 82,
    },
    {
      id: "rec2",
      title: "Nap After Work",
      date: "April 24, 2025",
      duration: 1.5,
      quality: 68,
    },
    {
      id: "rec3",
      title: "Night with Storm",
      date: "April 23, 2025",
      duration: 6.8,
      quality: 62,
    },
    {
      id: "rec4",
      title: "Regular Night",
      date: "April 22, 2025",
      duration: 8.1,
      quality: 91,
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

  const sleepDurationData = [
    { time: "Apr 19", value: 6.9 },
    { time: "Apr 20", value: 7.5 },
    { time: "Apr 21", value: 7.8 },
    { time: "Apr 22", value: 8.1 },
    { time: "Apr 23", value: 6.8 },
    { time: "Apr 24", value: 1.5 },
    { time: "Apr 25", value: 7.2 },
  ];

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
              data={sleepQualityData}
              title="Sleep Quality Trend"
              color="#9b87f5"
            />
            <AnalysisChart
              data={sleepDurationData}
              title="Sleep Duration (hours)"
              color="#33C3F0"
            />
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
                  quality={recording.quality}
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
