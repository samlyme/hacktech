import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import SleepRecordingCard from "@/components/SleepRecordingCard";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import AnalysisChart from "@/components/AnalysisChart";
import StarryBackgroundSimple from "@/components/StarryBackgroundSimple";
import { getRecordingsRecordingsGet } from "@/client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { token } = useAuth()
  console.log("token", token);

  // Sample data for recordings
  const [data, setData] = useState<any>([]); // Store fetched data
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track errors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRecordingsRecordingsGet({
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); // Change URL as needed
        console.log("received", response);
        setData(response.data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [])

  // Sample data for charts
  const sleepQualityData = [37, 36, 36, 36, 36, 36, 36, 36, 36, 33];
  // if (loading) return <div>Loading...</div>;
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
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <AnalysisChart
              data={sleepQualityData}
              title="Sleep Quality Trend"
              color="#9b87f5"
            />
          </div>

          {/* Recordings Section */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Recent Recordings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.map((recording) => (
                // console.log(recording)

                <SleepRecordingCard key={recording.id} id={recording.id}
                  title={recording.name}
                  date={recording.created_at}
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
