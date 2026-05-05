import React, { useState } from "react";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ show, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      setEmail("");
      setPassword("");
      onClose();
      setTimeout(() => navigate("/dashboard"), 100);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap');
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(-24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Overlay */}
      <div style={s.overlay} onClick={onClose}>
        {/* Modal */}
        <div style={s.modal} onClick={(e) => e.stopPropagation()}>
          {/* Top accent bar */}
          <div style={s.accentBar}></div>

          {/* Header */}
          <div style={s.header}>
            <span style={s.headerIcon}>🚀</span>
            <h2 style={s.title}>Welcome Back</h2>
            <p style={s.subtitle}>Sign in to continue your journey</p>
          </div>

          {/* Email Field */}
          <div style={s.fieldGroup}>
            <label style={s.label}>Email Address</label>
            <div
              style={{
                ...s.inputWrap,
                borderColor: focusedField === "email" ? "#667eea" : "#e5e7eb",
                boxShadow:
                  focusedField === "email"
                    ? "0 0 0 3px rgba(102,126,234,0.2)"
                    : "none",
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

          {/* Password Field */}
          <div style={s.fieldGroup}>
            <label style={s.label}>Password</label>
            <div
              style={{
                ...s.inputWrap,
                borderColor:
                  focusedField === "password" ? "#667eea" : "#e5e7eb",
                boxShadow:
                  focusedField === "password"
                    ? "0 0 0 3px rgba(102,126,234,0.2)"
                    : "none",
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
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              ...s.loginBtn,
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
            {loading ? "Signing in..." : "Sign In →"}
          </button>

          <button
            onClick={onClose}
            style={s.closeBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f3f4f6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

const s = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1100,
    animation: "overlayIn 0.25s ease-out",
    fontFamily: "'Inter', sans-serif",
  },
  modal: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "40px 36px 32px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 40px 80px rgba(0,0,0,0.25)",
    zIndex: 1200,
    position: "relative",
    overflow: "hidden",
    animation: "modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both",
  },
  accentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
  },
  header: {
    textAlign: "center",
    marginBottom: "28px",
  },
  headerIcon: {
    fontSize: "36px",
    display: "block",
    marginBottom: "12px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#1a1a2e",
    margin: "0 0 6px",
    fontFamily: "'Space Grotesk', sans-serif",
  },
  subtitle: {
    fontSize: "13px",
    color: "#9ca3af",
    margin: 0,
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "16px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#374151",
    letterSpacing: "0.3px",
    textTransform: "uppercase",
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    background: "#fafafa",
    transition: "all 0.2s ease",
    overflow: "hidden",
  },
  inputIcon: {
    fontSize: "15px",
    padding: "0 11px",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "14px",
    color: "#1a1a2e",
    padding: "12px 0",
    fontFamily: "'Inter', sans-serif",
  },
  eyeToggle: {
    padding: "0 14px",
    cursor: "pointer",
    color: "#667eea",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
  },
  loginBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    boxShadow: "0 10px 30px rgba(102,126,234,0.3)",
    marginTop: "8px",
    letterSpacing: "0.3px",
  },
  closeBtn: {
    width: "100%",
    padding: "12px",
    background: "transparent",
    color: "#9ca3af",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginTop: "10px",
  },
};

export default LoginModal;
