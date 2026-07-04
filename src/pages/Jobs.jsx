import { useState, useEffect } from "react"; 
import { Search, MapPin } from "lucide-react"; 
import api from "../services/api"; 
import toast from "react-hot-toast"; 
import { useNavigate } from "react-router-dom"; 

function Jobs() {   
  const [jobs, setJobs] = useState([]);   
  const [loading, setLoading] = useState(true);   
  const navigate = useNavigate(); 

  useEffect(() => {     
    fetchJobs();   
  }, []);   

  const fetchJobs = async () => {     
    try {       
      const response = await api.get("/jobs");        
      setJobs(response.data);       
      setLoading(false);     
    } catch (error) {       
      console.error("Error fetching jobs", error);       
      toast.error("Failed to load jobs");       
      setLoading(false);     
    }   
  };   

  return (     
    <div className="bg-[#f8f9fa] min-h-screen">       
      <div className="bg-white border-b border-gray-200 py-16 px-4">         
        <div className="max-w-5xl mx-auto text-center">           
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">             
            Find your <span className="text-blue-600">next dream job</span>           
          </h1>                      
          <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-200 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto">             
            <div className="flex-1 flex items-center px-4 border-r border-gray-100">               
              <Search className="text-gray-400 mr-2" size={20} />               
              <input className="w-full py-3 outline-none" placeholder="Job title or keywords" />             
            </div>             
            <div className="flex-1 flex items-center px-4">               
              <MapPin className="text-gray-400 mr-2" size={20} />               
              <input className="w-full py-3 outline-none" placeholder="City or Remote" />             
            </div>             
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">               
              Search             
            </button>           
          </div>         
        </div>       
      </div>       
      <div className="max-w-5xl mx-auto px-4 py-12">         
        <div className="flex justify-between items-center mb-8">           
          <h2 className="text-2xl font-bold text-gray-900">Recommended Jobs</h2>           
          <select className="bg-white border border-gray-300 px-4 py-2 rounded-lg outline-none">             
            <option>Latest Jobs</option>             
            <option>Salary: High to Low</option>           
          </select>         
        </div>         
        <div className="space-y-6">           
          {loading ? (             
            <div className="text-center py-10 text-gray-500 font-medium">Loading jobs...</div>           
          ) : jobs && jobs.length > 0 ? (             
            jobs.map((job) => (               
              <div key={job.id || job._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-between">                 
                <div className="flex items-center gap-4">                   
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-600">                     
                    {job.company ? job.company.substring(0, 2).toUpperCase() : 'SJ'}                   
                  </div>                   
                  <div>                     
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>                     
                    <p className="text-gray-500 text-sm">{job.company} • {job.location} • {job.salary}</p>                     
                    <div className="flex gap-2 mt-2">                       
                      {job.skills && job.skills.map((skill, index) => (                         
                        <span key={index} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-medium">                           
                          {skill}                         
                        </span>                       
                      ))}                     
                    </div>                   
                  </div>                 
                </div>                 
                
                <button 
                  onClick={() => navigate(`/jobs/${job.id || job._id}`)} 
                  className="border border-blue-600 text-blue-600 px-6 py-2 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition">                   
                  View & Apply                 
                </button>               
              </div>             
            ))           
          ) : (             
            <div className="text-center py-10 text-gray-500 font-medium bg-white rounded-2xl border border-gray-100">               
              No jobs available right now.             
            </div>           
          )}         
        </div>       
      </div>     
    </div>   
  ); 
}
export default Jobs;