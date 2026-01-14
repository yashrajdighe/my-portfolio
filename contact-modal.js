// Contact form modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Contact form button functionality
    const openContactFormButton = document.getElementById('open-contact-form-btn');
    if (openContactFormButton) {
        openContactFormButton.addEventListener('click', function() {
            // Open the contact form modal
            const contactFormModal = document.getElementById('contact-form-modal');
            if (contactFormModal) {
                contactFormModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    }
    
    // Close contact form modal button
    const closeContactModalBtn = document.getElementById('close-contact-modal-btn');
    if (closeContactModalBtn) {
        closeContactModalBtn.addEventListener('click', function() {
            document.getElementById('contact-form-modal').classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // Close contact modal when clicking outside the modal content
    const contactFormModal = document.getElementById('contact-form-modal');
    if (contactFormModal) {
        contactFormModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }
    
    // Hire form button functionality
    const openHireFormButton = document.getElementById('open-hire-form-btn');
    if (openHireFormButton) {
        openHireFormButton.addEventListener('click', function() {
            // Open the hire form modal
            const hireFormModal = document.getElementById('hire-form-modal');
            if (hireFormModal) {
                hireFormModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    }
    
    // Close hire form modal button
    const closeHireModalBtn = document.getElementById('close-hire-modal-btn');
    if (closeHireModalBtn) {
        closeHireModalBtn.addEventListener('click', function() {
            document.getElementById('hire-form-modal').classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // Close hire modal when clicking outside the modal content
    const hireFormModal = document.getElementById('hire-form-modal');
    if (hireFormModal) {
        hireFormModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close contact modal if open
            if (contactFormModal && !contactFormModal.classList.contains('hidden')) {
                contactFormModal.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
            }
            
            // Close hire modal if open
            if (hireFormModal && !hireFormModal.classList.contains('hidden')) {
                hireFormModal.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
            }
        }
    });
});
