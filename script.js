// 🔥 Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { 
  getFirestore, 
  setDoc, 
  doc, 
  collection, 
  getDocs 
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

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// ================= SIGNUP =================
window.signup = async function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const terms = document.getElementById("terms").checked;

  const msg = document.getElementById("msg");
  msg.innerText = "";

  if (!terms) {
    msg.innerText = "Please accept Terms ❌";
    return;
  }

  if (password !== confirmPassword) {
    msg.innerText = "Passwords do not match ❌";
    return;
  }

  try {
    // 🔥 Signup
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      name: name,
      email: email,
      coins: 0
    });

    msg.style.color = "#22c55e";
    msg.innerText = "🎉 Account Registered Successfully!";

    // 👉 Redirect to HOME
    setTimeout(() => {
      window.location.href = "index.html"; // 👈 home page
    }, 1500);

  } catch (error) {

    // 🔥 अगर email already use है → login कर दो
    if (error.code === "auth/email-already-in-use") {

      msg.style.color = "orange";
      msg.innerText = "Account already exists → Logging you in...";

      try {
        await signInWithEmailAndPassword(auth, email, password);

        setTimeout(() => {
          window.location.href = "index.html"; // 👈 home
        }, 1000);

      } catch (err) {
        msg.style.color = "red";
        msg.innerText = "Wrong password ❌";
      }

    } else {
      msg.style.color = "red";
      msg.innerText = error.message;
    }
  }
};

// ================= LOGIN =================
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    alert("Login Success ✅");
    window.location.href = "index.html";

  } catch (error) {
    alert(error.message);
  }
};


// ================= FORGOT PASSWORD =================
window.resetPassword = async function () {
  const email = document.getElementById("email").value;

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Reset link sent 📩");

  } catch (error) {
    alert(error.message);
  }
};


// ================= FETCH USERS (ADMIN) =================
window.loadUsers = async function () {
  const tableBody = document.getElementById("userTable");

  if (!tableBody) return;

  tableBody.innerHTML = "Loading...";

  const querySnapshot = await getDocs(collection(db, "users"));

  let html = "";

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();

    html += `
      <tr>
        <td>${data.name}</td>
        <td>${data.email}</td>
        <td>${data.coins}</td>
      </tr>
    `;
  });

  tableBody.innerHTML = html;
};




import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// 🔥 Check login state
onAuthStateChanged(auth, (user) => {
  const authArea = document.getElementById("authArea");

  if (!authArea) return;

  if (user) {
    // ✅ Logged in UI
    authArea.innerHTML = `
      <span style="margin-right:10px;">👤 ${user.email}</span>
      <button onclick="logout()" style="padding:6px 10px;">Logout</button>
    `;
  } else {
    // ❌ Not logged in
    authArea.innerHTML = `<a href="login.html">Login</a>`;
  }
});

// 🔓 Logout
window.logout = async function () {
  await signOut(auth);
  location.reload();
};