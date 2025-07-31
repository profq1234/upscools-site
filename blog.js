import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBF3pyZBPfCyr5V0RF0Q2of33JWNWo3-XA",
  authDomain: "upscools.firebaseapp.com",
  projectId: "upscools",
  storageBucket: "upscools.appspot.com",
  messagingSenderId: "904130312850",
  appId: "1:904130312850:web:7ea707ef3e8d2c98b3444b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadBlogPosts() {
  const container = document.getElementById('blog-container');
  const querySnapshot = await getDocs(collection(db, "blogPosts"));

  querySnapshot.forEach((doc) => {
    const post = doc.data();
    const card = document.createElement('a');
    card.className = "subject-card";
    card.href = `blog-post.html?slug=${post.slug}`;
    card.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
    `;
    container.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', loadBlogPosts);
console.log("Loaded slug:", slug);