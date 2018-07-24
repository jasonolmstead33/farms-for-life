//NODE_MODULES
const fs = require('fs')
const parse = require('csv-parse')
const homedir = require('os').homedir();

//LOCAL_MODULES
let Food = require('../models/food')
let storageCli = require('../data/storage');

let path = __dirname + '/food.csv';
let foodData = fs.readFileSync(path);

//Config
let config = {};
var content = fs.readFileSync(homedir + "/creds.json");
config = JSON.parse(content);

let cli = new storageCli(config)

return parse(foodData, {delimiter: ','}, (err, result) => {
    return new Promise( (resolve, reject) => {
        if (!!err) {
            console.log(err)
            return
        }

        let promises = []
    
        for (let i in result) {

            let unitPrice = result[i][3].replace("$", "")
            let include = result[i][5].trim() === 'x' ? true: false;
            let food = new Food(
                {
                    type: result[i][0],
                    item: result[i][1],
                    unit: result[i][2],
                    unitPrice: parseFloat(unitPrice),
                    description: result[i][4],
                    include: include
                }
            )
         
            promises.push(cli.update("farmers", food))
        }

        Promise.all(promises).then(data => {
            console.log(data);
        }).catch(err)
    })
})