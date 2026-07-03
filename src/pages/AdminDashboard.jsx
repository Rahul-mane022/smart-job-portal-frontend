import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, jobs: 0, applications: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") {
      toast.error("Access Denied! Only Admins can view this page.");
      navigate("/"); 
      return;
    }
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const response = await api.get("/admin/stats");
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stats", error);
      toast.error("Failed to load admin stats");
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-gray-500 font-medium text-lg">Loading Admin Controls...</div>;
  }

  return (
    <div className="bg-[#f3f2ef] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel 👑</h1>
          <p className="text-gray-500 mt-1 text-lg">Monitor overall platform statistics and activities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex items-center gap-5 hover:shadow-md transition">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex justify-center items-center text-3xl">
              👥
            </div>
            <div>
              <h3 className="text-gray-500 font-medium mb-1">Total Users</h3>
              <p className="text-4xl font-extrabold text-gray-900">{stats.users}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex items-center gap-5 hover:shadow-md transition">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex justify-center items-center text-3xl">
              💼
            </div>
            <div>
              <h3 className="text-gray-500 font-medium mb-1">Total Jobs</h3>
              <p className="text-4xl font-extrabold text-gray-900">{stats.jobs}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex items-center gap-5 hover:shadow-md transition">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex justify-center items-center text-3xl">
              📄
            </div>
            <div>
              <h3 className="text-gray-500 font-medium mb-1">Applications</h3>
              <p className="text-4xl font-extrabold text-gray-900">{stats.applications}</p>
            </div>
          </div>

        </div>

        <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
           <h2 className="text-xl font-bold text-gray-900 mb-2">Quick Actions</h2>
           <p className="text-gray-500 mb-6">Manage users and jobs from here.</p>
           
           <div className="flex flex-wrap gap-4">
             <button className="bg-red-50 text-red-600 border border-red-200 px-5 py-2.5 rounded-lg font-bold hover:bg-red-100 transition cursor-not-allowed opacity-70">
               🚫 Block User (Coming Soon)
             </button>
             <button className="bg-orange-50 text-orange-600 border border-orange-200 px-5 py-2.5 rounded-lg font-bold hover:bg-orange-100 transition cursor-not-allowed opacity-70">
               🗑️ Delete Job (Coming Soon)
             </button>
           </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;