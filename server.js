// Full-stack Community Food Handler Server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// In-memory storage for donations (in production, use a database)
let donations = [];
let locations = [
    {
        id: 1,
        name: 'Ramakrishna Mission Ashrama',
        address: 'Ramakrishna Marg, Vinayaka Nagar, Tirupati',
        hours: 'Mon-Fri 9AM-6PM',
        coords: [13.64790, 79.414078],
        needs: 'Meat, poultry, prepared meals,canned goods'
    },
    {
        id: 2,
        name: 'ISKCON',
        address: 'Hare Krishna Road, Vinayaka Nagar, Tirupati',
        hours: 'Tue-Sat 8AM-5PM',
        coords: [13.6469, 79.4138],
        needs: 'Dairy products, dry goods'
    },
    {
        id: 3,
        name: 'Tirumala Tirupati Devasthanam - Annaprasadam Trust',
        address: 'Tirumala, Tirupati',
        hours: 'Wed-Sun 10AM-4PM',
        coords: [13.65, 79.42],
        needs: 'Vegetables, grains, fresh produce'
    }
];

// Routes
// Get all donations
app.get('/api/donations', (req, res) => {
    res.json(donations);
});

// Create a new donation
app.post('/api/donations', (req, res) => {
    const donation = {
        id: donations.length + 1,
        ...req.body,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    donations.push(donation);
    
    // In production, send email notification here
    console.log('New donation received:', donation);
    
    res.json({ success: true, donation });
});

// Get all locations
app.get('/api/locations', (req, res) => {
    res.json(locations);
});

// Create a new location
app.post('/api/locations', (req, res) => {
    const location = {
        id: locations.length + 1,
        ...req.body
    };
    
    locations.push(location);
    res.json({ success: true, location });
});

// Contact form submission
app.post('/api/contact', (req, res) => {
    const contact = {
        ...req.body,
        createdAt: new Date().toISOString()
    };
    
    // In production, send email notification here
    console.log('Contact form submitted:', contact);
    
    res.json({ success: true, message: 'Thank you for your message!' });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET  /api/donations - Get all donations');
    console.log('  POST /api/donations - Create new donation');
    console.log('  GET  /api/locations - Get all locations');
    console.log('  POST /api/locations - Create new location');
    console.log('  POST /api/contact - Submit contact form');
});
