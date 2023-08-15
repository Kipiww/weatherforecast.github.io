//DOM VARIABLES
const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById('input');
var error = document.getElementById('error');
var temperature = document.getElementById('temp');
var weather = document.getElementById('weather');
var windspeed = document.getElementById('windspeed');
var humidity = document.getElementById('humidity');
var newInfo = document.getElementById('info');


var api = {

     api_key : '0c09b947de47a5f9bc0e03d026b10629',
     myApi :`https://api.openweathermap.org/data/2.5/weather?`,

}

//click button
searchBtn.addEventListener('click',() => {
    
    const cityName = input.value.trim();

    if (!cityName){
        alert('Please enter a city name');
        window.onload();
    }
   
    else{
        fetchWeather(cityName);

    }

    

});

const fetchWeather = (city) => {
    fetch(api.myApi +`q=${city }` + `&appid=${api.api_key}`).then(response => response.json()).then(data => {
        console.log(data);
        //weather api variables
            const api_temperature  = data.main.temp;
            const api_humidity = data.main.humidity;
            const api_windspeed = data.wind.speed;
            const api_weather = data.weather[0].main;
       //embedding to the DOM
            temperature.innerText = Math.round(toCelcius(api_temperature));
            humidity.innerText = api_humidity;
            windspeed.innerText = api_windspeed;

       // WEATHER DOM MANIPULATION
        
            const checkWeather = () => {

             //possible outcome
                if(api_weather === 'Clouds'){
                    weather.className = 'fa-solid fa-cloud';
                    newInfo.innerText = 'Cloudy';
                }
                else if(api_weather === 'Clear'){
                    weather.className = 'fa-solid fa-sun';
                    newInfo.innerText = 'Sunny';
                }
                else if(api_weather === 'Rain'){
                    weather.className = 'fa-solid fa-cloud-rain';
                    newInfo.innerText = 'Rainy';
                }
            }
            checkWeather();
        
        

    }).catch(error => {
            console.error('Fetch error:', error);
            alert(`${input.value} is not a city`);
            input.value = '';
    })
}
const toCelcius = (kelvin) => {
    const minus = 273.15;
    return kelvin - minus;
}
    





