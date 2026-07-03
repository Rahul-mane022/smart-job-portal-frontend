import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function RecommendedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (email) {
      fetchRecommendedJobs();
    } else {
      toast.error("Please login to see recommendations.");
      navigate("/login");
    }
  }, [email, navigate]);

  const fetchRecommendedJobs = async () => {
    try {
      const response = await api.get(`/ai/recommend?email=${email}`);
      setJobs(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching recommended jobs.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f3f2ef] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">🌟 AI Recommended Jobs</h1>
          <p className="text-lg text-gray-600">Jobs perfectly matched to your resume skills.</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin text-4xl mb-4">⚙️</div>
            <p className="text-xl text-gray-500 font-medium">AI is finding the best matches...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No perfect matches right now</h2>
            <p className="text-gray-500 mb-6">Try updating your resume with more skills or explore all jobs.</p>
            <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition">
              Explore All Jobs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div key={job.jobId} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                
                <div className="flex-1">
                  <Link to={`/jobs/${job.jobId}`}>
                    <h2 className="text-2xl font-bold text-blue-700 hover:underline mb-1">
                      {job.title}
                    </h2>
                  </Link>
                  <p className="text-gray-800 font-medium mb-4 text-lg">🏢 {job.company}</p>
                  
                  {/* AI Match Score UI */}
                  <div className="bg-purple-50 rounded-xl p-4 mb-4 border border-purple-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-purple-900 flex items-center gap-1">
                        🤖 AI Match Score
                      </span>
                      <span className="font-extrabold text-purple-700 text-lg">{job.matchScore}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full" 
                        style={{ width: `${job.matchScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/jobs/${job.jobId}`}
                  className="mt-4 block w-full bg-white text-blue-600 border-2 border-blue-600 py-2.5 rounded-full font-bold text-center hover:bg-blue-50 transition"
                >
                  View Details & Apply
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecommendedJobs;