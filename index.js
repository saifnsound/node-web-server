const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port= process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log("Couldn't update log file");
        }
    });
    next();
});

app.use((req,res,next) => {
    res.render('maintenance');
})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    // res.send('Hello Express!');
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome Home!!'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Something went wrong'
    });
});

app.listen(port, () => {
    console.log('Server is running on port:', port);
});