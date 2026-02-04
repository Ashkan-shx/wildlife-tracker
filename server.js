/*
WEB322 - Assignment 01
*
* I declare that this assignment is my own work in accordance with Seneca's
Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Ashkan Sharifi
* Student ID: 178960233
* Date: February 1, 2026
*******************/

const express = require('express');
const path = require('path');
const { loadSightings } = require('./utils/dataLoader'); // Matches your utils folder [cite: 38, 39]

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Set up middleware to serve static files from public folder [cite: 82]
app.use(express.static(path.join(__dirname, 'public')));

// 2. Create a root route (/) that serves index.html from views folder [cite: 83]
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 3. API Endpoints [cite: 84]

// GET /api/sightings - Return ALL sighting records [cite: 87, 88]
app.get('/api/sightings', async (req, res) => {
    try {
        const data = await loadSightings(); // Use async/await [cite: 89]
        res.json(data); // Send JSON response [cite: 90]
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/sightings/verified - Filter and return only VERIFIED sightings [cite: 91, 92]
app.get('/api/sightings/verified', async (req, res) => {
    try {
        const data = await loadSightings();
        const verified = data.filter(s => s.verified === true); // Must use .filter() [cite: 93]
        res.json(verified);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/sightings/species-list - Extract unique species names [cite: 95, 96]
app.get('/api/sightings/species-list', async (req, res) => {
    try {
        const data = await loadSightings();
        const species = data.map(s => s.species); // Must use .map() [cite: 97]
        const uniqueSpecies = [...new Set(species)]; // Remove duplicates using Set [cite: 98]
        res.json(uniqueSpecies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/sightings/habitat/forest - Hardcoded forest filter [cite: 99, 100]
app.get('/api/sightings/habitat/forest', async (req, res) => {
    try {
        const data = await loadSightings();
        const forest = data.filter(s => s.habitat === "forest"); // Must use .filter() [cite: 101]
        res.json({
            habitat: "forest",
            sightings: forest,
            count: forest.length // Count represents number of records [cite: 102, 103, 104]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/sightings/search/eagle - Find first "eagle" (case-insensitive) [cite: 105, 106]
app.get('/api/sightings/search/eagle', async (req, res) => {
    try {
        const data = await loadSightings();
        const eagle = data.find(s => s.species.toLowerCase().includes('eagle')); // Use .toLowerCase() and .includes() [cite: 107]
        res.json(eagle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/sightings/find-index/moose - Find index of "Moose" [cite: 108, 109]
app.get('/api/sightings/find-index/moose', async (req, res) => {
    try {
        const data = await loadSightings();
        const index = data.findIndex(s => s.species === "Moose"); // Must use .findIndex() [cite: 110]
        res.json({ index, sighting: data[index] }); // Return object with index and data [cite: 111]
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/sightings/recent - Return 3 most recent [cite: 112, 113]
app.get('/api/sightings/recent', async (req, res) => {
    try {
        const data = await loadSightings();
        // Use map to format specific fields [cite: 114]
        const recent = data.slice(0, 3).map(({ species, location, date }) => ({ species, location, date }));
        res.json(recent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});