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

// --- Scroll Reveal ---
const reveals = document.querySelectorAll('.reveal');

function reveal() {
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

// --- Navbar State ---
const navbar = document.querySelector('#navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    reveal();
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

// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
  type();
  reveal(); // Initial check
});
