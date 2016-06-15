/**
 * Created by alexei on 15/06/16.
 */
var router = require('express').Router();
var User = require('../../models/user');


router.post('/',function(req,res,next){
    var username = req.body.username;
    var cloudUser = req.body.cloudUser;
    var cloudPass = req.body.cloudPass;
    
    User.findOne({username: username })
        .exec(function(err,user) {

            if (err) { return next(err); }

            if (!user) { return res.send(401); }
            
            user.cloudPassword = cloudPass;
            user.cloudUsername = cloudUser;

            user.save(function(err){
                if (err) { return next(err); }
                console.log('Colud user seted');
                res.send(201)
            })

        });

});

module.exports = router;