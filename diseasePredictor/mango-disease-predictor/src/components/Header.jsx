import React from 'react';

const Header = ({ language, toggleLanguage }) => {
  const texts = {
    en: { title: "Tomato Predictor" },
    mr: { title: "टोमॅटो रोगांचा अंदाज" },
  };

  const t = texts[language] || texts['en'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');

        .hdr-root * { box-sizing: border-box; font-family: 'Nunito', sans-serif; }

        .hdr-root {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid #f0fdf4;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  padding-top: env(safe-area-inset-top);
}

        .hdr-inner {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px;
        }

        /* Logo area */
        .hdr-logo {
          display: flex; align-items: center; gap: 8px;
        }
        .hdr-logo-icon {
          width: 30px; height: 30px; border-radius: 10px;
          background: linear-gradient(135deg, #22c55e, #15803d);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 10px rgba(34,197,94,0.35);
          flex-shrink: 0;
        }
        .hdr-logo-icon svg { width: 16px; height: 16px; }

        .hdr-logo-text {
          font-size: 15px; font-weight: 900; color: #14532d;
          letter-spacing: -0.01em; line-height: 1;
        }

        /* Language toggle */
        .hdr-lang-toggle {
          display: flex; align-items: center;
          background: #f0fdf4; border: 1.5px solid #bbf7d0;
          border-radius: 100px; padding: 3px;
          cursor: pointer; gap: 2px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
          transition: box-shadow 0.15s;
        }
        .hdr-lang-toggle:hover { box-shadow: 0 2px 8px rgba(34,197,94,0.2); }

        .hdr-lang-seg {
          padding: 4px 10px; border-radius: 100px;
          font-size: 11px; font-weight: 800;
          transition: background 0.18s, color 0.18s, box-shadow 0.18s;
          color: #86efac; line-height: 1;
        }
        .hdr-lang-seg-active {
          background: linear-gradient(135deg, #22c55e, #15803d);
          color: white;
          box-shadow: 0 2px 8px rgba(34,197,94,0.35);
        }
      `}</style>

      <header className="hdr-root">
        <div className="hdr-inner">
          {/* Logo */}
          <div className="hdr-logo">
            <div className="hdr-logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 20c7 0 14-6 14-14-7 0-14 7-14 14z" />
                <path d="M9 15c1-2 3-4 5-5" />
              </svg>
            </div>
            <span className="hdr-logo-text">{t.title}</span>
          </div>

          {/* Language toggle */}
          <button className="hdr-lang-toggle" onClick={toggleLanguage}>
            <span className={`hdr-lang-seg ${language === 'en' ? 'hdr-lang-seg-active' : ''}`}>Eng</span>
            <span className={`hdr-lang-seg ${language === 'mr' ? 'hdr-lang-seg-active' : ''}`}>मराठी</span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;