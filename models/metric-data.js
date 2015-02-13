var mongojs = require('mongojs');

var databaseUrl = "mydb";
var collections = ["data"];
var db = mongojs.connect(databaseUrl, collections);

module.exports = (function() {
    return {
        create: function(data) {
            data['created_time'] = new Date();
            db.metric.insert(data);
        }
    }
}());