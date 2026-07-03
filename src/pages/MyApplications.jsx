import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (email) {
      fetchApplications();
    } else {
      toast.error("Please login to view your applications.");
      setLoading(false);
    }
  }, [email]);

  const fetchApplications = async () => {
    try {
      const response = await api.get(`/applications/my?email=${email}`);
      setApplications(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load your applications.");
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'SELECTED':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold shadow-sm">🎉 Selected</span>;
      case 'SHORTLISTED':
        return <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-bold shadow-sm">✨ Shortlisted</span>;
      case 'REJECTED':
        return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold shadow-sm">❌ Rejected</span>;
      case 'INTERVIEW':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold shadow-sm">📅 Interview</span>;
      default:

        return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold shadow-sm">⏳ Applied</span>;
    }
  };

  return (
    <div className="bg-[#f3f2ef] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Applications</h1>

        {loading ? (
          <p className="text-center text-gray-500 text-lg mt-10">Loading your applications...</p>
        ) : applications.length === 0 ? (
          
          /* Empty State UI */
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm mt-6">
            <div className="text-5xl mb-4">📂</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Applications Yet</h2>
            <p className="text-gray-500 mb-6">You haven't applied to any jobs. Find your dream job and apply today!</p>
            <Link 
              to="/" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-sm"
            >
              Browse Jobs
            </Link>
          </div>

        ) : (
          
          /* Applications List */
          <div className="flex flex-col gap-4">
            {applications.map((app) => (
              <div 
                key={app.id || app._id} 
                className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Job ID: <span className="text-blue-600">#{app.jobId.slice(-6).toUpperCase()}</span>
                  </h2>
                  <p className="text-gray-500 text-sm mb-4">
                    Applied by: <span className="font-medium text-gray-700">{app.candidateEmail}</span>
                  </p>
                  
                  {/* Status Badge */}
                  <div className="inline-block mt-1">
                    {getStatusBadge(app.status)}
                  </div>
                </div>
                
                <div className="w-full md:w-auto text-right mt-2 md:mt-0">
                  <Link
                    to={`/jobs/${app.jobId}`}
                    className="inline-block bg-white text-blue-600 border border-blue-600 px-5 py-2 rounded-full font-semibold hover:bg-blue-50 transition w-full md:w-auto text-center"
                  >
                    View Job Post
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
        )}
      </div>
    </div>
  );
}

export default MyApplications;