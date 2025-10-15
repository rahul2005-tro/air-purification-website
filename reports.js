let charts = {};

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeCharts();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    setInterval(updateAlerts, 60000); // Update alerts every minute
});

// Particle.js initialization
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 30, density: { enable: true, value_area: 800 } },
                color: { value: "#ff3366" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: false },
                size: { value: 2, random: true },
                line_linked: { enable: true, distance: 150, color: "#ff3366", opacity: 0.2, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
                modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 2 } }
            },
            retina_detect: true
        });
    }
}

// Initialize charts
function initializeCharts() {
    initializeEfficiencyChart();
    initializeReportChart();
}

function initializeEfficiencyChart() {
    const ctx = document.getElementById('efficiencyChart');
    if (!ctx) return;
    
    charts.efficiency = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM'],
            datasets: [{
                label: 'Individual Unit Efficiency (%)',
                data: [65, 68, 75, 82, 85, 83, 70, 65, 78],
                borderColor: '#ffaa00',
                backgroundColor: 'rgba(255, 170, 0, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'AI Collaborative Efficiency (%)',
                data: [85, 88, 92, 95, 96, 94, 89, 87, 91],
                borderColor: '#00ff88',
                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#ffffff' } },
                title: { display: true, text: 'AI Collaboration vs Individual Performance', color: '#ffffff' }
            },
            scales: {
                x: { 
                    title: { display: true, text: 'Time of Day', color: '#ffffff' },
                    ticks: { color: '#b0b0b0' }, 
                    grid: { color: 'rgba(255,255,255,0.1)' } 
                },
                y: { 
                    title: { display: true, text: 'Efficiency Percentage', color: '#ffffff' },
                    ticks: { color: '#b0b0b0' }, 
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    min: 60,
                    max: 100
                }
            }
        }
    });
}

function initializeReportChart() {
    const ctx = document.getElementById('reportChart');
    if (!ctx) return;
    
    charts.report = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Health Alerts', 'Hazard Zones', 'AI Optimizations', 'Energy Savings', 'Pollution Reduced'],
            datasets: [{
                label: 'Daily Metrics - January 2025',
                data: [12, 3, 24, 23, 15],
                backgroundColor: ['#ff3366', '#ffaa00', '#00d4ff', '#00ff88', '#9333ea'],
                borderColor: '#ffffff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#ffffff' } },
                title: { display: true, text: 'Daily System Performance Metrics', color: '#ffffff' }
            },
            scales: {
                x: { 
                    ticks: { color: '#b0b0b0' }, 
                    grid: { color: 'rgba(255,255,255,0.1)' } 
                },
                y: { 
                    title: { display: true, text: 'Count/Percentage', color: '#ffffff' },
                    ticks: { color: '#b0b0b0' }, 
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    min: 0,
                    max: 30
                }
            }
        }
    });
}

// Update alerts with static data
function updateAlerts() {
    // Static alert times for consistency
    document.querySelectorAll('.alert-time').forEach((element, index) => {
        const alertTimes = [
            'Active since: 6:00 AM',
            'Active since: 8:30 AM', 
            'Updated: 2:45 PM',
            'Status: Online'
        ];
        if (alertTimes[index]) {
            element.textContent = alertTimes[index];
        }
    });
}

// Report generation
function generateReport() {
    const reportType = document.getElementById('report-type').value;
    const location = document.getElementById('report-location').value;
    
    // Update report date with static value
    const reportDateSpan = document.querySelector('#report-date span');
    if (reportDateSpan) {
        reportDateSpan.textContent = 'October 15, 2025';
    }
    
    // Update summary with static data
    updateReportSummary(reportType);
}

function updateReportSummary(reportType) {
    const summaryData = {
        health: { aqi: 198, hazard: '8/24', efficiency: '92%', alerts: 12 },
        daily: { aqi: 212, hazard: '10/24', efficiency: '89%', alerts: 15 },
        weekly: { aqi: 189, hazard: '6/24', efficiency: '94%', alerts: 8 },
        peak: { aqi: 267, hazard: '12/24', efficiency: '87%', alerts: 18 },
        ai: { aqi: 176, hazard: '5/24', efficiency: '96%', alerts: 6 },
        alerts: { aqi: 234, hazard: '9/24', efficiency: '91%', alerts: 22 }
    };
    
    const data = summaryData[reportType] || summaryData.health;
    
    document.getElementById('avg-aqi').textContent = data.aqi;
    document.getElementById('hazard-hours').textContent = data.hazard;
    document.getElementById('ai-efficiency').textContent = data.efficiency;
    document.getElementById('health-alerts').textContent = data.alerts;
}

function downloadPDF() {
    if (typeof window.jspdf === 'undefined') {
        alert('PDF generation library not loaded');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('TevrON - Health & Safety Report 2025', 20, 30);
    
    doc.setFontSize(12);
    doc.text('Generated on: October 15, 2025', 20, 50);
    
    // Summary data
    const avgAQI = document.getElementById('avg-aqi').textContent;
    const hazardHours = document.getElementById('hazard-hours').textContent;
    const aiEfficiency = document.getElementById('ai-efficiency').textContent;
    const healthAlerts = document.getElementById('health-alerts').textContent;
    
    doc.text('SUMMARY METRICS:', 20, 70);
    doc.text(`Average AQI: ${avgAQI}`, 20, 85);
    doc.text(`Hazard Hours: ${hazardHours}`, 20, 100);
    doc.text(`AI System Efficiency: ${aiEfficiency}`, 20, 115);
    doc.text(`Health Alerts Issued: ${healthAlerts}`, 20, 130);
    
    // Health recommendations
    doc.text('HEALTH RECOMMENDATIONS:', 20, 150);
    doc.setFontSize(10);
    doc.text('• Asthma patients: Avoid outdoor activities during 6-10 AM peak hours', 20, 165);
    doc.text('• Children & elderly: Use N95 masks when outdoors', 20, 175);
    doc.text('• General public: Limit outdoor exercise to post 10 PM hours', 20, 185);
    doc.text('• Indoor air purifiers recommended for all households', 20, 195);
    
    // AI system performance
    doc.setFontSize(12);
    doc.text('AI SYSTEM PERFORMANCE:', 20, 215);
    doc.setFontSize(10);
    doc.text('• Successfully coordinated 8 purification units across Delhi NCR', 20, 230);
    doc.text('• Reduced peak hour pollution by 15% through intelligent collaboration', 20, 240);
    doc.text('• Optimized energy consumption by 23% using solar power sharing', 20, 250);
    doc.text('• Predicted 89% of pollution spikes with 30-minute advance notice', 20, 260);
    
    doc.save('airpure-health-safety-report-2025.pdf');
}

function updateDateTime() {
    // Static update time for consistency
    document.querySelectorAll('.update-note em').forEach(note => {
        note.textContent = 'Last updated: October 15, 2025 2:45:30 PM IST';
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    }
});