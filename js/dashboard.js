// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnMenuToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideSidebar && !isClickOnMenuToggle && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Notification and Admin Dropdown (for mobile)
    const notificationBell = document.querySelector('.notification-bell');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    const adminDropdownToggle = document.querySelector('.admin-dropdown-toggle');
    const adminDropdownMenu = document.querySelector('.admin-dropdown-menu');

    // Handle dropdowns on mobile
    if (window.innerWidth <= 768) {
        if (notificationBell) {
            notificationBell.addEventListener('click', function(e) {
                e.stopPropagation();
                notificationDropdown.style.display = notificationDropdown.style.display === 'block' ? 'none' : 'block';
                if (adminDropdownMenu) adminDropdownMenu.style.display = 'none';
            });
        }

        if (adminDropdownToggle) {
            adminDropdownToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                adminDropdownMenu.style.display = adminDropdownMenu.style.display === 'block' ? 'none' : 'block';
                if (notificationDropdown) notificationDropdown.style.display = 'none';
            });
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', function() {
            if (notificationDropdown) notificationDropdown.style.display = 'none';
            if (adminDropdownMenu) adminDropdownMenu.style.display = 'none';
        });
    }

    // Activity Chart
    const activityChartCanvas = document.getElementById('activityChart');
    if (activityChartCanvas) {
        const ctx = activityChartCanvas.getContext('2d');
        
        // Sample data for the chart
        const weeklyData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Donations',
                    data: [18, 25, 30, 22, 17, 29, 32],
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    borderColor: '#e74c3c',
                    borderWidth: 2,
                    tension: 0.4,
                    pointBackgroundColor: '#e74c3c'
                },
                {
                    label: 'Requests',
                    data: [15, 20, 25, 18, 12, 22, 25],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: '#3498db',
                    borderWidth: 2,
                    tension: 0.4,
                    pointBackgroundColor: '#3498db'
                }
            ]
        };

        const monthlyData = {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                {
                    label: 'Donations',
                    data: [120, 145, 135, 160],
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    borderColor: '#e74c3c',
                    borderWidth: 2,
                    tension: 0.4,
                    pointBackgroundColor: '#e74c3c'
                },
                {
                    label: 'Requests',
                    data: [95, 110, 105, 125],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: '#3498db',
                    borderWidth: 2,
                    tension: 0.4,
                    pointBackgroundColor: '#3498db'
                }
            ]
        };

        const yearlyData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Donations',
                    data: [450, 420, 480, 520, 550, 570, 600, 580, 610, 590, 620, 650],
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    borderColor: '#e74c3c',
                    borderWidth: 2,
                    tension: 0.4,
                    pointBackgroundColor: '#e74c3c'
                },
                {
                    label: 'Requests',
                    data: [380, 360, 400, 420, 450, 470, 490, 480, 500, 490, 510, 530],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: '#3498db',
                    borderWidth: 2,
                    tension: 0.4,
                    pointBackgroundColor: '#3498db'
                }
            ]
        };

        // Create the chart
        const activityChart = new Chart(ctx, {
            type: 'line',
            data: weeklyData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            boxWidth: 12,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(44, 62, 80, 0.9)',
                        titleFont: {
                            size: 12
                        },
                        bodyFont: {
                            size: 12
                        },
                        padding: 10,
                        displayColors: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });

        // Period selector functionality
        const periodButtons = document.querySelectorAll('.period-btn');
        if (periodButtons.length > 0) {
            periodButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    periodButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Update chart data based on selected period
                    const period = this.getAttribute('data-period');
                    let chartData;
                    
                    switch(period) {
                        case 'weekly':
                            chartData = weeklyData;
                            break;
                        case 'monthly':
                            chartData = monthlyData;
                            break;
                        case 'yearly':
                            chartData = yearlyData;
                            break;
                        default:
                            chartData = weeklyData;
                    }
                    
                    activityChart.data.labels = chartData.labels;
                    activityChart.data.datasets[0].data = chartData.datasets[0].data;
                    activityChart.data.datasets[1].data = chartData.datasets[1].data;
                    activityChart.update();
                });
            });
        }
    }

    // Table row actions
    const actionButtons = document.querySelectorAll('.action-btn');
    if (actionButtons.length > 0) {
        actionButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const action = this.classList.contains('view-btn') ? 'view' : 
                              this.classList.contains('edit-btn') ? 'edit' : 
                              this.classList.contains('approve-btn') ? 'approve' : 
                              this.classList.contains('reject-btn') ? 'reject' : '';
                
                const row = this.closest('tr');
                const id = row.cells[0].textContent;
                
                // Handle different actions
                switch(action) {
                    case 'view':
                        alert(`Viewing details for ${id}`);
                        // In a real application, you would show a modal with details or redirect to a details page
                        break;
                    case 'edit':
                        alert(`Editing ${id}`);
                        // In a real application, you would show an edit form or redirect to an edit page
                        break;
                    case 'approve':
                        if (confirm(`Are you sure you want to approve ${id}?`)) {
                            // In a real application, you would send an API request to approve
                            row.querySelector('.status-badge').textContent = 'Approved';
                            row.querySelector('.status-badge').className = 'status-badge approved';
                            // Remove approve and reject buttons
                            const actionCell = row.querySelector('.action-buttons');
                            actionCell.innerHTML = '<button class="action-btn view-btn"><i class="fas fa-eye"></i></button>';
                        }
                        break;
                    case 'reject':
                        if (confirm(`Are you sure you want to reject ${id}?`)) {
                            // In a real application, you would send an API request to reject
                            row.querySelector('.status-badge').textContent = 'Rejected';
                            row.querySelector('.status-badge').className = 'status-badge rejected';
                            // Remove approve and reject buttons
                            const actionCell = row.querySelector('.action-buttons');
                            actionCell.innerHTML = '<button class="action-btn view-btn"><i class="fas fa-eye"></i></button>';
                        }
                        break;
                }
            });
        });
    }

    // Search functionality
    const searchBar = document.querySelector('.search-bar input');
    if (searchBar) {
        searchBar.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const tables = document.querySelectorAll('.data-table');
            
            tables.forEach(table => {
                const rows = table.querySelectorAll('tbody tr');
                
                rows.forEach(row => {
                    let found = false;
                    const cells = row.querySelectorAll('td');
                    
                    cells.forEach(cell => {
                        if (cell.textContent.toLowerCase().includes(searchTerm)) {
                            found = true;
                        }
                    });
                    
                    if (found) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        });
    }

    // Add animations to stats cards
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length > 0) {
        statCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }

    // Mark notifications as read
    const notificationItems = document.querySelectorAll('.notification-item');
    if (notificationItems.length > 0) {
        notificationItems.forEach(item => {
            item.addEventListener('click', function() {
                this.classList.remove('unread');
                
                // Update notification count
                const unreadCount = document.querySelectorAll('.notification-item.unread').length;
                const notificationCount = document.querySelector('.notification-count');
                if (notificationCount) {
                    notificationCount.textContent = unreadCount;
                    if (unreadCount === 0) {
                        notificationCount.style.display = 'none';
                    }
                }
            });
        });
    }

    // Mark all notifications as read
    const markAllAsRead = document.querySelector('.notification-header a');
    if (markAllAsRead) {
        markAllAsRead.addEventListener('click', function(e) {
            e.preventDefault();
            
            const unreadItems = document.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => {
                item.classList.remove('unread');
            });
            
            // Update notification count
            const notificationCount = document.querySelector('.notification-count');
            if (notificationCount) {
                notificationCount.textContent = '0';
                notificationCount.style.display = 'none';
            }
        });
    }
});