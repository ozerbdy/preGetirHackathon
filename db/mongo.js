const mongo = require('mongodb');

function init(callback){
    const url = 'mongodb://dbUser:dbPassword@ds155428.mlab.com:55428/getir-bitaksi-hackathon';
    const options = {
        autoReconnect: true
    };
    mongo.connect(url, options, (err, client) => {
        module.exports.client = client.db('getir-bitaksi-hackathon');
        return callback(err);
    });
}

module.exports.init = init;
