import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role"); 

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="bg-blue-600 text-white font-bold text-xl px-2 py-1 rounded">SJ</div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Smart Job Portal</span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition">Find Jobs</Link>
            
            {email && role === "CANDIDATE" && (
              <>
                <Link to="/applications" className="text-gray-600 hover:text-blue-600 font-medium transition">My Applications</Link>
                <Link to="/resume" className="text-gray-600 hover:text-blue-600 font-medium transition">AI Resume Match</Link>
              </>
            )}

            {email && role === "RECRUITER" && (
              <>
                <Link to="/recruiter-dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition">Dashboard</Link>
                <Link to="/post-job" className="text-gray-600 hover:text-blue-600 font-medium transition">Post Job</Link>
              </>
            )}

            {email && role === "ADMIN" && (
              <>
                <Link to="/admin-dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition">Admin Panel</Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {email ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 font-medium hidden md:block">
                  Hi, {email.split("@")[0]} <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded ml-1">{role}</span>
                </span>
                <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 font-medium transition">Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-blue-600 font-medium hover:underline">Sign In</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition">Register</Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;