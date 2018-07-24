const storage = require('azure-storage');

class StorageClient {
    constructor (config) {

        //Is this creating too many connections? 
        this.cli = storage.createTableService(config.cosmosDbConnectionString);
    }

    create (tableName, entity) {
        // TODO some table and data validation
        console.log("Creating...")
        return new Promise( (resolve, reject) => {
            this.cli.insertEntity(tableName, entity, function(error, result, response) {
                if (!!error) {
                    return reject(error);
                }

                if (response.isSuccessful){
                    return resolve(response.body);
                }

                return reject(response)
            });
        });
    }

    get (table, partition, row) {
        // TODO some table, partition, row validation
        console.log("Getting...")
        return new Promise( (resolve, reject) => {
            this.cli.retrieveEntity(table, partition, row, function(error, result, response) {
                if (!!error) {
                  return reject(error)
                }
                if (response.isSuccessful){
                    return resolve(response.body);
                }
                return reject(response)
              });
        });
    }

    update (table, entity) {
        console.log("Updating...")
        return new Promise( (resolve, reject) => {
            this.cli.replaceEntity(table, entity, function(error, result, response) {
                if (!!error) {
                  return reject(error)
                }
                
                if (response.isSuccessful){
                    return resolve(response.body);
                }
                return reject(response)
              });
        });
    }

    delete (table, entity) {
        console.log("Deleting...")
        return new Promise( (resolve, reject) => {
            this.cli.deleteEntity(table, entity, function(error, result, response) {
                if (!!error) {
                  return reject(error)
                }

                return resolve(response);  
              });
        });
    }

    list (table, partitionKey){
        console.log("Listing...")

        return new Promise( (resolve, reject) => {
            var query = new storage.TableQuery()
                .where('PartitionKey eq ?', partitionKey);
           
            this.cli.queryEntities(table, query, null, function(error, result, response) {
                if (!!error) {
                    return reject(error)
                }

                if (response.isSuccessful) {
                    return resolve(response.body.value);
                }

                return reject(response)
            });
        })
        
    } 

    
}

module.exports = StorageClient;