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
        .exec(function(err,user) {

            if (err) {
                return next(err);
            }

            if (!user) {
                var userToInsert = new User({
                    username: credentials.name
                });

                bcrypt.hash(credentials.pass, 10, function (err, hash) {
                    if (err) {
                        return next(err)
                    }
                    userToInsert.password = hash;
                    userToInsert.save(function (err) {
                        if (err) {
                            next(err);
                        }
                        console.log('user registered');
                        res.send(201);
                    });
                });
            }
            else {
                console.log('User already registered');
                res.json({error: true, message: 'User already registered'});
            }
        });

});

router.get('/',function(req,res,next){
    User.find({})
        .select('username')
        .select('roles')
        .select('cloudUsername')
        .exec(function(err, users){
        res.json({
            users: users
        });
    });
});

module.exports = router;