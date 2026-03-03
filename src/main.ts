import './style.css'

// --- Typing Animation ---
const typingText = document.querySelector('#typing-text');
const skills = ['AI Researcher', 'Machine Learning Enthusiast', 'Cloud & DevOps Learner', 'Python Developer'];
let skillIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
  if (!typingText) return;

  const currentSkill = skills[skillIndex];

  if (isDeleting) {
    typingText.textContent = currentSkill.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typingText.textContent = currentSkill.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 150;
  }

  if (!isDeleting && charIndex === currentSkill.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    skillIndex = (skillIndex + 1) % skills.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

// --- Scroll Reveal with Intersection Observer ---
const revealOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, revealOptions);

const reveals = document.querySelectorAll('.reveal');
reveals.forEach(el => revealObserver.observe(el));

// --- Navbar State ---
const navbar = document.querySelector('#navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
});

// --- Theme Toggle ---
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme-icon');
let isDark = true;

themeToggle?.addEventListener('click', () => {
  isDark = !isDark;
  document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  if (themeIcon) themeIcon.textContent = isDark ? '🌙' : '☀️';
});

// --- Custom Cursor Logic ---
const cursor = document.querySelector('#custom-cursor') as HTMLElement;
const cursorOutline = document.querySelector('#cursor-outline') as HTMLElement;
const scrollProgress = document.querySelector('#scroll-progress') as HTMLElement;

window.addEventListener('mousemove', (e) => {
  if (cursor && cursorOutline) {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    // Outline follows with a slight delay naturally due to CSS transition
    cursorOutline.style.left = `${e.clientX}px`;
    cursorOutline.style.top = `${e.clientY}px`;
  }
});

// Cursor Hover Effects
document.querySelectorAll('a, button, .glass').forEach(el => {
  el.addEventListener('mouseenter', () => cursorOutline?.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorOutline?.classList.remove('hover'));
});

// --- Scroll Progress Logic ---
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  if (scrollProgress) scrollProgress.style.width = `${scrolled}%`;
});

// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
  type();
});
