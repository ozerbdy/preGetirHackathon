const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongo = require('./db/mongo'),
    routes = require('./routes');

const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(routes);

mongo.init((err) => {
    if(err) throw err;
    console.log('Mongo connection established successfully!');
    app.listen(port, () => console.log(`App listening on port ${port}!`));
});


