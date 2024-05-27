var apiKey="c4f281eb19c7ac7ac64ab55e16d2f4b5"
var dashboardEl=document.getElementById("dashboard")

function getCurrentWeather(cityName){
    var url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`

    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)

        dashboardEl.innerHTML=`<h3>${data.name} (${dayjs.unix(data.dt).format("MM/DD/YYYY")}) <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt=""></h3>
        <p>Temperature: 85 F</p>
        <p>Wind: 7.7 MPH</p>
        <p>Humidity: 51%</p>`
    })
}

function fiveDayForecast(cityName){
    var url=`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`

    fetch(url)
    .then(function(response){
        return response.json
    })
    .then(function(data){
        console.log(data)

        for(var i=3; i<data.list.length; i=i+8){
            var fiveDayArray=data.list
            console.log(fiveDayArray[i])

        }
    })
}

getCurrentWeather('Miami')
fiveDayForecast('Miami')