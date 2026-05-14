import React, { useState, useEffect } from "react";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

const Landing = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = " Intelligent Coaching";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={s.container}>
      {/* Animated Background Elements */}
      <div style={s.bgGradient}></div>
      <div style={s.floatingOrb1}></div>
      <div style={s.floatingOrb2}></div>
      <div style={s.floatingOrb3}></div>

      {/* Navigation Bar */}
      <nav style={s.navbar}>
        <div style={s.navContent}>
          <div style={s.navBrand}>
            <span style={s.navIcon}>🚀</span>
            <span style={s.navTitle}>Interview Portal</span>
          </div>
          <div style={s.navButtons}>
            <button
              style={s.navLoginBtn}
              onClick={() => {
                setShowSignup(false);
                setShowLogin(true);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
            >
              Login
            </button>
            <button
              style={s.navSignupBtn}
              onClick={() => {
                setShowSignup(false);
                setShowLogin(true);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={s.heroSection}>
        {/* Left Content */}
        <div style={s.heroLeft}>
          <div style={s.badgeContainer}>
            <span style={s.badge}>✨ AI-Powered Interview Training</span>
          </div>

          <h1 style={s.mainTitle}>
            Master Interviews with
            <span style={s.gradient}>{typedText}</span>
            <span style={s.cursor}>|</span>
          </h1>

          <p style={s.description}>
            Get real-time feedback from AI interviewers. Practice unlimited
            questions tailored to your skill level. Transform from nervous to
            confident in weeks, not months.
          </p>

          {/* Stats */}
          <div style={s.statsRow}>
            <div style={s.statItem}>
              <p style={s.statValue}>10K+</p>
              <p style={s.statLabel}>Questions</p>
            </div>
            <div style={s.statItem}>
              <p style={s.statValue}>95%</p>
              <p style={s.statLabel}>Success Rate</p>
            </div>
            <div style={s.statItem}>
              <p style={s.statValue}>24/7</p>
              <p style={s.statLabel}>Available</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={s.ctaContainer}>
            <button
              style={s.primaryBtn}
              onClick={() => setShowSignup(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 30px 60px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(102, 126, 234, 0.3)";
              }}
            >
              Start Free Trial
              <span style={s.btnArrow}>→</span>
            </button>
            <button
              style={s.secondaryBtn}
              onClick={() => setShowLogin(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
            >
              Sign In
            </button>
          </div>

          <div style={s.trustBadges}>
            <p style={s.trustText}>⭐ Trusted by students from 50+ countries</p>
          </div>
        </div>

        {/* Right Side - Static Hero Card */}
        <div style={s.heroRight}>
          <div style={s.heroCard}>
            <div style={s.cardGlow}></div>
            <div style={s.cardContent}>
              <div style={s.cardHeader}>
                <span style={s.cardTitle}>Live Interview</span>
                <span style={s.liveIndicator}>● LIVE</span>
              </div>
              <div style={s.cardQuestion}>
                "Tell me about your biggest project?"
              </div>
              <div style={s.cardResponse}>
                <p style={s.aiLabel}>🤖 AI Feedback:</p>
                <p style={s.feedback}>
                  Great answer! Your explanation was clear and structured. Next
                  time, focus on the metrics you achieved.
                </p>
              </div>
              <div style={s.cardScore}>
                <p style={s.scoreLabel}>Score</p>
                <div style={s.scoreBar}>
                  <div style={s.scoreProgress}></div>
                </div>
                <p style={s.scoreText}>4.2/5.0</p>
              </div>

              {/* Static badges inside card */}
              <div style={s.staticBadgesRow}>
                <div style={s.staticBadge}>
                  <span style={s.badgeIcon}>💡</span>
                  <span style={s.badgeLabel}>Real-time Feedback</span>
                </div>
                <div style={s.staticBadge}>
                  <span style={s.badgeIcon}>🎯</span>
                  <span style={s.badgeLabel}>Personalized</span>
                </div>
                <div style={s.staticBadge}>
                  <span style={s.badgeIcon}>📊</span>
                  <span style={s.badgeLabel}>Progress Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={s.featuresSection}>
        <div style={s.featureHeader}>
          <h2 style={s.featureTitle}>Why Choose Our Portal?</h2>
          <p style={s.featureSubtitle}>Everything you need to ace interviews</p>
        </div>

        <div style={s.featuresGrid}>
          {[
            {
              icon: "🤖",
              title: "AI-Powered Coaching",
              desc: "Get instant, intelligent feedback on every answer",
            },
            {
              icon: "📚",
              title: "Curated Questions",
              desc: "10,000+ questions from top tech companies",
            },
            {
              icon: "🚀",
              title: "Resume Analysis",
              desc: "Upload and get AI suggestions for improvement",
            },
            {
              icon: "📈",
              title: "Progress Analytics",
              desc: "Track improvements with detailed insights",
            },
            {
              icon: "⏱️",
              title: "Timed Interviews",
              desc: "Practice under real interview conditions",
            },
            {
              icon: "🎓",
              title: "Expert Resources",
              desc: "Learn from industry veterans and mentors",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              style={{ ...s.featureCard, animationDelay: `${idx * 0.1}s` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-12px)";
                e.currentTarget.style.boxShadow =
                  "0 30px 60px rgba(102, 126, 234, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0,0,0,0.08)";
              }}
            >
              <p style={s.featureIcon}>{feature.icon}</p>
              <h3 style={s.featureCardTitle}>{feature.title}</h3>
              <p style={s.featureCardDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={s.ctaSection}>
        <div style={s.ctaContent}>
          <h2 style={s.ctaTitle}>Ready to ace your next interview?</h2>
          <p style={s.ctaDesc}>
            Join thousands of professionals who transformed their interview
            skills
          </p>
          <button
            style={s.ctaBtn}
            onClick={() => setShowSignup(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Start Your Journey
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <p style={s.footerText}>
          © 2026 AI Interview Portal. Master interviews with intelligence.
        </p>
      </footer>

      {/* Overlay */}
      {(showLogin || showSignup) && (
        <div
          style={s.overlay}
          onClick={() => {
            setShowLogin(false);
            setShowSignup(false);
          }}
        ></div>
      )}

      <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
      <SignupModal show={showSignup} onClose={() => setShowSignup(false)} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap');

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatOrb {
          0% { transform: translate(0, 0); }
          50% { transform: translate(50px, -50px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const s = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "'Inter', sans-serif",
    color: "#1a1a2e",
    overflow: "hidden",
    position: "relative",
  },
  bgGradient: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    zIndex: -3,
  },
  floatingOrb1: {
    position: "fixed",
    width: "500px",
    height: "500px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
    borderRadius: "50%",
    top: "-200px",
    right: "-100px",
    zIndex: -2,
    animation: "floatOrb 30s ease-in-out infinite",
  },
  floatingOrb2: {
    position: "fixed",
    width: "400px",
    height: "400px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
    borderRadius: "50%",
    bottom: "-150px",
    left: "-100px",
    zIndex: -2,
    animation: "floatOrb 35s ease-in-out infinite reverse",
  },
  floatingOrb3: {
    position: "fixed",
    width: "300px",
    height: "300px",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
    borderRadius: "50%",
    top: "50%",
    left: "10%",
    zIndex: -2,
    animation: "floatOrb 40s ease-in-out infinite",
  },
  navbar: {
    position: "sticky",
    top: 0,
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    padding: "16px 0",
    zIndex: 50,
  },
  navContent: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "0 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navBrand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "white",
    fontSize: "20px",
    fontWeight: "700",
  },
  navIcon: { fontSize: "28px" },
  navTitle: { fontFamily: "'Space Grotesk', sans-serif" },
  navButtons: { display: "flex", gap: "12px" },
  navLoginBtn: {
    padding: "10px 20px",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  navSignupBtn: {
    padding: "10px 24px",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  heroSection: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "100px 40px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "80px",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  heroLeft: { color: "white", animation: "slideInUp 0.8s ease-out" },
  badgeContainer: { marginBottom: "24px" },
  badge: {
    display: "inline-block",
    padding: "10px 20px",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "24px",
    fontSize: "13px",
    fontWeight: "600",
    color: "rgba(255,255,255,0.9)",
  },
  mainTitle: {
    fontSize: "56px",
    fontWeight: "800",
    lineHeight: "1.2",
    margin: "0 0 24px",
    fontFamily: "'Space Grotesk', sans-serif",
  },
  gradient: {
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  cursor: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "300",
    animation: "blink 1s step-end infinite",
    marginLeft: "4px",
  },
  description: {
    fontSize: "18px",
    color: "rgba(255,255,255,0.85)",
    lineHeight: "1.8",
    margin: "0 0 40px",
    maxWidth: "500px",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "32px",
    margin: "0 0 48px",
    paddingBottom: "32px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  statItem: { textAlign: "center" },
  statValue: {
    fontSize: "32px",
    fontWeight: "800",
    margin: "0",
    color: "white",
  },
  statLabel: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.7)",
    margin: "8px 0 0",
  },
  ctaContainer: { display: "flex", gap: "16px", marginBottom: "32px" },
  primaryBtn: {
    padding: "16px 40px",
    background: "white",
    color: "#667eea",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)",
  },
  btnArrow: { fontSize: "18px", display: "inline-block" },
  secondaryBtn: {
    padding: "16px 40px",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "12px",
    color: "white",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  trustBadges: { paddingTop: "32px" },
  trustText: { fontSize: "14px", color: "rgba(255,255,255,0.8)", margin: 0 },

  // RIGHT SIDE - static, no overflow
  heroRight: {
    animation: "slideInUp 0.8s ease-out 0.2s both",
  },
  heroCard: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 40px 80px rgba(0,0,0,0.2)",
    position: "relative",
    overflow: "hidden",
  },
  cardGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle at top right, rgba(102, 126, 234, 0.1) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  cardContent: { position: "relative", zIndex: 1 },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e5e7eb",
  },
  cardTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#667eea",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  liveIndicator: {
    display: "inline-block",
    fontSize: "12px",
    color: "#ef4444",
    fontWeight: "700",
    animation: "pulse 2s ease-in-out infinite",
  },
  cardQuestion: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  cardResponse: {
    background: "#f9fafb",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "20px",
  },
  aiLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#667eea",
    margin: "0 0 8px",
  },
  feedback: {
    fontSize: "14px",
    color: "#374151",
    lineHeight: "1.6",
    margin: 0,
  },
  cardScore: {
    background: "#f9fafb",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "20px",
  },
  scoreLabel: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#999",
    textTransform: "uppercase",
    margin: "0 0 8px",
  },
  scoreBar: {
    height: "8px",
    background: "#e5e7eb",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "12px",
  },
  scoreProgress: {
    height: "100%",
    width: "84%",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    borderRadius: "4px",
  },
  scoreText: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#667eea",
    margin: 0,
  },

  // Static badges row inside card
  staticBadgesRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  staticBadge: {
    flex: "1",
    minWidth: "90px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    background: "linear-gradient(135deg, #f0f4ff, #f9fafb)",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "14px 10px",
    textAlign: "center",
  },
  badgeIcon: { fontSize: "22px" },
  badgeLabel: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#374151",
    lineHeight: "1.3",
  },

  // Features
  featuresSection: {
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "100px 40px",
    position: "relative",
    zIndex: 1,
  },
  featureHeader: { textAlign: "center", marginBottom: "64px", color: "white" },
  featureTitle: {
    fontSize: "44px",
    fontWeight: "800",
    margin: "0 0 16px",
    fontFamily: "'Space Grotesk', sans-serif",
  },
  featureSubtitle: {
    fontSize: "18px",
    color: "rgba(255,255,255,0.8)",
    margin: 0,
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "32px",
  },
  featureCard: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "16px",
    padding: "32px",
    textAlign: "center",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    animation: "slideInUp 0.6s ease-out both",
  },
  featureIcon: { fontSize: "48px", marginBottom: "16px" },
  featureCardTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: "0 0 12px",
  },
  featureCardDesc: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
    lineHeight: "1.6",
  },

  // CTA
  ctaSection: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "80px 40px",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  ctaContent: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "24px",
    padding: "60px 40px",
    backdropFilter: "blur(10px)",
    animation: "slideInUp 0.8s ease-out 0.4s both",
  },
  ctaTitle: {
    fontSize: "40px",
    fontWeight: "800",
    color: "white",
    margin: "0 0 16px",
    fontFamily: "'Space Grotesk', sans-serif",
  },
  ctaDesc: {
    fontSize: "18px",
    color: "rgba(255,255,255,0.8)",
    margin: "0 0 32px",
  },
  ctaBtn: {
    padding: "16px 48px",
    background: "white",
    color: "#667eea",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)",
  },
  footer: {
    background: "rgba(0,0,0,0.2)",
    padding: "32px 0",
    textAlign: "center",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    position: "relative",
    zIndex: 1,
  },
  footerText: { color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: 0 },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1000,
    animation: "slideDown 0.3s ease-out",
  },
};

export default Landing;
