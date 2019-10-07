
const weatherForm = document.querySelector('form');

const search = weatherForm.querySelector('input');

const plaseName = document.querySelector('#placeName');
const latitude = document.querySelector('#latitude');
const longitude = document.querySelector('#longitude');
const dailySummary = document.querySelector('#dailySummary');
const currentSummary = document.querySelector('#currentSummary');
const rainProbability = document.querySelector('#rain');
const temperature = document.querySelector('#temperature');
const wind = document.querySelector('#wind');
const errorIcon = document.querySelector("#errorIcon");
const errorMessage = document.querySelector("#errorMessage");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    errorIcon.innerHTML = '';                  
    errorMessage.textContent = '';
    plaseName.textContent = '';
    latitude.textContent = '';   
    longitude.textContent = '';  
    dailySummary.textContent = '';
    currentSummary.innerHTML = '<H3>Loading data ....... </H3>';
    rainProbability.innerHTML = '';
    temperature.innerHTML = '';
    wind.innerHTML = '';
    const location = search.value;
    if(!location){
        currentSummary.innerHTML = '';
        errorMessage.textContent = 'Input your location to find the weather'
    } else {
        fetch(`/weather?place=${location}`).then((responce) => {
                responce.json().then((data) => {
                    
                    if(data.message){
                        currentSummary.innerHTML = '';
                        errorIcon.innerHTML = `<img src="/img/icon-error.png" class="about">`;
                        errorMessage.textContent = data.message;
                    } else {
                        plaseName.textContent = `Ищем погоду в ${data.weather.timezone}`;
                        latitude.textContent = `    ${data.weather.latitude} северной широты`;
                        longitude.textContent = `    ${data.weather.longitude} восточной долготы`;
                        dailySummary.textContent = `${data.weather.dailySummary}`;
                        currentSummary.innerHTML = `Сегодня <b><i>${Date()}</i></b><p>${data.weather.currentlySummary}</p>`;
                        rainProbability.innerHTML = `Вероятность осадков: <b><i>${data.weather.rainProbability}%</i></b>`;
                        temperature.innerHTML = `Температура воздуха: <b><i>${data.weather.temperature}<sup>o</sup></i></b> по Цельсию`;
                        wind.innerHTML = `Скорость ветра: <b><i>${data.weather.windSpeed}</i></b> км/ч`;
                    }
                });
        });
    }
})