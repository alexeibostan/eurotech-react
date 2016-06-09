/**
 * Created by alexei on 30/05/16.
 */
var router = require('express').Router();
var User = require('../../models/user');
var bcrypt = require('bcrypt');
var auth = require('basic-auth');

router.post('/',function(req,res,next){
    var credentials = auth(req);
    User.findOne({username: credentials.name })
        .select('password')
        .exec(function(err,user){

            if (err) {return next(err);}

            if (!user) { return res.send(401);}

            bcrypt.compare(credentials.pass, user.password, function(err,valid) {

                if (err) {return next(err);}

                if (!valid) { return res.send(401);}

                res.send(201);

            });
        })
});

module.exports = router;