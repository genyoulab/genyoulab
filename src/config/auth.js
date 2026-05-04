// src/config/auth.js
// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAZJFd2zvVAwAhR6GEozzarfZA0RFhZTyw",
  authDomain: "genyoulab-5e0e3.firebaseapp.com",
  projectId: "genyoulab-5e0e3",
  storageBucket: "genyoulab-5e0e3.firebasestorage.app",
  messagingSenderId: "260286873146",
  appId: "1:260286873146:web:3881498b63d6ffc91a7f03",
  measurementId: "G-DVR7NZR8MW"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  // Set persistence to LOCAL as requested in D-02
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      console.log("[Firebase Auth] Persistence set to LOCAL");
    })
    .catch((error) => {
      console.error("[Firebase Auth] Persistence Error:", error);
    });
} else {
  console.error("Firebase SDK not loaded.");
}

// Kakao Config
const KAKAO_APP_KEY = "c6e9fd3ef48bad264c1a877234e2e81e";

// Naver Config
const NAVER_CLIENT_ID = "U9IfAxpaOIhRW3u0wtOL";
const NAVER_CALLBACK_URL = window.location.origin + "/callback.html";

// Initialize Kakao SDK
if (typeof Kakao !== 'undefined') {
  if (!Kakao.isInitialized()) {
    Kakao.init(KAKAO_APP_KEY);
    console.log("[Kakao SDK] Initialized:", Kakao.isInitialized());
  }
} else {
  console.error("Kakao SDK not loaded.");
}

export { firebaseConfig, KAKAO_APP_KEY, NAVER_CLIENT_ID, NAVER_CALLBACK_URL };
