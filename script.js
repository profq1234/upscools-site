// Toggle dropdown menu
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".menu-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  toggleBtn.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
  });

  // Optional: Hide menu if clicked outside
  document.addEventListener("click", (e) => {
    if (
      !dropdownMenu.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      dropdownMenu.classList.add("hidden");
    }
  });

  // Highlight active nav link
  const links = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});
// Highlight active nav link based on current URL
document.querySelectorAll('.dropdown-menu a').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});