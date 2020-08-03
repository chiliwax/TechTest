var express = require('express');
var app = express();

const apiRouter = require('./api')
const bodyParser = require('body-parser')
const jwt = require('./_helpers/jwt');
const errorHandling = require('./_helpers/error-handler');


//SET MIDDLEWARE
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))


//SET ROUTER(S)
app.use("/api", apiRouter);

//Handle Tokens
app.use(jwt())
app.use((err, req, res, next) => { errorHandling(err,req,res,next) })

//DOCUMENTATION
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/views/readme.html')
})

//404 handle API and Web
app.get('/404', function(req, res) {
    if (req.accepts('html')) {
        res.status(404).sendFile(__dirname + '/public/views/404.html');
        return;
    }

    // respond with json (API REQUEST)
    if (req.accepts('json')) {
        res.status(404).send({ error: 'Not found' });
        return;
    }
});

//Start the server on the actual IP with the PORT 8081
var server = app.listen(8081, function() {
    var host = 'localhost';
    var port = server.address().port;
    console.log('running T2S API at http://' + host + ':' + port)
});