/**
 * Created by alexei on 27/05/16.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use('/api/session',require('./controllers/api/session'));
app.use('/api/users',require('./controllers/api/users'));
app.use('/api/users/cloud',require('./controllers/api/usersCloud'));
app.use('/', require('./controllers/static'));



app.listen(8081,function(){
    console.log('Server listening on', 8081);
});