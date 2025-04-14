import express from 'express';
import client from '../database.js';

const employee = express.Router();

employee.get("/get", (req, res) => { 
    const { from = 0, size = 1000, query = "" } = req.query;

    client.search({
        index: 'employee',
        body: {
            from: parseInt(from),
            size: parseInt(size),
            sort: [{ "created_at": { "order": "desc" } }],
            query: query
                ? {
                    multi_match: {
                        query,
                        fields: ["name", "email"]
                    }
                }
                : { match_all: {} }
        }
    })
    .then(response => {
        res.json(response.body.hits.hits); // Send paginated employee data
    })
    .catch(error => {
        console.error("Elasticsearch error:", error);
        res.status(500).json({ error: error.message }); // Handle errors
    });
});


employee.get("/get/:id", (req, res) => {
    const { id } = req.params; // Extract ID from URL

    client.get({
        index: 'employee',
        id, 
    })
    .then(response => {
        res.json(response.body._source); // Return the employee data
    })
    .catch(error => {
        res.status(500).json({ error: error.message }); // Handle errors
    });
});


employee.post("/post", async (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({ error: "Missing required fields: name, email, age" });
    }

    try {
        // Step 1: Check if email already exists
        const { body: searchResult } = await client.search({
            index: 'employee',
            body: {
                query: {
                    match: {
                        email: email
                    }
                }
            }
        });

        if (searchResult.hits.total.value > 0) {
            return res.status(409).json({ error: "Email already exists" });
        }

        // Step 2: Insert if email is unique
        const response = await client.index({
            index: 'employee',
            refresh: true,
            body: {
                name,
                email,
                age,
                created_at: new Date().toISOString()
            }
        });

        res.json({ message: "Employee added successfully", id: response.body._id });

    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).json({ error: error.message });
    }
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
        refresh: true,
        id,
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
    const { id } = req.params;

    client.delete({
        index: 'employee',
        id:id,
        refresh:true
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

