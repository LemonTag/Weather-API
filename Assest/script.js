let searchHistroy = []
//these are varaibles
//function is a piece of code to reused 
//function premater is data passed through the function
const weatherApiKey = "ffc2ddad50cd4e8e7e41a599af869618";
const citySearch = document.getElementById("searchInput")
const spySearch = document.getElementById("search")
const searchWeather = document.getElementById("searchWeather")
const searchForeCast = document.getElementById("searchForecast")





const formSubmitHandler = function (event) {
    console.log("testing")
    event.preventDefault();

    const city = citySearch.value.trim()
    if (city) {
        weatherSearch(city);
        foreCastSearch(city);
        // clears the search bar
        citySearch.value = ""
    }

    // if nothing was added the alert will pop up 
    else {
        alert("please enter city")
    }


}
const weatherSearch = function (city) {
    console.log("weathersearch")
    const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`
    // fetch API
    fetch(queryUrl)
        //we are going the run the function for the response
        .then(function (response) {
            // did we get a functional response
            if (response.ok) {
                cleardiv()
                response.json()
                    .then(function (data) {
                        console.log(data)
                        displayWeather(data)
                    })

            }

            //if the response was not ok its going to trigger the alter and the response will tell you wants wrong
            else {
                console.log(response)
                alert(`error: ${response.statusText}`)
            }

        })

}

const displayWeather = function (data) {
    const cityNameEl = document.createElement('h4')
    const tempNameEl = document.createElement('h5')
    const humidityEl = document.createElement('h5')
    const windNameEl = document.createElement('h5')

    cityNameEl.textContent = `${data.name}`
    tempNameEl.textContent = `${data.main.temp}`
    humidityEl.textContent = `${data.main.humidity}`
    windNameEl.textContent = `${data.wind.speed}`

    searchWeather.appendChild(cityNameEl)
    searchWeather.appendChild(tempNameEl)
    searchWeather.appendChild(humidityEl)
    searchWeather.appendChild(windNameEl)

}

const foreCastSearch = function (city) {
    const queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}`
    // fetch API
    fetch(queryUrl)
        //we are going the run the function for the response
        .then(function (response) {
            // did we get a functional response
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data)
                        displayforecast(data)
                    })

            }
            //if the response was not ok its going to trigger the alter and the response will tell you wants wrong
            else {
                console.log(response)
                alert(`error: ${response.statusText}`)
            }
        })
}


const displayforecast = function (data) {
    for (let i = 0; i <= 39; i += 8) {
        console.log(data);
        const card = document.createElement('div')
        const cityNameEl = document.createElement('p')
        const tempNameEl = document.createElement('p')
        const humidityEl = document.createElement('p')
        const windNameEl = document.createElement('p')

        cityNameEl.textContent = `${data.city.name}`
        tempNameEl.textContent = `${data.list[i].main.temp}`
        humidityEl.textContent = `${data.list[i].main.humidity}`
        windNameEl.textContent = `${data.list[i].wind.speed}`

        card.appendChild(cityNameEl)
        card.appendChild(tempNameEl)
        card.appendChild(humidityEl)
        card.appendChild(windNameEl)

        card.setAttribute("id" , "colorform")
        searchForeCast.appendChild(card)
    }
}



const cleardiv = function() {
    searchWeather.innerHTML = ""
    searchForecast.innerHTML = ""
}

//when I click the button it will used the formHandler
spySearch.addEventListener("click", formSubmitHandler)
console.log("clicker")

