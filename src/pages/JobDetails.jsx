import { useEffect, useState } from "react"; 
import { useParams, useNavigate, Link } from "react-router-dom"; 
import api from "../services/api"; 
import toast from "react-hot-toast"; 

function JobDetails() {   
  const { id } = useParams();   
  const navigate = useNavigate();   
  const [job, setJob] = useState(null);   
  const [loading, setLoading] = useState(true);   
  const [applying, setApplying] = useState(false);   

  useEffect(() => {     
    fetchJob();   
  }, [id]);   

  const fetchJob = async () => {     
    try {       
      const response = await api.get(`/jobs/${id}`);       
      setJob(response.data);       
      setLoading(false);     
    } catch (error) {       
      console.error(error);       
      toast.error("Failed to load job details.");       
      setLoading(false);     
    }   
  };   

  const applyJob = async () => {     
    const email = localStorage.getItem("email");          
    const token = localStorage.getItem("token"); // 🟢 १. लोकल स्टोरेजमधून टोकन घेतले

    if (!email) {       
      toast.error("Please login to apply for this job.");       
      navigate("/login");       
      return;     
    }     
    
    try {       
      setApplying(true);       
      
      // 🟢 २. API कॉल करताना टोकन Headers मध्ये पाठवले (मधला {} म्हणजे रिकामी बॉडी)
      await api.post(`/applications/apply/${id}?email=${email}`, {}, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });       
      
      toast.success("Applied Successfully!");        
      setApplying(false);            
    } catch (error) {       
      console.error(error);       
      toast.error("Application Failed. You might have already applied.");       
      setApplying(false);     
    }   
  };   

  if (loading) {     
    return (       
      <div className="bg-[#f3f2ef] min-h-screen flex justify-center items-center">         
        <p className="text-xl text-gray-500 font-medium">Loading job details...</p>       
      </div>     
    );   
  } // 🟢 कंस पूर्ण केला

  if (!job) {     
    return (       
      <div className="bg-[#f3f2ef] min-h-screen flex flex-col justify-center items-center">         
        <h2 className="text-2xl text-red-500 font-bold mb-4">Job Not Found</h2>         
        <Link to="/" className="text-blue-600 hover:underline">Go back to Jobs</Link>       
      </div>     
    );   
  } // 🟢 कंस पूर्ण केला

  return (     
    <div className="bg-[#f3f2ef] min-h-screen py-8">       
      <div className="max-w-4xl mx-auto px-4 sm:px-6">                  
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block font-medium">           
          &larr; Back to all jobs         
        </Link>         
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8 mb-6">           
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">             
            <div>               
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>               
              <p className="text-xl text-gray-700 font-medium mb-3">{job.company}</p>                              
              <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm font-medium">                 
                <span className="flex items-center gap-1"> {job.location}</span>                 
                <span className="flex items-center gap-1"> {job.salary}</span>                 
                <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded">                   
                  Actively Recruiting                 
                </span>               
              </div>             
            </div>             
            <button               
              onClick={applyJob}               
              disabled={applying}               
              className={`w-full md:w-auto px-8 py-3 rounded-full font-bold text-lg transition shadow-sm ${                 
                applying                    
                  ? "bg-gray-400 text-white cursor-not-allowed"                    
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"               
              }`}             
            >               
              {applying ? "Applying..." : "Apply Now"}             
            </button>           
          </div>         
        </div>         
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8">           
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Skills Required</h2>           
          <div className="flex flex-wrap gap-2 mb-8">             
            {job.skills && job.skills.map((skill, index) => (               
              <span key={index} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium border border-blue-100">                 
                {skill}               
              </span>             
            ))}           
          </div>           
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Job Description</h2>           
          <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">             
            {job.description}           
          </div>         
        </div>       
      </div>     
    </div>   
  ); 
}
export default JobDetails;