import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function PostJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    skills: ""
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    
    if (!email) {
      toast.error("Please login as a recruiter to post jobs.");
      return;
    }

    try {
      setLoading(true);
      
      const skillsArray = jobData.skills.split(",").map(skill => skill.trim());
      
      const payload = { ...jobData, skills: skillsArray };

      await api.post(`/jobs?email=${email}`, payload);
      
      toast.success("Job Posted Successfully! 🎉");
      setLoading(false);
      navigate("/recruiter-dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to post job.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f3f2ef] min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
          <p className="text-gray-500 mb-8">Fill in the details to find the best candidates.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input required type="text" name="title" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Java Developer" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input required type="text" name="company" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. ABC Pvt Ltd" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input required type="text" name="location" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Pune, Remote" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                <input required type="text" name="salary" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 6 LPA or 50,000/month" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills (Comma separated)</label>
              <input required type="text" name="skills" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Java, Spring Boot, MySQL" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
              <textarea required name="description" rows="5" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Describe the responsibilities and requirements..."></textarea>
            </div>

            <button type="submit" disabled={loading} className={`w-full py-3 rounded-full font-bold text-lg text-white transition ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}>
              {loading ? "Posting..." : "Post Job"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostJob;