const mongo = require('./mongo');

module.exports.getRecords = function(startDate, endDate, minCount, maxCount, callback){
    mongo.client.collection('records', (err, collection) => {
        if(err) throw err;
        const match = {
            $match: {
                $and: [
                    {createdAt: { $gt : startDate}},
                    {createdAt: { $lt : endDate}},
                ]
            }
        };

        const project = {
            $project: {
                _id: 0,
                key: 1,
                createdAt: 1,
                totalCount: { $sum: '$counts'}
            }
        };

        const secondMatch = {
            $match: {
                $and: [
                    {totalCount: { $gt : minCount}},
                    {totalCount: { $lt : maxCount}},
                ]
            }
        };

        collection.aggregate([match, project, secondMatch]).toArray(callback);
    });
};

