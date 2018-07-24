const FOOD = "food";

class Food {
    constructor(obj) {
        let row = ""
        
        if (!!obj.item && obj.item !== "") {
            row = obj.item
        }

        if (row === "") {
            throw new Error("Object must have item name")
        }

        this.PartitionKey = "food"
        this.RowKey = row
        this.item = obj.item
        this.type = obj.type || ""
        this.unit = obj.unit || ""
        this.unitPrice = obj.unitPrice || 0.00
        this.description = obj.description || obj.item
        this.include = obj.include || true
    }
}

module.exports = Food