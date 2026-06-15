/**
 * Phase 4: Interactive Polish - Animation & Form Validation System
 * Art Deco Interactive Effects for ev-ducscap
 */

(function() {
  'use strict';

  // ============================================
  // SCROLL-TRIGGERED ANIMATIONS
  // ============================================

  /**
   * Initialize Intersection Observer for scroll-triggered animations
   * Adds 'aos-animate' class when elements enter viewport
   */
  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px', // Trigger 100px before reaching bottom
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach((el) => {
      observer.observe(el);
    });
  }

  // ============================================
  // PARALLAX SCROLL EFFECT
  // ============================================

  /**
   * Update parallax element positions on scroll
   */
  function updateParallax() {
    const scrollY = window.scrollY || window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach((el) => {
      el.style.setProperty('--scroll-y', `${scrollY}px`);
    });
  }

  // ============================================
  // FORM VALIDATION
  // ============================================

  /**
   * Real-time form validation with visual feedback
   */
  function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach((form) => {
      const inputs = form.querySelectorAll('input, textarea, select');

      inputs.forEach((input) => {
        // On blur, validate
        input.addEventListener('blur', () => {
          validateField(input);
        });

        // On input, remove error state if corrected
        input.addEventListener('input', () => {
          if (input.parentElement.classList.contains('is-invalid')) {
            if (isFieldValid(input)) {
              input.parentElement.classList.remove('is-invalid');
              input.parentElement.classList.add('is-valid');
            }
          }
        });
      });

      // Form submission
      form.addEventListener('submit', (e) => {
        let isValid = true;

        inputs.forEach((input) => {
          if (!validateField(input)) {
            isValid = false;
          }
        });

        if (!isValid) {
          e.preventDefault();
          showFormError(form, 'Please correct the errors above.');
        }
      });
    });
  }

  /**
   * Validate a single field
   */
  function validateField(input) {
    const formGroup = input.parentElement.closest('.form-group') || input.parentElement;

    if (!isFieldValid(input)) {
      formGroup.classList.remove('is-valid');
      formGroup.classList.add('is-invalid');
      return false;
    } else {
      formGroup.classList.remove('is-invalid');
      formGroup.classList.add('is-valid');
      return true;
    }
  }

  /**
   * Check if field is valid
   */
  function isFieldValid(input) {
    // Empty field check
    if (input.hasAttribute('required') && input.value.trim() === '') {
      return false;
    }

    // Email validation
    if (input.type === 'email' && input.value !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(input.value);
    }

    // Phone validation (simple)
    if (input.type === 'tel' && input.value !== '') {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      return phoneRegex.test(input.value) && input.value.length >= 10;
    }

    // Min length validation
    if (input.hasAttribute('minlength')) {
      return input.value.length >= parseInt(input.getAttribute('minlength'));
    }

    // Pattern validation (regex)
    if (input.hasAttribute('pattern')) {
      const pattern = new RegExp(input.getAttribute('pattern'));
      return pattern.test(input.value);
    }

    return true;
  }

  /**
   * Show form-level error message
   */
  function showFormError(form, message) {
    let errorAlert = form.querySelector('.form-error-alert');

    if (!errorAlert) {
      errorAlert = document.createElement('div');
      errorAlert.className = 'alert alert-danger form-error-alert';
      errorAlert.setAttribute('role', 'alert');
      form.insertBefore(errorAlert, form.firstChild);
    }

    errorAlert.textContent = message;
    errorAlert.style.animation = 'slideDownIn 0.3s ease-out';
    errorAlert.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
      errorAlert.style.display = 'none';
    }, 5000);
  }

  // ============================================
  // BUTTON RIPPLE EFFECT
  // ============================================

  /**
   * Add ripple effect to buttons with data-ripple attribute
   */
  function initRippleEffect() {
    const buttons = document.querySelectorAll('button[data-ripple], .btn-interactive');

    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // ============================================
  // CALCULATOR PAGE INTERACTIVE FEATURES
  // ============================================

  /**
   * Add calculator result animation on change
   */
  function initCalculatorEffects() {
    const calculatorForms = document.querySelectorAll('form[data-calculator]');

    calculatorForms.forEach((form) => {
      const inputs = form.querySelectorAll('input, select');
      const resultElement = form.querySelector('[data-result]');

      if (!resultElement) return;

      inputs.forEach((input) => {
        input.addEventListener('input', () => {
          resultElement.classList.add('animate-glow-pulse');
          
          // Remove animation class after it completes
          setTimeout(() => {
            resultElement.classList.remove('animate-glow-pulse');
          }, 2000);
        });
      });
    });
  }

  // ============================================
  // SMOOTH ANCHOR SCROLL
  // ============================================

  /**
   * Smooth scroll to anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;

        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Optional: Add animation to target element
          target.classList.add('highlight-focus');
          setTimeout(() => {
            target.classList.remove('highlight-focus');
          }, 2000);
        }
      });
    });
  }

  // ============================================
  // LOADING STATE MANAGEMENT
  // ============================================

  /**
   * Show loading state (useful for form submissions, async operations)
   */
  window.showLoading = function(element) {
    element.classList.add('is-loading');
    element.disabled = true;
    element.innerHTML = '<span class="loader loader-sm"></span>';
  };

  /**
   * Hide loading state
   */
  window.hideLoading = function(element, originalText) {
    element.classList.remove('is-loading');
    element.disabled = false;
    element.innerHTML = originalText;
  };

  // ============================================
  // IMAGE LAZY LOADING
  // ============================================

  /**
   * Lazy load images with intersection observer
   */
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.removeAttribute('data-src');
            img.classList.add('animate-fade-in');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      images.forEach((img) => {
        img.src = img.dataset.src || img.src;
      });
    }
  }

  // ============================================
  // PORTFOLIO GALLERY INTERACTIONS
  // ============================================

  /**
   * Add gallery lightbox interactions
   */
  function initPortfolioGallery() {
    const portfolioItems = document.querySelectorAll('[data-portfolio-item]');

    portfolioItems.forEach((item) => {
      item.addEventListener('click', () => {
        item.classList.add('active');
      });
    });

    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach((modal) => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('show');
        }
      });
    });
  }

  // ============================================
  // NAVBAR SCROLL EFFECTS
  // ============================================

  /**
   * Add effects to navbar on scroll
   */
  function initNavbarScroll() {
    const navbar = document.querySelector('nav.navbar');
    if (!navbar) return;

    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || window.pageYOffset;

      if (scrollTop > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  /**
   * Initialize all interactive features when DOM is ready
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Initialize all features
    initScrollAnimations();
    initFormValidation();
    initRippleEffect();
    initCalculatorEffects();
    initSmoothScroll();
    initLazyLoading();
    initPortfolioGallery();
    initNavbarScroll();

    // Update parallax on scroll
    window.addEventListener('scroll', updateParallax, { passive: true });

    // Initial parallax update
    updateParallax();

    console.log('Phase 4 Interactive Polish initialized ✓');
  }

  // Start initialization
  init();

})();

// ============================================
// CSS FOR INTERACTIVE ELEMENTS (no CSS-in-JS)
// Add these styles to your SCSS files:
// ============================================
/*
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: scale(0);
  animation: rippleEffect 0.6s ease-out;
  pointer-events: none;
}

@keyframes rippleEffect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.form-error-alert {
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: rgba(255, 107, 107, 0.1);
  border-left: 4px solid #ff6b6b;
  color: #ff6b6b;
  border-radius: 0;
}

.navbar-scrolled {
  box-shadow: 0 2px 10px rgba(212, 175, 55, 0.1);
  background-color: rgba(10, 10, 10, 0.98);
}

.highlight-focus {
  animation: pulse 0.5s ease-out;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
  }
}
*/
