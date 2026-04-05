import React, { useState, useEffect, useCallback, useRef } from 'react';

const diseasesData = [
  {
    diseaseId: "early_blight",
    diseaseName: { en: "Early Blight", mr: "आगाट करपा (अर्ली ब्लाइट)" },
    color: "#14532d",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    type: { en: "Fungal", mr: "बुरशीजन्य" },
    images: ["/diseases/early_blight/1.JPG", "/diseases/early_blight/2.jpg"],
    shortDesc: {
      en: "A fungal disease causing brown concentric ring spots on older leaves, leading to yellowing and premature defoliation. Spreads rapidly in warm, humid conditions and can severely reduce yield.",
      mr: "बुरशीमुळे होणारा रोग, ज्यात जुन्या पानांवर गोल कड्यांसह तपकिरी डाग पडतात. उबदार, दमट हवामानात वेगाने पसरतो व उत्पादन घटवतो.",
    },
    symptoms: {
      en: ["Circular brown/black spots with concentric rings.", "Spots merge → leaves turn yellow and drop.", "Dark sunken spots may appear on stems and fruits."],
      mr: ["पानांवर वर्तुळाकार तपकिरी/काळे डाग (गोल कड्यांसह).", "डाग एकत्र मिसळल्याने पाने पिवळी पडतात व गळतात.", "खोड व फळांवर गडद, खोलगट डाग दिसू शकतात."],
    },
    favorableConditions: {
      en: ["Warm temperatures 24°C–29°C.", "Wet weather + high humidity.", "Nutrient-deficient plants are more susceptible."],
      mr: ["उबदार तापमान २४°C–२९°C.", "दमट/ओले हवामान व जास्त आर्द्रता.", "पोषक तत्वांची कमतरता असलेली झाडे लवकर बळी पडतात."],
    },
    pesticides: {
      en: ["Copper hydroxide (2 g/L water)", "Mancozeb 75% WP (3 g/L water)", "Azoxystrobin 11% + Tebuconazole 18.3% SC (1 ml/L water)"],
      mr: ["कॉपर हायड्रॉक्साईड (२ ग्रॅम/लिटर पाणी)", "मॅनकोझेब ७५% WP (३ ग्रॅम/लिटर पाणी)", "अझोक्सीस्ट्रोबिन ११% + टेब्युकोनाझोल १८.३% SC (१ मिली/लिटर पाणी)"],
    },
    physicalAndBiologicalControl: {
      en: ["Prune lower leaves and stems close to the soil.", "Prefer drip irrigation over sprinklers.", "Soil application of Pseudomonas fluorescence & Bacillus subtilis."],
      mr: ["जमिनीलगतची पाने/फांद्या छाटून टाका.", "तुषार सिंचनाऐवजी ठिबक सिंचन वापरा.", "मातीत स्यूडोमोनास फ्लुरोसेन्स व बॅसिलस सबटिलिसचा वापर करा."],
    },
    preventiveMeasures: {
      en: ["Use certified disease-free seeds.", "Crop rotation with non-solanaceous crops (beans/wheat).", "Proper spacing for airflow and sunlight."],
      mr: ["प्रमाणित व रोगमुक्त बियाणे वापरा.", "घेवडा/गहू यांसारख्या पिकांसोबत फेरपालट करा.", "हवा खेळती व सूर्यप्रकाशासाठी योग्य अंतर ठेवा."],
    },
  },
  {
    diseaseId: "late_blight",
    diseaseName: { en: "Late Blight", mr: "उशिरा करपा (लेट ब्लाइट)" },
    color: "#14532d",
    bg: "#dcfce7",
    border: "#86efac",
    type: { en: "Fungal", mr: "बुरशीजन्य" },
    images: ["/diseases/late_blight/1.JPG", "/diseases/late_blight/2.JPG"],
    shortDesc: {
      en: "A devastating fungal disease causing water-soaked lesions that rapidly turn black. Can destroy an entire crop within days under cool, wet conditions. White mold appears on leaf undersides.",
      mr: "अत्यंत घातक बुरशीजन्य रोग, ज्यात पाण्याचे डाग पडून ते काळे होतात. थंड, ओल्या वातावरणात काही दिवसांत संपूर्ण पीक नष्ट होऊ शकते.",
    },
    symptoms: {
      en: ["Irregular water-soaked black/brown lesions on leaves and stems.", "White fungal growth on leaf underside in wet conditions.", "Fast spread → necrotic leaves, plant collapse."],
      mr: ["पाने/खोडांवर पाण्याचे डाग असल्यासारखे काळे/तपकिरी डाग.", "ओलसर हवेत पानांच्या खालच्या बाजूला पांढरी बुरशी वाढते.", "वेगाने पसरणे → पाने सुकणे व झाड कोमेजणे."],
    },
    favorableConditions: {
      en: ["Cool temperatures 12°C–23°C.", "Rain/fog + high humidity (>90%).", "Cloudy days protect spores from UV."],
      mr: ["१२°C–२३°C थंड तापमान.", "पाऊस/धुके व जास्त आर्द्रता (>९०%).", "ढगाळ हवामानात बीजाणूंना संरक्षण मिळते."],
    },
    pesticides: {
      en: ["Mancozeb 35% SC (1000 g/acre)", "Copper oxychloride 50 WP (1–2 g/L water)", "Azoxystrobin 18.2% + Difenoconazole 11.4% SC (200 ml/acre)"],
      mr: ["मॅनकोझेब ३५% SC (१००० ग्रॅम/एकर)", "कॉपर ऑक्सिक्लोराईड 50 WP (१–२ ग्रॅम/लिटर पाणी)", "अझोक्सीस्ट्रोबिन १८.२% + डायफेनोकोनाझोल ११.४% SC (२०० मिली/एकर)"],
    },
    physicalAndBiologicalControl: {
      en: ["Soil application of Trichoderma asperellum (1.0 kg/acre).", "Remove and safely dispose infected plants immediately."],
      mr: ["मातीत ट्रायकोडर्मा एस्पेरेलम (१.० किलो/एकर) मिसळा.", "रोगग्रस्त झाडे त्वरित काढून सुरक्षितपणे नष्ट करा."],
    },
    preventiveMeasures: {
      en: ["Don't grow tomatoes and potatoes next to each other.", "2–3 year crop rotation with non-host plants.", "Avoid late irrigation; water at ground level."],
      mr: ["टोमॅटो व बटाटा शेजारी-शेजारी लावू नका.", "इतर पिकांसोबत २–३ वर्षांची फेरपालट करा.", "संध्याकाळी उशिरा पाणी टाळा; मुळांना पाणी द्या."],
    },
  },
  {
    diseaseId: "yellow_leaf_curl_virus",
    diseaseName: { en: "Yellow Leaf Curl Virus", mr: "पर्णगुंडाळी विषाणू रोग (TYLCV)" },
    color: "#14532d",
    bg: "#ecfccb",
    border: "#bef264",
    type: { en: "Viral", mr: "विषाणूजन्य" },
    images: ["/diseases/tomato_yellow_leaf_curl_virus/1.JPG", "/diseases/tomato_yellow_leaf_curl_virus/2.JPG"],
    shortDesc: {
      en: "A viral disease spread by whiteflies causing leaves to curl upward and turn yellow. Plants become stunted with a bushy appearance and suffer severe yield loss. No chemical cure exists.",
      mr: "पांढऱ्या माशीमार्फत पसरणारा विषाणूजन्य रोग. पाने वर वळून पिवळी पडतात, झाडाची वाढ खुंटते व उत्पादन मोठ्या प्रमाणात घटते.",
    },
    symptoms: {
      en: ["Leaves curl upward and yellow between veins.", "Stunted upright growth; bushy appearance.", "Flower drop and very low yield."],
      mr: ["पाने वर वळतात व शिरांमधला भाग पिवळा पडतो.", "वाढ खुंटते आणि झुडपासारखे दिसते.", "फुले गळतात व उत्पादन खूप घटते."],
    },
    favorableConditions: {
      en: ["Whiteflies present (main virus vector).", "Warm tropical/subtropical climate.", "Nearby infected weeds or host crops."],
      mr: ["पांढरी माशी (Whitefly) प्रादुर्भाव — प्रमुख वाहक.", "उबदार/उष्णकटिबंधीय हवामान.", "रोगग्रस्त तण किंवा यजमान पिकांची जवळीक."],
    },
    pesticides: {
      en: ["Neonicotinoids (to control whiteflies)."],
      mr: ["निओनिकोटिनॉइड्स (पांढऱ्या माशीच्या नियंत्रणासाठी)."],
    },
    physicalAndBiologicalControl: {
      en: ["Use insect-proof nets in greenhouses.", "Seed surface sterilization (70% ethanol + Clorox).", "Remove infected plants early."],
      mr: ["हरितगृहात कीटक-प्रतिबंधक जाळी वापरा.", "बियाण्यांचे निर्जंतुकीकरण करा.", "रोगग्रस्त झाडे लवकर ओळखून मुळासकट काढून नष्ट करा."],
    },
    preventiveMeasures: {
      en: ["Use TYLCV-resistant cultivars (Ty-1/Ty-2/Ty-3).", "Keep field borders weed-free.", "Use fine mesh row covers to block whiteflies."],
      mr: ["रोगप्रतिकारक टोमॅटोच्या जाती वापरा.", "शेताच्या आजूबाजूला तण वाढू देऊ नका.", "पांढऱ्या माशीला रोखण्यासाठी बारीक जाळीचा वापर करा."],
    },
  },
  {
    diseaseId: "bacterial_spot",
    diseaseName: { en: "Bacterial Spot", mr: "जिवाणूजन्य ठिपके रोग" },
    color: "#14532d",
    bg: "#dcfce7",
    border: "#86efac",
    type: { en: "Bacterial", mr: "जीवाणूजन्य" },
    images: ["/diseases/bacterial_spot/1.JPG", "/diseases/bacterial_spot/2.JPG"],
    shortDesc: {
      en: "A bacterial disease forming small dark water-soaked spots on leaves, stems and fruits. Spreads rapidly through rain splash and overhead irrigation. Causes defoliation and fruit blemishes reducing marketability.",
      mr: "जीवाणूमुळे पाने, खोड व फळांवर लहान काळसर पाणचट डाग पडतात. पावसामुळे व वरून सिंचनाने वेगाने पसरतो, पाने गळतात व फळे खराब होतात.",
    },
    symptoms: {
      en: ["Small dark water-soaked spots appear on leaves.", "Spots may develop yellow halos as infection spreads.", "Severe infection causes leaf drop and weak growth."],
      mr: ["पानांवर लहान, गडद आणि पाणचट डाग दिसतात.", "रोग वाढल्यावर डागांभोवती पिवळा कडा दिसू शकतो.", "तीव्र प्रादुर्भावात पाने गळतात आणि वाढ कमी होते."],
    },
    favorableConditions: {
      en: ["Warm, humid weather and frequent leaf wetness.", "Rain splash and overhead irrigation speed spread."],
      mr: ["उबदार आणि दमट हवामानात रोग जलद वाढतो.", "पावसाचे पाणी आणि वरून सिंचनामुळे प्रसार वाढतो."],
    },
    pesticides: {
      en: ["Use copper-based bactericides as per label."],
      mr: ["लेबलनुसार कॉपर-आधारित बॅक्टेरिसाइड वापरा."],
    },
    physicalAndBiologicalControl: {
      en: ["Remove infected leaves early.", "Avoid handling plants when foliage is wet."],
      mr: ["संक्रमित पाने लवकर काढून नष्ट करा.", "पाने ओली असताना झाडे हाताळू नका."],
    },
    preventiveMeasures: {
      en: ["Use disease-free seeds/transplants.", "Disinfect tools and avoid overhead watering."],
      mr: ["रोगमुक्त बियाणे/रोपे वापरा.", "साधने निर्जंतुक ठेवा व वरून पाणी देणे टाळा."],
    },
  },
  {
    diseaseId: "septoria_leaf_spot",
    diseaseName: { en: "Septoria Leaf Spot", mr: "सेप्टोरिया पर्णकिनार ठिपके रोग" },
    color: "#14532d",
    bg: "#ecfccb",
    border: "#bef264",
    type: { en: "Fungal", mr: "बुरशीजन्य" },
    images: ["/diseases/septoria_leaf_spot/1.JPG", "/diseases/septoria_leaf_spot/2.JPG"],
    shortDesc: {
      en: "A fungal disease causing numerous tiny circular spots with dark borders and pale centers, starting on lower leaves and moving upward. Heavy infection leads to severe defoliation and reduced photosynthesis.",
      mr: "बुरशीमुळे खालच्या पानांपासून सुरू होणारे गडद कड्यांचे लहान गोल ठिपके, जे हळूहळू वर सरकतात. जास्त प्रादुर्भावात मोठ्या प्रमाणात पाने गळतात.",
    },
    symptoms: {
      en: ["Many tiny circular spots with dark border and pale center.", "Starts on older lower leaves and moves upward.", "Heavy infection leads to early defoliation."],
      mr: ["गडद कडांसह आणि फिकट मध्यभाग असलेले लहान गोल डाग दिसतात.", "रोग प्रामुख्याने खालच्या जुन्या पानांपासून सुरू होतो.", "जास्त प्रादुर्भावात पाने अकाली गळतात."],
    },
    favorableConditions: {
      en: ["Warm temperatures with long hours of leaf moisture.", "Dense canopy with poor airflow."],
      mr: ["उबदार हवामान आणि जास्त वेळ पानांवर ओलावा.", "दाट पर्णसंभार आणि कमी वायुप्रवाह."],
    },
    pesticides: {
      en: ["Use fungicides like mancozeb/chlorothalonil as recommended."],
      mr: ["शिफारसीनुसार मॅन्कोझेब/क्लोरोथॅलोनिल वापरा."],
    },
    physicalAndBiologicalControl: {
      en: ["Prune lower infected leaves.", "Mulch soil to reduce splash spread."],
      mr: ["खालची संक्रमित पाने छाटून टाका.", "पावसाच्या उडण्यामुळे प्रसार कमी करण्यासाठी मल्च वापरा."],
    },
    preventiveMeasures: {
      en: ["Rotate crops and remove season-end debris.", "Water at root zone, not on foliage."],
      mr: ["पीक फेरपालट करा आणि हंगामअखेर अवशेष काढा.", "पानांवर न देता मुळाजवळ पाणी द्या."],
    },
  },
  {
    diseaseId: "leaf_mold",
    diseaseName: { en: "Leaf Mold", mr: "पर्णबुरशी रोग (लीफ मोल्ड)" },
    color: "#14532d",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    type: { en: "Fungal", mr: "बुरशीजन्य" },
    images: ["/diseases/leaf_mold/1.JPG", "/diseases/leaf_mold/2.JPG"],
    shortDesc: {
      en: "A fungal disease common in greenhouses, showing yellow patches on upper leaf surfaces with olive-gray mold growth underneath. Poor ventilation and high humidity accelerate its spread and severity.",
      mr: "हरितगृहात जास्त आढळणारा बुरशीजन्य रोग. पानांच्या वरच्या बाजूस पिवळे डाग व खालच्या बाजूस राखाडी बुरशी वाढते. कमी हवादारीत वेगाने पसरतो.",
    },
    symptoms: {
      en: ["Yellow patches on upper leaf surface.", "Olive-gray mold develops on leaf underside.", "Leaves curl, dry and drop in severe cases."],
      mr: ["पानांच्या वरच्या बाजूस पिवळे डाग दिसतात.", "खालच्या बाजूस ऑलिव-राखाडी बुरशी वाढते.", "तीव्र अवस्थेत पाने वाळून गळतात."],
    },
    favorableConditions: {
      en: ["High humidity and poor ventilation.", "Common in protected cultivation/greenhouses."],
      mr: ["जास्त आर्द्रता आणि कमी हवादारी.", "ग्रीनहाऊसमध्ये हा रोग जास्त दिसतो."],
    },
    pesticides: {
      en: ["Apply suitable fungicide at early symptom stage."],
      mr: ["लक्षणे दिसताच योग्य फंगीसाइड फवारणी करा."],
    },
    physicalAndBiologicalControl: {
      en: ["Improve ventilation and reduce humidity.", "Remove infected foliage quickly."],
      mr: ["हवादारी वाढवा आणि आर्द्रता कमी ठेवा.", "संक्रमित पाने त्वरित काढा."],
    },
    preventiveMeasures: {
      en: ["Avoid overcrowding plants.", "Use drip irrigation and keep leaves dry."],
      mr: ["झाडांची अतिदाट लागवड टाळा.", "ठिबक सिंचन वापरा आणि पाने कोरडी ठेवा."],
    },
  },
  {
    diseaseId: "spider_mites",
    diseaseName: { en: "Two-Spotted Spider Mite", mr: "द्विठिपकी कोळी माइट (स्पायडर माइट)" },
    color: "#14532d",
    bg: "#dcfce7",
    border: "#86efac",
    type: { en: "Pest", mr: "कीड" },
    images: ["/diseases/spider_mites_two-spotted_spider_mite/1.JPG", "/diseases/spider_mites_two-spotted_spider_mite/2.JPG"],
    shortDesc: {
      en: "Tiny spider-like pests that feed on leaf cells, creating yellow speckles and fine webbing on undersides. Populations explode in hot, dry weather and can quickly cause bronzing and death of leaves.",
      mr: "सूक्ष्म कोळ्यासारखे कीटक पानांच्या पेशी खातात, त्यामुळे पिवळे ठिपके व बारीक जाळे तयार होते. उष्ण, कोरड्या हवामानात वेगाने वाढून पाने पिवळी व खराब होतात.",
    },
    symptoms: {
      en: ["Tiny yellow speckles on leaves (stippling).", "Fine webbing appears on leaf undersides.", "Leaves turn bronze/yellow and may dry out."],
      mr: ["पानांवर सूक्ष्म पिवळे ठिपके दिसतात.", "पानांच्या खालच्या बाजूस बारीक जाळे दिसते.", "पाने पिवळी/तपकिरी होऊन सुकू शकतात."],
    },
    favorableConditions: {
      en: ["Hot, dry weather favors rapid multiplication."],
      mr: ["उष्ण आणि कोरडे हवामानात प्रादुर्भाव वेगाने वाढतो."],
    },
    pesticides: {
      en: ["Use recommended miticide/insecticidal soap."],
      mr: ["शिफारसीप्रमाणे माइटिसाइड/कीटकनाशक साबण वापरा."],
    },
    physicalAndBiologicalControl: {
      en: ["Spray water on leaf underside to reduce mites.", "Conserve beneficial predatory mites."],
      mr: ["पानांच्या खालच्या बाजूस पाण्याचा फवारा द्या.", "उपयुक्त भक्षक माइट्सचे संवर्धन करा."],
    },
    preventiveMeasures: {
      en: ["Regular scouting and early action.", "Avoid excess nitrogen fertilization."],
      mr: ["नियमित निरीक्षण करून सुरुवातीला नियंत्रण करा.", "अतिरिक्त नत्र खत टाळा."],
    },
  },
  {
    diseaseId: "target_spot",
    diseaseName: { en: "Target Spot", mr: "लक्ष्यवेध ठिपके रोग (टार्गेट स्पॉट)" },
    color: "#14532d",
    bg: "#ecfccb",
    border: "#bef264",
    type: { en: "Fungal", mr: "बुरशीजन्य" },
    images: ["/diseases/target_spot/1.JPG", "/diseases/target_spot/2.JPG"],
    shortDesc: {
      en: "A fungal disease producing circular lesions with distinct concentric target-like rings on leaves, stems and fruits. Spots enlarge and merge under warm humid conditions reducing fruit quality and overall yield.",
      mr: "बुरशीमुळे पाने, खोड व फळांवर लक्ष्यासारखे केंद्रित वर्तुळाकार डाग पडतात. उबदार, दमट वातावरणात डाग मोठे होऊन उत्पादनावर विपरीत परिणाम होतो.",
    },
    symptoms: {
      en: ["Circular lesions with concentric target-like rings.", "Spots enlarge and merge under favorable weather.", "Leaf damage can reduce fruit quality and yield."],
      mr: ["केंद्रित वर्तुळांसह लक्ष्यसदृश गोल डाग दिसतात.", "अनुकूल हवामानात डाग मोठे होऊन एकत्र येतात.", "पानांचे नुकसान झाल्याने उत्पादनावर परिणाम होतो."],
    },
    favorableConditions: {
      en: ["Warm and humid conditions with prolonged wet leaves."],
      mr: ["उबदार, दमट हवामान आणि पानांवर जास्त काळ ओलावा."],
    },
    pesticides: {
      en: ["Use registered fungicides as per advisory."],
      mr: ["सल्ल्यानुसार नोंदणीकृत फंगीसाइड वापरा."],
    },
    physicalAndBiologicalControl: {
      en: ["Remove affected leaves and crop debris.", "Improve air movement in crop canopy."],
      mr: ["संक्रमित पाने आणि अवशेष काढून नष्ट करा.", "पिकात हवेचा प्रवाह वाढवा."],
    },
    preventiveMeasures: {
      en: ["Maintain spacing and avoid leaf wetness.", "Follow crop rotation."],
      mr: ["योग्य अंतर ठेवा आणि पानांवर ओलावा टाळा.", "पीक फेरपालट करा."],
    },
  },
  {
    diseaseId: "tomato_mosaic_virus",
    diseaseName: { en: "Tomato Mosaic Virus", mr: "टोमॅटो चित्री विषाणू रोग (ToMV)" },
    color: "#14532d",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    type: { en: "Viral", mr: "विषाणूजन्य" },
    images: ["/diseases/tomato_mosaic_virus/1.JPG", "/diseases/tomato_mosaic_virus/2.JPG"],
    shortDesc: {
      en: "A highly contagious viral disease spreading through sap, tools and hands, causing mosaic light-dark green patterns on leaves with distortion. Reduces plant vigor, fruit set and overall crop quality significantly.",
      mr: "रस, साधने व हातांद्वारे पसरणारा अत्यंत संसर्गजन्य विषाणूजन्य रोग. पानांवर फिकट-गडद हिरव्या रंगाचे नमुने व विकृती येते, फळधारणा व गुणवत्ता कमी होते.",
    },
    symptoms: {
      en: ["Light and dark green mosaic pattern on leaves.", "Leaf distortion and reduced plant vigor.", "Fruit set and quality may decline."],
      mr: ["पानांवर फिकट व गडद हिरवा मोझेक नमुना दिसतो.", "पाने विकृत होतात आणि वाढ कमी होते.", "फळधारणा आणि गुणवत्ता कमी होऊ शकते."],
    },
    favorableConditions: {
      en: ["Virus spreads through sap, tools, and plant handling."],
      mr: ["रस, साधने आणि हाताळणीमुळे विषाणूचा प्रसार होतो."],
    },
    pesticides: {
      en: ["No direct cure; focus on vector and hygiene management."],
      mr: ["थेट औषध नाही; कीटक व स्वच्छता व्यवस्थापनावर भर द्या."],
    },
    physicalAndBiologicalControl: {
      en: ["Rogue infected plants promptly.", "Disinfect tools between plants."],
      mr: ["संक्रमित झाडे त्वरित काढा.", "साधने प्रत्येक वापरानंतर निर्जंतुक करा."],
    },
    preventiveMeasures: {
      en: ["Use certified healthy seedlings.", "Avoid tobacco contamination during handling."],
      mr: ["प्रमाणित निरोगी रोपे वापरा.", "हाताळणीदरम्यान तंबाखूजन्य संसर्ग टाळा."],
    },
  },
  {
    diseaseId: "healthy",
    diseaseName: { en: "Healthy Leaf", mr: "निरोगी पान" },
    color: "#14532d",
    bg: "#dcfce7",
    border: "#86efac",
    type: { en: "Healthy", mr: "निरोगी" },
    images: ["/diseases/healthy.jpg/1.JPG", "/diseases/healthy.jpg/2.JPG"],
    shortDesc: {
      en: "The plant is healthy with no signs of disease or pest damage. Leaves show uniform natural color, good growth vigour and no lesions or mold. Continue preventive care to maintain this condition.",
      mr: "झाड निरोगी असून कोणत्याही रोग किंवा कीडीचे लक्षण नाही. पानांचा रंग एकसमान व नैसर्गिक आहे, वाढ जोमदार आहे. प्रतिबंधात्मक काळजी सुरू ठेवा.",
    },
    symptoms: {
      en: ["Leaf color is uniform and natural.", "No visible lesions, mold growth, or pest webbing.", "Plant growth appears normal and vigorous."],
      mr: ["पानांचा रंग एकसमान आणि नैसर्गिक दिसतो.", "डाग, बुरशी किंवा कीड-जाळे दिसत नाही.", "झाडाची वाढ सामान्य आणि जोमदार असते."],
    },
    favorableConditions: {
      en: ["Balanced nutrients, proper irrigation, and good airflow."],
      mr: ["संतुलित पोषण, योग्य पाणी आणि चांगला वायुप्रवाह."],
    },
    pesticides: {
      en: ["No pesticide needed when plant is healthy."],
      mr: ["झाड निरोगी असल्यास औषधाची गरज नसते."],
    },
    physicalAndBiologicalControl: {
      en: ["Continue regular field scouting.", "Maintain sanitation and remove weeds."],
      mr: ["नियमित शेतनिरीक्षण सुरू ठेवा.", "स्वच्छता ठेवा आणि तण नियंत्रण करा."],
    },
    preventiveMeasures: {
      en: ["Keep preventive spraying schedule as advised locally.", "Avoid stress from over/under watering."],
      mr: ["स्थानिक सल्ल्यानुसार प्रतिबंधक फवारणी वेळेत करा.", "जास्त/कमी पाण्यामुळे होणारा ताण टाळा."],
    },
  },
];

const sectionMeta = {
  symptoms: { icon: "🔍", label: { en: "Symptoms", mr: "लक्षणे" }, bg: "#fee2e2", color: "#dc2626" },
  favorableConditions: { icon: "🌡️", label: { en: "Conditions", mr: "अनुकूल स्थिती" }, bg: "#fef3c7", color: "#d97706" },
  pesticides: { icon: "💊", label: { en: "Pesticides", mr: "औषधे" }, bg: "#f5f3ff", color: "#7c3aed" },
  physicalAndBiologicalControl: { icon: "🌱", label: { en: "Physical/Bio", mr: "भौतिक/जैव" }, bg: "#ecfdf5", color: "#059669" },
  preventiveMeasures: { icon: "🛡️", label: { en: "Prevention", mr: "प्रतिबंध" }, bg: "#eff6ff", color: "#2563eb" },
};

const DiseaseInfo = ({ language }) => {
  const diseases = diseasesData;
  const [current, setCurrent] = useState(0);
  const [modalDiseaseId, setModalDiseaseId] = useState(null);
  const [activeTab, setActiveTab] = useState('symptoms');
  const [paused, setPaused] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  // Fullscreen image viewer state
  const [fsImage, setFsImage] = useState(null);
  const [fsScale, setFsScale] = useState(1);
  const [fsOffset, setFsOffset] = useState({ x: 0, y: 0 });
  const [fsPinchStart, setFsPinchStart] = useState(null);
  const [fsDragStart, setFsDragStart] = useState(null);
  const fsRef = useRef(null);

  const lang = language || 'en';
  const labels = {
    en: { title: "Disease Library", subtitle: "Auto-play · Swipe · Tap to learn more", readMore: "Learn More", type: "Type" },
    mr: { title: "रोग माहिती", subtitle: "ऑटो-प्ले · स्वाइप करा · अधिक जाणून घ्या", readMore: "अधिक वाचा", type: "प्रकार" },
  };
  const t = labels[lang] || labels['en'];

  const goTo = useCallback((fn) => {
    setCurrent(prev => {
      const next = typeof fn === 'function' ? fn(prev) : fn;
      return ((next % diseases.length) + diseases.length) % diseases.length;
    });
  }, [diseases.length]);

  useEffect(() => {
    if (paused || modalDiseaseId || fsImage) return;
    const id = setInterval(() => goTo(p => p + 1), 3500);
    return () => clearInterval(id);
  }, [paused, modalDiseaseId, fsImage, goTo]);

  const onTouchStart = (e) => {
    setDragging(true); setPaused(true);
    setDragStart(e.touches ? e.touches[0].clientX : e.clientX);
  };
  const onTouchMove = (e) => {
    if (!dragging || dragStart === null) return;
    setDragOffset((e.touches ? e.touches[0].clientX : e.clientX) - dragStart);
  };
  const onTouchEnd = () => {
    if (!dragging) return;
    if (dragOffset < -50) goTo(p => p + 1);
    else if (dragOffset > 50) goTo(p => p - 1);
    setDragging(false); setDragStart(null); setDragOffset(0);
    setTimeout(() => setPaused(false), 1500);
  };

  const openModal = (diseaseId) => { setModalDiseaseId(diseaseId); setActiveTab('symptoms'); setPaused(true); };
  const closeModal = () => { setModalDiseaseId(null); setPaused(false); };

  // Fullscreen image handlers
  const openFsImage = (src) => {
    setFsImage(src);
    setFsScale(1);
    setFsOffset({ x: 0, y: 0 });
    setPaused(true);
  };
  const closeFsImage = () => { setFsImage(null); setPaused(false); };

  const getFsPinchDist = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const onFsTouchStart = (e) => {
    if (e.touches.length === 2) {
      setFsPinchStart({ dist: getFsPinchDist(e.touches), scale: fsScale });
    } else if (e.touches.length === 1) {
      setFsDragStart({ x: e.touches[0].clientX - fsOffset.x, y: e.touches[0].clientY - fsOffset.y });
    }
  };
  const onFsTouchMove = (e) => {
    e.preventDefault();
    if (e.touches.length === 2 && fsPinchStart) {
      const newDist = getFsPinchDist(e.touches);
      const newScale = Math.min(5, Math.max(1, fsPinchStart.scale * (newDist / fsPinchStart.dist)));
      setFsScale(newScale);
      if (newScale === 1) setFsOffset({ x: 0, y: 0 });
    } else if (e.touches.length === 1 && fsDragStart && fsScale > 1) {
      setFsOffset({
        x: e.touches[0].clientX - fsDragStart.x,
        y: e.touches[0].clientY - fsDragStart.y,
      });
    }
  };
  const onFsTouchEnd = () => {
    setFsPinchStart(null);
    setFsDragStart(null);
    if (fsScale < 1.1) { setFsScale(1); setFsOffset({ x: 0, y: 0 }); }
  };

  const onFsWheel = (e) => {
    e.preventDefault();
    const newScale = Math.min(5, Math.max(1, fsScale - e.deltaY * 0.005));
    setFsScale(newScale);
    if (newScale === 1) setFsOffset({ x: 0, y: 0 });
  };

  const d = diseases[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        .di2 * { box-sizing: border-box; font-family: 'Nunito', sans-serif; }

        .di2 {
          min-height: calc(100vh - 120px);
          background: linear-gradient(160deg, #f0fdf4 0%, #dcfce7 45%, #f0fdf4 100%);
          display: flex; flex-direction: column;
          padding: 16px 0 24px; position: relative; overflow: hidden;
        }
        .di2-blob { position: absolute; border-radius: 50%; filter: blur(55px); pointer-events: none; z-index: 0; }
        .di2-blob-1 { width: 220px; height: 220px; background: rgba(34,197,94,0.15); top: -60px; right: -60px; }
        .di2-blob-2 { width: 160px; height: 160px; background: rgba(16,185,129,0.10); bottom: 60px; left: -50px; }

        .di2-header { padding: 0 16px 14px; position: relative; z-index: 1; }
        .di2-title { font-size: 20px; font-weight: 900; color: #14532d; margin: 0 0 2px; }
        .di2-sub { font-size: 11px; font-weight: 600; color: #4ade80; margin: 0; }

        .di2-dots { display: flex; gap: 5px; padding: 0 16px 14px; position: relative; z-index: 1; flex-wrap: wrap; align-items: center; }
        .di2-dot { height: 5px; border-radius: 3px; background: #bbf7d0; transition: width 0.3s, background 0.3s; cursor: pointer; }
        .di2-dot-on { background: #22c55e !important; }

        .di2-card-wrap { position: relative; z-index: 1; padding: 0 16px; cursor: grab; user-select: none; touch-action: pan-y; }
        .di2-card-wrap:active { cursor: grabbing; }
        .di2-card {
          border-radius: 26px; padding: 20px 18px;
          display: flex; flex-direction: column; gap: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06);
          border: 1.5px solid; position: relative; overflow: hidden;
        }
        .di2-card::before {
          content: ''; position: absolute; top: -40px; right: -30px;
          width: 130px; height: 130px; border-radius: 50%;
          background: rgba(255,255,255,0.22); pointer-events: none;
        }
        .di2-card::after {
          content: ''; position: absolute; bottom: -20px; left: -20px;
          width: 80px; height: 80px; border-radius: 50%;
          background: rgba(255,255,255,0.15); pointer-events: none;
        }

        .di2-card-top { display: flex; align-items: flex-start; gap: 12px; }
        .di2-meta { flex: 1; min-width: 0; }
        .di2-badge {
          display: inline-block; font-size: 9px; font-weight: 800;
          letter-spacing: 0.07em; text-transform: uppercase;
          border-radius: 100px; padding: 3px 9px; margin-bottom: 5px;
          background: rgba(255,255,255,0.7); border: 1px solid;
        }
        .di2-name { font-size: 17px; font-weight: 900; line-height: 1.2; margin: 0; }

        .di2-preview-wrap {
          width: 100%; border-radius: 16px; overflow: hidden;
          border: 1.5px solid rgba(255,255,255,0.75);
          box-shadow: 0 3px 14px rgba(0,0,0,0.1); background: rgba(255,255,255,0.5);
          cursor: pointer; position: relative;
        }
        .di2-preview-img { width: 100%; height: 160px; object-fit: cover; display: block; }
        .di2-img-zoom-hint {
          position: absolute; bottom: 8px; right: 8px;
          background: rgba(0,0,0,0.45); color: white;
          font-size: 10px; font-weight: 700; padding: 3px 8px;
          border-radius: 100px; pointer-events: none;
          display: flex; align-items: center; gap: 4px;
        }

        .di2-desc {
          font-size: 12.5px; color: #374151; line-height: 1.65; margin: 0;
          background: rgba(255,255,255,0.55); border-radius: 14px; padding: 11px 13px;
        }

        .di2-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .di2-nav { display: flex; gap: 8px; }
        .di2-nav-btn {
          width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid;
          background: rgba(255,255,255,0.7); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; transition: transform 0.12s, box-shadow 0.12s;
          box-shadow: 0 1px 6px rgba(0,0,0,0.08);
        }
        .di2-nav-btn:hover { transform: scale(1.08); box-shadow: 0 3px 12px rgba(0,0,0,0.12); }
        .di2-nav-btn:active { transform: scale(0.94); }

        .di2-read-btn {
          padding: 9px 16px; border-radius: 100px; border: none;
          font-size: 12px; font-weight: 800; cursor: pointer;
          background: rgba(255,255,255,0.8);
          display: flex; align-items: center; gap: 5px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: transform 0.12s, box-shadow 0.12s;
        }
        .di2-read-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.14); }
        .di2-read-btn:active { transform: scale(0.96); }

        .di2-counter { text-align: center; font-size: 11px; font-weight: 700; color: #86efac; padding-top: 12px; position: relative; z-index: 1; }

        /* ─── FULLSCREEN IMAGE VIEWER ─── */
        .di2-fs-overlay {
          position: fixed; inset: 0; z-index: 500;
          background: rgba(0,0,0,0.93);
          display: flex; align-items: center; justify-content: center;
          animation: di2-fi 0.18s ease;
        }
        .di2-fs-inner {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; touch-action: none;
        }
        .di2-fs-img {
          max-width: 100%; max-height: 100%;
          object-fit: contain; display: block;
          will-change: transform; transition: transform 0.1s ease-out;
          pointer-events: none;
        }
        .di2-fs-close {
          position: absolute; top: 16px; right: 16px;
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25);
          color: white; font-size: 18px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(8px); z-index: 10;
          transition: background 0.15s;
        }
        .di2-fs-close:hover { background: rgba(255,255,255,0.25); }
        .di2-fs-hint {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          color: rgba(255,255,255,0.5); font-size: 11px; font-weight: 600;
          background: rgba(255,255,255,0.08); padding: 5px 14px; border-radius: 100px;
          white-space: nowrap;
        }
        .di2-fs-zoom-btns {
          position: absolute; bottom: 20px; right: 16px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .di2-fs-zoom-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.2);
          color: white; font-size: 18px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(6px); transition: background 0.15s;
        }
        .di2-fs-zoom-btn:hover { background: rgba(255,255,255,0.25); }

        /* ─── MODAL ─── */
        .di2-overlay {
          position: fixed; inset: 0; z-index: 300;
          background: rgba(0,0,0,0.52); backdrop-filter: blur(5px);
          display: flex; align-items: flex-end;
          animation: di2-fi 0.18s ease;
        }
        @keyframes di2-fi { from { opacity: 0; } to { opacity: 1; } }

        .di2-modal {
          width: 100%; height: 72vh;
          background: white; border-radius: 28px 28px 0 0;
          display: flex; flex-direction: column; overflow: hidden;
          animation: di2-su 0.26s cubic-bezier(0.32,0.72,0,1);
        }
        @keyframes di2-su { from { transform: translateY(100%); } to { transform: translateY(0); } }

        .di2-m-handle { display: flex; justify-content: center; padding: 12px 0 4px; flex-shrink: 0; }
        .di2-m-handle span { width: 36px; height: 4px; border-radius: 2px; background: #e2e8f0; }

        .di2-m-head {
          display: flex; align-items: center; gap: 12px;
          padding: 6px 16px 12px; flex-shrink: 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .di2-m-emo {
          width: 46px; height: 46px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; flex-shrink: 0;
        }
        .di2-m-title { font-size: 15px; font-weight: 900; color: #14532d; margin: 0 0 1px; }
        .di2-m-type { font-size: 10px; font-weight: 700; color: #86efac; }
        .di2-m-close {
          margin-left: auto; width: 32px; height: 32px; border-radius: 50%;
          background: #f1f5f9; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; flex-shrink: 0; transition: background 0.15s;
        }
        .di2-m-close:hover { background: #e2e8f0; }

        .di2-tabs {
          display: flex; padding: 10px 10px 0;
          overflow-x: auto; scrollbar-width: none; flex-shrink: 0; gap: 4px;
        }
        .di2-tabs::-webkit-scrollbar { display: none; }
        .di2-tab {
          display: flex; align-items: center; gap: 4px;
          padding: 7px 12px; border-radius: 100px; border: none;
          font-size: 11px; font-weight: 800; cursor: pointer;
          white-space: nowrap; background: #f8fafc; color: #94a3b8;
          transition: all 0.18s; flex-shrink: 0;
        }
        .di2-tab-on { color: white !important; }

        .di2-m-body {
          flex: 1; overflow-y: auto; padding: 14px 16px 28px;
          -webkit-overflow-scrolling: touch; min-height: 0;
        }
        .di2-m-body::-webkit-scrollbar { display: none; }

        .di2-m-images {
          display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px; margin-bottom: 12px;
        }
        .di2-m-img-wrap {
          border-radius: 12px; overflow: hidden;
          border: 1px solid #e2e8f0; background: #f8fafc;
          cursor: pointer; position: relative;
        }
        .di2-m-img-wrap:hover .di2-m-img-overlay { opacity: 1; }
        .di2-m-img { width: 100%; height: 110px; object-fit: cover; display: block; }
        .di2-m-img-overlay {
          position: absolute; inset: 0; background: rgba(0,0,0,0.28);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.2s;
          color: white; font-size: 20px;
        }

        .di2-points { display: flex; flex-direction: column; gap: 8px; }
        .di2-pt {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 10px 12px; border-radius: 12px;
        }
        .di2-pt-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
        .di2-pt-text { font-size: 12.5px; color: #374151; line-height: 1.6; margin: 0; }
      `}</style>

      <div className="di2">
        <div className="di2-blob di2-blob-1" />
        <div className="di2-blob di2-blob-2" />

        <div className="di2-header">
          <h1 className="di2-title">{t.title}</h1>
          <p className="di2-sub">{t.subtitle}</p>
        </div>

        <div className="di2-dots">
          {diseases.map((disease, i) => (
            <div key={disease.diseaseId} className={`di2-dot ${i === current ? 'di2-dot-on' : ''}`}
              style={{ width: i === current ? 20 : 8 }}
              onClick={() => { goTo(i); setPaused(true); setTimeout(() => setPaused(false), 2000); }}
            />
          ))}
        </div>

        {/* Card */}
        <div className="di2-card-wrap"
          onMouseDown={onTouchStart} onMouseMove={onTouchMove} onMouseUp={onTouchEnd} onMouseLeave={onTouchEnd}
          onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        >
          <div className="di2-card" style={{
            background: d.bg, borderColor: d.border,
            transform: dragging ? `translateX(${Math.sign(dragOffset) * Math.min(Math.abs(dragOffset) * 0.14, 14)}px) rotate(${Math.sign(dragOffset) * Math.min(Math.abs(dragOffset) * 0.025, 2.5)}deg)` : 'none',
            transition: dragging ? 'none' : 'transform 0.3s cubic-bezier(0.32,0.72,0,1)',
          }}>
            <div className="di2-card-top">
              <div className="di2-meta">
                <span className="di2-badge" style={{ color: d.color, borderColor: d.border }}>
                  {(d.type?.[lang] || d.type?.en || "").trim()}
                </span>
                <p className="di2-name" style={{ color: d.color }}>
                  {d.diseaseName?.[lang] || d.diseaseName?.en}
                </p>
              </div>
            </div>

            {/* Clickable preview image */}
            <div className="di2-preview-wrap" onClick={(e) => { e.stopPropagation(); openFsImage(d.images?.[0]); }}>
              <img className="di2-preview-img" src={d.images?.[0]} alt={d.diseaseName?.[lang] || d.diseaseName?.en} />
              <div className="di2-img-zoom-hint">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                {lang === 'mr' ? 'मोठे पहा' : 'Zoom'}
              </div>
            </div>

            <p className="di2-desc">
              {d.shortDesc?.[lang] || d.shortDesc?.en || d.symptoms?.[lang]?.[0] || d.symptoms?.en?.[0] || ""}
            </p>

            <div className="di2-row">
              <button className="di2-read-btn" style={{ color: d.color }} onClick={() => openModal(d.diseaseId)}>
                {t.readMore}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <div className="di2-nav">
                <button className="di2-nav-btn" style={{ borderColor: d.border, color: d.color }}
                  onClick={() => { goTo(p => p - 1); setPaused(true); setTimeout(() => setPaused(false), 2000); }}>‹</button>
                <button className="di2-nav-btn" style={{ borderColor: d.border, color: d.color }}
                  onClick={() => { goTo(p => p + 1); setPaused(true); setTimeout(() => setPaused(false), 2000); }}>›</button>
              </div>
            </div>
          </div>
        </div>

        <div className="di2-counter">{current + 1} / {diseases.length}</div>

        {/* ── FULLSCREEN IMAGE VIEWER ── */}
        {fsImage && (
          <div className="di2-fs-overlay" onClick={closeFsImage}>
            <div className="di2-fs-inner"
              ref={fsRef}
              onTouchStart={onFsTouchStart}
              onTouchMove={onFsTouchMove}
              onTouchEnd={onFsTouchEnd}
              onWheel={onFsWheel}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                className="di2-fs-img"
                src={fsImage}
                alt="Full view"
                style={{
                  transform: `translate(${fsOffset.x}px, ${fsOffset.y}px) scale(${fsScale})`,
                  cursor: fsScale > 1 ? 'move' : 'default',
                }}
              />
            </div>
            <button className="di2-fs-close" onClick={closeFsImage}>✕</button>
            <div className="di2-fs-zoom-btns">
              <button className="di2-fs-zoom-btn" onClick={(e) => { e.stopPropagation(); const s = Math.min(5, fsScale + 0.5); setFsScale(s); if (s === 1) setFsOffset({ x: 0, y: 0 }); }}>+</button>
              <button className="di2-fs-zoom-btn" onClick={(e) => { e.stopPropagation(); const s = Math.max(1, fsScale - 0.5); setFsScale(s); if (s === 1) setFsOffset({ x: 0, y: 0 }); }}>−</button>
            </div>
            <div className="di2-fs-hint">
              {lang === 'mr' ? 'पिंच/स्क्रोल करून झूम करा · बंद करण्यासाठी बाहेर टॅप करा' : 'Pinch or scroll to zoom · Tap outside to close'}
            </div>
          </div>
        )}

        {/* ── MODAL ── */}
        {modalDiseaseId && (() => {
          const md = diseases.find(x => x.diseaseId === modalDiseaseId);
          if (!md) return null;
          const tabs = Object.entries(sectionMeta).filter(([k]) => md[k] && md[k][lang]?.length);
          return (
            <div className="di2-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
              <div className="di2-modal">
                <div className="di2-m-handle"><span /></div>

                <div className="di2-m-head">
                  <div className="di2-m-emo" style={{ background: md.bg }}>
                    <span style={{ fontSize: 22 }}>
                      {md.type?.en === 'Healthy' ? '✅' : md.type?.en === 'Viral' ? '🧬' : md.type?.en === 'Bacterial' ? '🦠' : md.type?.en === 'Pest' ? '🕷️' : '🍃'}
                    </span>
                  </div>
                  <div>
                    <p className="di2-m-title">{md.diseaseName[lang] || md.diseaseName.en}</p>
                    <p className="di2-m-type">{(md.type?.[lang] || md.type?.en || "").trim()}</p>
                  </div>
                  <button className="di2-m-close" onClick={closeModal}>✕</button>
                </div>

                <div className="di2-tabs">
                  {tabs.map(([key, meta]) => (
                    <button key={key} className={`di2-tab ${activeTab === key ? 'di2-tab-on' : ''}`}
                      style={activeTab === key ? { background: meta.color } : {}}
                      onClick={() => setActiveTab(key)}>
                      {meta.icon} {(meta.label?.[lang] || meta.label?.en)}
                    </button>
                  ))}
                </div>

                <div className="di2-m-body">
                  {/* Clickable images in modal */}
                  <div className="di2-m-images">
                    {(md.images || []).slice(0, 2).map((imgSrc, idx) => (
                      <div key={`${md.diseaseId}-${idx}`} className="di2-m-img-wrap"
                        onClick={() => openFsImage(imgSrc)}>
                        <img className="di2-m-img" src={imgSrc} alt={`${md.diseaseName?.[lang] || md.diseaseName?.en} ${idx + 1}`} />
                        <div className="di2-m-img-overlay">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="di2-points">
                    {(md[activeTab]?.[lang] || md[activeTab]?.en || []).map((line, i) => {
                      const text = String(line || '').trim();
                      if (!text) return null;
                      const meta = sectionMeta[activeTab];
                      return (
                        <div key={i} className="di2-pt" style={{ background: meta.bg + '99' }}>
                          <span className="di2-pt-dot" style={{ background: meta.color }} />
                          <p className="di2-pt-text">{text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </>
  );
};

export default DiseaseInfo;