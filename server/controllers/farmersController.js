//Local Modules
const StorageClient = require('../data/storage');
const Farmer = require('../models/farmer');

//Constants
const FARMERS_TABLE = 'farmers';
const FARMERS_PARTITION = 'farmer'

//Properties
let storageCli;

class FarmersController {
    constructor (config) {
        storageCli = new StorageClient(config)
    }
    

    createFarmer(req, res) {
        if (!storageCli) {
            return res.status(500).json({error: "StorageClient not initialized"})
        }

        //TODO body validation
        if (!req.body || !req.body.email) {
            return res.status(400).json({error: "BadRequest"})
        }

        if (!validateEmail(req.body.email)) {
            return res.status(400).json({error: "BadRequest"})
        }
        
        if (!!req.body.phone) {
            req.body.phone = formatPhoneNumber(req.body.phone)
        }

        let farmer = new Farmer(req.body)
        return storageCli.create(FARMERS_TABLE, farmer)
            .then(data => {
                //TODO xform body. 
                return res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
                let statusCode = err.statusCode || 500;
                return res.status(statusCode).json({error: err.toString()})
            })
    }

    getFarmer(req, res) {
        if (!storageCli) {
            return res.status(500).json({error: "StorageClient not initialized"})
        }

        if (!validateEmail(req.params.id)) {
            return res.status(400).json({error: "BadRequest"})
        }

        let row = req.params.id

        return storageCli.get(FARMERS_TABLE, FARMERS_PARTITION, row)
            .then(data => {            
                //TODO xform body. 
                let result = data;
                result = cleanseFarmer(result)
                return res.status(200).json(data)               
            })
            .catch(err => {
                console.log(err)
                let statusCode = err.statusCode || 500;
                return res.status(statusCode).json({error: err.toString()})
            })
    }

    listFarmers(req, res) {
        if (!storageCli) {
            return res.status(500).json({error: "StorageClient not initialized"})
        }

        return storageCli.list(FARMERS_TABLE, FARMERS_PARTITION)
            .then(data => {
                for (let i in data) {
                    data[i] = cleanseFarmer(data[i])
                }

                return res.status(200).json(data)
                
            })
            .catch(err => {
                console.log(err)
                let statusCode = err.statusCode || 500;
                return res.status(statusCode).json({error: err.toString()})
            })
    }

    updateFarmer(req, res) {
        if (!storageCli) {
            return res.status(500).json({error: "StorageClient not initialized"})
        }

        if (!req.body || !req.body.email || req.params.id !== req.body.email) {
            return res.status(400).json({error: "BadRequest"})
        }

        if (!validateEmail(req.params.id)) {
            return res.status(400).json({error: "BadRequest"})
        }

        if (!!req.body.phone) {
            req.body.phone = formatPhoneNumber(req.body.phone)
        }

        let farmer = new Farmer(req.body)
        return storageCli.update(FARMERS_TABLE, farmer)
            .then(data => {
                farmer = cleanseFarmer(farmer)
                return res.status(200).json(farmer)
            })
            .catch(err => {
                console.log(err)
                let statusCode = err.statusCode || 500;
                return res.status(statusCode).json({error: err.toString()})
            })
    }

    deleteFarmer(req, res) {
        if (!storageCli) {
            return res.status(500).json({error: "StorageClient not initialized"})
        }

        if (!req.params.id) {
            return res.status(400).json({error: "BadRequest"})
        }

        if (!validateEmail(req.params.id)) {
            return res.status(400).json({error: "BadRequest"})
        }

        let farmer = new Farmer({email: req.params.id});
        
        return storageCli.delete(FARMERS_TABLE, farmer)
            .then(data => {
                return res.status(200).json({status: "OK"})
            })
            .catch(err => {
                console.log(err)
                let statusCode = err.statusCode || 500;
                return res.status(statusCode).json({error: err.toString()})
            })
    }
}

module.exports = FarmersController;

//HELPERS 
function formatPhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "" + m[1] + "" + m[2] + "" + m[3];
}

function cleanseFarmer(result) {
    delete result["odata.metadata"]
    delete result["odata.etag"]
    delete result["PartitionKey"]
    delete result ["RowKey"]
    delete result["Timestamp"]
    return result
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}