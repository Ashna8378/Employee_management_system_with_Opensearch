import express from 'express';
import client from '../database.js';

const employee = express.Router(); // Use Router() instead of express()

employee.get("/", (req, res) => {
    res.send("Hello Goldi");
});

employee.get("/get", (req, res) => {  
    client.search({
        index: 'employee', 
        body: {
            query: {
                match_all: {} // Fetches all documents
            }
        }
    })
    .then(response => {
        res.json(response.body.hits.hits); // Send employee data
    })
    .catch(error => {
        res.status(500).json({ error: error.message }); // Handle errors
    });
});

employee.get("/get/:id", (req, res) => {
    const { id } = req.params; // Extract ID from URL

    client.get({
        index: 'employee',
        id, // Search by document ID
    })
    .then(response => {
        res.json(response.body._source); // Return the employee data
    })
    .catch(error => {
        res.status(500).json({ error: error.message }); // Handle errors
    });
});


// POST: Add a new employee
employee.post("/post", (req, res) => {  
    const { name, email, age } = req.body;  // Extract employee data

    if (!name || !email || !age) {
        return res.status(400).json({ error: "Missing required fields: name, email, age" });
    }

    client.index({
        index: 'employee',  
        body: {
            name,
            email,
            age
        }
    })
    .then(response => {
        res.json({ message: "Employee added successfully", id: response.body._id });
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
});

employee.put("/update/:id", (req, res) => {
    const { id } = req.params; // Extract employee ID from URL parameter
    const { name, email, age } = req.body; // Extract new data from request body

    // Check if all necessary fields are provided
    if (!name || !email || !age) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Update the employee document in the OpenSearch index
    client.update({
        index: 'employee',
        id, // Document ID
        body: {
            doc: { name, email, age } // Fields to update
        }
    })
    .then(response => {
        res.json({
            message: "Employee updated successfully",
            id: response.body._id,
            updatedFields: { name, email, age }
        });
    })
    .catch(error => {
        res.status(500).json({ error: error.message }); // Handle errors
    });
});


// Delete employee data by ID
employee.delete("/delete/:id", (req, res) => {
    const { id } = req.params; // Extract ID from URL

    client.delete({
        index: 'employee',
        id, // Document ID to delete
    })
    .then(response => {
        res.json({
            message: "Employee deleted successfully",
            id: response.body._id
        });
    })
    .catch(error => {
        res.status(500).json({ error: error.message }); // Handle errors
    });
});



export default employee;
