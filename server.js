// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const a = [{ id: 't4ebwvf8y', date: '5.9.2020', temp: 293.8, feelings: '' }]
app.get('/getData',(req, res)=>{
     res.send(projectData)
})


app.post('/data', (req, res) => {
    projectData = req.body
    console.log(projectData);
  })

const port = '8080';

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
});