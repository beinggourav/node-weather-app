const request = require('postman-request');

// Ex url = 'http://api.weatherstack.com/current?access_key=<access_key>&query=28.02994.8267,76.72045';
const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key='+process.env.WEATHER_STACK_ACCESS_KEY+'&query='+latitude+','+longitude;
    // json: true, parse automatically json data
    request({url: url, json: true},(error,response)=>{
        if(error){
            callback('Unable to connect with weather service, try again later.',undefined);
        }else if(response.body.error){
            callback('Unable to find location.', undefined);
        }else{
            const location = response.body.location.name + ', ' + response.body.location.region + ', ' + response.body.location.country;
            const description = response.body.current.weather_descriptions[0];
            const temperature = response.body.current.temperature;
            const feelslike = response.body.current.feelslike;
            const humidity = response.body.current.humidity;
            const cloudcover = response.body.current.cloudcover;
            const res = description+'. The temperature is '+temperature+ ' degree. It feelslike '+feelslike+' degree outside. Humidity(%) is '+humidity+'. Cloud cover percentage is '+cloudcover+'.';
            callback(undefined, location, res);
        }
    });
};

module.exports = forecast;