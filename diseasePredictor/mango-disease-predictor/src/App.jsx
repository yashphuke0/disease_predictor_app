import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import BottomTabBar from './components/BottomTabBar';
import Home from './components/Home';
import ImageSource from './components/ImageSource';
import DiseaseInfo from './components/DiseaseInfo';
import Predict from './components/Predict';
import AboutModel from './components/AboutModel';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('en'); // 'en' for English, 'mr' for Marathi, 'hi' for Hindi
  const [uploadedImage, setUploadedImage] = useState(null);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      if (prev === 'en') return 'mr';
      if (prev === 'mr') return 'hi';
      return 'en';
    });
  };

  const handleStartScan = () => {
    setCurrentPage('image-source');
  };

  const handleCameraSelect = () => {
    // In a real app, this would open the camera
    // For demo, we'll simulate file selection
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImage(e.target.result);
          setCurrentPage('predict');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleGallerySelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImage(e.target.result);
          setCurrentPage('predict');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleBack = () => {
    if (currentPage === 'predict') {
      setCurrentPage('image-source');
      setUploadedImage(null);
    } else if (currentPage === 'image-source') {
      setCurrentPage('home');
    }
  };

  const handleNewScan = () => {
    setCurrentPage('home');
    setUploadedImage(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home language={language} onStartScan={handleStartScan} />;
      case 'image-source':
        return (
          <ImageSource 
            language={language} 
            onCameraSelect={handleCameraSelect}
            onGallerySelect={handleGallerySelect}
            onBack={handleBack}
          />
        );
      case 'disease-info':
        return <DiseaseInfo language={language} />;
      case 'predict':
        return (
          <Predict 
            language={language} 
            uploadedImage={uploadedImage}
            onBack={handleBack}
            onNewScan={handleNewScan}
          />
        );
      case 'about-model':
        return <AboutModel language={language} />;
      default:
        return <Home language={language} onStartScan={handleStartScan} />;
    }
  };

  return (
    <div className="app">
      <Header language={language} toggleLanguage={toggleLanguage} />
      <main className="main-content">
        {renderPage()}
      </main>
      <BottomTabBar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        language={language} 
      />
    </div>
  );
}

export default App;