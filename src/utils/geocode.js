const request = require('postman-request');

const geocode = (address, callback) => {
  const apiKey = 'pk.eyJ1IjoibmV3YW5kcm9pZGZhbiIsImEiOiJjazByaXpubWQwNnl1M2NvN2N1aHpmbXhzIn0.Umf2hW4FEiCjGaJOKCzphA';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiKey}&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location services!', null);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', null);
    } else {
      callback(null, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  }
  );
};

module.exports = geocode;