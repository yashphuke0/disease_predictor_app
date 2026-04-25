import React, { useState, useEffect } from 'react';

const AboutModel = ({ language }) => {
  const [countUp, setCountUp] = useState(0);

  useEffect(() => {
    let start = 0;
    const target = 94.2;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCountUp(target); clearInterval(timer); }
      else setCountUp(parseFloat(start.toFixed(1)));
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const texts = {
    en: {
      title: "About AI Model",
      subtitle: "Smart tomato disease detection",
      description: "Our model uses advanced computer vision and deep learning to identify tomato diseases from leaf images — fast, accurate, and built for farmers in the field.",
      featuresTitle: "Key Features",
      features: [
        { icon: "🌿", text: "Trained on thousands of tomato leaf images" },
        { icon: "🔍", text: "Identifies 10+ common tomato diseases" },
        { icon: "💊", text: "Provides treatment recommendations" },
        { icon: "📱", text: "Mobile-optimized for field use" },
        { icon: "🔄", text: "Regular model updates for accuracy" },
      ],
      accuracy: "Model Accuracy",
      accuracyLabel: "Validated on test dataset",
      techTitle: "Technology Stack",
      tech: [
        { icon: "⚛️", name: "React.js", desc: "Frontend framework" },
        { icon: "🧠", name: "TensorFlow.js", desc: "AI inference engine" },
        { icon: "📐", name: "Mobile-first Design", desc: "Responsive layout" },
        { icon: "⚡", name: "PWA Support", desc: "Installable web app" },
      ],
      statsTitle: "Model Stats",
      stats: [
        { value: "10+", label: "Diseases" },
        { value: "94.2%", label: "Accuracy" },
        { value: "< 3s", label: "Analysis" },
        { value: "1000s", label: "Images" },
      ],
      disclaimerTitle: "Disclaimer",
      disclaimer: "This is a demonstration app. For actual disease diagnosis, please consult with agricultural experts.",
    },
    mr: {
      title: "AI मॉडेलबद्दल",
      subtitle: "स्मार्ट टोमॅटो रोग शोध",
      description: "आमचा मॉडेल पानांच्या प्रतिमांवरून टोमॅटो रोगांची ओळख करण्यासाठी प्रगत संगणक दृष्टी आणि डीप लर्निंग वापरतो — वेगवान, अचूक आणि शेतकऱ्यांसाठी तयार.",
      featuresTitle: "मुख्य वैशिष्ट्ये",
      features: [
        { icon: "🌿", text: "हजारो पानांच्या प्रतिमांवर प्रशिक्षित" },
        { icon: "🔍", text: "10+ टोमॅटो रोगांची ओळख" },
        { icon: "💊", text: "उपचार शिफारसी प्रदान करतो" },
        { icon: "📱", text: "फील्ड वापरासाठी मोबाइल-अनुकूलित" },
        { icon: "🔄", text: "अचूकतेसाठी नियमित मॉडेल अपडेट्स" },
      ],
      accuracy: "मॉडेल अचूकता",
      accuracyLabel: "चाचणी डेटासेटवर प्रमाणित",
      techTitle: "तंत्रज्ञान स्टॅक",
      tech: [
        { icon: "⚛️", name: "React.js", desc: "फ्रंटएंड फ्रेमवर्क" },
        { icon: "🧠", name: "TensorFlow.js", desc: "AI इंजिन" },
        { icon: "📐", name: "मोबाइल-फर्स्ट डिझाइन", desc: "रिस्पॉन्सिव्ह लेआउट" },
        { icon: "⚡", name: "PWA सपोर्ट", desc: "इन्स्टॉल करण्यायोग्य ॲप" },
      ],
      statsTitle: "मॉडेल आकडेवारी",
      stats: [
        { value: "10+", label: "रोग" },
        { value: "94.2%", label: "अचूकता" },
        { value: "< 3s", label: "विश्लेषण" },
        { value: "1000s", label: "प्रतिमा" },
      ],
      disclaimerTitle: "सूचना",
      disclaimer: "हे एक प्रात्यक्षिक ॲप आहे. वास्तविक रोग निदानासाठी कृपया कृषी तज्ञांशी सल्लामसलत करा.",
    },
    hi: {
      title: "AI मॉडल के बारे में",
      subtitle: "स्मार्ट टमाटर रोग पहचान",
      description: "हमारा मॉडल पत्तों की तस्वीरों से टमाटर रोग पहचानने के लिए उन्नत कंप्यूटर विजन और डीप लर्निंग का उपयोग करता है - तेज, सटीक और किसानों के लिए उपयोगी।",
      featuresTitle: "मुख्य विशेषताएं",
      features: [
        { icon: "🌿", text: "हजारों टमाटर पत्ती चित्रों पर प्रशिक्षित" },
        { icon: "🔍", text: "10+ सामान्य टमाटर रोगों की पहचान" },
        { icon: "💊", text: "उपचार संबंधी सुझाव देता है" },
        { icon: "📱", text: "फील्ड उपयोग के लिए मोबाइल-अनुकूल" },
        { icon: "🔄", text: "सटीकता के लिए नियमित मॉडल अपडेट" },
      ],
      accuracy: "मॉडल सटीकता",
      accuracyLabel: "टेस्ट डेटासेट पर सत्यापित",
      techTitle: "टेक्नोलॉजी स्टैक",
      tech: [
        { icon: "⚛️", name: "React.js", desc: "फ्रंटएंड फ्रेमवर्क" },
        { icon: "🧠", name: "TensorFlow.js", desc: "AI इंफेरेंस इंजन" },
        { icon: "📐", name: "मोबाइल-फर्स्ट डिज़ाइन", desc: "रिस्पॉन्सिव लेआउट" },
        { icon: "⚡", name: "PWA सपोर्ट", desc: "इंस्टॉल करने योग्य वेब ऐप" },
      ],
      statsTitle: "मॉडल आँकड़े",
      stats: [
        { value: "10+", label: "रोग" },
        { value: "94.2%", label: "सटीकता" },
        { value: "< 3s", label: "विश्लेषण" },
        { value: "1000s", label: "चित्र" },
      ],
      disclaimerTitle: "अस्वीकरण",
      disclaimer: "यह एक डेमो ऐप है। वास्तविक रोग निदान के लिए कृपया कृषि विशेषज्ञ से सलाह लें।",
    }
  };

  const t = texts[language] || texts.en;
  const circumference = 2 * Math.PI * 30;
  const dashOffset = circumference - (countUp / 100) * circumference;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

        .am-root * { box-sizing: border-box; font-family: 'Nunito', sans-serif; }

        .am-root {
          min-height: calc(100vh - 120px);
          background: linear-gradient(160deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%);
          padding: 16px 16px 36px;
          display: flex; flex-direction: column; gap: 16px;
          position: relative; overflow: hidden;
        }

        .am-blob { position: absolute; border-radius: 50%; filter: blur(60px); pointer-events: none; z-index: 0; }
        .am-blob-1 { width: 220px; height: 220px; background: rgba(34,197,94,0.15); top: -60px; right: -60px; }
        .am-blob-2 { width: 160px; height: 160px; background: rgba(16,185,129,0.10); bottom: 100px; left: -50px; }

        /* ── Hero card ── */
        .am-hero {
          position: relative; z-index: 1;
          background: linear-gradient(135deg, #15803d 0%, #166534 100%);
          border-radius: 24px; padding: 20px 18px;
          box-shadow: 0 8px 28px rgba(21,128,61,0.35);
          overflow: hidden;
        }
        .am-hero::before {
          content: ''; position: absolute;
          top: -30px; right: -30px;
          width: 120px; height: 120px; border-radius: 50%;
          background: rgba(255,255,255,0.07);
        }
        .am-hero::after {
          content: ''; position: absolute;
          bottom: -20px; left: 20px;
          width: 80px; height: 80px; border-radius: 50%;
          background: rgba(255,255,255,0.05);
        }
        .am-hero-badge {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25);
          border-radius: 100px; padding: 4px 10px;
          font-size: 9px; font-weight: 800; color: #bbf7d0;
          letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 10px;
        }
        .am-hero-title {
          font-size: 22px; font-weight: 900; color: white;
          margin: 0 0 6px; line-height: 1.2; letter-spacing: -0.02em;
        }
        .am-hero-sub {
          font-size: 11px; font-weight: 600; color: #86efac;
          margin: 0 0 12px; line-height: 1.5;
        }
        .am-hero-desc {
          font-size: 12px; color: rgba(255,255,255,0.8);
          line-height: 1.6; margin: 0; position: relative; z-index: 1;
        }

        /* ── Section card ── */
        .am-card {
          position: relative; z-index: 1;
          background: white; border-radius: 20px;
          border: 1.5px solid #d1fae5;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          padding: 16px 14px;
        }
        .am-section-label {
          font-size: 10px; font-weight: 800; color: #86efac;
          text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 12px;
        }

        /* ── Accuracy ring + stats ── */
        .am-accuracy-row { display: flex; align-items: center; gap: 16px; }
        .am-ring-wrap { position: relative; width: 80px; height: 80px; flex-shrink: 0; }
        .am-ring-wrap svg { width: 100%; height: 100%; transform: rotate(-90deg); }
        .am-ring-label {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .am-ring-pct { font-size: 15px; font-weight: 900; color: #14532d; line-height: 1; }
        .am-ring-sub { font-size: 8px; font-weight: 700; color: #86efac; }
        .am-accuracy-info { flex: 1; }
        .am-accuracy-title { font-size: 14px; font-weight: 900; color: #14532d; margin: 0 0 4px; }
        .am-accuracy-desc { font-size: 11px; color: #6b7280; line-height: 1.4; margin: 0; }

        /* ── Stats grid ── */
        .am-stats-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;
          margin-top: 14px;
        }
        .am-stat {
          background: #f0fdf4; border-radius: 14px; padding: 12px 10px;
          text-align: center; border: 1px solid #d1fae5;
        }
        .am-stat-val { font-size: 18px; font-weight: 900; color: #14532d; line-height: 1; }
        .am-stat-lbl { font-size: 9px; font-weight: 700; color: #86efac; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px; }

        /* ── Feature list ── */
        .am-features { display: flex; flex-direction: column; gap: 9px; }
        .am-feature-item {
          display: flex; align-items: center; gap: 12px;
          background: #f0fdf4; border-radius: 14px; padding: 11px 13px;
        }
        .am-feature-emoji { font-size: 18px; flex-shrink: 0; }
        .am-feature-text { font-size: 12px; font-weight: 700; color: #374151; line-height: 1.4; }

        /* ── Tech grid ── */
        .am-tech-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .am-tech-item {
          background: #f8fafc; border-radius: 16px; padding: 13px 12px;
          border: 1.5px solid #e2e8f0;
          display: flex; flex-direction: column; gap: 5px;
        }
        .am-tech-emoji { font-size: 20px; }
        .am-tech-name { font-size: 11px; font-weight: 900; color: #14532d; line-height: 1.2; }
        .am-tech-desc { font-size: 10px; color: #94a3b8; font-weight: 600; }

        /* ── Disclaimer ── */
        .am-disclaimer {
          position: relative; z-index: 1;
          background: #fffbeb; border: 1.5px solid #fde68a;
          border-radius: 18px; padding: 14px;
          display: flex; gap: 10px; align-items: flex-start;
        }
        .am-disclaimer-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
        .am-disclaimer-content {}
        .am-disclaimer-title { font-size: 11px; font-weight: 900; color: #92400e; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em; }
        .am-disclaimer-text { font-size: 11px; color: #78350f; line-height: 1.55; margin: 0; }
      `}</style>

      <div className="am-root">
        <div className="am-blob am-blob-1" />
        <div className="am-blob am-blob-2" />

        {/* ── Hero ── */}
        <div className="am-hero">
          <div className="am-hero-badge">🤖 AI Powered</div>
          <h1 className="am-hero-title">{t.title}</h1>
          <p className="am-hero-sub">{t.subtitle}</p>
          <p className="am-hero-desc">{t.description}</p>
        </div>

        {/* ── Accuracy + Stats ── */}
        <div className="am-card">
          <p className="am-section-label">{t.accuracy}</p>
          <div className="am-accuracy-row">
            <div className="am-ring-wrap">
              <svg viewBox="0 0 68 68">
                <circle cx="34" cy="34" r="30" fill="none" stroke="#d1fae5" strokeWidth="6" />
                <circle
                  cx="34" cy="34" r="30" fill="none"
                  stroke="#22c55e" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              <div className="am-ring-label">
                <span className="am-ring-pct">{countUp}%</span>
                <span className="am-ring-sub">AI</span>
              </div>
            </div>
            <div className="am-accuracy-info">
              <p className="am-accuracy-title">{t.accuracyLabel}</p>
              <p className="am-accuracy-desc">Validated across 10 disease categories on a balanced held-out test set.</p>
            </div>
          </div>

          <div className="am-stats-grid">
            {t.stats.map((s, i) => (
              <div className="am-stat" key={i}>
                <div className="am-stat-val">{s.value}</div>
                <div className="am-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Features ── */}
        <div className="am-card">
          <p className="am-section-label">{t.featuresTitle}</p>
          <div className="am-features">
            {t.features.map((f, i) => (
              <div className="am-feature-item" key={i}>
                <span className="am-feature-emoji">{f.icon}</span>
                <span className="am-feature-text">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tech Stack ── */}
        <div className="am-card">
          <p className="am-section-label">{t.techTitle}</p>
          <div className="am-tech-grid">
            {t.tech.map((item, i) => (
              <div className="am-tech-item" key={i}>
                <span className="am-tech-emoji">{item.icon}</span>
                <p className="am-tech-name">{item.name}</p>
                <p className="am-tech-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <div className="am-disclaimer">
          <span className="am-disclaimer-icon">⚠️</span>
          <div className="am-disclaimer-content">
            <p className="am-disclaimer-title">{t.disclaimerTitle}</p>
            <p className="am-disclaimer-text">{t.disclaimer}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutModel;