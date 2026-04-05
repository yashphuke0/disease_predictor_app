import React from 'react';

const ImageSource = ({ language, onCameraSelect, onGallerySelect, onBack }) => {
  const texts = {
    en: {
      title: "Upload & Scan Leaf",
      subtitle: "Tap to start a smart scan of your tomato leaf.",
      tapToScan: "Tap to Scan",
      camera: "Take Photo",
      gallery: "Gallery",
      cameraDesc: "Use your camera to capture a fresh leaf photo.",
      galleryDesc: "Pick an existing image from your phone.",
      back: "Back",
    },
    mr: {
      title: "पान अपलोड करा आणि स्कॅन करा",
      subtitle: "टोमॅटो पानाचा स्मार्ट स्कॅन सुरू करण्यासाठी टॅप करा.",
      tapToScan: "टॅप करून स्कॅन करा",
      camera: "फोटो काढा",
      gallery: "गॅलरी",
      cameraDesc: "नवीन पानाचा फोटो कॅमेरातून काढा.",
      galleryDesc: "फोनमधील विद्यमान प्रतिमा निवडा.",
      back: "मागे",
    },
  };

  const currentTexts = texts[language] || texts['en'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

        .isp-root * {
          box-sizing: border-box;
          font-family: 'Nunito', sans-serif;
        }

        .isp-root {
          min-height: calc(100vh - 160px);
          background: linear-gradient(160deg, #f0fdf4 0%, #dcfce7 40%, #f0fdf4 100%);
          padding: 16px 16px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* Decorative blobs */
        .isp-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(50px);
          pointer-events: none;
          z-index: 0;
        }
        .isp-blob-1 {
          width: 220px; height: 220px;
          background: rgba(34,197,94,0.18);
          top: -60px; right: -60px;
        }
        .isp-blob-2 {
          width: 160px; height: 160px;
          background: rgba(16,185,129,0.12);
          bottom: 60px; left: -50px;
        }

        /* Back button */
        .isp-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: white;
          border: 1.5px solid #d1fae5;
          border-radius: 100px;
          padding: 6px 14px 6px 10px;
          font-size: 12px;
          font-weight: 700;
          color: #15803d;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
          z-index: 1;
        }
        .isp-back-btn:hover { background: #f0fdf4; box-shadow: 0 2px 8px rgba(0,0,0,0.09); }
        .isp-back-btn:active { transform: scale(0.96); }
        .isp-back-btn svg { width: 14px; height: 14px; }

        /* Header */
        .isp-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }
        .isp-header-text h1 {
          margin: 0;
          font-size: 17px;
          font-weight: 800;
          color: #14532d;
          line-height: 1.2;
        }
        .isp-header-text p {
          margin: 2px 0 0;
          font-size: 11px;
          color: #4ade80;
          font-weight: 600;
        }

        /* Leaf icon badge */
        .isp-leaf-badge {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(34,197,94,0.35);
          flex-shrink: 0;
        }

        /* Main scan area */
        .isp-scan-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding-top: 32px;
          padding-bottom: 12px;
          position: relative;
          z-index: 1;
        }

        /* Scan button wrapper */
        .isp-scan-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 200px;
          margin-top: 50px;
        }

        /* Animated rings */
        @keyframes isp-ping {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes isp-pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.12); opacity: 0.2; }
        }
        .isp-ring-outer {
          position: absolute;
          width: 140px; height: 140px;
          border-radius: 50%;
          background: rgba(34,197,94,0.2);
          animation: isp-ping 2s cubic-bezier(0,0,0.2,1) infinite;
        }
        .isp-ring-mid {
          position: absolute;
          width: 112px; height: 112px;
          border-radius: 50%;
          background: rgba(34,197,94,0.18);
          animation: isp-pulse 2s ease-in-out infinite;
        }

        /* Corner scan brackets */
        .isp-bracket-ring {
          position: absolute;
          width: 140px; height: 140px;
          pointer-events: none;
        }
        .isp-bracket-ring::before,
        .isp-bracket-ring::after {
          content: '';
          position: absolute;
          width: 22px; height: 22px;
          border-color: #16a34a;
          border-style: solid;
        }
        .isp-bracket-ring::before {
          top: 10px; left: 10px;
          border-width: 3px 0 0 3px;
          border-radius: 4px 0 0 0;
        }
        .isp-bracket-ring::after {
          bottom: 10px; right: 10px;
          border-width: 0 3px 3px 0;
          border-radius: 0 0 4px 0;
        }
        .isp-bracket-ring-2::before {
          top: 10px; right: 10px; left: auto;
          border-width: 3px 3px 0 0;
          border-radius: 0 4px 0 0;
        }
        .isp-bracket-ring-2::after {
          bottom: 10px; left: 10px; right: auto;
          border-width: 0 0 3px 3px;
          border-radius: 0 0 0 4px;
        }

        /* Main scan button */
        .isp-scan-btn {
          position: relative;
          width: 88px; height: 88px;
          border-radius: 50%;
          background: linear-gradient(145deg, #22c55e, #15803d);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 4px;
          box-shadow:
            0 8px 24px rgba(34,197,94,0.45),
            0 2px 6px rgba(0,0,0,0.12),
            inset 0 1px 0 rgba(255,255,255,0.25);
          transition: transform 0.15s, box-shadow 0.15s;
          color: white;
        }
        .isp-scan-btn:hover {
          box-shadow: 0 12px 32px rgba(34,197,94,0.55), 0 2px 8px rgba(0,0,0,0.14);
          transform: translateY(-1px);
        }
        .isp-scan-btn:active { transform: scale(0.94); }
        .isp-scan-btn svg { width: 24px; height: 24px; }
        .isp-scan-btn span {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          line-height: 1;
        }

        /* Source cards row */
        .isp-cards-row {
          width: 100%;
          display: flex;
          gap: 12px;
        }

        .isp-card {
          flex: 1;
          background: white;
          border: 1.5px solid #d1fae5;
          border-radius: 20px;
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
          text-align: center;
        }
        .isp-card:hover {
          box-shadow: 0 6px 20px rgba(34,197,94,0.18);
          border-color: #86efac;
          transform: translateY(-2px);
        }
        .isp-card:active { transform: scale(0.96); }

        .isp-card-icon {
          width: 44px; height: 44px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .isp-card-icon-primary {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          color: #15803d;
        }
        .isp-card-icon-secondary {
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          color: #475569;
        }
        .isp-card-icon svg { width: 20px; height: 20px; }

        .isp-card-title {
          font-size: 12px;
          font-weight: 800;
          color: #14532d;
          margin: 0;
          line-height: 1.2;
        }
        .isp-card-desc {
          font-size: 10px;
          color: #86efac;
          font-weight: 600;
          margin: 0;
          line-height: 1.3;
        }

        /* Scan line animation on the main button area */
        @keyframes isp-scanline {
          0% { top: 18%; opacity: 0.8; }
          50% { top: 78%; opacity: 0.6; }
          100% { top: 18%; opacity: 0.8; }
        }
        .isp-scanline {
          position: absolute;
          left: 12%; right: 12%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #22c55e, transparent);
          border-radius: 1px;
          animation: isp-scanline 2.4s ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>

      <div className="isp-root">
        {/* Background blobs */}
        <div className="isp-blob isp-blob-1" />
        <div className="isp-blob isp-blob-2" />

        {/* Header */}
        <div className="isp-header">
          <button className="isp-back-btn" onClick={onBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            {currentTexts.back}
          </button>
          <div className="isp-header-text">
            <h1>{currentTexts.title}</h1>
            <p>{currentTexts.subtitle}</p>
          </div>
        </div>

        {/* Main scan area */}
        <div className="isp-scan-area">

          {/* Central scan button with rings */}
          <div className="isp-scan-wrapper">
            <div className="isp-ring-outer" />
            <div className="isp-ring-mid" />
            <div className="isp-bracket-ring" />
            <div className="isp-bracket-ring isp-bracket-ring-2" />
            <div className="isp-scanline" />
            <button className="isp-scan-btn" type="button" onClick={onCameraSelect}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="8" y="8" width="8" height="8" rx="2" />
                <path d="M4 10V6a2 2 0 0 1 2-2h4" />
                <path d="M16 4h2a2 2 0 0 1 2 2v4" />
                <path d="M20 14v4a2 2 0 0 1-2 2h-4" />
                <path d="M10 20H6a2 2 0 0 1-2-2v-4" />
              </svg>
              <span>{currentTexts.tapToScan}</span>
            </button>
          </div>

          {/* Source cards */}
          <div className="isp-cards-row">
            {/* Camera card */}
            <button type="button" className="isp-card" onClick={onCameraSelect}>
              <div className="isp-card-icon isp-card-icon-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 9a2 2 0 0 1 2-2h2.2l1.2-2h5.2l1.2 2H18a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
                  <circle cx="12" cy="12.5" r="3" />
                </svg>
              </div>
              <p className="isp-card-title">{currentTexts.camera}</p>
              
            </button>

            {/* Gallery card */}
            <button type="button" className="isp-card" onClick={onGallerySelect}>
              <div className="isp-card-icon isp-card-icon-secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="5" width="16" height="14" rx="2" />
                  <path d="M8 13.5 10.5 11 14 14.5 16 12.5 19 16" />
                  <circle cx="9" cy="9" r="1.2" />
                </svg>
              </div>
              <p className="isp-card-title">{currentTexts.gallery}</p>

            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ImageSource;