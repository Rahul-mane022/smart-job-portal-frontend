import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const uploadResume = async () => {
    if (!file) {
      toast.error("Please select a PDF file first.");
      return;
    }

    const email = localStorage.getItem("email");
    if (!email) {
      toast.error("Please login to upload your resume.");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {
      setLoading(true);
      toast.loading("Uploading to secure cloud...", { id: "upload-toast" });
      
      // 1. Upload to Cloudinary
      await api.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.loading("Analyzing skills with AI...", { id: "upload-toast" });

      // 2. AI Analysis
      const analyzeData = new FormData();
      analyzeData.append("file", file);
      
      const aiResponse = await api.post("/ai/analyze", analyzeData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Resume Analyzed Successfully! 🎉", { id: "upload-toast" });
      setSkills(aiResponse.data || []); 
      setLoading(false);

    } catch (error) {
      console.error(error);
      toast.error("Upload or Analysis Failed", { id: "upload-toast" });
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f3f2ef] min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Main Upload Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            📄
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Resume Analysis</h1>
          <p className="text-gray-500 mb-8">Upload your resume to instantly extract skills and get AI-powered job matches.</p>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 mb-6 bg-gray-50 hover:bg-gray-100 transition cursor-pointer relative">
            <input
              type="file"
              accept=".pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file ? (
              <div className="text-blue-600 font-semibold text-lg">
                📎 {file.name}
              </div>
            ) : (
              <div className="text-gray-500">
                <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop<br/>
                PDF up to 5MB
              </div>
            )}
          </div>

          <button
            onClick={uploadResume}
            disabled={loading || !file}
            className={`w-full md:w-auto px-8 py-3 rounded-full font-bold text-lg transition shadow-sm ${
              loading || !file
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
            }`}
          >
            {loading ? "Processing with AI..." : "Upload & Analyze"}
          </button>
        </div>

        {/* AI Extracted Skills Result */}
        {skills.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🎯</span> AI Extracted Skills
            </h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map((skill, index) => (
                <span key={index} className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                  ✓ {skill}
                </span>
              ))}
            </div>

            <button
              onClick={() => navigate("/recommended-jobs")}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              Find Matching Jobs 🚀
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default ResumeUpload;