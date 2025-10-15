# Smart Air Purification System Website

A modern, responsive website for the Low-Cost Decentralized Smart Air Purification & Monitoring System project in Delhi-NCR.

## Features

- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Interactive Dashboard**: Real-time air quality metrics and charts using Chart.js
- **Live Map Simulation**: Visual representation of monitoring stations across Delhi-NCR
- **Contact Form**: Functional contact form with validation
- **Smooth Animations**: CSS transitions and JavaScript animations
- **Professional UI**: Clean, modern design with proper typography and spacing

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Custom Properties)
- JavaScript (ES6+)
- Chart.js for data visualization
- Google Fonts (Inter)

## File Structure

```
air-purification-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Setup Instructions

1. **Local Development**:
   - Open `index.html` in any modern web browser
   - No build process required - pure HTML/CSS/JS

2. **Deploy to Lovable AI**:
   - Upload all files to Lovable AI platform
   - The site will work immediately

3. **Deploy to GitHub Pages**:
   - Create a new repository
   - Upload all files
   - Enable GitHub Pages in repository settings

4. **Deploy to Netlify/Vercel**:
   - Drag and drop the folder to their deployment interface
   - Site will be live instantly

## Customization

### Adding Real Map Integration

Replace the map placeholder in `script.js` with:

```javascript
// For Google Maps
function initializeMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 28.6139, lng: 77.2090 } // Delhi coordinates
    });
    
    // Add markers for each station
    stations.forEach(station => {
        new google.maps.Marker({
            position: station.coordinates,
            map: map,
            title: station.name
        });
    });
}
```

### Adding Real Data Integration

Replace chart data in `script.js` with API calls:

```javascript
// Fetch real-time data
async function fetchAirQualityData() {
    try {
        const response = await fetch('your-api-endpoint');
        const data = await response.json();
        updateCharts(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
```

### Styling Customization

Key CSS variables for easy theming:

```css
:root {
    --primary-color: #059669;
    --secondary-color: #667eea;
    --text-color: #333;
    --background-color: #f8fafc;
}
```

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance

- Optimized images (placeholders included)
- Minimal JavaScript bundle
- CSS Grid for efficient layouts
- Lazy loading ready

## SEO Ready

- Semantic HTML structure
- Meta tags included
- Proper heading hierarchy
- Alt text for images (when added)

## Accessibility

- ARIA labels where needed
- Keyboard navigation support
- High contrast ratios
- Screen reader friendly

## License

Open source - feel free to modify and use for your project.

## Contact

For questions about this website template:
- Email: rahul.jet10@gmail.com
- Location: Delhi-NCR