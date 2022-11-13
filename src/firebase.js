// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUC--IcBUwCfRVlHojymCc-B2dXV0tzdo",
    authDomain: "cvt-confession-e24b4.firebaseapp.com",
    projectId: "cvt-confession-e24b4",
    storageBucket: "cvt-confession-e24b4.appspot.com",
    messagingSenderId: "772222504943",
    appId: "1:772222504943:web:e4093b8d01ec6114f8b01a",
    measurementId: "G-MKT74WWHWD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);