import express from 'express';

const app = express();
const PORT = 5000;


app.get("/", (req, res) => {
    res.send("Hello, this is your Express server running on localhost!");
  });
  



// Start Server

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});


