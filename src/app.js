const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

// Define Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup static directory to serve
app.use(express.static(publicDir));

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nadeem Ansari'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Nadeem Ansari'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nadeem Ansari',
        helpText: 'This is the help page.'
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'Address must be provided'
        });
    }
    geocode(req.query.location, (error, locationData) => {
        if (error) {
            return res.send({ error });
        }
        forecast(locationData, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                address: req.query.location,
                forecastData
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Article Not Found',
        errorMessage: 'Help article not found',
        name: 'Nadeem Ansari'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        errorMessage: 'Page Not Found',
        name: 'Nadeem Ansari'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});