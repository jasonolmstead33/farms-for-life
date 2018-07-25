//Local Modules
const StorageClient = require('../data/storage');
const Food = require('../models/food');

//Constants
const TABLE = 'farmers';
const FOOD_PARTITION = 'food'

//Properties
let storageCli;

class FoodController {
    constructor (config) {
        storageCli = new StorageClient(config)
    }
    

    createFood(req, res) {
        if (!storageCli) {
            return res.status(500).json({error: "StorageClient not initialized"})
        }

        //TODO body validation
        if (!req.body || !req.body.item) {
            return res.status(400).json({error: "BadRequest"})
        }

        let food = new Food(req.body)
        return storageCli.create(TABLE, food)
            .then(data => {
                //TODO xform body. 
                return res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({error: err.toString()})
            })
    }

    getFood(req, res) {
        if (!storageCli) {
            return res.status(500).json({error: "StorageClient not initialized"})
        }

        if (!req.params.id) {
            return res.status(400).json({error: "BadRequest"})
        }

        let row = req.params.id

        return storageCli.get(TABLE, FOOD_PARTITION, row)
            .then(data => {            
                //TODO xform body. 
                let result = data;
                result = cleanseFood(result)
                return res.status(200).json(data)               
            })
            .catch(err => {
                console.log(err)
                let statusCode = err.statusCode || 500;
                return res.status(statusCode).json({error: err.toString()})
            })
    }

    listFood(req, res) {
        if (!storageCli) {
            return res.status(500).json({error: "StorageClient not initialized"})
        }

        return storageCli.list(TABLE, FOOD_PARTITION)
            .then(data => {
                for (let i in data) {
                    data[i] = cleanseFood(data[i])
                }

                return res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                let statusCode = err.statusCode || 500;
                return res.status(statusCode).json({error: err.toString()})
            })
    }

    updateFood(req, res) {
        if (!storageCli) {
            return res.status(500).json({error: "StorageClient not initialized"})
        }

        if (!req.body || !req.body.item || req.params.id !== req.body.item) {
            return res.status(400).json({error: "BadRequest"})
        }

        let food = new Food(req.body)
        return storageCli.update(TABLE, food)
            .then(data => {
                food = cleanseFood(agency)
                return res.status(200).json(food)
            })
            .catch(err => {
                console.log(err)
                let statusCode = err.statusCode || 500;
                return res.status(statusCode).json({error: err.toString()})
            })
    }

    deleteFood(req, res) {
        if (!storageCli) {
            return res.status(500).json({error: "StorageClient not initialized"})
        }

        if (!req.params.id) {
            return res.status(400).json({error: "BadRequest"})
        }

        let food = new Food({item: req.params.id});
        
        return storageCli.delete(TABLE, food)
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

module.exports = FoodController;

//HELPERS -- NEED TO MOVE TO Utils

function cleanseFood(result) {
    delete result["odata.metadata"]
    delete result["odata.etag"]
    delete result["PartitionKey"]
    delete result ["RowKey"]
    delete result["Timestamp"]
    return result
}