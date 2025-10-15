let charts = {};

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeCharts();
    setupEventListeners();
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

// Particle.js initialization
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: "#00d4ff" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: false },
                size: { value: 2, random: true },
                line_linked: { enable: true, distance: 150, color: "#00d4ff", opacity: 0.2, width: 1 },
                move: { enable: true, speed: 3, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
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

// Initialize all charts
function initializeCharts() {
    initializeAQITrendChart();
    initializePollutionSourceChart();
    initializeCorrelationChart();
    initializePerformanceChart();
    initializePollutantChart();
    initializeWeeklyChart();
    initializeReportChart();
}

function initializeAQITrendChart() {
    const ctx = document.getElementById('aqiTrendChart');
    if (!ctx) return;
    
    charts.aqiTrend = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            datasets: [{
                label: 'Delhi NCR Average AQI - October 2025',
                data: [298, 267, 234, 189, 156, 201, 245],
                borderColor: '#ff3366',
                backgroundColor: 'rgba(255, 51, 102, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#ffffff' } },
                title: { display: true, text: 'Air Quality Index - 24 Hour Trend', color: '#ffffff' }
            },
            scales: {
                x: { 
                    title: { display: true, text: 'Time of Day', color: '#ffffff' },
                    ticks: { color: '#b0b0b0' }, 
                    grid: { color: 'rgba(255,255,255,0.1)' } 
                },
                y: { 
                    title: { display: true, text: 'AQI Value', color: '#ffffff' },
                    ticks: { color: '#b0b0b0' }, 
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    min: 0,
                    max: 350
                }
            }
        }
    });
}

function initializePollutionSourceChart() {
    const ctx = document.getElementById('pollutionSourceChart');
    if (!ctx) return;
    
    charts.pollutionSource = new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Vehicular Emissions (38%)', 'Industrial (24%)', 'Construction Dust (16%)', 'Biomass Burning (12%)', 'Road Dust (6%)', 'Others (4%)'],
            datasets: [{
                data: [38, 24, 16, 12, 6, 4],
                backgroundColor: ['#ff3366', '#ffaa00', '#ff6b35', '#00d4ff', '#9333ea', '#00ff88'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    labels: { color: '#ffffff', font: { size: 12 } },
                    position: 'bottom'
                },
                title: { display: false }
            }
        }
    });
}

function initializeCorrelationChart() {
    const ctx = document.getElementById('correlationChart');
    if (!ctx) return;
    
    charts.correlation = new Chart(ctx.getContext('2d'), {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Delhi NCR - PM2.5 vs Temperature (Oct 2025)',
                data: [
                    {x: 8, y: 298}, {x: 12, y: 267}, {x: 15, y: 234}, {x: 18, y: 189},
                    {x: 22, y: 156}, {x: 25, y: 178}, {x: 28, y: 201}, {x: 32, y: 245},
                    {x: 20, y: 198}, {x: 24, y: 167}, {x: 30, y: 223}, {x: 16, y: 212}
                ],
                backgroundColor: '#00d4ff',
                borderColor: '#00d4ff',
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#ffffff' } },
                title: { display: true, text: 'Temperature Impact on PM2.5 Levels', color: '#ffffff' }
            },
            scales: {
                x: { 
                    title: { display: true, text: 'Temperature (°C)', color: '#ffffff' },
                    ticks: { color: '#b0b0b0' }, 
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    min: 5,
                    max: 35
                },
                y: { 
                    title: { display: true, text: 'PM2.5 Concentration (µg/m³)', color: '#ffffff' },
                    ticks: { color: '#b0b0b0' }, 
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    min: 100,
                    max: 350
                }
            }
        }
    });
}

function initializePerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;
    
    charts.performance = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Connaught Place', 'Gurgaon S-45', 'Noida Phase-II', 'Ghaziabad Central', 'Dwarka S-21', 'Rohini S-16', 'Faridabad NIT', 'Greater Noida'],
            datasets: [{
                label: 'Air Purification Efficiency (%) - 2025',
                data: [82, 68, 89, 52, 76, 78, 85, 91],
                backgroundColor: ['#00ff88', '#ffaa00', '#00ff88', '#ff3366', '#00d4ff', '#00d4ff', '#00ff88', '#00ff88'],
                borderColor: '#ffffff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#ffffff' } },
                title: { display: true, text: 'Purification System Performance by Location', color: '#ffffff' }
            },
            scales: {
                x: { 
                    ticks: { color: '#b0b0b0', maxRotation: 45 }, 
                    grid: { color: 'rgba(255,255,255,0.1)' } 
                },
                y: { 
                    title: { display: true, text: 'Efficiency Percentage', color: '#ffffff' },
                    ticks: { color: '#b0b0b0' }, 
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    min: 0,
                    max: 100
                }
            }
        }
    });
}

function initializePollutantChart() {
    const ctx = document.getElementById('pollutantChart');
    if (!ctx) return;
    
    charts.pollutant = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['PM2.5 (µg/m³)', 'PM10 (µg/m³)', 'CO (mg/m³)', 'NOx (µg/m³)', 'SOx (µg/m³)', 'VOCs (µg/m³)'],
            datasets: [{
                label: 'Delhi NCR Average Levels - October 2025',
                data: [156, 234, 3.8, 98, 28, 78],
                backgroundColor: ['#ff3366', '#ffaa00', '#ff6b35', '#00d4ff', '#9333ea', '#00ff88'],
                borderColor: '#ffffff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#ffffff' } },
                title: { display: true, text: 'Pollutant Concentrations - October 2025', color: '#ffffff' }
            },
            scales: {
                x: { 
                    ticks: { color: '#b0b0b0', maxRotation: 45 }, 
                    grid: { color: 'rgba(255,255,255,0.1)' } 
                },
                y: { 
                    title: { display: true, text: 'Concentration Level', color: '#ffffff' },
                    ticks: { color: '#b0b0b0' }, 
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            }
        }
    });
}

function initializeWeeklyChart() {
    const ctx = document.getElementById('weeklyChart');
    if (!ctx) return;
    
    charts.weekly = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'PM2.5 (µg/m³) - Week of Oct 20, 2025',
                data: [178, 156, 189, 212, 167, 145, 162],
                borderColor: '#ff3366',
                backgroundColor: 'rgba(255, 51, 102, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 5
            }, {
                label: 'PM10 (µg/m³) - Week of Oct 20, 2025',
                data: [234, 198, 245, 278, 212, 189, 206],
                borderColor: '#ffaa00',
                backgroundColor: 'rgba(255, 170, 0, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#ffffff' } },
                title: { display: true, text: 'Weekly PM Trends - October 2025', color: '#ffffff' }
            },
            scales: {
                x: { 
                    title: { display: true, text: 'Day of Week', color: '#ffffff' },
                    ticks: { color: '#b0b0b0' }, 
                    grid: { color: 'rgba(255,255,255,0.1)' } 
                },
                y: { 
                    title: { display: true, text: 'Concentration (µg/m³)', color: '#ffffff' },
                    ticks: { color: '#b0b0b0' }, 
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    min: 100,
                    max: 300
                }
            }
        }
    });
}

function initializeReportChart() {
    const ctx = document.getElementById('reportChart');
    if (!ctx) return;
    
    charts.report = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Average AQI - October 2025',
                data: [234, 198, 176, 189],
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#ffffff' } }
            },
            scales: {
                x: { ticks: { color: '#b0b0b0' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                y: { ticks: { color: '#b0b0b0' }, grid: { color: 'rgba(255,255,255,0.1)' } }
            }
        }
    });
}

// Event listeners
function setupEventListeners() {
    // Location selector for charts
    const locationSelect = document.getElementById('location-select');
    if (locationSelect) {
        locationSelect.addEventListener('change', function() {
            updateChartData(this.value);
        });
    }
}

function updateChartData(location) {
    console.log(`Updating charts for ${location}`);
    // Static data - no random updates
}

// Report generation
function generateReport() {
    const reportType = document.getElementById('report-type');
    const location = document.getElementById('report-location');
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');
    
    // Simulate report generation
    const reportDateSpan = document.querySelector('#report-date span');
    if (reportDateSpan) {
        reportDateSpan.textContent = new Date().toLocaleDateString();
    }
    
    // Update summary values
    const avgAQI = document.getElementById('avg-aqi');
    const peakPM25 = document.getElementById('peak-pm25');
    const cleanHours = document.getElementById('clean-hours');
    const uptime = document.getElementById('uptime');
    
    if (avgAQI) avgAQI.textContent = 198;
    if (peakPM25) peakPM25.textContent = '278 µg/m³';
    if (cleanHours) cleanHours.textContent = '4/24';
    if (uptime) uptime.textContent = '96.2%';
    
    // Update report chart with static data
    if (charts.report) {
        charts.report.update();
    }
}

function downloadPDF() {
    if (typeof window.jspdf === 'undefined') {
        alert('PDF generation library not loaded');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Air Quality Analytics Report - 2025', 20, 30);
    
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 50);
    
    const avgAQI = document.getElementById('avg-aqi');
    const peakPM25 = document.getElementById('peak-pm25');
    const cleanHours = document.getElementById('clean-hours');
    const uptime = document.getElementById('uptime');
    
    if (avgAQI) doc.text(`Average AQI: ${avgAQI.textContent}`, 20, 70);
    if (peakPM25) doc.text(`Peak PM2.5: ${peakPM25.textContent}`, 20, 90);
    if (cleanHours) doc.text(`Clean Hours: ${cleanHours.textContent}`, 20, 110);
    if (uptime) doc.text(`System Uptime: ${uptime.textContent}`, 20, 130);
    
    doc.save('air-quality-analytics-report-2025.pdf');
}

function updateDateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: true
    });
    
    document.querySelectorAll('.update-note em').forEach(note => {
        note.textContent = `Last updated: ${now.toLocaleDateString()} ${timeString} IST`;
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