import { BrowserRouter, Routes, Route }
from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import ResumeUpload from "./pages/ResumeUpload";
import RecommendedJobs from "./pages/RecommendedJobs";
import PostJob from "./pages/PostJob";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import JobApplicants from "./pages/JobApplicants";
import AdminDashboard from "./pages/AdminDashboard";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

      <Route path="/" element={<Jobs />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

       <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>}
        />

        <Route
        path="/jobs/:id"
        element={<JobDetails />}
        />

        <Route
         path="/applications"
         element={<MyApplications />}
        />

        <Route
        path="/resume"
        element={<ResumeUpload />}
/>
        <Route path="/recommended-jobs" element={<RecommendedJobs />} />

        <Route path="/post-job" element={<PostJob />} />
<Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
<Route path="/job-applicants/:jobId" element={<JobApplicants />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;