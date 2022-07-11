const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast');

require('dotenv').config();
const app = express();
const port = process.env.PORT;

// setup static directory to serve
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// if we want customize name of views folder:
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// setting our view engine to express
app.set('view engine', 'hbs');

// now we have created index(special name) file in public folder and used it by express, so it will be served by default, so no use of below code
// app.get('',(req,res)=>{
//     // res.send('Hello Express!');
//     // send html
//     res.send('<h1>Home page</h1>');
// })

// delete index of public to render index.hbs view
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Gourav'
    });
})

// app.get('/help', (req,res)=>{
//     // res.send('Help page');
//     //send json
//     res.send({
//         name: 'Help page'
//     });
// })
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help page',
        name: 'Gourav'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404', {
        title: '404 Page',
        error: 'Help article not found.',
        name: 'Gourav'
    });
})

// app.get('/about', (req,res)=>{
//     // res.send('This is about page');
//     res.send('<h1>This is about page</h1>');
// })
app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Gourav'
    })
})
// demonstrate query strings
app.get('/products', (req,res)=>{
    // console.log(req.query);
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term in query!'
        })
    }
    // we cannot send two responses to browser so either use if else or use return above
    res.send({
        products: []
    })
})

app.get('/weather', (req,res)=>{
    // res.send('Weather page.');
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }
    const address = req.query.address;
    geocode(address, (error, data)=>{
        if(error){
            return res.send({ error });
        }
        forecast(data.latitude, data.longitude, (error, location, forecastData)=>{
            if(error){
                return res.send({ error });
            }
            res.send({
                'Entered address': address,
                location: data.label,
                forecast: forecastData
            })
        })
    })
    // res.send({
    //     forecast: 'Raining',
    //     address: req.query.address
    // });
})

// using currentLocation
app.get('/weatherbycoords', (req,res)=>{
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    forecast(latitude, longitude, (error, location, forecastData)=>{
        if(error){
            return res.send({ error });
        }
        res.send({
            location,
            forecast: forecastData
        })
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title: '404 Page',
        error: 'Page not found',
        name: 'Gourav'
    });
})

app.listen(port, ()=>{
    console.log('Server is running on '+port);
})
