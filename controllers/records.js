const RecordsRepository = require('../db/RecordsRepository'),
    ResponseHelpers = require('../helpers/responseHelpers'),
    Constants = require('../constants/constants'),
    Joi = require('joi');

function getResponseModel(responseStatusObject, records){
    responseStatusObject.records = records || [];
    return responseStatusObject;
}

module.exports.validateSeachRecordsRequest = function(req, res, next) {
    const searchRecordsRequestSchema = {
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().required(),
        minCount: Joi.number().integer().required(),
        maxCount: Joi.number().integer().required(),
    };
    const result = Joi.validate(req.body, searchRecordsRequestSchema, {
        allowUnknown: true,
        // return all errors a payload contains, not just the first one Joi finds
        abortEarly: false
    });
    if(result.error){
        const basicResponseObject = ResponseHelpers.getBasicResponseObject(Constants.ErrorInfo.RequestBodyValidationFailed, result.error.toString());
        const finalResponseObject = getResponseModel(basicResponseObject);
        return res.status(400).send(finalResponseObject);
    }else{
        return next();
    }
};

module.exports.searchRecords = function(req, res){
    const startDate =  new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const maxCount = req.body.maxCount;
    const minCount = req.body.minCount;

    RecordsRepository.getRecords(startDate, endDate, minCount, maxCount, (err, records) => {
        if (err) return res.send(getResponseModel(ResponseHelpers.getBasicResponseObject(Constants.ErrorInfo.MongoError)));

        const basicResponseObject = ResponseHelpers.getBasicResponseObject(Constants.SuccessInfo);
        const finalResponseObject = getResponseModel(basicResponseObject, records);
        return res.send(finalResponseObject);
    });
};