//Local Modules
const StorageClient = require('../data/storage');
const Agency = require('../models/agency');

//Constants
const TABLE = 'farmers';
const AGENCY_PARTITION = 'agency'

//Properties
let storageCli;

class AgencyController {
    constructor (config) {
        storageCli = new StorageClient(config)
    }
    

    createAgency(req, res) {
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

        let agency = new Agency(req.body)
        return storageCli.create(TABLE, agency)
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

    getAgency(req, res) {
        if (!storageCli) {
            return res.status(500).json({error: "StorageClient not initialized"})
        }

        if (!validateEmail(req.params.id)) {
            return res.status(400).json({error: "BadRequest"})
        }

        let row = req.params.id

        return storageCli.get(TABLE, AGENCY_PARTITION, row)
            .then(data => {            
                //TODO xform body. 
                let result = data;
                result = cleanseAgency(result)
                return res.status(200).json(data)               
            })
            .catch(err => {
                console.log(err)
                let statusCode = err.statusCode || 500;
                return res.status(statusCode).json({error: err.toString()})
            })
    }

    listAgencies(req, res) {
        if (!storageCli) {
            return res.status(500).json({error: "StorageClient not initialized"})
        }

        return storageCli.list(TABLE, AGENCY_PARTITION)
            .then(data => {
                for (let i in data) {
                    data[i] = cleanseAgency(data[i])
                }

                return res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                let statusCode = err.statusCode || 500;
                return res.status(statusCode).json({error: err.toString()})
            })
    }

    updateAgency(req, res) {
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

        let agency = new Agency(req.body)
        return storageCli.update(TABLE, agency)
            .then(data => {
                agency = cleanseAgency(agency)
                return res.status(200).json(agency)
            })
            .catch(err => {
                console.log(err)
                let statusCode = err.statusCode || 500;
                return res.status(statusCode).json({error: err.toString()})
            })
    }

    deleteAgency(req, res) {
        if (!storageCli) {
            return res.status(500).json({error: "StorageClient not initialized"})
        }

        if (!req.params.id) {
            return res.status(400).json({error: "BadRequest"})
        }

        if (!validateEmail(req.params.id)) {
            return res.status(400).json({error: "BadRequest"})
        }

        let agency = new Agency({email: req.params.id});
        
        return storageCli.delete(TABLE, agency)
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

module.exports = AgencyController;

//HELPERS -- NEED TO MOVE TO Utils
function formatPhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "" + m[1] + "" + m[2] + "" + m[3];
}

function cleanseAgency(result) {
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