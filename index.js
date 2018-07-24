//Node Modules
const express = require('express');
const app = express();
const cors = require('cors')
const fs = require("fs");
const homedir = require('os').homedir();
const bodyParser = require('body-parser');

//App constants
const port = process.env.PORT || 8081;

//Setup our config
let config = {};
var content = fs.readFileSync(homedir + "/creds.json");
config = JSON.parse(content);

//Middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(cors());

let logRequest = (req, res, next) => {
    console.log(`[${new Date()}] ${req.method}: ${req.path}`)
    next();
}

//Controllers
const FarmersController = require('./server/controllers/farmersController.js');
const farmers = new FarmersController(config);

const AgencyController = require('./server/controllers/agencyController.js');
const agency = new AgencyController(config);

const FoodController = require('./server/controllers/foodController.js');
const food = new FoodController(config);

//Health Check API
app.get('/api/ping', logRequest, (req, res) => {
    res.status(200).send({"Health": "OK"})
});

//Farmers API
app.get('/api/farmers/:id', logRequest, farmers.getFarmer);
app.get('/api/farmers', logRequest, farmers.listFarmers);
app.post('/api/farmers', logRequest, farmers.createFarmer);
app.put('/api/farmers/:id', logRequest, farmers.updateFarmer);
app.delete('/api/farmers/:id', logRequest, farmers.deleteFarmer);

//Agency API
app.get('/api/agency/:id', logRequest, agency.getAgency);
app.get('/api/agency', logRequest, agency.listAgencies);
app.post('/api/agency', logRequest, agency.createAgency);
app.put('/api/agency/:id', logRequest, agency.updateAgency);
app.delete('/api/agency/:id', logRequest, agency.deleteAgency);

//Foods API
app.get('/api/foods/:id', logRequest, food.getFood);
app.get('/api/foods', logRequest, food.listFood);
app.post('/api/foods', logRequest, food.createFood);
app.put('/api/foods/:id', logRequest, food.updateFood);
app.delete('/api/foods/:id', logRequest, food.deleteFood);

app.listen(port, () => console.log(`Example app listening on port :${port}`));


