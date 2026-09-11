document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav nav");
  if (button && nav) button.addEventListener("click", () => nav.classList.toggle("open"));
});
