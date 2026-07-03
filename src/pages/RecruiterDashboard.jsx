import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function RecruiterDashboard() {
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      toast.error("Please login to view dashboard.");
      navigate("/login");
      return;
    }
    fetchDashboardData();
  }, [email]);

  const fetchDashboardData = async () => {
    try {
      // 1. Fetch Analytics
      const statsRes = await api.get("/recruiter/analytics");
      setStats(statsRes.data);

      // 2. Fetch Jobs posted by this recruiter
      const jobsRes = await api.get(`/recruiter/jobs?email=${email}`);
      setJobs(jobsRes.data);
      
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard data.");
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-20 text-xl font-medium text-gray-500">Loading Dashboard...</div>;

  return (
    <div className="bg-[#f3f2ef] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
          <Link to="/post-job" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition shadow-sm">
            + Post New Job
          </Link>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <h3 className="text-gray-500 font-medium mb-1">Total Jobs</h3>
            <p className="text-3xl font-bold text-blue-600">{stats?.totalJobs || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <h3 className="text-gray-500 font-medium mb-1">Applications</h3>
            <p className="text-3xl font-bold text-purple-600">{stats?.totalApplications || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <h3 className="text-gray-500 font-medium mb-1">Shortlisted</h3>
            <p className="text-3xl font-bold text-yellow-500">{stats?.shortlisted || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <h3 className="text-gray-500 font-medium mb-1">Selected</h3>
            <p className="text-3xl font-bold text-green-500">{stats?.selected || 0}</p>
          </div>
        </div>

        {/* Posted Jobs List */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Posted Jobs</h2>
        
        {jobs.length === 0 ? (
          <div className="bg-white p-10 rounded-xl text-center border border-gray-200 shadow-sm">
            <p className="text-gray-500 mb-4">You haven't posted any jobs yet.</p>
            <Link to="/post-job" className="text-blue-600 font-bold hover:underline">Post your first job</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <div key={job.id} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                <p className="text-gray-500 text-sm mb-4">📍 {job.location} | 💰 {job.salary}</p>
                <div className="mt-auto pt-4 border-t border-gray-100 text-right">
             <Link to={`/job-applicants/${job.id || job._id}`} className="text-blue-600 font-semibold cursor-pointer hover:underline text-sm block">
  View Applicants &rarr;
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

export default RecruiterDashboard;