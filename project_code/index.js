import express from 'express';
import employee from './api/employee.js';
import client from './database.js';
import cors from 'cors';

import { auth } from './api/auth.js';
import path from 'path';

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());
app.use(express.static('public'));

// Send index.html when visiting the home page

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.use("/auth", auth)
app.use("/emp",employee)

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    client.ping()
    
    .then(() => console.log("Connected to OpenSearch!"))
    .catch(err => console.error("OpenSearch Connection Failed:", err));

});








