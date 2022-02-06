
var input = document.querySelector('.input_text');

var button= document.querySelector('.submit');

button.addEventListener('click', function(name){
fetch('https://api.openweathermap.org/data/2.5/forecast?q='+input.value+'&appid=9c36604a485a9719bb7d668d09ea702e')
.then(response => response.json())
.then(data => {
  console.log('below is data ')
  console.log(data)

  for(var i = 0 ; i < 6 ; i++){
    console.log(`${i} data `,data.list[i]);
    console.log(`${i} temp`,data.list[i].main.temp);
    console.log(`${i} humidity`,data.list[i].main.humidity);
    console.log(`${i} wind`,data.list[i].wind.speed);
  }

})

.catch(err => alert("trying wrong"));
})