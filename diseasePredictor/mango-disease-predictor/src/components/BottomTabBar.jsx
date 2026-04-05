import React from 'react';

// ─── Icon components (unchanged logic, same SVG paths) ───────────────────────

const IconHome = ({ active }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"
    fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
    style={{ stroke: active ? "#15803d" : "#94a3b8", transition: "stroke 0.2s ease" }}>
    <path d="M4 11.5L12 4l8 7.5" />
    <path d="M5.5 10.5V20h13v-9.5" />
  </svg>
);

const IconLeaf = ({ active }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"
    fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
    style={{ stroke: active ? "#15803d" : "#94a3b8", transition: "stroke 0.2s ease" }}>
    <path d="M5 20c7 0 14-6 14-14-7 0-14 7-14 14z" />
    <path d="M9 15c1-2 3-4 5-5" />
  </svg>
);

const IconScan = ({ active }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"
    fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
    style={{ stroke: active ? "white" : "white", transition: "stroke 0.2s ease" }}>
    <rect x="8" y="8" width="8" height="8" rx="2" />
    <path d="M4 10V6a2 2 0 0 1 2-2h4" />
    <path d="M16 4h2a2 2 0 0 1 2 2v4" />
    <path d="M20 14v4a2 2 0 0 1-2 2h-4" />
    <path d="M10 20H6a2 2 0 0 1-2-2v-4" />
  </svg>
);

const IconInfo = ({ active }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"
    fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
    style={{ stroke: active ? "#15803d" : "#94a3b8", transition: "stroke 0.2s ease" }}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 9v6" />
    <path d="M12 7h.01" />
  </svg>
);

// ─── BottomTabBar ─────────────────────────────────────────────────────────────

const BottomTabBar = ({ currentPage, setCurrentPage, language }) => {
  const texts = {
    en: { home: "Home", diseaseInfo: "Diseases", predict: "Predict", aboutModel: "Info" },
    mr: { home: "मुख्यपृष्ठ", diseaseInfo: "रोग", predict: "अंदाज", aboutModel: "माहिती" },
  };

  const t = texts[language] || texts['en'];

  const tabs = [
    { id: "home", label: t.home, icon: IconHome },
    { id: "disease-info", label: t.diseaseInfo, icon: IconLeaf },
    { id: "about-model", label: t.aboutModel, icon: IconInfo },
  ];

  const handleTabClick = (tabId) => {
    if (["home", "disease-info", "about-model"].includes(tabId)) {
      setCurrentPage(tabId);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&display=swap');

        .btb-root * { box-sizing: border-box; font-family: 'Nunito', sans-serif; }

        .btb-root {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  background: white;
  border-top: 1px solid #f0fdf4;
  padding: 8px 12px;
  padding-bottom: max(10px, env(safe-area-inset-bottom));
  box-shadow: 0 -4px 20px rgba(0,0,0,0.07);
}

        .btb-item {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 3px; padding: 4px 0; cursor: pointer;
          border: none; background: transparent;
          transition: opacity 0.15s;
          position: relative;
        }
        .btb-item:active { opacity: 0.7; }

        /* Active indicator pill */
        .btb-indicator {
          position: absolute; top: -4px;
          width: 20px; height: 3px; border-radius: 2px;
          background: #22c55e;
          transition: opacity 0.2s;
        }
        .btb-indicator-hidden { opacity: 0; }

        .btb-icon-wrap {
          width: 36px; height: 36px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .btb-icon-active { background: #f0fdf4; }
        .btb-icon-cta {
          background: linear-gradient(135deg, #22c55e, #15803d) !important;
          box-shadow: 0 4px 14px rgba(34,197,94,0.4);
          border-radius: 14px;
        }

        .btb-label {
          font-size: 10px; font-weight: 700; line-height: 1;
          transition: color 0.2s;
        }
        .btb-label-active { color: #15803d; }
        .btb-label-inactive { color: #94a3b8; }
        .btb-label-cta { color: #15803d; font-weight: 800; }
      `}</style>

      <nav className="btb-root">
        {tabs.map((tab) => {
          const isActive = currentPage === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className="btb-item"
              onClick={() => handleTabClick(tab.id)}
            >
              <span className={`btb-indicator ${isActive && !tab.isCta ? '' : 'btb-indicator-hidden'}`} />
              <span className={`btb-icon-wrap ${tab.isCta ? 'btb-icon-cta' : isActive ? 'btb-icon-active' : ''}`}>
                <Icon active={isActive} />
              </span>
              <span className={`btb-label ${tab.isCta ? 'btb-label-cta' : isActive ? 'btb-label-active' : 'btb-label-inactive'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export { BottomTabBar };
export default BottomTabBar;