import React, { useState, useEffect } from 'react';
import { predictDiseaseAPI, checkAPIHealth, wakeUpBackend } from '../utils/modelLoaderAPI';

const Predict = ({ language, uploadedImage, onBack, onNewScan }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [apiAvailable, setApiAvailable] = useState(null);
  const [isWakingUp, setIsWakingUp] = useState(true);
  const [activeSection, setActiveSection] = useState('symptoms');

  const texts = {
    en: {
      title: "Disease Analysis",
      analyzing: "Analyzing your plant...",
      identifying: "Running AI model",
      startingServer: "Starting server...",
      serverWakeHint: "Free server takes 30–60s to wake up. Please wait...",
      result: "Detected Condition",
      confidence: "AI Confidence",
      overview: "Overview",
      sections: {
        symptoms: "Symptoms",
        favorableConditions: "Conditions",
        pesticides: "Pesticides",
        physicalAndBiologicalControl: "Biocontrol",
        preventiveMeasures: "Prevention",
      },
      tryAgain: "Scan Another Plant",
      back: "Back",
      severity: "Severity",
      severityHigh: "High",
      severityLow: "Low",
      category: "Category",
      notAvailable: "No information available for this section.",
      mapCardTitle: "Visit or contact",
      mapCardHint: "Tap the map to open this place in Google Maps",
      mapCardOpen: "Open in Google Maps",
      imageAlt: "Plant leaf",
      imageChip: "Tomato Leaf",
      analysisFailed: "Analysis Failed",
      retry: "Try Again",
      backendStartTitle: "To start the backend server:",
      backendStep1: "Open terminal in your project folder",
      backendStep2: "Run:",
      backendStep3: "Run:",
      backendStep4: "Refresh this page",
      healthyBannerTitle: "Looking Great!",
    },
    mr: {
      title: "रोग विश्लेषण",
      analyzing: "आपली वनस्पती तपासत आहे...",
      identifying: "AI मॉडेल चालवत आहे",
      startingServer: "सर्व्हर सुरू होत आहे...",
      serverWakeHint: "मोफत सर्व्हरला सुरू होण्यास ३०–६० सेकंद लागू शकतात. कृपया प्रतीक्षा करा...",
      result: "आढळलेली स्थिती",
      confidence: "AI आत्मविश्वास",
      overview: "संक्षिप्त माहिती",
      sections: {
        symptoms: "लक्षणे",
        favorableConditions: "परिस्थिती",
        pesticides: "औषधे",
        physicalAndBiologicalControl: "जैविक नियंत्रण",
        preventiveMeasures: "प्रतिबंध",
      },
      tryAgain: "दुसरी वनस्पती स्कॅन करा",
      back: "मागे",
      severity: "तीव्रता",
      severityHigh: "जास्त",
      severityLow: "कमी",
      category: "प्रकार",
      notAvailable: "या विभागासाठी माहिती उपलब्ध नाही.",
      mapCardTitle: "भेट द्या किंवा संपर्क",
      mapCardHint: "Google Maps मध्ये ठिकाण उघडण्यासाठी नकाशावर टॅप करा",
      mapCardOpen: "Google Maps मध्ये उघडा",
      imageAlt: "वनस्पतीचे पान",
      imageChip: "टोमॅटो पान",
      analysisFailed: "विश्लेषण अयशस्वी",
      retry: "पुन्हा प्रयत्न करा",
      backendStartTitle: "बॅकएंड सर्व्हर सुरू करण्यासाठी:",
      backendStep1: "प्रोजेक्ट फोल्डरमध्ये टर्मिनल उघडा",
      backendStep2: "चालवा:",
      backendStep3: "चालवा:",
      backendStep4: "हे पृष्ठ रीफ्रेश करा",
      healthyBannerTitle: "छान आहे!",
    },
    hi: {
      title: "रोग विश्लेषण",
      analyzing: "आपके पौधे का विश्लेषण हो रहा है...",
      identifying: "AI मॉडल चल रहा है",
      startingServer: "सर्वर शुरू हो रहा है...",
      serverWakeHint: "फ्री सर्वर को शुरू होने में 30-60 सेकंड लग सकते हैं। कृपया प्रतीक्षा करें...",
      result: "पहचानी गई स्थिति",
      confidence: "AI भरोसा",
      overview: "संक्षिप्त जानकारी",
      sections: {
        symptoms: "लक्षण",
        favorableConditions: "स्थितियां",
        pesticides: "दवाइयां",
        physicalAndBiologicalControl: "जैविक नियंत्रण",
        preventiveMeasures: "रोकथाम",
      },
      tryAgain: "दूसरा पौधा स्कैन करें",
      back: "वापस",
      severity: "गंभीरता",
      severityHigh: "उच्च",
      severityLow: "कम",
      category: "प्रकार",
      notAvailable: "इस सेक्शन के लिए जानकारी उपलब्ध नहीं है।",
      mapCardTitle: "भेंट करें या संपर्क करें",
      mapCardHint: "Google Maps में यह स्थान खोलने के लिए मैप पर टैप करें",
      mapCardOpen: "Google Maps में खोलें",
      imageAlt: "पौधे का पत्ता",
      imageChip: "टमाटर पत्ता",
      analysisFailed: "विश्लेषण विफल",
      retry: "फिर से प्रयास करें",
      backendStartTitle: "बैकएंड सर्वर शुरू करने के लिए:",
      backendStep1: "अपने प्रोजेक्ट फोल्डर में टर्मिनल खोलें",
      backendStep2: "चलाएं:",
      backendStep3: "चलाएं:",
      backendStep4: "यह पेज रीफ्रेश करें",
      healthyBannerTitle: "बहुत बढ़िया!",
    },
  };

  const HELP_LOCATION_MAP_URL = 'https://maps.app.goo.gl/KbihfYT2XuNFZXKg9';

  const t = texts[language] || texts['en'];

  const rawDiseaseContent = {
    early_blight: {
      diseaseName: { en: "Early Blight", mr: "आगाट करपा" },
      type: { en: "Fungal", mr: "बुरशीजन्य" },
      icon: "🍂",
      color: "#d97706",
      shortDesc: {
        en: "A fungal disease causing brown concentric ring spots on older leaves, leading to yellowing and premature defoliation.",
        mr: "बुरशीमुळे जुन्या पानांवर गोल कड्यांसह तपकिरी डाग पडतात. पाने पिवळी पडून गळतात.",
      },
      symptoms: { en: ["Circular brown/black spots with concentric rings on lower leaves", "Spots gradually merge, leaves turn yellow and drop early"], mr: ["पानांवर वर्तुळाकार तपकिरी/काळे डाग दिसतात", "डाग एकत्र येऊन पाने पिवळी पडतात व गळतात"] },
      favorableConditions: { en: ["Warm temperatures between 24°C–29°C", "Wet weather and high humidity above 80%"], mr: ["उबदार तापमान २४°C–२९°C", "दमट/ओले हवामान व जास्त आर्द्रता"] },
      pesticides: { en: ["Copper hydroxide — 2 g per litre of water", "Mancozeb 75% WP — 3 g per litre of water"], mr: ["कॉपर हायड्रॉक्साईड — २ ग्रॅम प्रति लिटर", "मॅनकोझेब ७५% WP — ३ ग्रॅम प्रति लिटर"] },
      physicalAndBiologicalControl: { en: ["Prune lower leaves close to the soil surface", "Switch to drip irrigation to avoid wetting leaves"], mr: ["जमिनीलगतची पाने/फांद्या छाटून टाका", "तुषार सिंचनाऐवजी ठिबक सिंचन वापरा"] },
      preventiveMeasures: { en: ["Always use certified disease-free seeds", "Maintain proper plant spacing for good airflow"], mr: ["प्रमाणित व रोगमुक्त बियाणे वापरा", "हवा खेळती राहण्यासाठी योग्य अंतर ठेवा"] },
    },
    late_blight: {
      diseaseName: { en: "Late Blight", mr: "उशिरा करपा" },
      type: { en: "Fungal", mr: "बुरशीजन्य" },
      icon: "🌑",
      color: "#7c3aed",
      shortDesc: { en: "A devastating fungal disease with water-soaked lesions that turn black rapidly in cool, wet weather.", mr: "थंड, ओल्या हवामानात पाणचट डाग पटकन काळे होणारा गंभीर बुरशीजन्य रोग." },
      symptoms: { en: ["Irregular water-soaked lesions on leaves and stems turning dark brown to black", "White fungal growth visible under leaves in humid conditions"], mr: ["पाने/खोडांवर पाणचट काळे-तपकिरी डाग", "ओलसर हवेत पानांच्या खाली पांढरी बुरशी वाढते"] },
      favorableConditions: { en: ["Cool temperatures between 12°C–23°C", "Rain, fog, and humidity above 90%"], mr: ["१२°C–२३°C थंड तापमान", "पाऊस/धुके आणि ९०% पेक्षा जास्त आर्द्रता"] },
      pesticides: { en: ["Mancozeb 35% SC — as per label", "Copper oxychloride 50 WP — as per label"], mr: ["मॅनकोझेब ३५% SC", "कॉपर ऑक्सिक्लोराईड ५० WP"] },
      physicalAndBiologicalControl: { en: ["Remove and destroy infected plants immediately", "Apply Trichoderma asperellum to the soil"], mr: ["रोगग्रस्त झाडे त्वरित काढा", "मातीत ट्रायकोडर्मा एस्पेरेलम वापरा"] },
      preventiveMeasures: { en: ["Never plant tomatoes and potatoes side by side", "Follow 2–3 year crop rotation schedule"], mr: ["टोमॅटो व बटाटा शेजारी लावू नका", "२–३ वर्षांची पीक फेरपालट करा"] },
    },
    yellow_leaf_curl_virus: {
      diseaseName: { en: "Yellow Leaf Curl Virus", mr: "पर्णगुंडाळी विषाणू" },
      type: { en: "Viral", mr: "विषाणूजन्य" },
      icon: "🌀",
      color: "#dc2626",
      shortDesc: { en: "A whitefly-transmitted viral disease causing curled yellow leaves and severe stunting of growth.", mr: "पांढऱ्या माशीमार्फत पसरणारा विषाणूजन्य रोग; पाने वळतात, पिवळी पडतात आणि वाढ खुंटते." },
      symptoms: { en: ["Leaves curl upward and turn yellow from edges inward", "Plant growth is severely stunted with bushy appearance and flower drop"], mr: ["पाने वर वळतात व पिवळी पडतात", "वाढ खुंटते आणि फुले गळतात"] },
      favorableConditions: { en: ["Active whitefly infestations in the field", "Warm tropical and subtropical weather conditions"], mr: ["पांढऱ्या माशीचा प्रादुर्भाव", "उबदार/उष्णकटिबंधीय हवामान"] },
      pesticides: { en: ["Neonicotinoids for controlling whitefly vector"], mr: ["पांढऱ्या माशी नियंत्रणासाठी निओनिकोटिनॉइड्स"] },
      physicalAndBiologicalControl: { en: ["Cover nursery beds with insect-proof nets", "Remove and destroy infected plants at earliest signs"], mr: ["कीटक-प्रतिबंधक जाळी वापरा", "रोगग्रस्त झाडे लवकर काढून नष्ट करा"] },
      preventiveMeasures: { en: ["Plant TYLCV-resistant tomato varieties", "Keep field borders clear of weeds to reduce whitefly habitat"], mr: ["TYLCV-प्रतिरोधक जाती वापरा", "शेताच्या कडेला तण होऊ देऊ नका"] },
    },
    bacterial_spot: {
      diseaseName: { en: "Bacterial Spot", mr: "जिवाणू ठिपके" },
      type: { en: "Bacterial", mr: "जीवाणूजन्य" },
      icon: "🔬",
      color: "#0891b2",
      shortDesc: { en: "Bacterial infection causing dark water-soaked spots on leaves, stems, and fruits.", mr: "जीवाणूमुळे पाने, खोड आणि फळांवर काळसर पाणचट डाग पडतात." },
      symptoms: { en: ["Small dark spots with yellow halos on leaves, stems and fruits", "Heavy infection causes rapid leaf drop and fruit blemishes"], mr: ["लहान गडद डाग व पिवळा कडा दिसू शकतो", "तीव्र प्रादुर्भावात पाने गळतात"] },
      favorableConditions: { en: ["Warm and humid weather above 25°C", "Rainsplash and overhead irrigation spread the bacteria"], mr: ["उबदार आणि दमट हवामान", "पावसाची उडणारी थेंब आणि वरून सिंचन"] },
      pesticides: { en: ["Copper-based bactericides — apply as per product label"], mr: ["लेबलनुसार कॉपर-आधारित बॅक्टेरिसाइड वापरा"] },
      physicalAndBiologicalControl: { en: ["Remove infected leaves as soon as spotted", "Avoid working with plants when foliage is wet"], mr: ["संक्रमित पाने लवकर काढा", "पाने ओली असताना झाडे हाताळू नका"] },
      preventiveMeasures: { en: ["Use only certified disease-free seeds and transplants", "Disinfect tools regularly, especially between plants"], mr: ["रोगमुक्त बियाणे/रोपे वापरा", "साधने नियमित निर्जंतुक ठेवा"] },
    },
    septoria_leaf_spot: {
      diseaseName: { en: "Septoria Leaf Spot", mr: "सेप्टोरिया ठिपके" },
      type: { en: "Fungal", mr: "बुरशीजन्य" },
      icon: "⚫",
      color: "#374151",
      shortDesc: { en: "Numerous tiny circular spots with dark borders, usually starting on lower leaves and spreading upward.", mr: "खालच्या पानांपासून सुरू होणारे गडद कडांसह लहान गोल ठिपके." },
      symptoms: { en: ["Tiny circular spots with pale white/gray centers and dark borders", "Heavy infection causes early defoliation starting from bottom leaves"], mr: ["फिकट मध्यभागासह लहान गोल डाग", "जास्त प्रादुर्भावात पाने अकाली गळतात"] },
      favorableConditions: { en: ["Warm weather with prolonged leaf wetness", "Dense canopy with poor air movement"], mr: ["उबदार हवामान आणि जास्त वेळ ओलावा", "दाट पर्णसंभार व कमी वायुप्रवाह"] },
      pesticides: { en: ["Mancozeb or Chlorothalonil — as per local recommendation"], mr: ["शिफारसीनुसार मॅन्कोझेब/क्लोरोथॅलोनिल वापरा"] },
      physicalAndBiologicalControl: { en: ["Prune and remove infected lower leaves regularly", "Mulch the soil to reduce water splash spread"], mr: ["खालची संक्रमित पाने छाटून टाका", "प्रसार कमी करण्यासाठी मल्च वापरा"] },
      preventiveMeasures: { en: ["Rotate crops each season and remove all plant debris", "Water only at the root zone, never overhead"], mr: ["पीक फेरपालट करा आणि अवशेष काढा", "पानांवर न देता मुळाजवळ पाणी द्या"] },
    },
    leaf_mold: {
      diseaseName: { en: "Leaf Mold", mr: "पर्णबुरशी रोग" },
      type: { en: "Fungal", mr: "बुरशीजन्य" },
      icon: "🌿",
      color: "#65a30d",
      shortDesc: { en: "Common in greenhouses — yellow patches form above and olive-gray mold develops beneath the leaves.", mr: "हरितगृहात सामान्य; पानांवर पिवळे डाग आणि खालच्या बाजूस राखाडी बुरशी." },
      symptoms: { en: ["Yellow patches appear on the upper leaf surface", "Olive-gray to brown mold develops on the underside of leaves"], mr: ["वरच्या बाजूस पिवळे डाग दिसतात", "खालच्या बाजूस ऑलिव-राखाडी बुरशी वाढते"] },
      favorableConditions: { en: ["High humidity above 85% with poor ventilation"], mr: ["जास्त आर्द्रता आणि कमी हवादारी"] },
      pesticides: { en: ["Apply a suitable fungicide at the first sign of symptoms"], mr: ["लक्षणे दिसताच योग्य फंगीसाइड फवारणी करा"] },
      physicalAndBiologicalControl: { en: ["Improve greenhouse ventilation immediately", "Remove and bag infected foliage quickly"], mr: ["हवादारी वाढवा", "संक्रमित पाने त्वरित काढा"] },
      preventiveMeasures: { en: ["Avoid overcrowding plants to allow airflow", "Use drip irrigation to keep leaf surfaces dry"], mr: ["झाडांची अतिदाट लागवड टाळा", "पाने कोरडी ठेवण्यासाठी ठिबक सिंचन वापरा"] },
    },
    spider_mites: {
      diseaseName: { en: "Spider Mites", mr: "कोळी माइट" },
      type: { en: "Pest", mr: "कीड" },
      icon: "🕷",
      color: "#b45309",
      shortDesc: { en: "Tiny spider-like pests that feed on leaf cells, causing yellow stippling and fine silk webbing.", mr: "सूक्ष्म कोळ्यासारखी कीड पानांच्या पेशी खात असल्याने पिवळे ठिपके व जाळे दिसते." },
      symptoms: { en: ["Tiny yellow or bronze speckles covering the upper leaf surface", "Fine silky webbing visible on the underside of leaves"], mr: ["पानांवर सूक्ष्म पिवळे ठिपके", "पानांच्या खालच्या बाजूस बारीक जाळे"] },
      favorableConditions: { en: ["Hot and dry weather accelerates rapid population buildup"], mr: ["उष्ण आणि कोरड्या हवामानात प्रादुर्भाव वाढतो"] },
      pesticides: { en: ["Use a recommended miticide or insecticidal soap spray"], mr: ["शिफारसीप्रमाणे माइटिसाइड/कीटकनाशक साबण वापरा"] },
      physicalAndBiologicalControl: { en: ["Spray leaf undersides forcefully with water to dislodge mites", "Preserve and encourage predatory mite populations"], mr: ["पानांच्या खालच्या बाजूस पाण्याचा फवारा द्या", "उपयुक्त भक्षक माइट्सचे संवर्धन करा"] },
      preventiveMeasures: { en: ["Scout regularly and intervene early before populations explode", "Avoid over-applying nitrogen fertilizer which promotes soft growth"], mr: ["नियमित निरीक्षण करून लवकर नियंत्रण करा", "अतिरिक्त नत्र खत टाळा"] },
    },
    target_spot: {
      diseaseName: { en: "Target Spot", mr: "लक्ष्यवेध ठिपके" },
      type: { en: "Fungal", mr: "बुरशीजन्य" },
      icon: "🎯",
      color: "#9333ea",
      shortDesc: { en: "Fungal disease with distinctive target-like concentric ring lesions on leaves, stems and fruits.", mr: "पाने, खोड व फळांवर लक्ष्यसदृश केंद्रित वर्तुळाकार डाग पडणारा बुरशीजन्य रोग." },
      symptoms: { en: ["Circular lesions with a series of concentric rings resembling a bullseye", "In humid weather spots enlarge rapidly and merge together"], mr: ["केंद्रित वर्तुळांसह गोल डाग", "दमट हवेत डाग मोठे होऊन एकत्र येतात"] },
      favorableConditions: { en: ["Warm and humid conditions with prolonged wetness on leaves"], mr: ["उबदार दमट हवामान व पानांवर जास्त ओलावा"] },
      pesticides: { en: ["Use registered fungicides as per local agricultural advisory"], mr: ["सल्ल्यानुसार नोंदणीकृत फंगीसाइड वापरा"] },
      physicalAndBiologicalControl: { en: ["Remove affected leaves and plant debris from the field", "Improve air movement through pruning"], mr: ["संक्रमित पाने व अवशेष काढा", "पिकात हवेचा प्रवाह वाढवा"] },
      preventiveMeasures: { en: ["Maintain plant spacing and avoid keeping leaves wet", "Practice crop rotation each season"], mr: ["योग्य अंतर ठेवा आणि पानांवर ओलावा टाळा", "पीक फेरपालट करा"] },
    },
    tomato_mosaic_virus: {
      diseaseName: { en: "Tomato Mosaic Virus", mr: "चित्री विषाणू रोग" },
      type: { en: "Viral", mr: "विषाणूजन्य" },
      icon: "🧬",
      color: "#e11d48",
      shortDesc: { en: "A highly contagious virus spread via sap, tools and hands — causes mosaic leaf patterns and distortion.", mr: "रस, साधने व हातांद्वारे पसरणारा संसर्गजन्य विषाणू; पानांवर मोझेक नमुने व विकृती दिसते." },
      symptoms: { en: ["Light and dark green mosaic or mottled pattern across leaves", "Leaves become distorted, curled and plant vigor reduces significantly"], mr: ["फिकट-गडद हिरवा मोझेक नमुना", "पाने विकृत होतात व वाढ कमी होते"] },
      favorableConditions: { en: ["Spreads through contaminated sap, tools and hands during field work"], mr: ["रस, दूषित साधने व हाताळणीमुळे प्रसार होतो"] },
      pesticides: { en: ["No direct chemical cure — focus on hygiene and vector management"], mr: ["थेट औषध नाही; स्वच्छता व कीड नियंत्रणावर भर द्या"] },
      physicalAndBiologicalControl: { en: ["Remove and destroy infected plants promptly", "Disinfect all tools between every plant during pruning"], mr: ["संक्रमित झाडे त्वरित काढा", "साधने प्रत्येक झाडानंतर निर्जंतुक करा"] },
      preventiveMeasures: { en: ["Start with certified virus-free seedlings only", "Wash hands thoroughly and avoid tobacco during plant handling"], mr: ["प्रमाणित निरोगी रोपे वापरा", "हाताळणीदरम्यान तंबाखूजन्य संसर्ग टाळा"] },
    },
    healthy: {
      diseaseName: { en: "Healthy Plant", mr: "निरोगी झाड" },
      type: { en: "Healthy", mr: "निरोगी" },
      icon: "✅",
      color: "#16a34a",
      shortDesc: { en: "Great news! Your plant looks healthy with no visible signs of disease or pest damage.", mr: "झाड निरोगी दिसत आहे आणि रोग/कीडीची लक्षणे दिसत नाहीत." },
      symptoms: { en: ["Uniform natural leaf color — no abnormal spots or discoloration", "No lesions, mold growth, webbing or wilting observed"], mr: ["पानांचा रंग एकसमान व नैसर्गिक", "डाग, बुरशी किंवा जाळे दिसत नाही"] },
      favorableConditions: { en: ["Balanced nutrition, correct irrigation and good airflow maintained"], mr: ["संतुलित पोषण, योग्य पाणी आणि चांगला वायुप्रवाह"] },
      pesticides: { en: ["No pesticide treatment required — continue monitoring"], mr: ["झाड निरोगी असल्यास औषधाची गरज नसते"] },
      physicalAndBiologicalControl: { en: ["Continue regular field scouting for early detection", "Maintain field sanitation and remove weeds"], mr: ["नियमित शेतनिरीक्षण सुरू ठेवा", "स्वच्छता ठेवा आणि तण नियंत्रण करा"] },
      preventiveMeasures: { en: ["Follow preventive spray schedule as locally advised", "Avoid overwatering and underwatering stress on the plant"], mr: ["स्थानिक सल्ल्यानुसार प्रतिबंधक फवारणी करा", "जास्त/कमी पाण्याचा ताण टाळा"] },
    },
  };
  const diseaseHindiTranslations = {
    early_blight: {
      diseaseName: "अर्ली ब्लाइट",
      type: "फफूंदजनित",
      shortDesc: "यह फफूंदजनित रोग पुराने पत्तों पर छल्लेदार भूरे धब्बे बनाता है, जिससे पत्ते पीले होकर जल्दी गिरने लगते हैं।",
      symptoms: [
        "निचली पत्तियों पर गोल भूरे/काले छल्लेदार धब्बे बनते हैं।",
        "धब्बे आपस में मिलते हैं, पत्ते पीले पड़ते हैं और जल्दी झड़ते हैं।",
      ],
      favorableConditions: [
        "24°C-29°C के बीच गर्म तापमान।",
        "गीला मौसम और 80% से अधिक आर्द्रता।",
      ],
      pesticides: [
        "कॉपर हाइड्रॉक्साइड - 2 ग्राम प्रति लीटर पानी",
        "मैन्कोजेब 75% WP - 3 ग्राम प्रति लीटर पानी",
      ],
      physicalAndBiologicalControl: [
        "मिट्टी के पास की निचली पत्तियां और शाखाएं छांटें।",
        "पत्तियों को गीला होने से बचाने के लिए ड्रिप सिंचाई अपनाएं।",
      ],
      preventiveMeasures: [
        "हमेशा प्रमाणित रोगमुक्त बीज का उपयोग करें।",
        "हवा के अच्छे प्रवाह के लिए उचित पौध दूरी रखें।",
      ],
    },
    late_blight: {
      diseaseName: "लेट ब्लाइट",
      type: "फफूंदजनित",
      shortDesc: "ठंडे और गीले मौसम में तेजी से फैलने वाला गंभीर फफूंदजनित रोग, जिसमें पानी जैसे धब्बे जल्दी काले पड़ जाते हैं।",
      symptoms: [
        "पत्तों और तनों पर अनियमित पानी जैसे धब्बे गहरे भूरे/काले हो जाते हैं।",
        "नम मौसम में पत्तों के नीचे सफेद फफूंद वृद्धि दिखती है।",
      ],
      favorableConditions: [
        "12°C-23°C के बीच ठंडा तापमान।",
        "बारिश, कोहरा और 90% से अधिक आर्द्रता।",
      ],
      pesticides: [
        "मैन्कोजेब 35% SC - लेबल अनुसार",
        "कॉपर ऑक्सीक्लोराइड 50 WP - लेबल अनुसार",
      ],
      physicalAndBiologicalControl: [
        "संक्रमित पौधों को तुरंत हटाकर नष्ट करें।",
        "मिट्टी में Trichoderma asperellum का प्रयोग करें।",
      ],
      preventiveMeasures: [
        "टमाटर और आलू को पास-पास न लगाएं।",
        "2-3 वर्ष का फसल चक्र अपनाएं।",
      ],
    },
    yellow_leaf_curl_virus: {
      diseaseName: "येलो लीफ कर्ल वायरस",
      type: "विषाणुजनित",
      shortDesc: "सफेद मक्खी से फैलने वाला विषाणु रोग; पत्तियां मुड़ती हैं, पीली पड़ती हैं और पौधे की वृद्धि रुक जाती है।",
      symptoms: [
        "पत्तियां ऊपर की ओर मुड़ती हैं और किनारों से पीली होती हैं।",
        "पौधा बौना रहता है, झाड़ीदार दिखता है और फूल झड़ते हैं।",
      ],
      favorableConditions: [
        "खेत में सक्रिय सफेद मक्खी का प्रकोप।",
        "गर्म उष्णकटिबंधीय और उपोष्णकटिबंधीय मौसम।",
      ],
      pesticides: [
        "सफेद मक्खी नियंत्रण हेतु नियोनिकोटिनॉइड्स का उपयोग करें।",
      ],
      physicalAndBiologicalControl: [
        "नर्सरी पर कीटरोधी जाली का उपयोग करें।",
        "प्रारंभिक लक्षण पर संक्रमित पौधे हटाकर नष्ट करें।",
      ],
      preventiveMeasures: [
        "TYLCV-रोधी टमाटर किस्में लगाएं।",
        "सफेद मक्खी आवास कम करने हेतु मेड़ों पर खरपतवार न बढ़ने दें।",
      ],
    },
    bacterial_spot: {
      diseaseName: "बैक्टीरियल स्पॉट",
      type: "जीवाणुजनित",
      shortDesc: "जीवाणु संक्रमण से पत्तों, तनों और फलों पर गहरे पानी जैसे धब्बे बनते हैं।",
      symptoms: [
        "पत्तों, तनों और फलों पर पीले घेरे वाले छोटे गहरे धब्बे।",
        "अधिक संक्रमण में पत्तियां तेजी से झड़ती हैं और फल दागदार होते हैं।",
      ],
      favorableConditions: [
        "25°C से अधिक गर्म और नम मौसम।",
        "बारिश की छींटें और ऊपर से सिंचाई से जीवाणु फैलते हैं।",
      ],
      pesticides: [
        "कॉपर आधारित बैक्टीरिसाइड - उत्पाद लेबल अनुसार प्रयोग करें।",
      ],
      physicalAndBiologicalControl: [
        "संक्रमित पत्तियां दिखते ही हटा दें।",
        "पत्तियां गीली होने पर पौधों को हाथ न लगाएं।",
      ],
      preventiveMeasures: [
        "केवल प्रमाणित रोगमुक्त बीज और पौध उपयोग करें।",
        "औजार नियमित रूप से, खासकर पौधे बदलते समय, कीटाणुरहित करें।",
      ],
    },
    septoria_leaf_spot: {
      diseaseName: "सेप्टोरिया लीफ स्पॉट",
      type: "फफूंदजनित",
      shortDesc: "छोटे गोल गहरे किनारों वाले धब्बे, जो नीचे की पत्तियों से शुरू होकर ऊपर फैलते हैं।",
      symptoms: [
        "हल्के सफेद/धूसर केंद्र और गहरे किनारों वाले छोटे गोल धब्बे।",
        "भारी संक्रमण में निचली पत्तियों से शुरू होकर जल्दी पत्ती झड़ना।",
      ],
      favorableConditions: [
        "गर्म मौसम और पत्तियों पर लंबे समय तक नमी।",
        "घना पौध आवरण और कम हवा का प्रवाह।",
      ],
      pesticides: [
        "स्थानीय सिफारिश अनुसार मैन्कोजेब या क्लोरोथैलोनिल।",
      ],
      physicalAndBiologicalControl: [
        "निचली संक्रमित पत्तियां नियमित रूप से छांटकर हटाएं।",
        "पानी की छींटों से फैलाव घटाने हेतु मिट्टी पर मल्च डालें।",
      ],
      preventiveMeasures: [
        "हर मौसम में फसल चक्र अपनाएं और अवशेष हटाएं।",
        "सिर्फ जड़ क्षेत्र में पानी दें, ऊपर से सिंचाई न करें।",
      ],
    },
    leaf_mold: {
      diseaseName: "लीफ मोल्ड",
      type: "फफूंदजनित",
      shortDesc: "ग्रीनहाउस में सामान्य रोग; ऊपर पीले धब्बे और नीचे जैतूनी-धूसर फफूंद बनती है।",
      symptoms: [
        "पत्तियों की ऊपरी सतह पर पीले धब्बे बनते हैं।",
        "पत्तियों की निचली सतह पर जैतूनी-धूसर से भूरे रंग की फफूंद बनती है।",
      ],
      favorableConditions: [
        "85% से अधिक आर्द्रता और खराब वेंटिलेशन।",
      ],
      pesticides: [
        "लक्षण दिखते ही उपयुक्त फफूंदनाशी का छिड़काव करें।",
      ],
      physicalAndBiologicalControl: [
        "ग्रीनहाउस का वेंटिलेशन तुरंत सुधारें।",
        "संक्रमित पत्तियां जल्दी हटाकर अलग करें।",
      ],
      preventiveMeasures: [
        "हवा प्रवाह के लिए पौधों में अधिक भीड़ न होने दें।",
        "पत्तियां सूखी रखने के लिए ड्रिप सिंचाई अपनाएं।",
      ],
    },
    spider_mites: {
      diseaseName: "स्पाइडर माइट",
      type: "कीट",
      shortDesc: "अत्यंत सूक्ष्म मकड़ी जैसे कीट पत्तियों की कोशिकाएं चूसते हैं, जिससे पीले धब्बे और महीन जाला बनता है।",
      symptoms: [
        "पत्तियों की ऊपरी सतह पर बहुत छोटे पीले या कांस्य धब्बे।",
        "पत्तियों की निचली सतह पर महीन रेशमी जाला।",
      ],
      favorableConditions: [
        "गर्म और शुष्क मौसम में इनकी संख्या तेजी से बढ़ती है।",
      ],
      pesticides: [
        "अनुशंसित माइटिसाइड या कीटनाशी साबुन स्प्रे का उपयोग करें।",
      ],
      physicalAndBiologicalControl: [
        "माइट हटाने के लिए पत्तियों की निचली सतह पर तेज पानी छिड़कें।",
        "शिकारी (लाभकारी) माइट्स का संरक्षण करें।",
      ],
      preventiveMeasures: [
        "नियमित निगरानी करें और संख्या बढ़ने से पहले नियंत्रण करें।",
        "अधिक नाइट्रोजन उर्वरक देने से बचें।",
      ],
    },
    target_spot: {
      diseaseName: "टारगेट स्पॉट",
      type: "फफूंदजनित",
      shortDesc: "पत्तों, तनों और फलों पर लक्ष्य जैसे छल्लेदार धब्बे बनते हैं।",
      symptoms: [
        "एक के अंदर एक छल्लों वाले गोल धब्बे (bullseye जैसे)।",
        "नम मौसम में धब्बे तेजी से बढ़कर आपस में मिलते हैं।",
      ],
      favorableConditions: [
        "गर्म और नम वातावरण तथा पत्तियों पर लंबे समय तक नमी।",
      ],
      pesticides: [
        "स्थानीय कृषि सलाह अनुसार पंजीकृत फफूंदनाशी उपयोग करें।",
      ],
      physicalAndBiologicalControl: [
        "संक्रमित पत्तियां और फसल अवशेष खेत से हटाएं।",
        "छंटाई करके हवा का प्रवाह बढ़ाएं।",
      ],
      preventiveMeasures: [
        "उचित पौध दूरी रखें और पत्तियां गीली रहने से बचाएं।",
        "हर मौसम में फसल चक्र अपनाएं।",
      ],
    },
    tomato_mosaic_virus: {
      diseaseName: "टमाटर मोज़ेक वायरस",
      type: "विषाणुजनित",
      shortDesc: "रस, औजार और हाथों से फैलने वाला अत्यधिक संक्रामक विषाणु; पत्तियों पर मोज़ेक पैटर्न और विकृति बनती है।",
      symptoms: [
        "पत्तियों पर हल्के-गहरे हरे मोज़ेक/चित्तीदार पैटर्न।",
        "पत्तियां विकृत, मुड़ी हुई और पौधे की ताकत कम हो जाती है।",
      ],
      favorableConditions: [
        "संक्रमित रस, औजार और हाथों से खेत कार्य के दौरान तेजी से फैलाव।",
      ],
      pesticides: [
        "सीधा रासायनिक इलाज नहीं - स्वच्छता और वाहक नियंत्रण पर ध्यान दें।",
      ],
      physicalAndBiologicalControl: [
        "संक्रमित पौधे तुरंत हटाकर नष्ट करें।",
        "छंटाई के दौरान हर पौधे के बीच औजार कीटाणुरहित करें।",
      ],
      preventiveMeasures: [
        "केवल प्रमाणित विषाणुमुक्त पौध/नर्सरी सामग्री का उपयोग करें।",
        "पौधों को संभालते समय हाथ धोएं और तंबाकू संपर्क से बचें।",
      ],
    },
    healthy: {
      diseaseName: "स्वस्थ पौधा",
      type: "स्वस्थ",
      shortDesc: "बहुत अच्छी बात! आपके पौधे में रोग या कीट क्षति के स्पष्ट लक्षण नहीं हैं।",
      symptoms: [
        "पत्तियों का रंग प्राकृतिक और एकसमान है, कोई असामान्य धब्बा नहीं।",
        "घाव, फफूंद, जाला या मुरझाहट नहीं दिखती।",
      ],
      favorableConditions: [
        "संतुलित पोषण, उचित सिंचाई और अच्छा वायु प्रवाह बना हुआ है।",
      ],
      pesticides: [
        "पौधा स्वस्थ है - फिलहाल दवा की आवश्यकता नहीं, केवल निगरानी जारी रखें।",
      ],
      physicalAndBiologicalControl: [
        "शुरुआती पहचान हेतु नियमित खेत निरीक्षण जारी रखें।",
        "खेत स्वच्छ रखें और खरपतवार हटाते रहें।",
      ],
      preventiveMeasures: [
        "स्थानीय सलाह अनुसार निवारक स्प्रे शेड्यूल का पालन करें।",
        "अधिक या कम सिंचाई से होने वाले तनाव से बचाएं।",
      ],
    },
  };

  const mergeHindiDisease = (key, disease) => {
    const hi = diseaseHindiTranslations[key];
    if (!hi) return disease;
    return {
      ...disease,
      diseaseName: { ...disease.diseaseName, hi: hi.diseaseName },
      type: { ...disease.type, hi: hi.type },
      shortDesc: { ...disease.shortDesc, hi: hi.shortDesc },
      symptoms: { ...disease.symptoms, hi: hi.symptoms },
      favorableConditions: { ...disease.favorableConditions, hi: hi.favorableConditions },
      pesticides: { ...disease.pesticides, hi: hi.pesticides },
      physicalAndBiologicalControl: { ...disease.physicalAndBiologicalControl, hi: hi.physicalAndBiologicalControl },
      preventiveMeasures: { ...disease.preventiveMeasures, hi: hi.preventiveMeasures },
    };
  };

  const diseaseContent = Object.fromEntries(
    Object.entries(rawDiseaseContent).map(([key, value]) => [key, mergeHindiDisease(key, value)])
  );

  const modelToDiseaseId = {
    Tomato___Early_blight: "early_blight",
    Tomato___Late_blight: "late_blight",
    Tomato___Tomato_Yellow_Leaf_Curl_Virus: "yellow_leaf_curl_virus",
    Tomato___Bacterial_spot: "bacterial_spot",
    Tomato___Septoria_leaf_spot: "septoria_leaf_spot",
    Tomato___Leaf_Mold: "leaf_mold",
    "Tomato___Spider_mites Two-spotted_spider_mite": "spider_mites",
    Tomato___Target_Spot: "target_spot",
    Tomato___Tomato_mosaic_virus: "tomato_mosaic_virus",
    Tomato___healthy: "healthy",
  };

  const resolveDiseaseId = (rawDisease) => {
    if (!rawDisease) return null;
    if (modelToDiseaseId[rawDisease]) return modelToDiseaseId[rawDisease];
    const n = String(rawDisease).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (n.includes("early") && n.includes("blight")) return "early_blight";
    if (n.includes("late") && n.includes("blight")) return "late_blight";
    if (n.includes("yellow") && n.includes("leaf") && n.includes("curl")) return "yellow_leaf_curl_virus";
    if (n.includes("bacterial") && n.includes("spot")) return "bacterial_spot";
    if (n.includes("septoria")) return "septoria_leaf_spot";
    if (n.includes("leaf") && n.includes("mold")) return "leaf_mold";
    if (n.includes("spider") && n.includes("mite")) return "spider_mites";
    if (n.includes("target") && n.includes("spot")) return "target_spot";
    if (n.includes("mosaic") && n.includes("virus")) return "tomato_mosaic_virus";
    if (n.includes("healthy")) return "healthy";
    return null;
  };

  useEffect(() => {
    const checkAPI = async () => {
      setIsWakingUp(true);
      try {
        await wakeUpBackend();
        const ok = await checkAPIHealth();
        setApiAvailable(ok);
        if (!ok) setError('Backend API is not running.\n\nStart it with: python backend_api_example.py');
      } finally {
        setIsWakingUp(false);
      }
    };
    checkAPI();
  }, []);

  const performPrediction = async () => {
    if (!uploadedImage || apiAvailable === false || isWakingUp) return;
    setIsLoading(true);
    setPrediction(null);
    setError(null);
    try {
      const result = await predictDiseaseAPI(uploadedImage);
      const mappedId = resolveDiseaseId(result.disease);
      const data = mappedId ? diseaseContent[mappedId] : null;
      setPrediction({
        disease: result.disease,
        confidence: result.confidence,
        diseaseId: mappedId,
        data: data || {
          diseaseName: { en: result.disease.replace(/Tomato___/g, '').replace(/_/g, ' '), mr: result.disease.replace(/Tomato___/g, '').replace(/_/g, ' '), hi: result.disease.replace(/Tomato___/g, '').replace(/_/g, ' ') },
          type: { en: "Unknown", mr: "अज्ञात", hi: "अज्ञात" },
          icon: "❓",
          color: "#6b7280",
          shortDesc: { en: `${result.disease} detected. Consult an agricultural expert.`, mr: `${result.disease} आढळला. कृषी तज्ञांचा सल्ला घ्या.`, hi: `${result.disease} पाया गया। कृषि विशेषज्ञ से सलाह लें।` },
          symptoms: { en: ["Consult with a local agricultural expert for details."], mr: ["तपशीलासाठी स्थानिक कृषी तज्ञांचा सल्ला घ्या."], hi: ["विस्तृत जानकारी के लिए स्थानीय कृषि विशेषज्ञ से सलाह लें।"] },
          favorableConditions: { en: ["Use local weather and field scouting to assess risk."], mr: ["हवामान आणि शेतनिरीक्षणावर आधारित जोखीम तपासा."], hi: ["जोखिम आकलन के लिए स्थानीय मौसम और खेत निरीक्षण का उपयोग करें।"] },
          pesticides: { en: ["Consult with agricultural expert for specific treatment."], mr: ["योग्य उपचारांसाठी कृषी तज्ञांचा सल्ला घ्या."], hi: ["उपयुक्त उपचार के लिए कृषि विशेषज्ञ से सलाह लें।"] },
          physicalAndBiologicalControl: { en: ["Remove visibly affected leaves and maintain sanitation."], mr: ["दिसणारी संक्रमित पाने काढा आणि स्वच्छता राखा."], hi: ["प्रभावित पत्ते हटाएं और स्वच्छता बनाए रखें।"] },
          preventiveMeasures: { en: ["Follow general plant care practices."], mr: ["सामान्य पिक व्यवस्थापन पद्धती पाळा."], hi: ["सामान्य पौधा देखभाल पद्धतियां अपनाएं।"] },
        },
      });
    } catch (err) {
      setError(err.message?.includes('Failed to fetch')
        ? 'Cannot connect to backend.\n\nStart it with: python backend_api_example.py'
        : err.message || 'Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      uploadedImage &&
      !prediction &&
      !isLoading &&
      !error &&
      apiAvailable !== false &&
      !isWakingUp
    ) {
      performPrediction();
    }
  }, [uploadedImage, apiAvailable, isWakingUp]);

  useEffect(() => {
    if (prediction) setActiveSection('symptoms');
  }, [prediction]);

  const confidencePct = prediction ? Math.min(Math.max(prediction.confidence, 0), 100) : 0;
  const isHealthy = prediction?.diseaseId === 'healthy';
  const diseaseColor = prediction?.data?.color || '#16a34a';

  const sectionIcons = {
    symptoms: '🔍',
    favorableConditions: '🌡',
    pesticides: '💊',
    physicalAndBiologicalControl: '🌱',
    preventiveMeasures: '🛡',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;0,9..40,900;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&display=swap');

        .pp2 * { box-sizing: border-box; margin: 0; padding: 0; }
        .pp2 { font-family: 'DM Sans', sans-serif; min-height: calc(100vh - 160px); background: #f7f8f5; display: flex; flex-direction: column; }

        /* ── NAV ── */
        .pp2-nav { display: flex; align-items: center; gap: 12px; padding: 14px 16px 0; }
        .pp2-back {
          display: flex; align-items: center; gap: 5px;
          font-size: 12.5px; font-weight: 700; color: #3d5a3e;
          background: white; border: 1.5px solid #d4e8d4; border-radius: 100px;
          padding: 6px 13px 6px 9px; cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06); transition: all 0.15s;
        }
        .pp2-back:hover { background: #edf7ed; }
        .pp2-back svg { width: 13px; height: 13px; }
        .pp2-nav-title { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 600; color: #1a2e1a; }

        /* ── IMAGE ── */
        .pp2-img-wrap { position: relative; margin: 14px 16px 0; border-radius: 20px; overflow: hidden; height: 180px; box-shadow: 0 4px 20px rgba(0,0,0,0.12); }
        .pp2-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .pp2-img-gradient { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%); }
        .pp2-img-chip { position: absolute; bottom: 11px; left: 12px; background: rgba(255,255,255,0.18); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.35); color: white; font-size: 10.5px; font-weight: 700; border-radius: 100px; padding: 4px 10px; letter-spacing: 0.02em; }

        /* ── LOADING ── */
        .pp2-loading { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 40px 20px; }
        @keyframes pp2-spin { to { transform: rotate(360deg); } }
        @keyframes pp2-bounce { 0%,100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(-8px); opacity: 0.5; } }
        .pp2-loader-ring { width: 52px; height: 52px; border-radius: 50%; border: 3px solid #d4e8d4; border-top-color: #2e7d32; animation: pp2-spin 0.85s linear infinite; }
        .pp2-loader-dots { display: flex; gap: 6px; }
        .pp2-loader-dots span { width: 7px; height: 7px; border-radius: 50%; background: #4caf50; animation: pp2-bounce 1s ease-in-out infinite; }
        .pp2-loader-dots span:nth-child(2) { animation-delay: 0.15s; }
        .pp2-loader-dots span:nth-child(3) { animation-delay: 0.3s; }
        .pp2-loading-h { font-family: 'Fraunces', serif; font-size: 16px; color: #1a2e1a; font-weight: 600; }
        .pp2-loading-s { font-size: 11.5px; color: #7a9e7a; font-weight: 500; }

        /* ── ERROR ── */
        .pp2-error { margin: 14px 16px; background: #fff8f8; border: 1.5px solid #f5c2c2; border-radius: 18px; padding: 16px; }
        .pp2-error-h { font-size: 13px; font-weight: 800; color: #c62828; margin-bottom: 8px; }
        .pp2-error-msg { font-size: 11.5px; color: #6b1f1f; white-space: pre-line; line-height: 1.6; margin-bottom: 14px; }
        .pp2-retry-btn { background: #c62828; color: white; border: none; border-radius: 100px; padding: 9px 20px; font-size: 12px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; }

        /* ── RESULT CONTAINER ── */
        .pp2-result { display: flex; flex-direction: column; gap: 10px; padding: 14px 16px 28px; }

        /* ── HERO CARD ── */
        .pp2-hero {
          border-radius: 22px; overflow: hidden;
          background: white;
          box-shadow: 0 2px 14px rgba(0,0,0,0.07);
          border: 1.5px solid #e8ede8;
        }
        .pp2-hero-top {
          padding: 16px 16px 14px;
          display: flex; align-items: flex-start; gap: 14px;
        }
        .pp2-hero-icon { font-size: 36px; line-height: 1; flex-shrink: 0; margin-top: 2px; }
        .pp2-hero-info { flex: 1; min-width: 0; }
        .pp2-hero-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #7a9e7a; margin-bottom: 5px; }
        .pp2-hero-name { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; color: #1a2e1a; line-height: 1.2; margin-bottom: 8px; }
        .pp2-hero-pills { display: flex; flex-wrap: wrap; gap: 6px; }
        .pp2-pill { display: inline-flex; align-items: center; gap: 5px; border-radius: 100px; padding: 4px 10px; font-size: 10.5px; font-weight: 700; border: 1.5px solid; }

        /* confidence ring */
        .pp2-conf-ring { flex-shrink: 0; width: 66px; height: 66px; position: relative; }
        .pp2-conf-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
        .pp2-conf-inner { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .pp2-conf-pct { font-size: 14px; font-weight: 900; color: #1a2e1a; line-height: 1; }
        .pp2-conf-sub { font-size: 8.5px; font-weight: 700; color: #7a9e7a; margin-top: 1px; text-transform: uppercase; letter-spacing: 0.05em; }

        /* confidence bar strip */
        .pp2-conf-bar-wrap { background: #f0f5f0; padding: 12px 16px; border-top: 1px solid #e8ede8; display: flex; align-items: center; gap: 10px; }
        .pp2-conf-bar-label { font-size: 10px; font-weight: 700; color: #7a9e7a; text-transform: uppercase; letter-spacing: 0.06em; white-space: nowrap; }
        .pp2-conf-bar-track { flex: 1; height: 7px; background: #dce8dc; border-radius: 100px; overflow: hidden; }
        .pp2-conf-bar-fill { height: 100%; border-radius: 100px; transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .pp2-conf-bar-val { font-size: 11px; font-weight: 800; color: #1a2e1a; white-space: nowrap; }

        /* ── OVERVIEW CARD ── */
        .pp2-overview { background: white; border-radius: 18px; padding: 14px 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border: 1.5px solid #e8ede8; }
        .pp2-card-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #7a9e7a; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
        .pp2-card-label::after { content: ''; flex: 1; height: 1px; background: #e8ede8; }
        .pp2-overview-text { font-size: 12.5px; color: #374151; line-height: 1.65; }

        /* ── MAP HELP CARD (disease only) ── */
        .pp2-map-card {
          display: block; text-decoration: none; color: inherit;
          border-radius: 18px; overflow: hidden;
          background: white;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          border: 1.5px solid #e8ede8;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
          cursor: pointer;
        }
        .pp2-map-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(46,125,50,0.12);
          border-color: color-mix(in srgb, var(--disease-color) 35%, #e8ede8);
        }
        .pp2-map-card:focus-visible {
          outline: 2px solid var(--disease-color);
          outline-offset: 3px;
        }
        .pp2-map-card-head {
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          padding: 12px 14px 10px;
          border-bottom: 1px solid #f0f5f0;
        }
        .pp2-map-card-title-wrap { min-width: 0; }
        .pp2-map-card-title {
          font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em;
          color: #7a9e7a; margin-bottom: 3px;
        }
        .pp2-map-card-sub { font-size: 11.5px; color: #4b5563; line-height: 1.45; }
        .pp2-map-card-badge {
          flex-shrink: 0; display: flex; align-items: center; gap: 4px;
          font-size: 10px; font-weight: 800; color: #1a73e8;
          background: #e8f0fe; border-radius: 100px; padding: 5px 10px;
        }
        .pp2-map-card-badge svg { width: 12px; height: 12px; }
        .pp2-map-preview {
          position: relative; height: 118px;
          background:
            linear-gradient(165deg, #e8f4ea 0%, #d4ead8 40%, #c5e1c9 100%);
          overflow: hidden;
        }
        .pp2-map-preview::before {
          content: ''; position: absolute; inset: 0;
          background:
            linear-gradient(90deg, transparent 48%, rgba(255,255,255,0.35) 49%, rgba(255,255,255,0.35) 51%, transparent 52%),
            linear-gradient(0deg, transparent 58%, rgba(255,255,255,0.22) 59%, rgba(255,255,255,0.22) 61%, transparent 62%),
            linear-gradient(118deg, transparent 62%, rgba(180,200,180,0.4) 63%, rgba(180,200,180,0.4) 64.5%, transparent 66%);
          opacity: 0.85;
        }
        .pp2-map-preview::after {
          content: ''; position: absolute; right: -20%; bottom: -25%; width: 70%; height: 70%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(46,125,50,0.12) 0%, transparent 70%);
        }
        .pp2-map-pin-wrap {
          position: absolute; left: 50%; top: 50%;
          transform: translate(-50%, -58%);
          z-index: 2;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
        }
        @keyframes pp2-pin-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .pp2-map-pin-svg { width: 38px; height: 46px; animation: pp2-pin-float 2.4s ease-in-out infinite; }
        .pp2-map-pin-pulse {
          position: absolute; left: 50%; top: 72%; transform: translate(-50%, -50%);
          width: 22px; height: 10px; border-radius: 50%;
          background: rgba(46,125,50,0.25);
          z-index: 1;
          animation: pp2-pin-pulse 2s ease-out infinite;
        }
        @keyframes pp2-pin-pulse {
          0% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(1.35); opacity: 0; }
        }
        .pp2-map-card-foot {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 9px 12px;
          font-size: 11px; font-weight: 700; color: #2e7d32;
          background: linear-gradient(180deg, #f7fbf7, #f0f5f0);
          border-top: 1px solid #e8ede8;
        }
        .pp2-map-card-foot svg { width: 14px; height: 14px; opacity: 0.85; }

        /* ── SECTIONS ── */
        .pp2-sections-nav { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; }
        .pp2-sec-btn {
          display: flex; flex-direction: column; align-items: center; gap: 3px;
          background: white; border: 1.5px solid #e8ede8; border-radius: 14px;
          padding: 8px 4px 7px; cursor: pointer; transition: all 0.18s;
          font-family: 'DM Sans', sans-serif;
        }
        .pp2-sec-btn-icon { font-size: 16px; line-height: 1; }
        .pp2-sec-btn-label { font-size: 8.5px; font-weight: 700; text-align: center; color: #7a9e7a; line-height: 1.2; }
        .pp2-sec-btn-active { border-color: var(--disease-color); background: color-mix(in srgb, var(--disease-color) 8%, white); box-shadow: 0 2px 8px color-mix(in srgb, var(--disease-color) 25%, transparent); }
        .pp2-sec-btn-active .pp2-sec-btn-label { color: var(--disease-color); }

        /* section content */
        .pp2-sec-content { background: white; border-radius: 18px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border: 1.5px solid #e8ede8; }
        .pp2-sec-header { padding: 11px 14px; display: flex; align-items: center; gap: 7px; border-bottom: 1px solid #f0f5f0; }
        .pp2-sec-header-icon { font-size: 15px; }
        .pp2-sec-header-title { font-size: 12px; font-weight: 800; color: #1a2e1a; }
        .pp2-sec-items { padding: 10px 12px; display: flex; flex-direction: column; gap: 7px; }
        .pp2-sec-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; border-radius: 13px; background: #f7f9f7; }
        .pp2-sec-num { width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9.5px; font-weight: 900; flex-shrink: 0; margin-top: 1px; background: color-mix(in srgb, var(--disease-color) 15%, white); color: var(--disease-color); }
        .pp2-sec-text { font-size: 12px; color: #374151; line-height: 1.55; }
        .pp2-sec-empty { padding: 16px 14px; font-size: 12px; color: #9ca3af; text-align: center; font-style: italic; }

        /* ── CTA ── */
        .pp2-cta { background: linear-gradient(135deg, #2e7d32, #1b5e20); color: white; border: none; border-radius: 100px; width: 100%; padding: 15px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 800; cursor: pointer; letter-spacing: 0.02em; box-shadow: 0 6px 20px rgba(46,125,50,0.35); transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .pp2-cta:hover { transform: translateY(-1px); box-shadow: 0 9px 24px rgba(46,125,50,0.42); }
        .pp2-cta:active { transform: scale(0.97); }

        /* ── HEALTHY BANNER ── */
        .pp2-healthy-banner { background: linear-gradient(135deg, #e8f5e9, #c8e6c9); border: 1.5px solid #a5d6a7; border-radius: 18px; padding: 16px; display: flex; align-items: center; gap: 14px; }
        .pp2-healthy-icon { font-size: 38px; flex-shrink: 0; }
        .pp2-healthy-title { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 600; color: #1b5e20; margin-bottom: 4px; }
        .pp2-healthy-sub { font-size: 11.5px; color: #2e7d32; line-height: 1.5; }

        /* API offline steps */
        .pp2-api-steps { margin-top: 12px; background: white; border-radius: 12px; padding: 12px; font-size: 11px; color: #374151; line-height: 1.6; }
        .pp2-api-steps ol { padding-left: 16px; }
        .pp2-api-steps code { background: #f3f4f6; padding: 1px 5px; border-radius: 4px; font-size: 10.5px; }
      `}</style>

      <div className="pp2" style={{ '--disease-color': diseaseColor }}>

        {/* Nav */}
        <div className="pp2-nav">
          <button className="pp2-back" onClick={onBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            {t.back}
          </button>
          <h1 className="pp2-nav-title">{t.title}</h1>
        </div>

        {/* Uploaded image */}
        {uploadedImage && (
          <div className="pp2-img-wrap">
            <img src={uploadedImage} alt={t.imageAlt} />
            <div className="pp2-img-gradient" />
            <span className="pp2-img-chip">🍃 {t.imageChip}</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="pp2-error">
            <p className="pp2-error-h">⚠ {t.analysisFailed}</p>
            <p className="pp2-error-msg">{error}</p>
            {apiAvailable !== false && (
              <button className="pp2-retry-btn" onClick={performPrediction}>{t.retry}</button>
            )}
            {apiAvailable === false && (
              <div className="pp2-api-steps">
                <strong>{t.backendStartTitle}</strong>
                <ol style={{ marginTop: 6 }}>
                  <li>{t.backendStep1}</li>
                  <li>{t.backendStep2} <code>pip install flask flask-cors tensorflow pillow numpy</code></li>
                  <li>{t.backendStep3} <code>python backend_api_example.py</code></li>
                  <li>{t.backendStep4}</li>
                </ol>
              </div>
            )}
          </div>
        )}

        {/* Loading / waking hosted API */}
        {(isLoading || isWakingUp) && (
          <div className="pp2-loading">
            <div className="pp2-loader-ring" />
            <div className="pp2-loader-dots"><span /><span /><span /></div>
            <p className="pp2-loading-h">{isWakingUp ? t.startingServer : t.analyzing}</p>
            <p className="pp2-loading-s">{isWakingUp ? t.serverWakeHint : t.identifying}</p>
          </div>
        )}

        {/* Result */}
        {prediction && !isLoading && !isWakingUp && (() => {
          const data = prediction.data;
          const name = data.diseaseName?.[language] || data.diseaseName?.en || prediction.disease.replace(/Tomato___/g, '').replace(/_/g, ' ');
          const type = data.type?.[language] || data.type?.en;
          const desc = data.shortDesc?.[language] || data.shortDesc?.en;
          const circumference = 2 * Math.PI * 25;
          const dashOffset = circumference - (confidencePct / 100) * circumference;

          const severityHigh = confidencePct > 80;
          const typeColor = isHealthy ? { bg: '#e8f5e9', text: '#2e7d32', border: '#a5d6a7' }
            : data.type?.en === 'Viral' ? { bg: '#fce4ec', text: '#c62828', border: '#f48fb1' }
            : data.type?.en === 'Bacterial' ? { bg: '#e3f2fd', text: '#1565c0', border: '#90caf9' }
            : data.type?.en === 'Pest' ? { bg: '#fff8e1', text: '#e65100', border: '#ffcc02' }
            : { bg: '#f3e5f5', text: '#6a1b9a', border: '#ce93d8' };

          return (
            <div className="pp2-result">

              {/* Healthy special banner */}
              {isHealthy && (
                <div className="pp2-healthy-banner">
                  <span className="pp2-healthy-icon">🌿</span>
                  <div>
                    <p className="pp2-healthy-title">{t.healthyBannerTitle}</p>
                    <p className="pp2-healthy-sub">{desc}</p>
                  </div>
                </div>
              )}

              {/* Hero disease card */}
              <div className="pp2-hero">
                <div className="pp2-hero-top">
                  <span className="pp2-hero-icon">{data.icon || '🔬'}</span>
                  <div className="pp2-hero-info">
                    <p className="pp2-hero-label">{t.result}</p>
                    <p className="pp2-hero-name">{name}</p>
                    <div className="pp2-hero-pills">
                      <span className="pp2-pill" style={{ background: typeColor.bg, color: typeColor.text, borderColor: typeColor.border }}>
                        {type}
                      </span>
                      {!isHealthy && (
                        <span className="pp2-pill" style={severityHigh
                          ? { background: '#fbe9e7', color: '#bf360c', borderColor: '#ffab91' }
                          : { background: '#fffde7', color: '#f57f17', borderColor: '#fff176' }}>
                          {t.severity}: {severityHigh ? t.severityHigh : t.severityLow}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Confidence ring */}
                  <div className="pp2-conf-ring">
                    <svg viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r="25" fill="none" stroke="#e8ede8" strokeWidth="5" />
                      <circle cx="30" cy="30" r="25" fill="none" stroke={diseaseColor} strokeWidth="5"
                        strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset} />
                    </svg>
                    <div className="pp2-conf-inner">
                      <span className="pp2-conf-pct">{Math.round(confidencePct)}%</span>
                      
                    </div>
                  </div>
                </div>
                {/* Confidence bar */}
                <div className="pp2-conf-bar-wrap">
                  <span className="pp2-conf-bar-label">{t.confidence}</span>
                  <div className="pp2-conf-bar-track">
                    <div className="pp2-conf-bar-fill" style={{ width: `${confidencePct}%`, background: diseaseColor }} />
                  </div>
                  <span className="pp2-conf-bar-val">{Math.round(confidencePct)}%</span>
                </div>
              </div>

              {/* Overview */}
              {!isHealthy && (
                <div className="pp2-overview">
                  <p className="pp2-card-label">{t.overview}</p>
                  <p className="pp2-overview-text">{desc}</p>
                </div>
              )}

              

              {/* Section tabs */}
              <div className="pp2-sections-nav">
                {Object.keys(t.sections).map((key) => (
                  <button
                    key={key}
                    className={`pp2-sec-btn ${activeSection === key ? 'pp2-sec-btn-active' : ''}`}
                    onClick={() => setActiveSection(key)}
                    style={{ '--disease-color': diseaseColor }}
                  >
                    <span className="pp2-sec-btn-icon">{sectionIcons[key]}</span>
                    <span className="pp2-sec-btn-label">{t.sections[key]}</span>
                  </button>
                ))}
              </div>

              {/* Section content */}
              <div className="pp2-sec-content">
                <div className="pp2-sec-header">
                  <span className="pp2-sec-header-icon">{sectionIcons[activeSection]}</span>
                  <span className="pp2-sec-header-title">{t.sections[activeSection]}</span>
                </div>
                <div className="pp2-sec-items">
                  {(data[activeSection]?.[language] || data[activeSection]?.en || []).length > 0
                    ? (data[activeSection]?.[language] || data[activeSection]?.en).map((line, i) => (
                        <div key={i} className="pp2-sec-item">
                          <span className="pp2-sec-num" style={{ '--disease-color': diseaseColor }}>{i + 1}</span>
                          <p className="pp2-sec-text">{line}</p>
                        </div>
                      ))
                    : <p className="pp2-sec-empty">{t.notAvailable}</p>
                  }
                </div>
              </div>
              {/* In-person / contact map — only when disease detected */}
              {!isHealthy && (
                <a
                  className="pp2-map-card"
                  href={HELP_LOCATION_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.mapCardOpen}
                >
                  <div className="pp2-map-card-head">
                    <div className="pp2-map-card-title-wrap">
                      <p className="pp2-map-card-title">📍 {t.mapCardTitle}</p>
                      <p className="pp2-map-card-sub">{t.mapCardHint}</p>
                    </div>
                    <span className="pp2-map-card-badge">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      Maps
                    </span>
                  </div>
                  <div className="pp2-map-preview">
                    <div className="pp2-map-pin-pulse" aria-hidden />
                    <div className="pp2-map-pin-wrap" aria-hidden>
                      <svg className="pp2-map-pin-svg" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M24 4C15.16 4 8 11.16 8 20c0 12 16 28 16 28s16-16 16-28c0-8.84-7.16-16-16-16z"
                          fill="#c62828"
                          stroke="#fff"
                          strokeWidth="2"
                        />
                        <circle cx="24" cy="20" r="5" fill="#fff" />
                      </svg>
                    </div>
                  </div>
                  <div className="pp2-map-card-foot">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    {t.mapCardOpen}
                  </div>
                </a>
              )}
              {/* CTA */}
              <button className="pp2-cta" onClick={onNewScan}>
                🔍 {t.tryAgain}
              </button>

            </div>
          );
        })()}
      </div>
    </>
  );
};

export default Predict;