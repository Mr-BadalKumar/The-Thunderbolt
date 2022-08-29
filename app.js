const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const alert = require('alert');

const app = express();
let validchk = 1;
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));
const appid = "e692a17fd0812e04773dd18933da7f52";
const unit = "metric";
app.set('view engine', 'ejs');
let city = "bhubaneswar";

app.get("/", function(req, res) {

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid + "&units=" + unit;
    https.get(url, function(response) {
        console.log(response.statusCode);
        if (response.statusCode != 200) {
            city = "bhubaneswar";
            res.redirect('/error.html');
        } else {
            response.on("data", function(data) {
                const wdt = JSON.parse(data);

                res.render("data", {
                    temp: wdt.main.temp,
                    humidity: wdt.main.humidity,
                    windspeed: wdt.wind.speed,
                    nameofcity: wdt.name,
                    description: wdt.weather[0].description,
                    visibility: wdt.visibility,
                    clouds: wdt.clouds.all,
                    timeof: new Date(wdt.dt * 1000 + (wdt.timezone * 1000))



                });
            });
        }
    });


});

app.post("/", function(req, res) {
    city = req.body.location;
    res.redirect("/");

});

app.get("/Delhi", function(req, res) {
    city = "Delhi";
    res.redirect("/");

});

app.get("/Hyderabad", function(req, res) {
    city = "Hyderabad";
    res.redirect("/");

});

app.get("/Mumbai", function(req, res) {
    city = "Mumbai";
    res.redirect("/");

});

app.get("/Bengaluru", function(req, res) {
    city = "Bengaluru";
    res.redirect("/");

});



app.listen(3000, function() {
    console.log("server starts at 3000");
});