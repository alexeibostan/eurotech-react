/**
 * Created by alexei on 30/05/16.
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/eurotech', function () {
    console.log('mondodb connected!');
});

module.exports = mongoose;