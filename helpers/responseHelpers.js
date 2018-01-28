module.exports.getBasicResponseObject = function(ResponseType, extraMessage){
    let response = {
        code: ResponseType.code,
        msg: ResponseType.message
    };
    if (extraMessage) response.msg += '; ' + extraMessage;
    return response;
};