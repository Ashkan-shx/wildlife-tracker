const fs = require('fs').promises; // Uses promises for async/await
const path = require('path');

/**
 * Helper function to load wildlife sightings from the JSON file.
 * This is used by all API routes in server.js.
 */
async function loadSightings() {
    try {
        // This path tells Node to go UP one level, then into the 'data' folder
        const filePath = path.join(__dirname, '../data/sightings.json');
        
        // Read the file content as a string
        const data = await fs.readFile(filePath, 'utf-8');
        
        // Convert string to JavaScript Object
        const jsonData = JSON.parse(data);
        
        // Return ONLY the sightings array (this is required for .filter, .map, etc.)
        return jsonData.sightings; 
        
    } catch (err) {
        console.error("Error reading sightings.json:", err.message);
        throw new Error("Could not load wildlife data.");
    }
}

// Export the function so server.js can use it
module.exports = { loadSightings };