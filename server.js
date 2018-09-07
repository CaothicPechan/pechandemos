
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser')
var Caller = require('./caller');
app = express();
// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}))
// Process application/json
app.use(bodyParser.json())
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);

app.post('/makecall', (req,res) => {
    console.log('Requesting -->');
    console.log(req.body);
    let data = req.body;

    if(data.type == 'call'){
        var caller = new Caller(data.id, data.phone);
        caller.call();
    }else{
        console.log('Recieved request -->');
        console.log(data);
    }
    

    res.sendStatus(200);
})
