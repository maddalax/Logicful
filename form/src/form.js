module.exports = {
    fields : [{
        "name" : "array",
        "type" : "repeating",
        "count" : 3,
        "fields" : [{
            "name" : "name",
            "type" : "name"
        }] 
    }, 
    {
        name : "job",
        type : "string"
    },
    {
        name : "address",
        type : "address",
        display : {
            condition : 'hasValue',
            target : 'form',
            parameter : 'job'
        }
    }]
}