/**
 * Created by alexei on 30/05/16.
 */
var db = require('../db');

var user = db.Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    roles: {
        type: String,
        required: true,
        enum:['Client','Manager','Admin'],
        default:'Client'
    },
    cloudUsername: {
        type:String
    },
    cloudPassword:{
        type:String
    }

});

module.exports = db.model('User',user);