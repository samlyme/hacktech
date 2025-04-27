import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UploadForm from "@/components/UploadForm";
import { CloudMoon } from "lucide-react";

const Upload = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-sleep-purple/20 flex items-center justify-center">
                  <CloudMoon className="h-8 w-8 text-sleep-purple" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Upload Your Sleep Recording
              </h1>
              <p className="text-white/70">
                Upload your audio recording of your sleep to get detailed
                analysis and insights
              </p>
            </div>

            <UploadForm />

            <div className="mt-10 p-6 bg-sleep-charcoal/70 backdrop-blur-sm rounded-lg border border-sleep-purple/20">
              <h3 className="text-xl font-semibold text-white mb-4">
                Recording Tips
              </h3>

              <ul className="space-y-3 text-white/80">
                <li className="flex items-start">
                  <span className="text-sleep-purple mr-2">•</span>
                  <span>
                    Place your recording device near your bed, but not too close
                    to avoid capturing breathing sounds directly.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-sleep-purple mr-2">•</span>
                  <span>
                    Record in a quiet environment with minimal background noise
                    for best results.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-sleep-purple mr-2">•</span>
                  <span>
                    Ensure your recording covers your entire sleep session for
                    most accurate analysis.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-sleep-purple mr-2">•</span>
                  <span>Supported formats include MP3, WAV, MP4, and AAC.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Upload;
