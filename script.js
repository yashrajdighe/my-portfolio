// Tailwind configuration
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    primary: {
                        50: 'hsl(214, 100%, 97%)',
                        100: 'hsl(214, 95%, 93%)',
                        200: 'hsl(213, 97%, 87%)',
                        300: 'hsl(212, 96%, 78%)',
                        400: 'hsl(213, 94%, 68%)',
                        500: 'hsl(217, 91%, 60%)',
                        600: 'hsl(221, 83%, 53%)',
                        700: 'hsl(224, 76%, 48%)',
                        800: 'hsl(226, 71%, 40%)',
                        900: 'hsl(224, 64%, 33%)',
                    }
                }
            }
        }
    };
}

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
    mobileMenuLinks?.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Smooth scroll behavior is now in the conditional code below the 404 page check

    // Toast notification functionality
    function showToast(message, type = 'success') {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create new toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Show toast with animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Hide toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4000);
    }

    // Form validation helper
    function validateForm(formData, requiredFields) {
        const errors = [];
        
        requiredFields.forEach(field => {
            if (!formData[field] || formData[field].trim() === '') {
                errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
            }
        });

        // Email validation
        if (formData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                errors.push('Please enter a valid email address');
            }
        }

        return errors;
    }

    // Simulate form submission for static website
    async function simulateFormSubmission(data, type) {
        // In a real implementation, this would send data to a backend API or email service
        // For the static version, we'll just log the data and simulate a delay
        
        console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} form submission:`, data);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Here you could integrate with services like:
        // - Netlify Forms
        // - Formspree
        // - EmailJS
        // - AWS SES via Lambda
        // - Or any other static-friendly form handling service
        
        return { success: true };
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('nav a[href^="#"]');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('text-blue-600');
            item.classList.add('text-gray-700');
            
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.remove('text-gray-700');
                item.classList.add('text-blue-600');
            }
        });
    }

    // Update navigation on scroll
    window.addEventListener('scroll', updateActiveNavigation);

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.hover-lift, .skill-badge');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-fade-in');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Resume download handler
    const downloadButton = document.querySelector('a[download]');
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            console.log('Resume download initiated');
        });
    }

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
    
    // Back to Top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        // Show/hide the button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0');
                backToTopButton.classList.add('opacity-100');
                backToTopButton.classList.remove('pointer-events-none');
            } else {
                backToTopButton.classList.add('opacity-0');
                backToTopButton.classList.remove('opacity-100');
                backToTopButton.classList.add('pointer-events-none');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Resume preview button
    const previewButton = document.getElementById('preview-resume-btn');
    const openContactFormButton = document.getElementById('open-contact-form-btn');
    const openHireFormButton = document.getElementById('open-hire-form-btn');
    
    if (previewButton) {
        previewButton.addEventListener('click', function() {
            // Create the iframe element only when the modal is opened
            const iframeContainer = document.getElementById('resume-iframe-container');
            iframeContainer.innerHTML = ''; // Clear any previous iframe
            
            // The filename is already set in the HTML as "Yashraj_Dighe_Resume.pdf"
            
            const iframe = document.createElement('iframe');
            iframe.className = 'w-full h-full';
            iframe.frameBorder = '0';
            
            // Add loading message until the PDF loads
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'flex items-center justify-center h-full';
            loadingDiv.innerHTML = '<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>';
            iframeContainer.appendChild(loadingDiv);
            
            // Load the PDF
            iframe.onload = function() {
                // Remove the loading spinner when the iframe loads
                if (iframeContainer.contains(loadingDiv)) {
                    iframeContainer.removeChild(loadingDiv);
                }
            };
            
            iframe.onerror = function() {
                iframeContainer.innerHTML = '<div class="flex items-center justify-center h-full"><p class="text-gray-600">Unable to load resume. Please try downloading it instead.</p></div>';
            };
            
            iframe.src = './resume.pdf';
            iframeContainer.appendChild(iframe);
            
            // Show the modal
            document.getElementById('resume-modal').classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    }

    // Close modal button
    const closeModalBtn = document.getElementById('close-modal-btn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            document.getElementById('resume-modal').classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Remove the iframe when the modal is closed to prevent background loading
            document.getElementById('resume-iframe-container').innerHTML = '';
        });
    }
    
    // Close modal when clicking outside the modal content
    const resumeModal = document.getElementById('resume-modal');
    if (resumeModal) {
        resumeModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
                // Remove the iframe when the modal is closed to prevent background loading
                document.getElementById('resume-iframe-container').innerHTML = '';
            }
        });
    }
    
    // Copy resume link button
    const copyResumeLinkBtn = document.getElementById('copy-resume-link-btn');
    if (copyResumeLinkBtn) {
        // Flag to track if button action is in progress
        let isProcessing = false;
        
        copyResumeLinkBtn.addEventListener('click', function() {
            // Prevent multiple clicks while processing
            if (isProcessing) return;
            
            // Set processing flag to true
            isProcessing = true;
            
            // Get the current URL and add the resume path
            const baseUrl = window.location.href.split('#')[0].split('?')[0];
            const resumeUrl = new URL('resume.pdf', baseUrl).href;
            const customFilename = 'Yashraj_Dighe_Resume.pdf';
            
            // Store original button content
            const originalIcon = '<i data-lucide="link" class="mr-2 w-5 h-5"></i>';
            const originalText = 'Copy Link to Resume';
            const originalClasses = this.className;
            
            // Change button appearance
            this.innerHTML = '<i data-lucide="check" class="mr-2 w-5 h-5"></i>Copied!';
            this.classList.remove('border-blue-600', 'text-blue-600', 'hover:bg-blue-50');
            this.classList.add('bg-green-600', 'text-white', 'hover:bg-green-700');
            
            // Initialize Lucide icons for the new icon
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            
            // Copy the URL to clipboard
            navigator.clipboard.writeText(resumeUrl)
                .then(() => {
                    console.log('Resume URL copied to clipboard:', resumeUrl);
                    
                    // Reset the button after 2 seconds
                    setTimeout(() => {
                        this.innerHTML = originalIcon + originalText;
                        this.className = originalClasses;
                        
                        // Reinitialize Lucide icons
                        if (typeof lucide !== 'undefined') {
                            lucide.createIcons();
                        }
                        
                        // Reset processing flag
                        isProcessing = false;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Error copying resume URL to clipboard:', err);
                    
                    // Reset the button immediately on error
                    this.innerHTML = originalIcon + originalText;
                    this.className = originalClasses;
                    
                    // Reinitialize Lucide icons
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                    
                    // Reset processing flag
                    isProcessing = false;
                    
                    // Show error toast
                    if (typeof showToast === 'function') {
                        showToast('Failed to copy link. Please try again.', 'error');
                    }
                });
        });
    }
    
    // Handle Escape key for all modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close resume modal if open
            if (resumeModal && !resumeModal.classList.contains('hidden')) {
                resumeModal.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
                // Remove the iframe when the modal is closed to prevent background loading
                document.getElementById('resume-iframe-container').innerHTML = '';
            }
            
            // Close contact modal if open
            const contactFormModal = document.getElementById('contact-form-modal');
            if (contactFormModal && !contactFormModal.classList.contains('hidden')) {
                contactFormModal.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
            }
            
            // Close hire modal if open
            const hireFormModal = document.getElementById('hire-form-modal');
            if (hireFormModal && !hireFormModal.classList.contains('hidden')) {
                hireFormModal.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
            }
        }
    });

    // External link handlers for projects and blog posts
    const externalLinks = document.querySelectorAll('[data-lucide="external-link"]');
    externalLinks.forEach(link => {
        // Skip if inside an <a> tag that already has an href
        if (link.closest('a') && link.closest('a').getAttribute('href')) return;
        
        link.parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('External link would open here. Please add your actual project/blog URLs.', 'success');
            
            // Example of opening external links:
            // window.open('your-actual-url', '_blank');
        });
    });

    // GitHub links
    const githubLinks = document.querySelectorAll('[data-lucide="github"]');
    githubLinks.forEach(link => {
        // Skip if already wrapped in a link or is a child of an <a> tag
        if (link.parentElement.tagName === 'A' || link.closest('a')) return;
        
        link.parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('GitHub link would open here. Please add your actual GitHub URLs.', 'success');
        });
    });

    // Initialize everything
    updateActiveNavigation();
    console.log('Portfolio website initialized successfully!');
});

// Utility function for handling external integrations
window.portfolioConfig = {
    // Configuration for external services
    forms: {
        // Example configuration for form services
        // emailjs: {
        //     serviceId: 'your_service_id',
        //     templateId: 'your_template_id',
        //     publicKey: 'your_public_key'
        // }
    },
    analytics: {
        // Example configuration for analytics
        // google: {
        //     trackingId: 'GA_TRACKING_ID'
        // }
    },
    social: {
        github: 'https://github.com/your-username',
        linkedin: 'https://linkedin.com/in/your-profile',
        medium: 'https://medium.com/@your-username',
        email: 'your.email@example.com'
    }
};

// 404 Page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the 404 page
    const is404Page = document.title.includes('Page Not Found');
    
    // Modify home link behavior on 404 page
    if (is404Page) {
        // Get all home links on the 404 page
        const homeLinks = document.querySelectorAll('a[href="/"]');
        homeLinks.forEach(link => {
            // Remove the default event listeners by cloning and replacing
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Add explicit link to home without preventing default
            newLink.addEventListener('click', function() {
                window.location.href = '/';
            });
        });
    } else {
        // Regular home button behavior for other pages (smooth scroll)
        const homeLinks = document.querySelectorAll('a[href="/"], a[href="#"]');
        homeLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({ 
                    top: 0, 
                    behavior: 'smooth' 
                });
            });
        });
    }
});
