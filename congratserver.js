// A congratulatory web server that provides a greeting message in multiple languages
// (c)2015 Larry Lang

var servPort = process.env.PORT || 8080; // default TCP port 8080 to run locally

// space and instance
cfenv    = require("cfenv")
appEnv   = cfenv.getAppEnv()
space    = appEnv.app.space_name     || "local";
instance = appEnv.app.instance_index || 0;
console.log("Starting congratserver in "+space+" [instance "+instance+"]");

// greeting parameters
var greeting = process.env.GREETING || "Congratulations!";
var tagline  = process.env.TAGLINE  || "You've come to the right place";
var imageURL = process.env.IMAGEURL || "http://lorempixel.com/200/200/";


//special greetings for Swisscom

switch(instance) {
    case 1:  //German
        greeting = "Herzlichen Glückwunsch, Swisscom !";
        tagline  = "PLUMgrid stolz Teil der <A HREF=https://www.youtube.com/watch?v=paFgSwhHBeo>Anwendung Wolke<A>";
        break;
    case 2:  //French
        greeting = "Félicitations, Swisscom!";
        tagline  = "PLUMgrid fièrement partie du <A HREF=https://www.youtube.com/watch?v=paFgSwhHBeo>nuage de demande</A>";
        break;
    case 3:  //Italian
        greeting = "Congratulazioni, Swisscom!";
        tagline  = "PLUMgrid orgogliosamente parte della <A HREF=https://www.youtube.com/watch?v=paFgSwhHBeo>nube applicazione</A>";
        break;
    default: //English
        greeting = "Congratulations, Swisscom!";
        tagline  = "PLUMgrid proudly part of the <A HREF=https://www.youtube.com/watch?v=paFgSwhHBeo>application cloud</A>";
}
imageURL = "swisscomPG"+instance.toString()+".jpg";


var express = require('express'); //npm install express
var app = express();
app.set('view engine', 'ejs'); // set the view engine to ejs
// local images
app.use( express.static( "public" ) );

app.get('/', function (request, response) {
        console.log("Client",request.connection.remoteAddress, request.headers['user-agent']);
        console.log("Space",space);
        console.log("Instance",instance,"Route / (main)");
        response.render('pages/normal', {
                        space:    space,
                        instance: instance,
                        greeting: greeting,
                        tagline:  tagline,
                        imageURL: imageURL
                        });
        });

app.get('/about', function (request, response) {
        console.log("Client",request.connection.remoteAddress, request.headers['user-agent']);
        console.log("Space",space);
        console.log("Instance",instance,"Route /about");
        response.render('pages/normal', {
                        space:    space,
                        instance: instance,
                        greeting: 'Cheers!',
                        tagline:  'Ein Prosit der Gemütlichkeit',
                        imageURL: 'http://larrylang.net/images/LarryLangBeer.jpg'
                        });
        });

var server = app.listen(servPort, function () {
                        var host = server.address().address;
                        var port = server.address().port;
                        console.log('Server listening at http://%s:%s', host, port);
                        });