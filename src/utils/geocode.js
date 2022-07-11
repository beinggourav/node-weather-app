const request = require('postman-request');

// Ex url=http://api.positionstack.com/v1/forward?access_key=<access_key>&query=1600 Amphitheatre Parkway, Mountain View, CA
const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key='+process.env.POSITION_STACK_ACCESS_KEY+'&query='+address;
    request({url: url, json: true}, (error,response)=>{
        if(error){
            callback('Unable to connect to geocode service!', undefined);
        }else if(response.body.error || response.body.data.length===0){
            callback('Unable to find location.', undefined);
        }else{
            const data=response.body;
            callback(undefined, {
                latitude: data.data[0].latitude,
                longitude: data.data[0].longitude,
                label: data.data[0].label
            })
        }
    });
}

module.exports = geocode;