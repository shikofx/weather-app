const request = require('request');
const color = require('chalk');

const geocode = (place, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
                        encodeURIComponent(place) +
                        '.json?access_token=pk.eyJ1Ijoic2hpa29meCIsImEiOiJjazBwY3k1dzcwaWl2M2xtbGFsYWJ1YW83In0.0nXU-pkK8ZRHe3XaurH0KA&limit=1';
    request({ url, json: true }, (error, { body, statusCode, statusMessage }) => {
        if(error){
            callback('Unable to connect to location service\n' + error);
        } else if(statusCode !== 200){
            callback(`Error when find location "${place}": ${statusCode}: "${statusMessage}"`);
        } else if(body.features.length === 0){
            callback(`Unable place: "${place}". Try please search with other place`)
        } else {
            callback(undefined, {
                placeName: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            });
        }
        
    });
};    

module.exports = geocode;