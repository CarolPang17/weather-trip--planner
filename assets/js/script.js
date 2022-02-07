var input = document.querySelector(".input_text");
var button = document.querySelector(".submit");
// var historyCitybutton = document.querySelector(".submit");
var allForecast = document.querySelector(".all-forecast");
var LastCity;
var totalNumOfCitySearchLastTime = localStorage.getItem(`numberOfCitySearch`);

button.addEventListener("click", function (name) {
  printWeatherReport();
});

function printWeatherReport(inputCity){
  var inputCity;
  if(!inputCity){
    console.log(`this is the first search`)
    inputCity = input.value;
    console.log(`now inputCity become ${inputCity}`)
  }

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    inputCity +
      "&appid=9c36604a485a9719bb7d668d09ea702e"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var currentCity = data.city.name;
      saveTolocalStorage(currentCity);

      var LastCity = document.getElementById("allForecast");
      if (LastCity) {
        LastCity.remove();
      }

      $("#innerContainer2").append(
        `<div id="allForecast" class="allForecast"></div>`
      );

      $(".allForecast").append(
        `<div id="todayWeatherContainer" class="todayWeatherContainer"></div>`
      );
      $(".allForecast").append(
        `<div id="forecastContainer" class="forecastContainer"></div>`
      );

      for (var i = 0; i < 6; i++) {
        var currentTemp = data.list[i].main.temp;
        var currentHumidity = data.list[i].main.humidity;
        var currentWingSpeed = data.list[i].wind.speed;
        createBox(currentTemp, currentHumidity, currentWingSpeed, i);
      }
    })

    .catch((err) => alert("trying wrong"));

    keepUpdate()

}

function createBox(temp, humidity, wingSpeed, i) {
  var day = new Date();

  var nextDay = new Date(day);
  nextDay.setDate(day.getDate() + i);
  if (i === 0) {
    $(".todayWeatherContainer").append(
      `<div id="todayWeather" class="todayWeather"></div>`
    );

    $(`.todayWeather`).append(`<div class =" ">${day}</div>`);

    $(`.todayWeather`).append(
      `<div  class =" day${i}after ">Today Weather</div>`
    );

    $(`.todayWeather`).append(
      `<div id="temp${i}" class =" temp ">currentTemp ${temp}</div>`
    );

    $(`.todayWeather`).append(
      `<div id="humidity${i}" class =" humidity ">currentHumidity ${humidity}</div>`
    );

    $(`.todayWeather`).append(
      `<div id="speed${i}" class =" speed ">currentWingSpeed ${wingSpeed}</div>`
    );
  } else if (i > 0) {
    $(".forecastContainer").append(`<div class="box box${i}"></div>`);
    $(`.box${i}`).append(`<div class =" ">${nextDay}</div>`);

    $(`.box${i}`).append(`<div  class =" day${i}after ">${i} day after</div>`);

    $(`.box${i}`).append(
      `<div id="temp${i}" class =" temp ">currentTemp ${temp}</div>`
    );

    $(`.box${i}`).append(
      `<div id="humidity${i}" class =" humidity ">currentHumidity ${humidity}</div>`
    );

    $(`.box${i}`).append(
      `<div id="speed${i}" class =" speed ">currentWingSpeed ${wingSpeed}</div>`
    );
  }
}

/////////////local storage below///////////


function saveTolocalStorage(currentCity) {
  var totalNumOfCitySearch = localStorage.getItem(`numberOfCitySearch`);
  var addUp;
  if (!totalNumOfCitySearch) {
    addUp = 1;
    localStorage.setItem(`numberOfCitySearch`, 1);
  } else {
    addUp = Number(totalNumOfCitySearch);
    addUp = addUp + 1;

    if (addUp > 10) {
      addUp = 10;
    }

    localStorage.setItem(`numberOfCitySearch`, addUp);
  }

  localStorage.setItem(`saveCity${addUp}`, currentCity);
  printTheHistory(addUp);
}

historyCitybuttonHolder = {};
fs = {};

function printTheHistory(totalNumOfCitySearchByNow) {
  var LastSearch = document.getElementById("historySearchContainer");
  if (LastSearch) {
    LastSearch.remove();
  }

  $(".historySearch").append('<div id="historySearchContainer" ></div>');

  for (var i = 1; i <= totalNumOfCitySearchByNow; i++) {
    var printByOrder = localStorage.getItem(`saveCity${i}`);
    $("#historySearchContainer").append(
      `<div id="city${i}" class=" city pastCity${printByOrder}">${printByOrder}</div>`
    );
  }

}

printTheHistory(totalNumOfCitySearchLastTime);

function keepUpdate(){
  for(var i = 1; i <= totalNumOfCitySearchLastTime; i++){
    historyCitybuttonHolder[i] = document.querySelector(`#city${i}`);
    addEvent(i)
    document.getElementById(`city${i}`).addEventListener("click", fs[i]);
    }
}

function addEvent(i){
  fs[i] = function(){
    var getCityName = localStorage.getItem(`saveCity${i}`);
    console.log(`hi now i am reading ${getCityName}`)
  }
}

keepUpdate()