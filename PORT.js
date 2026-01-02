// Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const navbar = document.getElementById('navbar');
  const themeToggle = document.getElementById('themeToggle');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const scrollDown = document.getElementById('scrollDown');
  const backToTop = document.getElementById('backToTop');
  const contactForm = document.getElementById('contactForm');
  
  // Icons
  const iconMoon = document.querySelector('.icon-moon');
  const iconSun = document.querySelector('.icon-sun');
  const iconMenu = document.querySelector('.icon-menu');
  const iconClose = document.querySelector('.icon-close');

  // Theme Management
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      updateThemeIcons(true);
    }
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
  }

  function updateThemeIcons(isDark) {
    if (iconMoon && iconSun) {
      iconMoon.classList.toggle('hidden', isDark);
      iconSun.classList.toggle('hidden', !isDark);
    }
  }

  // Navigation Scroll Effect
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
  }

  function updateActiveNavLink() {
    const sections = ['home', 'projects', 'skills', 'about', 'contact'];
    const scrollPosition = window.scrollY + 100;

    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      }
    });
  }

  // Mobile Menu
  function toggleMobileMenu() {
    const isOpen = navLinks.classList.toggle('mobile-open');
    
    if (iconMenu && iconClose) {
      iconMenu.classList.toggle('hidden', isOpen);
      iconClose.classList.toggle('hidden', !isOpen);
    }
    
    // Create mobile nav if not exists
    let mobileNav = document.querySelector('.mobile-nav');
    
    if (isOpen) {
      if (!mobileNav) {
        mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        mobileNav.innerHTML = `
          <ul class="nav-links">
            <li><a href="#home" class="nav-link">Home</a></li>
            <li><a href="#projects" class="nav-link">Projects</a></li>
            <li><a href="#skills" class="nav-link">Skills</a></li>
            <li><a href="#about" class="nav-link">About</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
          </ul>
        `;
        navbar.after(mobileNav);
        
        // Add click handlers to mobile nav links
        mobileNav.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
            toggleMobileMenu();
          });
        });
      }
      mobileNav.classList.add('open');
    } else {
      if (mobileNav) {
        mobileNav.classList.remove('open');
      }
    }
  }

  // Smooth Scrolling
  function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
      const offsetTop = target.offsetTop - 64; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  // Handle nav link clicks
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      smoothScrollTo(targetId);
    });
  });

  // Handle footer nav link clicks
  document.querySelectorAll('.footer-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      smoothScrollTo(targetId);
    });
  });

  // Contact Form Handling
  function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    console.log('Form submitted:', formData);
    
    // Show success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(function() {
      submitBtn.innerHTML = 'Message Sent!';
      submitBtn.style.background = 'var(--success)';
      
      // Reset form
      contactForm.reset();
      
      // Reset button after 3 seconds
      setTimeout(function() {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }, 1000);
  }

  // Back to Top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Scroll down button
  function scrollToProjects() {
    smoothScrollTo('#projects');
  }

  // Animate skill bars on scroll
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const width = entry.target.style.width;
          entry.target.style.width = '0';
          setTimeout(function() {
            entry.target.style.width = width;
          }, 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(function(bar) {
      observer.observe(bar);
    });
  }

  // Event Listeners
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  if (scrollDown) {
    scrollDown.addEventListener('click', scrollToProjects);
  }

  if (backToTop) {
    backToTop.addEventListener('click', scrollToTop);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  window.addEventListener('scroll', handleScroll);

  // Initialize
  initTheme();
  handleScroll();
  animateSkillBars();

  // Handle logo clicks
  document.querySelectorAll('.nav-logo').forEach(function(logo) {
    logo.addEventListener('click', function(e) {
      e.preventDefault();
      smoothScrollTo('#home');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav && mobileNav.classList.contains('open')) {
      if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        toggleMobileMenu();
      }
    }
  });

  console.log('Portfolio loaded successfully!');
});
