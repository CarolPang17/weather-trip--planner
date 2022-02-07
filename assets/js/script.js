var input = document.querySelector(".input_text");
var button = document.querySelector(".submit");
var allForecast = document.querySelector(".all-forecast");
var LastCity;

button.addEventListener("click", function (name) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      input.value +
      "&appid=9c36604a485a9719bb7d668d09ea702e"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var currentCity = data.city.name;
      createHistory(currentCity);


      var LastCity = document.getElementById("allForecast");
      if(LastCity){
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
});

function createBox(temp, humidity, wingSpeed, i) {
  if (i === 0) {
    $(".todayWeatherContainer").append(`<div id="todayWeather" class="todayWeather"></div>`);
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
  } else if(i > 0) {


    $(".forecastContainer").append(`<div class="box box${i}"></div>`);

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

function createHistory(city) {
  console.log("history add:", city);

  $(".historySearch").append(
    `<div class=" city pastCity${city}">${city}</div>`
  );
}
