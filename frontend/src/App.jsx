import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Interview from "./pages/Interview";
import Result from "./pages/Result";
import Coding from "./pages/Coding";
import Mcqs from "./pages/Mcqs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/result" element={<Result />} />
      <Route path="/coding" element={<Coding />} />
      <Route path="/mcqs" element={<Mcqs />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
