/**
 * Created by alexei on 30/05/16.
 */
var router = require('express').Router();
var User = require('../../models/user');
var bcrypt = require('bcrypt');
var auth = require('basic-auth');

router.post('/',function(req,res,next){
    var credentials = auth(req);
    var user = new User({   username: credentials.name,
                            roles:'admin'});

    bcrypt.hash(credentials.pass, 10, function(err, hash){
        if (err) { return next(err) }
        user.password = hash;
        user.save(function(err){
            if (err) { next(err); }
            console.log('user registered');
            res.send(201);
        });
    });
});

module.exports = router;