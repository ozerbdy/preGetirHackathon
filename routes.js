const express = require('express'),
    Router = express.Router(),
    RecordController = require('./controllers/records');

Router.post('/searchRecord', RecordController.validateSeachRecordsRequest, RecordController.searchRecords);

module.exports = Router;


