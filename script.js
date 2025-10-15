// Delhi NCR monitoring stations data with complete pollutant measurements
const monitoringStations = [
    { id: 1, name: "Connaught Place", lat: 28.6315, lng: 77.2167, aqi: 168, pm25: 85, pm10: 112, co: 2.1, nox: 68, sox: 15, vocs: 45, status: "active" },
    { id: 2, name: "Gurgaon Sector 45", lat: 28.4595, lng: 77.0266, aqi: 220, pm25: 142, pm10: 173, co: 3.2, nox: 89, sox: 22, vocs: 67, status: "active" },
    { id: 3, name: "Noida Phase II", lat: 28.5355, lng: 77.3910, aqi: 145, pm25: 67, pm10: 91, co: 1.8, nox: 52, sox: 12, vocs: 34, status: "idle" },
    { id: 4, name: "Ghaziabad Central", lat: 28.6692, lng: 77.4538, aqi: 275, pm25: 194, pm10: 214, co: 4.1, nox: 112, sox: 28, vocs: 89, status: "critical" },
    { id: 5, name: "Dwarka Sec 21", lat: 28.5921, lng: 77.0460, aqi: 198, pm25: 110, pm10: 160, co: 2.8, nox: 76, sox: 18, vocs: 56, status: "active" },
    { id: 6, name: "Rohini Sector 16", lat: 28.7041, lng: 77.1025, aqi: 189, pm25: 98, pm10: 145, co: 2.5, nox: 71, sox: 16, vocs: 52, status: "active" },
    { id: 7, name: "Faridabad NIT", lat: 28.3670, lng: 77.3155, aqi: 156, pm25: 78, pm10: 118, co: 2.0, nox: 58, sox: 14, vocs: 41, status: "active" },
    { id: 8, name: "Greater Noida", lat: 28.4744, lng: 77.5040, aqi: 134, pm25: 62, pm10: 89, co: 1.6, nox: 48, sox: 11, vocs: 32, status: "active" }
];

let map;
let charts = {};

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeMap();
    initializeCharts();
    startLiveDataUpdates();
    setupEventListeners();
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

// Particle.js initialization
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#00d4ff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#00d4ff", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
                modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
            },
            retina_detect: true
        });
    }
}

// Initialize Leaflet map
function initializeMap() {
    if (typeof L === 'undefined') return;
    
    map = L.map('interactive-map').setView([28.6139, 77.2090], 10);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Add monitoring stations to map
    monitoringStations.forEach(station => {
        const color = getAQIColor(station.aqi);
        const marker = L.circleMarker([station.lat, station.lng], {
            color: '#ffffff',
            fillColor: color,
            fillOpacity: 0.8,
            radius: 15,
            weight: 3
        }).addTo(map);

        marker.bindPopup(`
            <div style="color: #333; font-family: 'Inter', sans-serif; min-width: 200px;">
                <h3 style="margin: 0 0 10px 0; color: ${color};">${station.name}</h3>
                <p><strong>AQI:</strong> ${station.aqi}</p>
                <p><strong>PM2.5:</strong> ${station.pm25} µg/m³</p>
                <p><strong>PM10:</strong> ${station.pm10} µg/m³</p>
                <p><strong>CO:</strong> ${station.co} mg/m³</p>
                <p><strong>NOx:</strong> ${station.nox} µg/m³</p>
                <p><strong>SOx:</strong> ${station.sox} µg/m³</p>
                <p><strong>VOCs:</strong> ${station.vocs} µg/m³</p>
                <p><strong>Status:</strong> ${station.status.toUpperCase()}</p>
            </div>
        `);
    });

    // Add pollution heatmap overlay
    addPollutionHeatmap();
}

function getAQIColor(aqi) {
    if (aqi <= 50) return '#00ff88';
    if (aqi <= 100) return '#ffaa00';
    if (aqi <= 200) return '#ff6b35';
    return '#ff3366';
}

function addPollutionHeatmap() {
    // Simple pollution zones with better visibility
    const pollutionZones = [
        { center: [28.6139, 77.2090], radius: 5000, intensity: 0.8, color: '#ff6b35' },
        { center: [28.4595, 77.0266], radius: 4000, intensity: 0.9, color: '#ff3366' },
        { center: [28.6692, 77.4538], radius: 6000, intensity: 1.0, color: '#ff3366' }
    ];

    pollutionZones.forEach(zone => {
        L.circle(zone.center, {
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: zone.intensity * 0.3,
            radius: zone.radius,
            weight: 2
        }).addTo(map);
    });
}

// Initialize all charts (removed for main page)
function initializeCharts() {
    // Charts moved to analytics page
}

// Chart functions moved to analytics.js

// Live data updates
function startLiveDataUpdates() {
    updateLiveData();
    setInterval(updateLiveData, 30000); // Update every 30 seconds
}

function updateLiveData() {
    // Simulate real-time data updates
    const avgAQI = Math.floor(Math.random() * 50) + 150;
    const activeUnits = Math.floor(Math.random() * 3) + 10;
    const areasCovered = Math.floor(Math.random() * 2) + 7;
    
    const liveAQI = document.getElementById('live-aqi');
    const activeUnitsEl = document.getElementById('active-units');
    const areasCoveredEl = document.getElementById('areas-covered');
    
    if (liveAQI) liveAQI.textContent = avgAQI;
    if (activeUnitsEl) activeUnitsEl.textContent = activeUnits;
    if (areasCoveredEl) areasCoveredEl.textContent = areasCovered;
    
    // Update weather data
    updateWeatherData();
    
    // Update main AQI display
    const mainAQI = document.getElementById('main-aqi');
    const pm25Value = document.getElementById('pm25-value');
    const pm10Value = document.getElementById('pm10-value');
    const coValue = document.getElementById('co-value');
    const noxValue = document.getElementById('nox-value');
    const soxValue = document.getElementById('sox-value');
    const vocsValue = document.getElementById('vocs-value');
    
    if (mainAQI) mainAQI.textContent = avgAQI;
    if (pm25Value) pm25Value.textContent = `${Math.floor(avgAQI * 0.6)} µg/m³`;
    if (pm10Value) pm10Value.textContent = `${Math.floor(avgAQI * 0.8)} µg/m³`;
    if (coValue) coValue.textContent = `${(avgAQI * 0.015).toFixed(1)} mg/m³`;
    if (noxValue) noxValue.textContent = `${Math.floor(avgAQI * 0.4)} µg/m³`;
    if (soxValue) soxValue.textContent = `${Math.floor(avgAQI * 0.1)} µg/m³`;
    if (vocsValue) vocsValue.textContent = `${Math.floor(avgAQI * 0.25)} µg/m³`;
}

async function updateWeatherData() {
    // Simulate weather API call
    const weatherData = {
        temperature: Math.floor(Math.random() * 15) + 20,
        humidity: Math.floor(Math.random() * 30) + 60,
        windSpeed: Math.floor(Math.random() * 10) + 5,
        visibility: (Math.random() * 3 + 1).toFixed(1),
        description: ['Hazy', 'Smoggy', 'Clear', 'Cloudy'][Math.floor(Math.random() * 4)]
    };
    
    const currentTemp = document.getElementById('current-temp');
    const weatherDesc = document.getElementById('weather-desc');
    const tempDisplay = document.getElementById('temp-display');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const visibility = document.getElementById('visibility');
    
    if (currentTemp) currentTemp.textContent = `${weatherData.temperature}°C`;
    if (weatherDesc) weatherDesc.textContent = weatherData.description;
    if (tempDisplay) tempDisplay.textContent = `${weatherData.temperature}°C`;
    if (humidity) humidity.textContent = `${weatherData.humidity}%`;
    if (windSpeed) windSpeed.textContent = `${weatherData.windSpeed} km/h`;
    if (visibility) visibility.textContent = `${weatherData.visibility} km`;
}

// Event listeners
function setupEventListeners() {
    // CTA buttons
    const viewDataBtn = document.querySelector('button[onclick="scrollTo(\'#live-data\')"]');
    const exploreMapBtn = document.querySelector('button[onclick="scrollTo(\'#map\')"]');
    
    if (viewDataBtn) {
        viewDataBtn.addEventListener('click', () => scrollTo('#live-data'));
    }
    if (exploreMapBtn) {
        exploreMapBtn.addEventListener('click', () => scrollTo('#map'));
    }
    
    // Map layer control
    const mapLayerSelect = document.getElementById('map-layer-select');
    if (mapLayerSelect) {
        mapLayerSelect.addEventListener('change', function() {
            updateMapLayer(this.value);
        });
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            const subject = `TevrON - Message from ${name}`;
            const body = `Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;
            
            window.location.href = `mailto:rahul.jet10@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            alert('Opening email client to send your message to TevrON team at rahul.jet10@gmail.com');
            this.reset();
        });
    }
}

function updateMapLayer(layer) {
    if (!map) return;
    
    // Clear existing markers
    map.eachLayer(function(mapLayer) {
        if (mapLayer instanceof L.CircleMarker) {
            map.removeLayer(mapLayer);
        }
    });
    
    // Add markers based on selected layer
    monitoringStations.forEach(station => {
        let value, color, unit;
        
        switch(layer) {
            case 'aqi':
                value = station.aqi;
                color = getAQIColor(value);
                unit = 'AQI';
                break;
            case 'pm25':
                value = station.pm25;
                color = getPollutantColor(value, 'pm25');
                unit = 'µg/m³';
                break;
            case 'pm10':
                value = station.pm10;
                color = getPollutantColor(value, 'pm10');
                unit = 'µg/m³';
                break;
            case 'co':
                value = station.co;
                color = getPollutantColor(value, 'co');
                unit = 'mg/m³';
                break;
            case 'nox':
                value = station.nox;
                color = getPollutantColor(value, 'nox');
                unit = 'µg/m³';
                break;
            case 'sox':
                value = station.sox;
                color = getPollutantColor(value, 'sox');
                unit = 'µg/m³';
                break;
            case 'vocs':
                value = station.vocs;
                color = getPollutantColor(value, 'vocs');
                unit = 'µg/m³';
                break;
            case 'units':
                value = station.status === 'active' ? 'Online' : 'Offline';
                color = station.status === 'active' ? '#00ff88' : '#ff3366';
                unit = '';
                break;
            default:
                value = station.aqi;
                color = getAQIColor(value);
                unit = 'AQI';
        }
        
        const marker = L.circleMarker([station.lat, station.lng], {
            color: '#ffffff',
            fillColor: color,
            fillOpacity: 0.8,
            radius: 15,
            weight: 3
        }).addTo(map);
        
        // Add value label on marker
        const label = L.divIcon({
            className: 'marker-label',
            html: `<div style="color: white; font-weight: bold; text-shadow: 1px 1px 2px black;">${value}${unit ? ' ' + unit : ''}</div>`,
            iconSize: [60, 20],
            iconAnchor: [30, 10]
        });
        
        L.marker([station.lat, station.lng], { icon: label }).addTo(map);
        
        marker.bindPopup(`
            <div style="color: #333; font-family: 'Inter', sans-serif; min-width: 200px;">
                <h3 style="margin: 0 0 10px 0; color: ${color};">${station.name}</h3>
                <p><strong>AQI:</strong> ${station.aqi}</p>
                <p><strong>PM2.5:</strong> ${station.pm25} µg/m³</p>
                <p><strong>PM10:</strong> ${station.pm10} µg/m³</p>
                <p><strong>CO:</strong> ${station.co} mg/m³</p>
                <p><strong>NOx:</strong> ${station.nox} µg/m³</p>
                <p><strong>SOx:</strong> ${station.sox} µg/m³</p>
                <p><strong>VOCs:</strong> ${station.vocs} µg/m³</p>
                <p><strong>Status:</strong> ${station.status.toUpperCase()}</p>
            </div>
        `);
    });
}

function getPollutantColor(value, type) {
    const thresholds = {
        pm25: [35, 75, 115, 150],
        pm10: [55, 155, 255, 355],
        co: [1.0, 2.0, 3.5, 5.0],
        nox: [40, 80, 180, 280],
        sox: [20, 80, 365, 800],
        vocs: [30, 60, 100, 150]
    };
    
    const limits = thresholds[type] || [50, 100, 200, 300];
    
    if (value <= limits[0]) return '#00ff88';
    if (value <= limits[1]) return '#ffaa00';
    if (value <= limits[2]) return '#ff6b35';
    return '#ff3366';
}



// Report functions moved to analytics.js

// Utility functions
function scrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
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

// Animate numbers on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            if (target.classList.contains('stat-number') || target.classList.contains('aqi-value') || target.classList.contains('metric-value') || target.classList.contains('summary-value')) {
                animateNumber(target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number, .aqi-value, .metric-value, .summary-value').forEach(el => {
    observer.observe(el);
});

function animateNumber(element) {
    const text = element.textContent;
    const finalValue = parseInt(text);
    if (isNaN(finalValue)) return;
    
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(finalValue * progress);
        const suffix = text.includes('%') ? '%' : '';
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}