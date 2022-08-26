// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBY3E6i3xlL5HEBrgCQXg9C0KC_JRBJaAg",
	authDomain: "react-cursos-d6d0f.firebaseapp.com",
	projectId: "react-cursos-d6d0f",
	storageBucket: "react-cursos-d6d0f.appspot.com",
	messagingSenderId: "1088776010060",
	appId: "1:1088776010060:web:0868e0fa8d6e854df9b7e9",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB=getFirestore(FirebaseApp)