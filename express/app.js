var express = require('express');
var fs = require('fs')
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.get('/',function(req,res) {
  res.send('Sample Code for RESTful API');
})

app.get('/listUsers', function (req, res) {
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     console.log( data );
     res.end( data );
  });
})



app.post('/addUser', function (req, res) {
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    length = Object.keys(data).length
    i = length + 1

    data['user' + i] = req.body; // add to body
    console.log(data);
    res.end(JSON.stringify(data)); // debug
  });
})


app.get('/showbyID/:id', function (req, res) {
  // First read existing users.
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {

    var users = JSON.parse( data );
    var user = users["user" + req.params.id] ;
    console.log( user );
    res.end( JSON.stringify(user));

    console.log(typeof(req.params.id))
  });
})

var server = app.listen(8080,function (){
  var port = server.address().port

  console.log('Sample Code for RESTful API run at', port)
})





