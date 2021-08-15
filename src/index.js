const express = require('express');
require('dotenv').config();
const APP_PORT = process.env.PORT || 5500;
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// use static file
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {

    });
})


app.get('/weather', (req, res) => {

    const address = req.query?.address ?? '';

    if (address === '') {
        res.send({ error: 'You must provide an address.' });
    }

    geocode(address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }

        forecast(lat, long, true, (error, data) => {
            if (error) {
                return res.send({
                    error: error
                });
            }

            const { temp, main, main_desc, icon, url_icon } = data;
            res.send({ temp, main, main_desc, icon, url_icon, location });
        })

    })

})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
    })
})

app.get('*', (req, res) => {
    res.send('<h1>Error page</h1>')
})

app.listen(APP_PORT, () => {
    console.log(`Server is up on port ${APP_PORT}`);
})