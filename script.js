document.addEventListener('DOMContentLoaded', () => {
      // Initialize Typed.js if available
  if (typeof Typed !== 'undefined') {
    initTypedJS();
  }
  
  // Enhanced form validation
  enhanceFormValidation();
  
  // Back to top button
  initBackToTop();
  
  // Improved car card interactions
  initCarCards();


    // --- Dark Mode Toggle ---
    const darkToggle = document.getElementById('dark-toggle');
    if (darkToggle) {
        // Initialize based on user preference or local storage (optional improvement)
        // if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        //     document.documentElement.classList.add('dark');
        // } else {
        //     document.documentElement.classList.remove('dark');
        // }
        // Update button icon based on current mode
        updateDarkModeIcon();


        darkToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            // Save preference to local storage (optional)
            // if (document.documentElement.classList.contains('dark')) {
            //     localStorage.theme = 'dark';
            // } else {
            //     localStorage.theme = 'light';
            // }
             // Update button icon
            updateDarkModeIcon();
        });
    }

    function updateDarkModeIcon() {
        const iconElement = darkToggle.querySelector('i');
        if (document.documentElement.classList.contains('dark')) {
            iconElement.classList.remove('fa-moon');
            iconElement.classList.add('fa-sun'); // Sun icon for light mode
        } else {
            iconElement.classList.remove('fa-sun');
            iconElement.classList.add('fa-moon'); // Moon icon for dark mode
        }
    }


    // --- Smooth Scroll for Internal Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Scroll with offset for fixed header
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking an item
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                     mobileMenu.classList.add('hidden');
                }
            }
        });
    });


    // --- Animated Counters (Trigger on Scroll) ---
    const counters = document.querySelectorAll('.counter');
    const countersSection = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3.gap-8.text-center.py-12'); // Select the counter section

    const animateCounter = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / 200; // Adjusted increment for smoother animation

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                requestAnimationFrame(updateCount); // Use requestAnimationFrame for better performance
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    // Use Intersection Observer to start animation when section is in view
    if (countersSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(animateCounter);
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

        observer.observe(countersSection);
    }


    // --- Appointment Form Submission (Basic Validation) ---
    const form = document.getElementById('consultation-form');
    const formMessage = document.getElementById('form-message');

    if (form && formMessage) { // Check if elements exist
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic form validation
            const nameInput = form.querySelector('input[type="text"]');
            const emailInput = form.querySelector('input[type="email"]');
            const dateInput = form.querySelector('input[type="date"]');
            const phoneInput = form.querySelector('input[type="tel"]'); // Phone is optional
            const messageTextarea = form.querySelector('textarea'); // Message is optional

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const date = dateInput ? dateInput.value : '';

            // Simple email format check (optional but good)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name) {
                 formMessage.textContent = "Please enter your name.";
                 formMessage.className = 'mt-4 text-center text-sm font-medium text-red-600';
                 nameInput.focus();
            } else if (!email) {
                formMessage.textContent = "Please enter your email.";
                formMessage.className = 'mt-4 text-center text-sm font-medium text-red-600';
                emailInput.focus();
            } else if (!emailPattern.test(email)) {
                 formMessage.textContent = "Please enter a valid email address.";
                formMessage.className = 'mt-4 text-center text-sm font-medium text-red-600';
                 emailInput.focus();
            }
            else if (!date) {
                formMessage.textContent = "Please select an appointment date.";
                formMessage.className = 'mt-4 text-center text-sm font-medium text-red-600';
                 dateInput.focus();
            }
            else {
                // Basic success message - In a real application, you would send this data to a server
                console.log("Form Submitted:", {
                     name,
                     email,
                     phone: phoneInput ? phoneInput.value.trim() : '',
                     date,
                     message: messageTextarea ? messageTextarea.value.trim() : ''
                });

                formMessage.textContent = "Thank you! Your appointment request has been sent. We will contact you shortly.";
                formMessage.className = 'mt-4 text-center text-sm font-medium text-green-600'; // Green for success
                form.reset(); // Clear the form

                // Hide the success message after a few seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                     formMessage.className = 'mt-4 text-center text-sm font-medium'; // Reset class
                }, 7000); // Display for 7 seconds
            }
        });
    } else {
        console.error("Form or form message element not found!");
    }


    // --- Blog Container Drag Scroll ---
    const blogContainer = document.querySelector('.blog-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (blogContainer) {
         blogContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            blogContainer.classList.add('active');
            startX = e.pageX - blogContainer.offsetLeft;
            scrollLeft = blogContainer.scrollLeft;
            blogContainer.style.scrollBehavior = 'auto'; // Disable smooth scroll while dragging
        });

        blogContainer.addEventListener('mouseleave', () => {
            isDown = false;
            blogContainer.classList.remove('active');
             blogContainer.style.scrollBehavior = 'smooth'; // Re-enable smooth scroll
        });

        blogContainer.addEventListener('mouseup', () => {
            isDown = false;
            blogContainer.classList.remove('active');
             blogContainer.style.scrollBehavior = 'smooth'; // Re-enable smooth scroll
        });

        blogContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault(); // Prevent text selection etc.
            const x = e.pageX - blogContainer.offsetLeft;
            const walk = (x - startX) * 2; // Scroll faster
            blogContainer.scrollLeft = scrollLeft - walk;
        });

        // Prevent click on links/buttons inside if it was a drag
        let clickPrevented = false;
        blogContainer.addEventListener('click', function(e) {
            if (clickPrevented) {
                e.preventDefault();
                clickPrevented = false; // Reset
            }
        }, true); // Use capturing phase

         blogContainer.addEventListener('dragstart', (e) => {
            e.preventDefault(); // Prevent native drag behavior
         });


         let lastX = 0;
         blogContainer.addEventListener('mousemove', (e) => {
              if (!isDown) {
                  lastX = e.pageX; // Update last position when not dragging
                  return;
              }
              const currentX = e.pageX;
              if (Math.abs(currentX - lastX) > 5) { // Check if moved more than a threshold
                  clickPrevented = true;
              }
              lastX = currentX;
              // ... rest of mousemove logic
         });

         // Handle touch events for mobile
         blogContainer.addEventListener('touchstart', (e) => {
             isDown = true;
             blogContainer.classList.add('active');
             startX = e.touches[0].pageX - blogContainer.offsetLeft;
             scrollLeft = blogContainer.scrollLeft;
             blogContainer.style.scrollBehavior = 'auto'; // Disable smooth scroll while dragging
         });

         blogContainer.addEventListener('touchend', () => {
             isDown = false;
             blogContainer.classList.remove('active');
             blogContainer.style.scrollBehavior = 'smooth'; // Re-enable smooth scroll
         });

         blogContainer.addEventListener('touchmove', (e) => {
             if (!isDown) return;
             e.preventDefault(); // Prevent scrolling the page
             const x = e.touches[0].pageX - blogContainer.offsetLeft;
             const walk = (x - startX) * 2;
             blogContainer.scrollLeft = scrollLeft - walk;
         });
    }


    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenu = document.getElementById('close-mobile-menu');

    if (mobileMenuToggle && mobileMenu && closeMobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
        });

        closeMobileMenu.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });

        // Also close menu when a link inside is clicked (handled by smooth scroll logic)
    }

    window.addEventListener("load", () => {
        document.getElementById("user-popup").classList.remove("hidden");
      });
      
      document.getElementById("user-info-form").addEventListener("submit", function (e) {
        e.preventDefault();
        document.getElementById("user-popup").classList.add("hidden");
        // Optionally process form data here
      });
      
      document.getElementById("popup-close").addEventListener("click", () => {
        document.getElementById("user-popup").classList.add("hidden");
      });
      
      document.getElementById("user-info-form").addEventListener("submit", function (e) {
        const mobileInput = document.getElementById("mobile-number");
        const errorText = document.getElementById("mobile-error");
      
        const isValid = /^\d{10}$/.test(mobileInput.value);
      
        if (!isValid) {
          e.preventDefault();
          errorText.classList.remove("hidden");
          mobileInput.classList.add("border-red-500");
        } else {
          errorText.classList.add("hidden");
          mobileInput.classList.remove("border-red-500");
          document.getElementById("user-popup").classList.add("hidden");
          // Optionally handle form submission
        }

        document.getElementById("mobile-number").addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, '').slice(0, 10);
          });

      });

      const scrollLeftBtn = document.getElementById('scroll-left');
        const scrollRightBtn = document.getElementById('scroll-right');
        const blogCarousel = document.getElementById('blog-cards');


        scrollLeftBtn.addEventListener('click', () => {
        blogCarousel.scrollBy({ left: -300, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('click', () => {
        blogCarousel.scrollBy({ left: 300, behavior: 'smooth' });
        });


        fetch('blogData.json')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById("blog-cards");

                // Add blog posts initially
                data.forEach(post => {
                    container.appendChild(createBlogCard(post));
                });

                // Duplicate the posts for seamless looping
                data.forEach(post => {
                    container.appendChild(createBlogCard(post));
                });
            })
            .catch(error => console.error("Error loading blog data:", error));


            function createBlogCard(post) {
            const card = document.createElement("div");
            card.className = "flex-shrink-0 w-72 bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl transform hover:-translate-y-2";
            card.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="w-full h-40 object-cover">
                <div class="p-4">
                <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">${post.title}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">${post.description}</p>
                <a href="${post.link}" class="text-blue-600 dark:text-blue-400 text-sm font-medium mt-2 inline-block hover:underline">Read More</a>
                </div>
            `;
            return card;
            }

            let blogTrack = document.getElementById("blog-cards");
            let scrollSpeed = 1;

            function autoScroll() {
                blogTrack.scrollLeft += scrollSpeed;

                // Reset to the start seamlessly without resetting abruptly
                if (blogTrack.scrollLeft >= blogTrack.scrollWidth / 2) {
                    blogTrack.scrollLeft = 0;
                }

                requestAnimationFrame(autoScroll);
            }

            autoScroll();

            blogTrack.addEventListener("mouseenter", () => (scrollSpeed = 0));  // Pause scrolling when mouse enters
            blogTrack.addEventListener("mouseleave", () => (scrollSpeed = 1));  // Resume scrolling when mouse leaves


            initBlogCarousel();
      

}); // End DOMContentLoaded




// New functions to add
function initTypedJS() {
    const heroHeadline = document.querySelector('.hero-headline');
    if (heroHeadline) {
      // Save original text
      const originalText = heroHeadline.textContent;
      
      // Initialize Typed.js
      new Typed(heroHeadline, {
        strings: [originalText, 'Find Your Perfect Vehicle', 'Expert Car Consultations'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: false
      });
    }
  }
  
  function enhanceFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('input', function() {
          validateField(this);
        });
        
        // Focus styles
        input.addEventListener('focus', function() {
          this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
          this.parentElement.classList.remove('focused');
          validateField(this);
        });
      });
      
      // Form submission
      form.addEventListener('submit', function(e) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
          if (!validateField(field)) {
            isValid = false;
          }
        });
        
        if (!isValid) {
          e.preventDefault();
          // Show general error message
          const formMessage = form.querySelector('#form-message');
          if (formMessage) {
            formMessage.textContent = 'Please fill in all required fields correctly.';
            formMessage.className = 'mt-4 text-center text-sm font-medium text-red-600';
          }
        } else {
          // Show loading state
          const submitButton = form.querySelector('button[type="submit"]');
          if (submitButton) {
            submitButton.innerHTML = '<span class="loading-spinner"></span> Processing...';
            submitButton.disabled = true;
          }
        }
      });
    });
    
    function validateField(field) {
      const errorElement = field.nextElementSibling;
      
      // Clear previous errors
      if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
      }
      
      // Check required fields
      if (field.hasAttribute('required') && !field.value.trim()) {
        showError(field, 'This field is required');
        return false;
      }
      
      // Email validation
      if (field.type === 'email' && field.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value)) {
          showError(field, 'Please enter a valid email address');
          return false;
        }
      }
      
      // Phone validation
      if (field.type === 'tel' && field.value.trim() && field.hasAttribute('pattern')) {
        const pattern = new RegExp(field.getAttribute('pattern'));
        if (!pattern.test(field.value)) {
          showError(field, 'Please enter a valid phone number');
          return false;
        }
      }
      
      // Date validation
      if (field.type === 'date' && field.value) {
        const selectedDate = new Date(field.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
          showError(field, 'Please select a future date');
          return false;
        }
      }
      
      // If all validations pass
      field.classList.remove('input-error');
      field.classList.add('input-success');
      return true;
    }
    
    function showError(field, message) {
      field.classList.add('input-error');
      field.classList.remove('input-success');
      
      const errorElement = document.createElement('p');
      errorElement.className = 'error-message';
      errorElement.textContent = message;
      
      field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
  }
  
  function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg opacity-0 invisible transition-all duration-300 flex items-center justify-center w-12 h-12';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.remove('opacity-0', 'invisible');
        backToTop.classList.add('opacity-100', 'visible');
      } else {
        backToTop.classList.add('opacity-0', 'invisible');
        backToTop.classList.remove('opacity-100', 'visible');
      }
    });
    
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  function initCarCards() {
    const carCards = document.querySelectorAll('.car-card');
    
    carCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const overlay = card.querySelector('.car-card-overlay');
        if (overlay) {
          overlay.style.opacity = '1';
          overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        const overlay = card.querySelector('.car-card-overlay');
        if (overlay) {
          overlay.style.opacity = '0.9';
          overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        }
      });
    });
  }



  // Blog carousel functionality
function initBlogCarousel() {
    const blogSection = document.querySelector('.blog-section');
    const blogContainer = document.querySelector('.blog-container');
    const blogCards = document.getElementById('blog-cards');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
  
    // Check if elements exist
    if (!blogSection || !blogContainer || !blogCards) return;
  
    // Fetch blog data
    fetch('blogData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (!data || !data.length) {
          throw new Error('No blog data available');
        }
  
        // Clear existing content
        blogCards.innerHTML = '';
  
        // Create blog cards
        data.forEach(post => {
          blogCards.appendChild(createBlogCard(post));
        });
  
        // Duplicate cards for seamless looping
        data.forEach(post => {
          blogCards.appendChild(createBlogCard(post));
        });
  
        // Initialize auto-scroll
        setupAutoScroll();
      })
      .catch(error => {
        console.error('Error loading blog data:', error);
        blogSection.style.display = 'none'; // Hide section if there's an error
      });
  
    // Scroll button functionality
    if (scrollLeftBtn && scrollRightBtn) {
      scrollLeftBtn.addEventListener('click', () => {
        blogContainer.scrollBy({
          left: -300,
          behavior: 'smooth'
        });
      });
  
      scrollRightBtn.addEventListener('click', () => {
        blogContainer.scrollBy({
          left: 300,
          behavior: 'smooth'
        });
      });
    }
  
    // Pause auto-scroll on hover
    blogContainer.addEventListener('mouseenter', () => {
      blogContainer.style.animationPlayState = 'paused';
    });
  
    blogContainer.addEventListener('mouseleave', () => {
      blogContainer.style.animationPlayState = 'running';
    });
  }
  
  function createBlogCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card dark:bg-gray-700';
    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}" class="w-full">
      <div class="blog-card-content">
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">${post.title}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">${post.description}</p>
        <a href="${post.link}" class="mt-3 inline-flex items-center">
          Read More <i class="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
    `;
    return card;
  }
  
  function setupAutoScroll() {
    const blogContainer = document.querySelector('.blog-container');
    const blogCards = document.getElementById('blog-cards');
    
    // Reset to start when halfway through
    blogContainer.addEventListener('animationiteration', () => {
      if (blogContainer.scrollLeft >= blogCards.scrollWidth / 2) {
        blogContainer.scrollLeft = 0;
      }
    });
  }
