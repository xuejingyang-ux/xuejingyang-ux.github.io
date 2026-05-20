const navLinks = Array.from(document.querySelectorAll(".side-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const activateNav = () => {
  const scrollPosition = window.scrollY + 140;
  let currentId = sections[0]?.id;

  for (const section of sections) {
    if (section.offsetTop <= scrollPosition) {
      currentId = section.id;
    }
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
};

document.getElementById("year").textContent = new Date().getFullYear();
window.addEventListener("scroll", activateNav, { passive: true });
activateNav();
