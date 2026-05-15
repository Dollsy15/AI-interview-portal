import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setEmail("");
      setPassword("");
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
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
          <div style={s.iconWrap}>🚀</div>
          <h1 style={s.title}>Welcome Back</h1>
          <p style={s.subtitle}>Sign in to continue your interview journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={s.form}>
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
                borderColor: focusedField === "email" ? "#667eea" : "#e5e7eb",
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
                  focusedField === "password" ? "#667eea" : "#e5e7eb",
              }}
            >
              <span style={s.inputIcon}>🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(102,126,234,0.45)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(102,126,234,0.3)";
            }}
          >
            {loading ? <span>Signing in...</span> : <span>Sign In →</span>}
          </button>
        </form>

        {/* Footer */}
        <p style={s.footerText}>
          Don't have an account?{" "}
          <span style={s.link} onClick={() => navigate("/signup")}>
            Sign up free
          </span>
        </p>
      </div>

      <style>{`
        :root {
          --bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --bg-card: #ffffff;
          --text-primary: #000000;
          --text-secondary: #666666;
          --border-color: #e5e7eb;
        }

        :root[data-theme="dark"] {
          --bg-gradient: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          --bg-card: #1f2937;
          --text-primary: #000000;
          --text-secondary: #9ca3af;
          --border-color: #374151;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatOrb {
          0% { transform: translate(0,0); }
          50% { transform: translate(40px, -40px); }
          100% { transform: translate(0,0); }
        }
      `}</style>
    </div>
  );
};

const s = {
  container: {
    minHeight: "100vh",
    background: "var(--bg-gradient)",
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
    animation: "floatOrb 30s ease-in-out infinite",
    pointerEvents: "none",
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
    animation: "floatOrb 35s ease-in-out infinite reverse",
    pointerEvents: "none",
  },
  card: {
    background: "var(--bg-card)",
    borderRadius: "24px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "440px",
    boxShadow: "0 40px 80px rgba(0,0,0,0.2)",
    position: "relative",
    overflow: "hidden",
    animation: "fadeUp 0.7s ease-out both",
  },
  cardGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    borderRadius: "24px 24px 0 0",
  },
  header: {
    textAlign: "center",
    marginBottom: "36px",
  },
  iconWrap: {
    fontSize: "40px",
    marginBottom: "16px",
    display: "block",
  },
  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "var(--text-primary)",
    margin: "0 0 8px",
    fontFamily: "'Space Grotesk', sans-serif",
  },
  subtitle: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    margin: 0,
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
    color: "var(--text-secondary)",
    letterSpacing: "0.3px",
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    border: "1.5px solid var(--border-color)",
    borderRadius: "10px",
    background: "transparent",
    transition: "all 0.2s ease",
    overflow: "hidden",
  },
  inputIcon: {
    fontSize: "16px",
    padding: "0 12px",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "15px",
    color: "#000000",
    padding: "13px 0",
    fontFamily: "'Inter', sans-serif",
  },
  eyeToggle: {
    padding: "0 14px",
    cursor: "pointer",
    fontSize: "18px",
    flexShrink: 0,
    userSelect: "none",
  },
  submitBtn: {
    marginTop: "8px",
    padding: "15px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    boxShadow: "0 10px 30px rgba(102,126,234,0.3)",
    letterSpacing: "0.3px",
  },
  footerText: {
    textAlign: "center",
    fontSize: "14px",
    color: "var(--text-secondary)",
    margin: "28px 0 0",
  },
  link: {
    color: "#667eea",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Login;