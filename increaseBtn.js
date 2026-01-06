import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  runTransaction
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCK4sfpug2imOKkBLylWmIlyIAmtIxSldE",
  authDomain: "portfolio-f4408.firebaseapp.com",
  projectId: "portfolio-f4408",
  databaseURL: "https://portfolio-f4408-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "portfolio-f4408.firebasestorage.app",
  messagingSenderId: "961129077522",
  appId: "1:961129077522:web:3c3267163509e20af631cb"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const countLabel = document.getElementById("countLabel");
const increaseBtn = document.getElementById("increaseBtn");

const counterRef = ref(db, "cv_downloads");

onValue(counterRef, (snapshot) => {
  countLabel.textContent = snapshot.val() ?? 0;
});

increaseBtn.addEventListener("click", () => {
  runTransaction(counterRef, (current) => {
    return (current ?? 0) + 1;
  });
});
