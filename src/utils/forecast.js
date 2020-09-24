const request = require('postman-request');

const forecast = (location, callback) => {
    const apiKey = '9bfcd1a01a6ba027c3974ea718f0e17e';
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location.latitude},${location.longitude}&units=f`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', null);
        } else if (body.error) {
            callback('Unable to find location', null);
        } else {
            callback(null, `It is currently ${body.current.weather_descriptions[0]} with ${body.current.temperature} degress out in ${body.location.name}, ${body.location.region}, ${body.location.country}. There is a ${body.current.precip}% chance of rain.`);
        }
    });
}

module.exports = forecast;