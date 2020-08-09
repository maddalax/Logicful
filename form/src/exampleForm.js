module.exports = {
    fields : [{
        id : "fake_id_1",
        label : "Name",
        value : {type : 'remote', value : 'https://jsonplaceholder.typicode.com/posts/1', selector : 'title'},
        name : "name",
        type : "string"
    }, 
    {
        id : "fake_id_2",
        name : "job",
        label : "Job",
        required : true,
        type : "string",
        value : {type : 'remote', value : 'https://jsonplaceholder.typicode.com/posts/1', selector : 'title'},
    },
    {
        id : "fake_id_3",
        name : "address",
        type : "address",
        label : "Address",
        value : {type : 'local', value : {
            address1 : {type : 'remote', value : "https://api.airtable.com/v0/appEML20rXbrwtvQD/Table%201/recfrDgzRBLhrI76y?api_key=keyI6mPylSidabESr", "selector" : "fields.Value"},
            address2 : {type : "local", value : "416"},
            city : {type : "local", value : "OP"},
            state : {type : "local", value : "Kansas"},
            zip : {type : "local", value : "66140"}
        }},
        validations : ["address"],
        display : {
            condition : 'hasValue',
            target : 'form',
            parameter : 'fake_id_2'
        }
    }]
}