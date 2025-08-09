// Donor Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Impact Chart
    const impactChartCanvas = document.getElementById('impactChart');
    if (impactChartCanvas) {
        const ctx = impactChartCanvas.getContext('2d');
        
        // Sample data for the impact chart
        const impactData = {
            labels: ['Patients Helped', 'Surgeries', 'Newborns', 'Emergency', 'Trauma'],
            datasets: [{
                label: 'Blood Impact',
                data: [15, 3, 2, 4, 1],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(155, 89, 182, 0.7)',
                    'rgba(241, 196, 15, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(52, 152, 219, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(241, 196, 15, 1)'
                ],
                borderWidth: 1
            }]
        };

        // Create the chart
        const impactChart = new Chart(ctx, {
            type: 'doughnut',
            data: impactData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 12,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
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
                cutout: '70%',
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }

    // Certificate download functionality
    const certificateLinks = document.querySelectorAll('.certificate-link');
    if (certificateLinks.length > 0) {
        certificateLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const donationId = this.closest('tr').cells[0].textContent;
                alert(`Downloading certificate for ${donationId}...`);
                // In a real application, this would trigger a download of the certificate
            });
        });
    }

    // Reward redemption functionality
    const redeemButtons = document.querySelectorAll('.rewards-list .btn');
    if (redeemButtons.length > 0) {
        redeemButtons.forEach(button => {
            if (!button.disabled) {
                button.addEventListener('click', function() {
                    const rewardName = this.closest('.reward-item').querySelector('h4').textContent;
                    const pointsText = this.closest('.reward-item').querySelector('.reward-points').textContent;
                    const points = parseInt(pointsText);
                    
                    if (confirm(`Are you sure you want to redeem ${rewardName} for ${points} points?`)) {
                        // In a real application, this would send a request to redeem the reward
                        alert(`${rewardName} has been redeemed successfully! Check your email for details.`);
                        
                        // Update points display
                        const currentPoints = parseInt(document.querySelector('.stat-card:nth-child(4) .stat-number').textContent);
                        const newPoints = currentPoints - points;
                        document.querySelector('.stat-card:nth-child(4) .stat-number').textContent = newPoints;
                        
                        // Disable the button if points are not enough anymore
                        if (newPoints < points) {
                            this.disabled = true;
                            this.classList.remove('primary-btn');
                            this.classList.add('secondary-btn');
                            this.textContent = 'Not enough points';
                        }
                    }
                });
            }
        });
    }

    // Schedule donation functionality
    const scheduleButtons = document.querySelectorAll('.drive-actions .primary-btn');
    if (scheduleButtons.length > 0) {
        scheduleButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const driveTitle = this.closest('.drive-item').querySelector('h3').textContent;
                const driveDate = this.closest('.drive-item').querySelector('.date-day').textContent + ' ' + 
                                 this.closest('.drive-item').querySelector('.date-month').textContent;
                const driveLocation = this.closest('.drive-item').querySelector('p:first-of-type').textContent.replace('📍', '').trim();
                
                // In a real application, this would redirect to the scheduling page with the drive details
                alert(`You are about to schedule a donation for:\n\nDrive: ${driveTitle}\nDate: ${driveDate}\nLocation: ${driveLocation}\n\nIn a real application, this would take you to the scheduling form.`);
                
                // Simulate redirection
                window.location.href = this.getAttribute('href');
            });
        });
    }

    // Eligibility status animation
    const eligibilityStatus = document.querySelector('.eligibility-status');
    if (eligibilityStatus) {
        setTimeout(() => {
            eligibilityStatus.classList.add('show');
        }, 300);
    }

    // Animate info items
    const infoItems = document.querySelectorAll('.info-item');
    if (infoItems.length > 0) {
        infoItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, 300 + (index * 100));
        });
    }

    // Animate impact stats
    const impactStats = document.querySelectorAll('.impact-stat');
    if (impactStats.length > 0) {
        impactStats.forEach((stat, index) => {
            setTimeout(() => {
                stat.classList.add('show');
            }, 300 + (index * 100));
        });
    }

    // Animate rewards progress
    const rewardsProgress = document.querySelector('.rewards-progress');
    if (rewardsProgress) {
        setTimeout(() => {
            rewardsProgress.classList.add('show');
        }, 300);
    }

    // Animate reward items
    const rewardItems = document.querySelectorAll('.reward-item');
    if (rewardItems.length > 0) {
        rewardItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, 300 + (index * 100));
        });
    }
});

// Add CSS for animations
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .eligibility-status, .info-item, .impact-stat, .rewards-progress, .reward-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .eligibility-status.show, .info-item.show, .impact-stat.show, .rewards-progress.show, .reward-item.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .eligibility-status.eligible {
            color: var(--success-color);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
        }
        
        .eligibility-status.eligible i {
            font-size: 3rem;
            margin-bottom: 10px;
        }
        
        .eligibility-status.eligible h3 {
            margin: 0 0 5px 0;
            font-size: 1.2rem;
        }
        
        .eligibility-status.eligible p {
            margin: 0;
            color: var(--gray-color);
        }
        
        .eligibility-info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 20px 0;
        }
        
        .info-item {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: var(--border-radius-md);
            background-color: #f5f7fa;
        }
        
        .info-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(231, 76, 60, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
        }
        
        .info-icon i {
            color: var(--primary-color);
            font-size: 1.2rem;
        }
        
        .info-content h4 {
            margin: 0 0 5px 0;
            font-size: 0.9rem;
            color: var(--gray-color);
        }
        
        .info-content p {
            margin: 0;
            font-size: 1rem;
            font-weight: 600;
            color: var(--dark-color);
        }
        
        .eligibility-actions {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        
        .impact-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-top: 20px;
        }
        
        .impact-stat {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: var(--border-radius-md);
            background-color: #f5f7fa;
        }
        
        .impact-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(231, 76, 60, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
        }
        
        .impact-icon i {
            color: var(--primary-color);
            font-size: 1.2rem;
        }
        
        .impact-info h4 {
            margin: 0 0 5px 0;
            font-size: 0.9rem;
            color: var(--gray-color);
        }
        
        .impact-info p {
            margin: 0;
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--dark-color);
        }
        
        .impact-chart {
            height: 200px;
            margin-bottom: 20px;
        }
        
        .certificate-link {
            color: var(--primary-color);
            text-decoration: none;
            font-size: 0.9rem;
            display: inline-flex;
            align-items: center;
        }
        
        .certificate-link i {
            margin-right: 5px;
        }
        
        .drive-actions {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
        
        .small-btn {
            padding: 6px 12px;
            font-size: 0.8rem;
        }
        
        .rewards-content {
            padding: 20px;
        }
        
        .rewards-progress {
            margin-bottom: 30px;
        }
        
        .progress-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }
        
        .progress-label {
            font-size: 0.9rem;
            color: var(--dark-color);
            font-weight: 500;
        }
        
        .progress-value {
            font-size: 0.9rem;
            color: var(--primary-color);
            font-weight: 600;
        }
        
        .progress-bar {
            height: 8px;
            background-color: #f5f7fa;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 15px;
        }
        
        .progress {
            height: 100%;
            background-color: var(--primary-color);
            border-radius: 4px;
        }
        
        .progress-levels {
            display: flex;
            justify-content: space-between;
            position: relative;
        }
        
        .progress-levels::before {
            content: '';
            position: absolute;
            top: 10px;
            left: 0;
            right: 0;
            height: 2px;
            background-color: #f5f7fa;
            z-index: 0;
        }
        
        .level-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 1;
        }
        
        .level-dot {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #f5f7fa;
            border: 2px solid var(--gray-light);
            margin-bottom: 5px;
        }
        
        .level-item.active .level-dot {
            background-color: var(--primary-color);
            border-color: var(--primary-color);
        }
        
        .level-label {
            font-size: 0.8rem;
            color: var(--gray-color);
        }
        
        .level-item.active .level-label {
            color: var(--primary-color);
            font-weight: 600;
        }
        
        .rewards-available h3 {
            margin: 0 0 15px 0;
            font-size: 1.1rem;
            color: var(--dark-color);
        }
        
        .rewards-list {
            display: grid;
            gap: 15px;
        }
        
        .reward-item {
            display: flex;
            align-items: center;
            padding: 15px;
            border-radius: var(--border-radius-md);
            background-color: #f5f7fa;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .reward-item:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-sm);
        }
        
        .reward-item.disabled {
            opacity: 0.7;
        }
        
        .reward-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: rgba(231, 76, 60, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .reward-icon i {
            color: var(--primary-color);
            font-size: 1.5rem;
        }
        
        .reward-info {
            flex: 1;
        }
        
        .reward-info h4 {
            margin: 0 0 5px 0;
            font-size: 1rem;
            color: var(--dark-color);
        }
        
        .reward-info p {
            margin: 0 0 5px 0;
            font-size: 0.9rem;
            color: var(--gray-color);
        }
        
        .reward-points {
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--primary-color);
        }
        
        @media (max-width: 768px) {
            .eligibility-info, .impact-stats {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});