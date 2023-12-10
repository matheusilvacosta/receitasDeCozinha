import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcg_geggWClP9LZ_m-fj3dV2fEWT_X7Mg",
  authDomain: "receitasdecozinha-c238c.firebaseapp.com",
  databaseURL: "https://receitasdecozinha-c238c-default-rtdb.firebaseio.com",
  projectId: "receitasdecozinha-c238c",
  storageBucket: "receitasdecozinha-c238c.appspot.com",
  messagingSenderId: "827527838806",
  appId: "1:827527838806:web:cf4c2ed9c5479f557b4ff7"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {
  auth,
  db,
  firebaseApp,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
};
