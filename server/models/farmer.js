const FARMER = "farmer";

class Farmer {
    constructor(obj) {
        let row = ""
        
        if (!!obj.email && obj.email !== "") {
            row = obj.email
        }

        if (row === "") {
            throw new Error("Object must have email")
        }

        this.PartitionKey = "farmer"
        this.RowKey = row
        this.name = obj.name || ""
        this.acreage = obj.acreage || ""
        this.season = obj.season || ""
        this.phone = obj.phone || ""
        this.email = obj.email || ""
        this.budgetWeight = obj.budgetWeight || 0
    }
}

module.exports = Farmer