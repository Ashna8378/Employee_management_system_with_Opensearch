import express from 'express';
import client from '../database.js';

const contractor = express.Router(); // Use Router() instead of express()

// GET: Test route to check if the API is working
contractor.get("/", (req, res) => {
    res.send("Hello from Contractor API");
});

// GET: Fetch all contractors
contractor.get("/get", (req, res) => {  
    client.search({
        index: 'contractor', 
        body: {
            query: {
                match_all: {} // Fetches all documents
            }
        }
    })
    .then(response => {
        res.json(response.body.hits.hits); // Send contractor data
    })
    .catch(error => {
        res.status(500).json({ error: error.message }); // Handle errors
    });
});

// GET: Fetch contractor by ID
contractor.get("/get/:id", (req, res) => {
    const { id } = req.params; // Extract ID from URL

    client.get({
        index: 'contractor',
        id, // Search by document ID
    })
    .then(response => {
        res.json(response.body._source); // Return the contractor data
    })
    .catch(error => {
        res.status(500).json({ error: error.message }); // Handle errors
    });
});

// POST: Add a new contractor
contractor.post("/post", (req, res) => {  
    const { name, email, age } = req.body;  // Extract contractor data (replacing contractDuration with age)

    if (!name || !email || !age) {
        return res.status(400).json({ error: "Missing required fields: name, email, age" });
    }

    client.index({
        index: 'contractor',  
        body: {
            name,
            email,
            age // Store age instead of contractDuration
        }
    })
    .then(response => {
        res.json({ message: "Contractor added successfully", id: response.body._id });
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// PUT: Update contractor data by ID
contractor.put("/update/:id", (req, res) => {
    const { id } = req.params; // Extract contractor ID from URL parameter
    const { name, email, age } = req.body; // Extract new data from request body (age instead of contractDuration)

    // Check if all necessary fields are provided
    if (!name || !email || !age) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Update the contractor document in the OpenSearch index
    client.update({
        index: 'contractor',
        id, // Document ID
        body: {
            doc: { name, email, age } // Fields to update
        }
    })
    .then(response => {
        res.json({
            message: "Contractor updated successfully",
            id: response.body._id,
            updatedFields: { name, email, age }
        });
    })
    .catch(error => {
        res.status(500).json({ error: error.message }); // Handle errors
    });
});

// DELETE: Delete contractor data by ID
contractor.delete("/delete/:id", (req, res) => {
    const { id } = req.params; // Extract ID from URL

    client.delete({
        index: 'contractor',
        id, // Document ID to delete
    })
    .then(response => {
        res.json({
            message: "Contractor deleted successfully",
            id: response.body._id
        });
    })
    .catch(error => {
        res.status(500).json({ error: error.message }); // Handle errors
    });
});

export default contractor;


