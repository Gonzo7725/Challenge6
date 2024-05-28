var apiKey="c4f281eb19c7ac7ac64ab55e16d2f4b5"
var dashboardEl=document.getElementById("dashboard")
var fiveDayEl=document.getElementById("five-day-forecast")
var searchInputEl=document.getElementById("search-input")
var searchBtnEl=document.getElementById("search-btn")
var historyBtnEl=document.getElementById("history-btn")
var historyArr=JSON.parse(localStorage.getItem("history")) || []

displayHistory()

function displayHistory(){
    historyBtnEl.innerHTML=""
    for(var i = 0; i < historyArr.length; i++){
        historyBtnEl.innerHTML=historyBtnEl.innerHTML+`<button type="button" class="btn bg-secondary w-100 mx-2 my-1">${historyArr[i]}</button>`
    }
}

function populateData(event){
    var currentButton=event.target
    var cityName=currentButton.textContent
    getCurrentWeather(cityName)
    fiveDayForecast(cityName)
}

historyBtnEl.addEventListener("click", populateData)

function getCurrentWeather(cityName){
    var url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`

    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)

        if(historyArr.includes(data.name)===false){
            historyArr.push(data.name)

            localStorage.setItem("history", JSON.stringify(historyArr))
            displayHistory()
        }

        dashboardEl.innerHTML=`<h3>${data.name} (${dayjs.unix(data.dt).format("MM/DD/YYYY")}) <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt=""></h3>
        <p>Temperature: ${data.main.temp} F</p>
        <p>Wind: ${data.wind.speed} MPH</p>
        <p>Humidity: ${data.main.humidity}%</p>`
    })
}

function fiveDayForecast(cityName){
    var url=`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`

    fetch(url)
    .then(function(response){
        return response.json
    })
    .then(function(data){
        console.log(data)
        fiveDayEl.textContent=""

        for(var i = 3; i < data.list.length; i=i+8){

            var fiveDayArray=data.list
            console.log(fiveDayArray[i])
            
            var divCol=document.createElement("div")
            divCol.classList="col-sm-2 mb-3 mb-sm-0"

            var divCard=document.createElement("div")
            divCard.classList="card"

            var divBody=document.createElement("div")
            divBody.classList="card-body"

            var h5=document.createElement("h5")
            h5.classList="card-title"
            h5.textContent=dayjs.unix(fiveDayArray[i].dt).format("MM/DD/YYYY")
            divBody.appendChild(h5)

            var img=document.createElement("img")
            img.src="https://openweathermap.org/img/wn/"+fiveDayArray[i].weather[0].icon+"@2x.png"
            divBody.appendChild(img)

            var pTemp=document.createElement("p")
            pTemp.classList="card-text"
            pTemp.textContent=" temp: "+fiveDayArray[i].main.temp
            divBody.appendChild(pTemp)

            var pWind=document.createElement("p")
            pWind.classList="card-text"
            pWind.textContent=" wind: "+fiveDayArray[i].wind.speed
            divBody.appendChild(pWind)

            var pHumidity=document.createElement("p")
            pHumidity.classList="card-text"
            pHumidity.textContent=" humidity: "+fiveDayArray[i].main.humidity
            divBody.appendChild(pHumidity)

            divCard.appendChild(divBody)
            divCol.appendChild(divCard)

            fiveDayEl.appendChild(divCol)


        }
    })
}



function search(){
    var cityName=searchInputEl.value.trim()
    if(cityName){
        getCurrentWeather(cityName)
        fiveDayForecast(cityName)
    }else{
        alert("Please enter the name of a city.")
    }
    
}

searchBtnEl.addEventListener("click", search)

displayHistory()