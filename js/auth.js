// Authentication Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding form
            const formId = this.getAttribute('data-tab') === 'login' ? 'loginForm' : 'registerForm';
            document.getElementById(formId).classList.add('active');
        });
    });

    // User Type Selection
    const userTypes = document.querySelectorAll('.user-type');
    
    userTypes.forEach(type => {
        type.addEventListener('click', function() {
            // Find all user types within the same form
            const parentForm = this.closest('.auth-form');
            const siblingTypes = parentForm.querySelectorAll('.user-type');
            
            // Remove active class from all types in this form
            siblingTypes.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked type
            this.classList.add('active');
            
            // Get the user type
            const userType = this.getAttribute('data-type');
            
            // Update form fields based on user type if needed
            updateFormFields(parentForm, userType);
        });
    });

    // Function to update form fields based on user type
    function updateFormFields(form, userType) {
        // Example: Show/hide specific fields based on user type
        // This can be customized based on your requirements
        
        if (form.id === 'registerForm') {
            const bloodGroupField = form.querySelector('#bloodGroup').closest('.form-group');
            
            if (userType === 'donor') {
                // Show blood group field for donors
                bloodGroupField.style.display = 'block';
            } else if (userType === 'patient') {
                // Show blood group field for patients too, but could be customized
                bloodGroupField.style.display = 'block';
            }
        }
    }

    // Toggle Password Visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordField = this.previousElementSibling;
            
            // Toggle password visibility
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // Form Validation and Submission
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const email = this.querySelector('#loginEmail').value;
            const password = this.querySelector('#loginPassword').value;
            const userType = this.querySelector('.user-type.active').getAttribute('data-type');
            const rememberMe = this.querySelector('#rememberMe').checked;
            
            // Validate form data
            if (!validateEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            if (password.length < 6) {
                showError('Password must be at least 6 characters long');
                return;
            }
            
            // Simulate login (In a real application, this would be an API call)
            console.log('Login Data:', { email, password, userType, rememberMe });
            
            // Redirect based on user type
            redirectAfterLogin(userType);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const firstName = this.querySelector('#firstName').value;
            const lastName = this.querySelector('#lastName').value;
            const email = this.querySelector('#registerEmail').value;
            const phone = this.querySelector('#phone').value;
            const bloodGroup = this.querySelector('#bloodGroup').value;
            const dob = this.querySelector('#dob').value;
            const password = this.querySelector('#registerPassword').value;
            const confirmPassword = this.querySelector('#confirmPassword').value;
            const userType = this.querySelector('.user-type.active').getAttribute('data-type');
            const termsAgree = this.querySelector('#termsAgree').checked;
            
            // Validate form data
            if (!firstName || !lastName) {
                showError('Please enter your full name');
                return;
            }
            
            if (!validateEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            if (!validatePhone(phone)) {
                showError('Please enter a valid phone number');
                return;
            }
            
            if (!bloodGroup) {
                showError('Please select your blood group');
                return;
            }
            
            if (!dob) {
                showError('Please enter your date of birth');
                return;
            }
            
            if (password.length < 6) {
                showError('Password must be at least 6 characters long');
                return;
            }
            
            if (password !== confirmPassword) {
                showError('Passwords do not match');
                return;
            }
            
            if (!termsAgree) {
                showError('You must agree to the Terms of Service and Privacy Policy');
                return;
            }
            
            // Simulate registration (In a real application, this would be an API call)
            console.log('Registration Data:', { 
                firstName, 
                lastName, 
                email, 
                phone, 
                bloodGroup, 
                dob, 
                password, 
                userType 
            });
            
            // Show success message and redirect
            showSuccess('Registration successful! Redirecting to login...');
            
            // Switch to login tab after a delay
            setTimeout(function() {
                document.querySelector('[data-tab="login"]').click();
            }, 2000);
        });
    }

    // Helper Functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        // Basic phone validation - can be customized based on your requirements
        const re = /^[0-9]{10,15}$/;
        return re.test(phone.replace(/[\s()-]/g, ''));
    }

    function showError(message) {
        alert(message); // In a real application, use a better UI for error messages
    }

    function showSuccess(message) {
        alert(message); // In a real application, use a better UI for success messages
    }

    function redirectAfterLogin(userType) {
        // Redirect based on user type
        switch(userType) {
            case 'donor':
                window.location.href = 'donor/dashboard.html';
                break;
            case 'patient':
                window.location.href = 'patient/dashboard.html';
                break;
            case 'admin':
                window.location.href = 'admin/dashboard.html';
                break;
            default:
                window.location.href = 'index.html';
        }
    }
});