import React from 'react';

const Home = ({ language, onStartScan }) => {
  const texts = {
    en: {
      title: "Tomato Disease Predictor",
      subtitle: "Identify diseases in your tomato plants instantly",
      scanButton: "Scan Plant",
      description: "Take a photo of your tomato leaves and get instant disease diagnosis with treatment recommendations.",
      badge: "AI-Powered Detection",
      stat1: "10+", stat1Label: "Diseases",
      stat2: "95%", stat2Label: "Accuracy",
      stat3: "< 3s", stat3Label: "Results",
    },
    mr: {
      title: "टोमॅटो रोगांचा अंदाज लावणारा",
      subtitle: "तुमच्या टोमॅटो वनस्पतींमधील रोगांची त्वरित ओळख करा",
      scanButton: "वनस्पती स्कॅन करा",
      description: "तुमच्या टोमॅटो पानांची फोटो काढा आणि उपचार शिफारसींसह त्वरित रोग निदान मिळवा.",
      badge: "AI-चालित शोध",
      stat1: "10+", stat1Label: "रोग",
      stat2: "95%", stat2Label: "अचूकता",
      stat3: "< 3s", stat3Label: "निकाल",
    },
    hi: {
      title: "टमाटर रोग पहचानक",
      subtitle: "अपने टमाटर पौधों की बीमारियों की तुरंत पहचान करें",
      scanButton: "पौधा स्कैन करें",
      description: "अपने टमाटर पत्तों की फोटो लें और उपचार सुझावों के साथ तुरंत रोग पहचान प्राप्त करें।",
      badge: "AI-संचालित पहचान",
      stat1: "10+", stat1Label: "रोग",
      stat2: "95%", stat2Label: "सटीकता",
      stat3: "< 3s", stat3Label: "परिणाम",
    }
  };

  const t = texts[language] || texts['en'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

        .home-root * { box-sizing: border-box; font-family: 'Nunito', sans-serif; }

        .home-root {
          min-height: calc(100vh - 120px);
          background: linear-gradient(160deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 24px 20px 32px;
          position: relative; overflow: hidden;
          text-align: center;
        }

        /* Decorative blobs */
        .home-blob {
          position: absolute; border-radius: 50%;
          filter: blur(60px); pointer-events: none; z-index: 0;
        }
        .home-blob-1 { width: 260px; height: 260px; background: rgba(34,197,94,0.18); top: -80px; right: -70px; }
        .home-blob-2 { width: 200px; height: 200px; background: rgba(16,185,129,0.12); bottom: 40px; left: -70px; }
        .home-blob-3 { width: 120px; height: 120px; background: rgba(134,239,172,0.20); top: 40%; left: 60%; }

        /* Decorative grid dots */
        .home-dots {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(34,197,94,0.12) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .home-inner { position: relative; z-index: 1; width: 100%; max-width: 360px; }

        /* AI badge */
        .home-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: white; border: 1.5px solid #bbf7d0;
          border-radius: 100px; padding: 6px 14px;
          font-size: 10px; font-weight: 800; color: #15803d;
          letter-spacing: 0.05em; text-transform: uppercase;
          box-shadow: 0 2px 10px rgba(34,197,94,0.15);
          margin-bottom: 20px;
        }
        .home-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
          animation: home-pulse-dot 2s ease-in-out infinite;
        }
        @keyframes home-pulse-dot {
          0%,100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.08); }
        }

        /* Leaf icon */
        .home-icon-wrap {
          width: 80px; height: 80px; border-radius: 28px; margin: 0 auto 20px;
          background: linear-gradient(145deg, #22c55e, #15803d);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 10px 30px rgba(34,197,94,0.4), inset 0 1px 0 rgba(255,255,255,0.25);
          position: relative;
        }
        .home-icon-wrap::after {
          content: ''; position: absolute; inset: -3px;
          border-radius: 32px; border: 2px dashed rgba(34,197,94,0.3);
          animation: home-spin-slow 12s linear infinite;
        }
        @keyframes home-spin-slow { to { transform: rotate(360deg); } }
        .home-icon-wrap svg { width: 40px; height: 40px; }

        /* Title */
        .home-title {
          font-size: 24px; font-weight: 900; color: #14532d;
          line-height: 1.2; margin: 0 0 10px;
          letter-spacing: -0.02em;
        }
        .home-subtitle {
          font-size: 13px; font-weight: 600; color: #4ade80;
          margin: 0 0 14px; line-height: 1.5;
        }
        .home-description {
          font-size: 12px; color: #6b7280; line-height: 1.6;
          margin: 0 0 26px; padding: 0 8px;
        }

        /* Stats row */
        .home-stats {
          display: flex; gap: 8px; margin-bottom: 28px;
        }
        .home-stat {
          flex: 1; background: white; border: 1.5px solid #d1fae5;
          border-radius: 16px; padding: 10px 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .home-stat-num {
          font-size: 17px; font-weight: 900; color: #14532d; line-height: 1;
        }
        .home-stat-label {
          font-size: 9px; font-weight: 700; color: #86efac;
          text-transform: uppercase; letter-spacing: 0.06em; margin-top: 3px;
        }

        /* CTA button */
        .home-scan-btn {
          width: 100%; padding: 16px 24px; border: none; border-radius: 100px;
          background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
          color: white; font-size: 15px; font-weight: 900;
          cursor: pointer; letter-spacing: 0.02em;
          box-shadow: 0 8px 24px rgba(34,197,94,0.42), 0 2px 6px rgba(0,0,0,0.1);
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: transform 0.15s, box-shadow 0.15s;
          position: relative; overflow: hidden;
        }
        .home-scan-btn::before {
          content: ''; position: absolute;
          top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: home-shimmer 2.5s ease-in-out infinite;
        }
        @keyframes home-shimmer {
          0% { left: -100%; }
          60%,100% { left: 150%; }
        }
        .home-scan-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(34,197,94,0.5); }
        .home-scan-btn:active { transform: scale(0.97); }
        .home-scan-btn svg { width: 18px; height: 18px; }
      `}</style>

      <div className="home-root">
        <div className="home-dots" />
        <div className="home-blob home-blob-1" />
        <div className="home-blob home-blob-2" />
        <div className="home-blob home-blob-3" />

        <div className="home-inner">
          {/* AI badge */}
          {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span className="home-badge">
              <span className="home-badge-dot" />
              {t.badge}
            </span>
          </div> */}

          {/* Leaf icon */}
          <div className="home-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 20c7 0 14-6 14-14-7 0-14 7-14 14z" />
              <path d="M9 15c1-2 3-4 5-5" />
            </svg>
          </div>

          <h1 className="home-title">{t.title}</h1>
          <p className="home-subtitle">{t.subtitle}</p>
          <p className="home-description">{t.description}</p>

          {/* Stats */}
          <div className="home-stats">
            {[
              { num: t.stat1, label: t.stat1Label },
              { num: t.stat2, label: t.stat2Label },
              { num: t.stat3, label: t.stat3Label },
            ].map((s, i) => (
              <div className="home-stat" key={i}>
                <div className="home-stat-num">{s.num}</div>
                <div className="home-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="home-scan-btn" onClick={onStartScan}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="8" y="8" width="8" height="8" rx="2" />
              <path d="M4 10V6a2 2 0 0 1 2-2h4" /><path d="M16 4h2a2 2 0 0 1 2 2v4" />
              <path d="M20 14v4a2 2 0 0 1-2 2h-4" /><path d="M10 20H6a2 2 0 0 1-2-2v-4" />
            </svg>
            {t.scanButton}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;