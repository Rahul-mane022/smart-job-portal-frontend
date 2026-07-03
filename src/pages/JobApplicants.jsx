import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function JobApplicants() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {
    try {
      const response = await api.get(`/applications/job/${jobId}`);
      setApplicants(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load applicants.");
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      toast.loading("Updating status...", { id: "status-update" });
      await api.put(`/applications/${applicationId}/status?status=${newStatus}`);
      toast.success(`Status updated to ${newStatus}!`, { id: "status-update" });
      
      setApplicants(applicants.map(app => 
        (app.id === applicationId || app._id === applicationId) ? { ...app, status: newStatus } : app
      ));
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status", { id: "status-update" });
    }
  };

  return (
    <div className="bg-[#f3f2ef] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="mb-6">
          <Link to="/recruiter-dashboard" className="text-blue-600 hover:underline font-medium mb-4 inline-block">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Job Applicants</h1>
          <p className="text-gray-500">Manage candidates who applied for this job.</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 mt-10 text-lg">Loading applicants...</p>
        ) : applicants.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Applicants Yet</h2>
            <p className="text-gray-500">Candidates haven't applied to this job yet.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold">Candidate Email</th>
                  <th className="p-4 font-semibold">Current Status</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {applicants.map((app) => (
                  <tr key={app.id || app._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 font-medium text-gray-900">{app.candidateEmail}</td>
                    
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'SELECTED' ? 'bg-green-100 text-green-800' :
                        app.status === 'SHORTLISTED' ? 'bg-purple-100 text-purple-800' :
                        app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        app.status === 'INTERVIEW' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    
                    <td className="p-4 text-center space-x-2">
                      <button onClick={() => handleStatusUpdate(app.id || app._id, 'SHORTLISTED')} className="bg-purple-50 text-purple-600 border border-purple-200 px-3 py-1 rounded hover:bg-purple-100 text-sm font-medium transition">
                        Shortlist
                      </button>
                      <button onClick={() => handleStatusUpdate(app.id || app._id, 'SELECTED')} className="bg-green-50 text-green-600 border border-green-200 px-3 py-1 rounded hover:bg-green-100 text-sm font-medium transition">
                        Select
                      </button>
                      <button onClick={() => handleStatusUpdate(app.id || app._id, 'REJECTED')} className="bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded hover:bg-red-100 text-sm font-medium transition">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default JobApplicants;