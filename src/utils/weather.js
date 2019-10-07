const request = require('request');
const color = require('chalk')
const geocode = require('./geocode');

var error = '';
var temperature = 0;
var windSpeed = 0;
var timezone = '';        
var rainProbability = 0;
var currentlySummary = '';
var dailySummary = '';    
var latitude = 0;
var longitude = 0;
var placeName = '';

var findByLocation = ( { latitude, longitude, customPlace }, callback) => {
    const url = 'https://api.darksky.net/forecast/1d438066941a54d711fb799a44b30655/' + 
                          latitude + ',' + longitude + 
                          '?lang=ru&units=si&exclude=hourly,monthly,alerts,flags';
    
    this.latitude = latitude;
    this.longitude = longitude;
    this.placeName = customPlace;        
                          
    request({ url, json: true}, (error, { body, statusCode, statusMessage }) => {
        if(error){
            return 'Unable to connect to location service\n' + error;
        } else if(body.error){
            return `Error when get weather ${statusCode}: "${statusMessage}" \nCheck URL: '${url}'`;
        } else { 
            this.timezone =           body.timezone;
            this.temperature =        body.currently.temperature;
            this.windSpeed =          body.currently.windSpeed;
            this.rainProbability =    Math.round(body.currently.precipProbability*100);
            this.currentlySummary =   body.currently.summary;
            this.dailySummary =       body.daily.summary;
            callback(undefined, this);
        }
    });
};

const findByPlace = function(customPlace, callback) {
    geocode(customPlace, (error, { longitude, latitude, placeName } = {}) => {
        if(error){
            callback(error, undefined);
        } 
            
        this.findByLocation({ longitude, latitude, placeName }, (error, weather) => {
            if(error){
                callback(error, undefined);
            } 
             
            callback(undefined, weather);
            
        });
    });
}

module.exports = {
    findByLocation: findByLocation,
    findByPlace: findByPlace,
    temperature,
    windSpeed,
    timezone,  
    rainProbability, 
    currentlySummary,
    dailySummary,
    latitude,
    longitude,
    placeName
}
