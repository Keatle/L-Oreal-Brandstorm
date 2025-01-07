const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

//Middelware 
app.use(bodyParser.json());
app.use(cors());

//Basic Route 
app.get('/', (req, res) =>{

    res.send('Welcome to my api ! ');
});

//Start the server 