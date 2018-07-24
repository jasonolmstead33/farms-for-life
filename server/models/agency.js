const AGENCY = "agency";

class Agency {
    constructor(obj) {
        let row = ""
        
        if (!!obj.email && obj.email !== "") {
            row = obj.email
        }

        if (row === "") {
            throw new Error("Object must have email")
        }

        this.PartitionKey = "agency"
        this.RowKey = row
        this.name = obj.name || ""
        this.address = obj.address || ""
        this.size = obj.size || ""
        this.season = obj.season || ""
        this.phone = obj.phone || ""
        this.email = obj.email || ""
        this.numberOfPeopleServed = obj.numberOfPeopleServed || 1
        this.preferences = obj.preferences || []
    }
}

module.exports = Agency