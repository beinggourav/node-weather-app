const request = require('postman-request');

const key = 'a48eaa46c40224cd835c85cdf925f7bd';
// Ex url=http://api.positionstack.com/v1/forward?access_key=a48eaa46c40224cd835c85cdf925f7bd&query=1600 Amphitheatre Parkway, Mountain View, CA
const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key='+key+'&query='+address;
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