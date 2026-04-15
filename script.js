// 🔥 Firebase Imports
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { 
  getFirestore, 
  setDoc, 
  doc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// 🔑 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCe9eJBO5rz3A6yX1H-L8Cs5pLwuwJt04Q",
  authDomain: "jasho-5e2bc.firebaseapp.com",
  projectId: "jasho-5e2bc",
  storageBucket: "jasho-5e2bc.firebasestorage.app",
  messagingSenderId: "45582946369",
  appId: "1:45582946369:web:11f3c2dd44d6d83e64f6c0",
  measurementId: "G-KLC0T97KFV"
};


// ✅ SAFE INIT (No duplicate error ever)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);


// ================= SIGNUP =================
window.signup = async function () {
  const name = document.getElementById("name")?.value;
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;
  const confirmPassword = document.getElementById("confirmPassword")?.value;
  const terms = document.getElementById("terms")?.checked;

  const msg = document.getElementById("msg");
  if (msg) msg.innerText = "";

  if (!terms) {
    if (msg) msg.innerText = "Please accept Terms ❌";
    return;
  }

  if (password !== confirmPassword) {
    if (msg) msg.innerText = "Passwords do not match ❌";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      name,
      email,
      coins: 180,
      createdAt: new Date()
    });

    if (msg) {
      msg.style.color = "#22c55e";
      msg.innerText = "🎉 Account Registered Successfully!";
    }

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);

  } catch (error) {

    if (error.code === "auth/email-already-in-use") {

      if (msg) {
        msg.style.color = "orange";
        msg.innerText = "Account already exists → Logging you in...";
      }

      try {
        await signInWithEmailAndPassword(auth, email, password);

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);

      } catch {
        if (msg) {
          msg.style.color = "red";
          msg.innerText = "Wrong password ❌";
        }
      }

    } else {
      if (msg) {
        msg.style.color = "red";
        msg.innerText = error.message;
      }
    }
  }
};


// ================= LOGIN =================
window.login = async function () {
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login Success ✅");
    window.location.href = "index.html";

  } catch (error) {
    alert(error.message);
  }
};


// ================= RESET PASSWORD =================
window.resetPassword = async function () {
  const email = document.getElementById("email")?.value;

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Reset link sent 📩");

  } catch (error) {
    alert(error.message);
  }
};


// ================= AUTH UI =================
onAuthStateChanged(auth, (user) => {
  const authArea = document.getElementById("authArea");

  if (!authArea) return;

  if (user) {
    authArea.innerHTML = `
      <div class="profile-box" onclick="toggleProfile()">
        <span class="profile-icon">👤</span>
        <div class="profile-dropdown">
          <p>${user.email}</p>
          <button onclick="logout()">Logout</button>
        </div>
      </div>
    `;
  } else {
    authArea.innerHTML = `<a href="login.html">Login</a>`;
  }
});


// 🔓 Logout
window.logout = async function () {
  await signOut(auth);
  location.reload();
};


// 👤 Toggle Profile
window.toggleProfile = function () {
  document.querySelector(".profile-box")?.classList.toggle("active");
};


// 🍔 Toggle Menu
window.toggleMenu = function () {
  document.getElementById("navMenu")?.classList.toggle("active");
};