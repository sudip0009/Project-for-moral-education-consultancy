document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("nav-toggle-icon-open");

  function setMenu(open) {
    if (!mobileMenu || !navToggle) return;
    
    // Use a CSS class to control visibility instead of inline styles
    if (open) {
      mobileMenu.classList.add('active');
      navToggle.classList.add('active');
    } else {
      mobileMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
    
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  navToggle?.addEventListener("click", (e) => {
    e.preventDefault();
    const isOpen = mobileMenu?.classList.contains('active');
    setMenu(!isOpen);
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      setMenu(false);
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu?.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
      setMenu(false);
    }
  });

  // ==========================================
  // HERO SLIDER LOGIC - ONLY RUNS IF SLIDER EXISTS
  // ==========================================
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroDots = document.querySelectorAll(".hero-dot");
  
  // Only initialize slider if slides exist (i.e., on index.html)
  if (heroSlides.length > 0) {
    let currentHeroSlide = 0;
    let heroInterval;

    function showHeroSlide(index) {
      if (!heroSlides.length) return;

      // Validate index
      if (index >= heroSlides.length) index = 0;
      if (index < 0) index = heroSlides.length - 1;
      
      // Update current slide
      currentHeroSlide = index;

      // Update slides
      heroSlides.forEach((slide, i) => {
        const isActive = i === index;
        if (isActive) {
          slide.classList.add('active');
          slide.classList.remove('inactive');
          slide.style.opacity = "1";
          slide.style.zIndex = "1";
        } else {
          slide.classList.add('inactive');
          slide.classList.remove('active');
          slide.style.opacity = "0";
          slide.style.zIndex = "0";
        }
      });

      // Update dots if they exist
      heroDots.forEach((dot, i) => {
        const isActive = i === index;
        if (isActive) {
          dot.classList.add("active");
          dot.classList.remove("inactive");
        } else {
          dot.classList.add("inactive");
          dot.classList.remove("active");
        }
      });
    }

    function startHeroSlider() {
      if (heroSlides.length > 1) {
        heroInterval = setInterval(() => {
          currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
          showHeroSlide(currentHeroSlide);
        }, 5000);
      }
    }

    function stopHeroSlider() {
      if (heroInterval) {
        clearInterval(heroInterval);
      }
    }

    // Initialize slider if slides exist
    if (heroSlides.length) {
      // Add initial classes
      heroSlides.forEach((slide, i) => {
        if (i === 0) {
          slide.classList.add('active');
          slide.style.opacity = "1";
          slide.style.zIndex = "1";
        } else {
          slide.classList.add('inactive');
          slide.style.opacity = "0";
          slide.style.zIndex = "0";
        }
      });

      // Initialize first slide
      showHeroSlide(0);
      
      // Start automatic sliding
      startHeroSlider();
      
      // Pause on hover for better UX
      const sliderWrapper = document.querySelector('.hero-slider-wrapper');
      if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', stopHeroSlider);
        sliderWrapper.addEventListener('mouseleave', startHeroSlider);
        sliderWrapper.addEventListener('touchstart', stopHeroSlider);
        sliderWrapper.addEventListener('touchend', () => setTimeout(startHeroSlider, 3000));
      }
      
      // Add click handlers for dots if they exist
      heroDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          showHeroSlide(i);
          stopHeroSlider();
          setTimeout(startHeroSlider, 5000);
        });
      });
    }

    // Add keyboard navigation for accessibility (only for hero slider)
    const sliderKeyboardHandler = (e) => {
      if (heroSlides.length > 1 && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        stopHeroSlider();
        
        if (e.key === 'ArrowLeft') {
          showHeroSlide(currentHeroSlide - 1);
        } else if (e.key === 'ArrowRight') {
          showHeroSlide(currentHeroSlide + 1);
        }
        
        setTimeout(startHeroSlider, 5000);
      }
    };
    
    // Only attach keyboard events if we have a slider
    document.addEventListener('keydown', sliderKeyboardHandler);
  } // End of hero slider logic

  // ==========================================
  // GLOBAL KEYBOARD NAVIGATION (Works on all pages)
  // ==========================================
  document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu (works on all pages)
    if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
      setMenu(false);
    }
  });
});

















// Form Submission for new "Apply Now" form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.app-form-col form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Update form action for Formspree
            form.setAttribute('action', 'https://formspree.io/f/xdkebbgq');
            form.setAttribute('method', 'POST');
            
            const submitBtn = form.querySelector('.app-submit-btn');
            const originalBtnText = submitBtn.textContent;
            
            // Create success message element if it doesn't exist
            let formMessage = document.getElementById('app-form-message');
            if (!formMessage) {
                formMessage = document.createElement('div');
                formMessage.id = 'app-form-message';
                formMessage.style.cssText = `
                    margin-top: 15px;
                    padding: 10px;
                    border-radius: 5px;
                    text-align: center;
                    font-weight: bold;
                    display: none;
                `;
                form.parentNode.insertBefore(formMessage, form.nextSibling);
            }
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Create FormData object
            const formData = new FormData();
            
            // Add form fields to FormData
            const nameInput = form.querySelector('input[type="text"]');
            const emailInput = form.querySelector('input[type="email"]');
            const phoneInput = form.querySelector('input[type="tel"]');
            const checkbox = form.querySelector('input[type="checkbox"]');
            
            if (nameInput) formData.append('name', nameInput.value);
            if (emailInput) formData.append('email', emailInput.value);
            if (phoneInput) formData.append('phone', phoneInput.value);
            if (checkbox) formData.append('privacy-agreed', checkbox.checked ? 'Yes' : 'No');
            
            // Add additional form identifier
            formData.append('form-type', 'Apply Now Form');
            formData.append('source', 'MORAL Application Page');
            
            // Send form data using Formspree
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    formMessage.textContent = 'Application sent successfully!';
                    formMessage.style.color = 'green';
                    formMessage.style.backgroundColor = '#e7f7e7';
                    formMessage.style.border = '1px solid #c3e6cb';
                    form.reset();
                } else {
                    formMessage.textContent = 'Error sending application. Please try again.';
                    formMessage.style.color = '#721c24';
                    formMessage.style.backgroundColor = '#f8d7da';
                    formMessage.style.border = '1px solid #f5c6cb';
                }
            })
            .catch(error => {
                formMessage.textContent = 'Network error. Please try again.';
                formMessage.style.color = '#721c24';
                formMessage.style.backgroundColor = '#f8d7da';
                formMessage.style.border = '1px solid #f5c6cb';
            })
            .finally(() => {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                
                // Show message
                formMessage.style.display = 'block';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            });
        });
    }
});











// Simple Lightbox functionality - Only open/close
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    
    // Function to open lightbox with specific image
    function openLightbox(imageSrc, imageAlt) {
        // Set the image source
        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageAlt;
        
        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Function to close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Add click event to each gallery item
    galleryItems.forEach((item) => {
        const img = item.querySelector('img');
        const imageSrc = img.src;
        const imageAlt = img.alt;
        
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openLightbox(imageSrc, imageAlt);
        });
        
        // Also make the overlay icon clickable
        const overlay = item.querySelector('.overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openLightbox(imageSrc, imageAlt);
            });
        }
    });
    
    // Close lightbox when clicking on the background (overlay)
    lightbox.addEventListener('click', (e) => {
        // Only close if clicking on the overlay, not the image
        if (e.target === lightbox || e.target === lightboxImage) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation - only Escape key to close
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active') && e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // Mobile: tap anywhere to close (already handled by the click event above)
});
