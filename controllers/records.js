const RecordsRepository = require('../db/RecordsRepository');


module.exports.searchRecords = function(req, res){
    const startDate =  new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const maxCount = req.body.maxCount;
    const minCount = req.body.minCount;

    RecordsRepository.getRecords(startDate, endDate, minCount, maxCount, (err, records) => {
        return res.send({
            success: !err,
            err: err,
            records: records
        });
    });
};