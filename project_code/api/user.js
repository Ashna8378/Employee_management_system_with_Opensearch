import express, { Router } from 'express'
const user = express.Router()
import client from '../database.js'

user.get("/get", (req, res)=>{
    client.search({
        index: 'users', 
        body: {
            query: {
                match_all: {}
            }
        }
    })
    .then(response => {
        res.json(response.body.hits.hits); 
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
}
)
user.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    client.update({
        index: 'users',
        id,
        body: {
            doc: { name, email, password }
        }
    })
    .then(response => {
        res.json({
            message: "User updated successfully",
            id: response.body,
            updatedFields: { name, email, password }
        });
    })
    .catch(error => {
        res.status(500).json({ error: error.message }); // Handle errors
    });
});


export default user