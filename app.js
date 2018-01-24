const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongo = require('./db/mongo'),
    routes = require('./routes');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(routes);

app.get('/', (req, res) => res.send('Hello World!'));


mongo.init((err) => {
    if(err) throw err;
    console.log('Mongo connection established successfully!');
    app.listen(3000, () => console.log('Example app listening on port 3000!'));
});


