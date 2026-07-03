import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data;
      const decodedToken = jwtDecode(token);
      
      localStorage.setItem("token", token);
      localStorage.setItem("email", decodedToken.sub || email);
      localStorage.setItem("role", decodedToken.role);

      toast.success("Welcome back! 🎉");
      
      if (decodedToken.role === "ADMIN") navigate("/admin-dashboard");
      else if (decodedToken.role === "RECRUITER") navigate("/recruiter-dashboard");
      else navigate("/");
    } catch (error) {
      toast.error("Invalid email or password!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500">Sign in to Smart Job Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
            <input 
              required type="email" 
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none transition" 
              placeholder="name@company.com" 
              value={email} onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          {/* Password Field with Toggle */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
            <input 
              required type={showPassword ? "text" : "password"} 
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition" 
              placeholder="••••••••" 
              value={password} onChange={(e) => setPassword(e.target.value)} 
            />
            <button 
              type="button" 
              className="absolute right-3 top-10 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="text-sm text-blue-600 font-semibold hover:underline">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button 
            type="submit" disabled={loading} 
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-sm text-gray-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google Login */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700">
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          New here? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;