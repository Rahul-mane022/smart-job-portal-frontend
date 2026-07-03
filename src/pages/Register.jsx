import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CANDIDATE");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role 
      });

      toast.success("Registration Successful! 🎉 Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed. Email might already exist.");
    }
  };

  return (
    <div className="bg-[#f3f2ef] min-h-screen flex justify-center items-center py-10">
      <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm w-full max-w-md">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create an Account</h2>
          <p className="text-gray-500 text-sm mt-1">Join Smart Job Portal today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input required type="text" placeholder="e.g. Rahul Mane" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input required type="email" placeholder="rahul@gmail.com" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input required type="password" placeholder="••••••••" className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {/* 🎯 Role Selection Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 bg-white"
            >
              <option value="CANDIDATE">Candidate (Looking for jobs)</option>
              <option value="RECRUITER">Recruiter (Hiring talent)</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-full hover:bg-blue-700 transition mt-2">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;