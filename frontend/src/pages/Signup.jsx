import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      alert(res.data.message || "Signup successful");
      setName("");
      setEmail("");
      setPassword("");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.container}>
      {/* Background orbs */}
      <div style={s.orb1}></div>
      <div style={s.orb2}></div>

      <div style={s.card}>
        <div style={s.cardGlow}></div>

        {/* Header */}
        <div style={s.header}>
          <div style={s.iconWrap}>✨</div>
          <h1 style={s.title}>Create Account</h1>
          <p style={s.subtitle}>Start your interview journey today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} style={s.form}>
          
          {/* Name */}
          <div style={s.fieldGroup}>
            <label style={s.label}>Full Name</label>
            <div
              style={{
                ...s.inputWrap,
                boxShadow:
                  focusedField === "name"
                    ? "0 0 0 3px rgba(102,126,234,0.25)"
                    : "none",
                borderColor:
                  focusedField === "name" ? "#667eea" : "#e5e7eb",
              }}
            >
              <span style={s.inputIcon}>👤</span>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                style={s.input}
              />
            </div>
          </div>

          {/* Email */}
          <div style={s.fieldGroup}>
            <label style={s.label}>Email Address</label>
            <div
              style={{
                ...s.inputWrap,
                boxShadow:
                  focusedField === "email"
                    ? "0 0 0 3px rgba(102,126,234,0.25)"
                    : "none",
                borderColor:
                  focusedField === "email" ? "#667eea" : "#e5e7eb",
              }}
            >
              <span style={s.inputIcon}>✉️</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                style={s.input}
              />
            </div>
          </div>

          {/* Password */}
          <div style={s.fieldGroup}>
            <label style={s.label}>Password</label>
            <div
              style={{
                ...s.inputWrap,
                boxShadow:
                  focusedField === "password"
                    ? "0 0 0 3px rgba(102,126,234,0.25)"
                    : "none",
                borderColor:
                  focusedField === "password"
                    ? "#667eea"
                    : "#e5e7eb",
              }}
            >
              <span style={s.inputIcon}>🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                style={{ ...s.input, paddingRight: "44px" }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={s.eyeToggle}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...s.submitBtn,
              opacity: loading ? 0.8 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating..." : "Create Account →"}
          </button>
        </form>

        {/* Footer */}
        <p style={s.footerText}>
          Already have an account?{" "}
          <span style={s.link} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

const s = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
    padding: "24px",
    position: "relative",
    overflow: "hidden",
  },
  orb1: {
    position: "fixed",
    width: "500px",
    height: "500px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
    borderRadius: "50%",
    top: "-200px",
    right: "-100px",
  },
  orb2: {
    position: "fixed",
    width: "400px",
    height: "400px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
    borderRadius: "50%",
    bottom: "-150px",
    left: "-100px",
  },
  card: {
    background: "rgba(255,255,255,0.97)",
    borderRadius: "24px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "440px",
    boxShadow: "0 40px 80px rgba(0,0,0,0.2)",
  },
  cardGlow: {
    height: "4px",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    borderRadius: "24px 24px 0 0",
    marginBottom: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  iconWrap: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "800",
  },
  subtitle: {
    fontSize: "14px",
    color: "#888",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    background: "#fafafa",
  },
  inputIcon: {
    padding: "0 12px",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    padding: "12px 0",
  },
  eyeToggle: {
    padding: "0 14px",
    cursor: "pointer",
  },
  submitBtn: {
    padding: "15px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
  },
  footerText: {
    textAlign: "center",
    marginTop: "20px",
  },
  link: {
    color: "#667eea",
    cursor: "pointer",
  },
};

export default Signup;