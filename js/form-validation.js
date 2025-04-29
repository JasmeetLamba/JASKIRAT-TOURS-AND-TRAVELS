/**
 * Jaskirat Tour and Travels - Form Validation JavaScript
 * Handles contact form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const phoneError = document.getElementById('phone-error');
        const messageError = document.getElementById('message-error');
        
        const formSuccess = document.getElementById('form-success');
        const formError = document.getElementById('form-error');
        
        // Helper function to display error message
        function showError(input, errorElement, message) {
            input.classList.add('error');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            return false;
        }
        
        // Helper function to clear error message
        function clearError(input, errorElement) {
            input.classList.remove('error');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        // Validate name
        function validateName() {
            const name = nameInput.value.trim();
            
            if (name === '') {
                return showError(nameInput, nameError, 'Name is required');
            } else if (name.length < 2) {
                return showError(nameInput, nameError, 'Name must be at least 2 characters');
            } else {
                clearError(nameInput, nameError);
                return true;
            }
        }
        
        // Validate email
        function validateEmail() {
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email === '') {
                return showError(emailInput, emailError, 'Email is required');
            } else if (!emailRegex.test(email)) {
                return showError(emailInput, emailError, 'Please enter a valid email address');
            } else {
                clearError(emailInput, emailError);
                return true;
            }
        }
        
        // Validate phone
        function validatePhone() {
            const phone = phoneInput.value.trim();
            const phoneRegex = /^[0-9]{10,15}$/;
            
            if (phone === '') {
                return showError(phoneInput, phoneError, 'Phone number is required');
            } else if (!phoneRegex.test(phone.replace(/[\s()+\-]/g, ''))) {
                return showError(phoneInput, phoneError, 'Please enter a valid phone number (10-15 digits)');
            } else {
                clearError(phoneInput, phoneError);
                return true;
            }
        }
        
        // Validate message
        function validateMessage() {
            const message = messageInput.value.trim();
            
            if (message === '') {
                return showError(messageInput, messageError, 'Message is required');
            } else if (message.length < 10) {
                return showError(messageInput, messageError, 'Message must be at least 10 characters');
            } else {
                clearError(messageInput, messageError);
                return true;
            }
        }
        
        // Add event listeners for real-time validation
        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        phoneInput.addEventListener('blur', validatePhone);
        messageInput.addEventListener('blur', validateMessage);
        
        // Clear error on input change
        nameInput.addEventListener('input', () => clearError(nameInput, nameError));
        emailInput.addEventListener('input', () => clearError(emailInput, emailError));
        phoneInput.addEventListener('input', () => clearError(phoneInput, phoneError));
        messageInput.addEventListener('input', () => clearError(messageInput, messageError));
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide previous success/error messages
            formSuccess.style.display = 'none';
            formError.style.display = 'none';
            
            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isPhoneValid = validatePhone();
            const isMessageValid = validateMessage();
            
            // If all fields are valid, submit the form
            if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
                // In a real application, this would send the data to a server
                // For this demo, we'll simulate a successful submission
                
                // Disable submit button and show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Simulate server request delay
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    formSuccess.style.display = 'block';
                    
                    // Scroll to success message
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    
                    // Auto-hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                    
                }, 1500); // Simulate 1.5 second delay for server request
            } else {
                // Show form error if validation fails
                formError.style.display = 'block';
                formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Auto-hide error message after 5 seconds
                setTimeout(() => {
                    formError.style.display = 'none';
                }, 5000);
            }
        });
    }
});
