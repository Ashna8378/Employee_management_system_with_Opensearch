import express from 'express';
import employee from './api/employee.js';
import contractor from './api/contractor.js';
import client from './database.js';
import cors from 'cors'

const app = express();
const PORT = 6000;


app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello, this is your Express server running on localhost!");
  });

app.use(express.json());

app.use("/cont",contractor)  

app.use("/emp",employee)

// Start Server


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    client.ping()
    .then(() => console.log("Connected to OpenSearch!"))
    .catch(err => console.error("OpenSearch Connection Failed:", err));

});






