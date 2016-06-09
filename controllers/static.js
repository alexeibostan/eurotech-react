/**
 * Created by alexei on 30/05/16.
 */
var express = require('express');
var router = require('express').Router();

router.use(express.static(__dirname + '/../build'));


router.get('/',function(req,res){
    res.sendFile('build/index.html');
});

/*router.get('/app.bundle.js',function(req,res){
    res.sendFile(__dirname + 'build/app.bundle.js');
});

router.get('/style.css',function(req,res){
    res.sendFile(__dirname + 'build/style.css');
});*/

module.exports = router;