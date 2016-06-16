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
        .select('cloudPassword')
        .select('cloudUsername')
        .exec(function(err,user){

            if (err) {return next(err);}

            if (!user) { return res.send(401);}

            bcrypt.compare(credentials.pass, user.password, function(err,valid) {

                if (err) {return next(err);}

                if (!valid) { return res.send(401);}
                if (user.cloudPassword && user.cloudUsername){
                    res.json({
                        cloudPass: user.cloudPassword,
                        cloudUser: user.cloudUsername
                    });
                }

                else {
                    res.send(200);
                }

            });
        })
});

module.exports = router;