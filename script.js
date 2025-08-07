// JavaScript for Community Food Handler Website

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll to section
    window.scrollToSection = function(id) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Donation form submission
    const donationForm = document.getElementById('donation-form');
    const donationResponse = document.getElementById('donation-response');

    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple form validation can be enhanced here
        const formData = new FormData(donationForm);
        // Normally, here you would send data to a server
        // For demo, just show thank you message
        donationForm.style.display = 'none';
        donationResponse.style.display = 'block';
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    const contactResponse = document.getElementById('contact-response');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple form validation can be enhanced here
        const formData = new FormData(contactForm);
        // Normally, here you would send data to a server
        // For demo, just show thank you message
        contactForm.style.display = 'none';
        contactResponse.style.display = 'block';
    });

    // Initialize Leaflet map
    const map = L.map('map').setView([40.7128, -74.0060], 12); // Default to New York City

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Sample locations data
    const locations = [
        {
            name: 'Ramakrishna Mission Ashrama',
            coords: [13.64790, 79.414078],
            address: 'Ramakrishna Marg, Vinayaka Nagar, Tirupati',
            hours: 'Mon-Fri 9AM-6PM'
        },
        {
            name: 'ISKCON',
            coords: [13.6469, 79.4138],
            address: 'Hare Krishna Road, Vinayaka Nagar, Tirupati',
            hours: 'Tue-Sat 8AM-5PM'
        },
        {
            name: 'Tirumala Tirupati Devasthanam - Annaprasadam Trust',
            coords: [13.65, 79.42],
            address: 'Tirumala, Tirupati',
            hours: 'Mon-Sun 10AM-4PM'
        }
    ];

    // Add markers to map and populate locations list
    const locationsGrid = document.getElementById('locations-grid');

    locations.forEach(loc => {
        // Add marker
        const marker = L.marker(loc.coords).addTo(map);
        marker.bindPopup(`<b>${loc.name}</b><br>${loc.address}<br>Hours: ${loc.hours}`);

        // Add to locations list
        const locDiv = document.createElement('div');
        locDiv.className = 'location-item';
        locDiv.innerHTML = `
            <h4>${loc.name}</h4>
            <p><strong>Address:</strong> ${loc.address}</p>
            <p><strong>Hours:</strong> ${loc.hours}</p>
        `;
        locationsGrid.appendChild(locDiv);
    });
});
