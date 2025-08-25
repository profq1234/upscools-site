import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

// ---------- Tab Logic ----------
const tabButtons = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".cms-section");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(btn.dataset.target).classList.add("active");
  });
});

// ---------- Initialize Quill Editor ----------
const quill = new Quill('#blog-content-editor', {
  theme: 'snow',
  placeholder: 'Write your blog content here...',
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  }
});

// ---------- Blog Form ----------
document.getElementById("blog-form").addEventListener("submit", async e => {
  e.preventDefault();

  const slug = document.getElementById("blog-slug").value.trim();
  const title = document.getElementById("blog-title").value.trim();
  const excerpt = document.getElementById("blog-excerpt").value.trim();
  const content = quill.root.innerHTML;
  const author = document.getElementById("blog-author").value.trim() || "Admin";
  const dateValue = document.getElementById("blog-date").value;
  const date = dateValue ? Timestamp.fromDate(new Date(dateValue)) : Timestamp.now();

  if (!slug || !title || !excerpt || !content) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    await setDoc(doc(db, "blogPosts", slug), { title, slug, excerpt, content, author, date });
    alert("Blog saved successfully!");
    document.getElementById("blog-form").reset();
    quill.setContents([]);
  } catch (err) {
    console.error(err);
    alert("Error saving blog.");
  }
});

// ---------- Subjects Form ----------
document.getElementById("subjects-form").addEventListener("submit", async e => {
  e.preventDefault();
  const name = document.getElementById("subject-name").value.trim();
  const desc = document.getElementById("subject-desc").value.trim();

  if (!name) { alert("Enter subject name."); return; }

  try {
    await setDoc(doc(db, "subjects", name), { name, desc });
    alert("Subject saved!");
    document.getElementById("subjects-form").reset();
  } catch (err) {
    console.error(err);
    alert("Error saving subject.");
  }
});

// ---------- Pages Form ----------
document.getElementById("pages-form").addEventListener("submit", async e => {
  e.preventDefault();
  const pageId = document.getElementById("page-id").value.trim();
  const title = document.getElementById("page-title").value.trim();
  const content = document.getElementById("page-content").value.trim();

  if (!pageId || !title || !content) { alert("Fill all fields."); return; }

  try {
    await setDoc(doc(db, "sitePages", pageId), { title, content });
    alert("Page saved!");
    document.getElementById("pages-form").reset();
  } catch (err) {
    console.error(err);
    alert("Error saving page.");
  }
});
