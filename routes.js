const express = require('express'),
    Router = express.Router(),
    RecordController = require('./controllers/records');

Router.post('/searchRecord', RecordController.searchRecords);

module.exports = Router;


