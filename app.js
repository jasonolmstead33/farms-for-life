//Node Modules
const express = require('express');
const app = express();
const fs = require("fs");
const homedir = require('os').homedir();
var bodyParser = require('body-parser');

//App constants
const port = 8081;

//Setup our config
let config = {};
var content = fs.readFileSync(homedir + "/creds.json");
config = JSON.parse(content);

//Middleware
app.use(bodyParser.json()); // for parsing application/json

let logRequest = (req, res, next) => {
    console.log(`[${new Date()}] ${req.method}: ${req.path}`)
    next();
}

//Controllers
const FarmersController = require('./server/controllers/farmersController.js');
const farmers = new FarmersController(config);


//Farmers API
app.get('/api/farmers/:id', logRequest, farmers.getFarmer);
app.get('/api/farmers', logRequest, farmers.listFarmers);
app.post('/api/farmers', logRequest, farmers.createFarmer);
app.put('/api/farmers/:id', logRequest, farmers.updateFarmer);
app.delete('/api/farmers/:id', logRequest, farmers.deleteFarmer);

app.listen(port, () => console.log('Example app listening on port '+ port));


