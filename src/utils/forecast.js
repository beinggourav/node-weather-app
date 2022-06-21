const request = require('postman-request');

// Ex url = 'http://api.weatherstack.com/current?access_key=7b15841e90093215c86eff7db030f1cd&query=28.02994.8267,76.72045';
const access_key='7b15841e90093215c86eff7db030f1cd';
const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key='+access_key+'&query='+latitude+','+longitude;
    // json: true, parse automatically json data
    request({url: url, json: true},(error,response)=>{
        if(error){
            callback('Unable to connect with weather service, try again later.',undefined);
        }else if(response.body.error){
            callback('Unable to find location.', undefined);
        }else{
            const temperature = response.body.current.temperature;
            const feelslike = response.body.current.feelslike;
            const res = 'The temperature is '+temperature+ ' degree. It feelslike '+feelslike+' degree outside';
            callback(undefined, res);
        }
    });
};

module.exports = forecast;