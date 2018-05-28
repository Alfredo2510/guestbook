var path = require("path");
var express = require("express");
var zipdb = require("forecastio");

var app = express();

//aqui va la llave
var weather = new Forecastio("533da4dd38341d8a17ff25274edfbbeb");

app.use(express.static(path.resolve(__dirname,"public")));
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("index");
});

app.get(/^\/(\d{5})$/, function(req,res,next){
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);
    if(!location,zip){
        next();
        return;
    }
    var latitude = location.latitude;
    var longitude = location.longitude;

    weather.forecast(latitude,longitude,function(en,data){
        if(en){
            next();
            return;
        }
        res.json({
            zipcode: zipcode,
            temperature: data.currently,temperature
        });
    });
} );
app.use(function(req,res){
    res.status(404).render("404");
});
app.listen(3000);
