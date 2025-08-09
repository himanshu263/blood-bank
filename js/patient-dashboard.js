/**
 * Patient Dashboard JavaScript
 * Handles all interactive functionality for the patient dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all dashboard components
    initializeNotifications();
    initializeRequestProgress();
    initializeAppointments();
    initializeHospitalMap();
    animateInfoItems();
    animateTimeline();
    
    // Add event listeners for dashboard actions
    addEventListeners();
});

/**
 * Initialize notification system
 */
function initializeNotifications() {
    const notificationBell = document.querySelector('.notification-bell');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    const markAllAsRead = document.querySelector('.notification-header a');
    const notificationItems = document.querySelectorAll('.notification-item');
    
    if (notificationBell) {
        notificationBell.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            if (notificationDropdown.classList.contains('active')) {
                notificationDropdown.classList.remove('active');
            }
        });
        
        // Prevent dropdown from closing when clicking inside it
        notificationDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Mark all notifications as read
        if (markAllAsRead) {
            markAllAsRead.addEventListener('click', function(e) {
                e.preventDefault();
                notificationItems.forEach(item => {
                    item.classList.remove('unread');
                });
                
                // Update notification count
                const notificationCount = document.querySelector('.notification-count');
                notificationCount.textContent = '0';
                notificationCount.style.display = 'none';
            });
        }
        
        // Mark individual notification as read
        notificationItems.forEach(item => {
            item.addEventListener('click', function() {
                this.classList.remove('unread');
                
                // Update notification count
                const unreadCount = document.querySelectorAll('.notification-item.unread').length;
                const notificationCount = document.querySelector('.notification-count');
                
                if (unreadCount === 0) {
                    notificationCount.style.display = 'none';
                } else {
                    notificationCount.textContent = unreadCount;
                }
            });
        });
    }
}

/**
 * Initialize and animate the request progress steps
 */
function initializeRequestProgress() {
    const progressSteps = document.querySelectorAll('.progress-step');
    
    if (progressSteps.length > 0) {
        // Add animation delay to each step
        progressSteps.forEach((step, index) => {
            step.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Add animation class after a short delay
        setTimeout(() => {
            progressSteps.forEach(step => {
                step.classList.add('animate');
            });
        }, 300);
    }
}

/**
 * Initialize appointment functionality
 */
function initializeAppointments() {
    const rescheduleButtons = document.querySelectorAll('.appointment-actions .secondary-btn');
    const confirmButtons = document.querySelectorAll('.appointment-actions .primary-btn');
    
    // Handle appointment rescheduling
    rescheduleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const appointmentItem = this.closest('.appointment-item');
            const appointmentTitle = appointmentItem.querySelector('h3').textContent;
            
            // In a real application, this would open a modal for rescheduling
            alert(`Reschedule request initiated for: ${appointmentTitle}\nA calendar will appear here in the actual application.`);
        });
    });
    
    // Handle appointment confirmation
    confirmButtons.forEach(button => {
        button.addEventListener('click', function() {
            const appointmentItem = this.closest('.appointment-item');
            const appointmentTitle = appointmentItem.querySelector('h3').textContent;
            
            // Add confirmed class to the appointment
            appointmentItem.classList.add('confirmed');
            
            // Change button text
            this.innerHTML = '<i class="fas fa-check-circle"></i> Confirmed';
            this.disabled = true;
            
            // Show confirmation message
            const message = document.createElement('div');
            message.className = 'confirmation-message';
            message.innerHTML = '<i class="fas fa-check-circle"></i> Appointment confirmed';
            
            appointmentItem.appendChild(message);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                message.classList.add('fade-out');
                setTimeout(() => {
                    appointmentItem.removeChild(message);
                }, 500);
            }, 3000);
        });
    });
    
    // Handle new appointment scheduling
    const scheduleButton = document.querySelector('.add-appointment .btn');
    if (scheduleButton) {
        scheduleButton.addEventListener('click', function(e) {
            // In a real application, this would navigate to the appointments page
            // or open a modal for scheduling
            // For demo purposes, we'll just show an alert
            e.preventDefault();
            alert('This would open the appointment scheduling interface in the actual application.');
        });
    }
}

/**
 * Initialize hospital map functionality
 */
function initializeHospitalMap() {
    const mapPlaceholder = document.querySelector('.map-placeholder');
    
    if (mapPlaceholder) {
        // In a real application, this would initialize a map API like Google Maps
        // For demo purposes, we'll just add a click event to the placeholder
        mapPlaceholder.addEventListener('click', function() {
            alert('This would display an interactive map with nearby hospitals and blood availability in the actual application.');
        });
    }
    
    // Add hover effect to hospital items
    const hospitalItems = document.querySelectorAll('.hospital-item');
    hospitalItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // In a real application, this would highlight the corresponding marker on the map
            this.classList.add('active');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
        
        item.addEventListener('click', function() {
            const hospitalName = this.querySelector('h3').textContent;
            // In a real application, this would open a detailed view of the hospital
            alert(`You selected ${hospitalName}. This would show detailed information about the hospital in the actual application.`);
        });
    });
}

/**
 * Animate medical info items with a staggered effect
 */
function animateInfoItems() {
    const infoItems = document.querySelectorAll('.info-item, .condition-name, .medication-info');
    
    if (infoItems.length > 0) {
        // Add animation class with delay to each item
        infoItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.transitionDelay = `${index * 0.1}s`;
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        });
    }
    
    // Animate condition status badges
    const statusBadges = document.querySelectorAll('.condition-status, .status-badge');
    if (statusBadges.length > 0) {
        statusBadges.forEach((badge, index) => {
            badge.style.opacity = '0';
            badge.style.transform = 'scale(0.8)';
            badge.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            badge.style.transitionDelay = `${0.5 + (index * 0.1)}s`;
            
            setTimeout(() => {
                badge.style.opacity = '1';
                badge.style.transform = 'scale(1)';
            }, 600);
        });
    }
}

/**
 * Animate timeline items with a staggered effect
 */
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.transitionDelay = `${index * 0.15}s`;
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 300);
        });
    }
}

/**
 * Add event listeners for various dashboard actions
 */
function addEventListeners() {
    // Blood request actions
    const requestActionButtons = document.querySelectorAll('.request-actions .btn');
    requestActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            if (buttonText.includes('View Details')) {
                alert('This would open detailed information about the blood request in the actual application.');
            } else if (buttonText.includes('Contact Hospital')) {
                alert('This would open a messaging interface to contact the hospital in the actual application.');
            }
        });
    });
    
    // New blood request button
    const newRequestButton = document.querySelector('.new-request-cta .btn');
    if (newRequestButton) {
        newRequestButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This would open the new blood request form in the actual application.');
        });
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Admin dropdown toggle
    const adminDropdownToggle = document.querySelector('.admin-dropdown-toggle');
    const adminDropdownMenu = document.querySelector('.admin-dropdown-menu');
    
    if (adminDropdownToggle && adminDropdownMenu) {
        adminDropdownToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            adminDropdownMenu.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            if (adminDropdownMenu.classList.contains('active')) {
                adminDropdownMenu.classList.remove('active');
            }
        });
        
        // Prevent dropdown from closing when clicking inside it
        adminDropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}\nThis would display search results in the actual application.`);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    alert(`Searching for: ${searchTerm}\nThis would display search results in the actual application.`);
                }
            }
        });
    }
}