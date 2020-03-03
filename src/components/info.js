state = {
  temperature: undefined,
  minTemperature: undefined,
  maxTemperature: undefined,
  userCity: undefined,
  city: undefined,
  description: undefined,
  icon: undefined,
  error: undefined,
  cityNameError: undefined,
  flag: undefined,
  img: undefined,
  mainImg: undefined,
}

// ########################
let getData = async () => {
  let url= await fetch(`http://api.ipstack.com/check?access_key=e0ccd25ac5f01dbab301437e3a40cddd`);
  let data= await url.json();
  console.log(data);
  console.log(`country: ${data.country_name}`);
  console.log(`city: ${data.city}`);
  console.log(`flag: ${data.location.country_flag}`);
  let gallery= document.querySelector('.gallery');
  let image= document.querySelector('.gallery__img');
  image.src= data.location.country_flag;

}
getData();
// #####################################################

let container= document.querySelector('#container');
let input= document.querySelector('input');
let form= document.querySelector('form');

const colorTemperatures = [
  {limitTemp: 40, color: 'red'},
  {limitTemp: 35, color: 'orange'},
  {limitTemp: 30, color: 'yellow'},
  {limitTemp: 20, color: 'deepskyblue'},
  {limitTemp: 10, color: 'purple'},
  {limitTemp: 0, color: 'grey'},
  {limitTemp: -100, color: 'white'}
];

let makeAllRequestsSimultaneously = collectionOfCities => {
  let allCitiesPromises = [];
  for (city of collectionOfCities) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${authToken}`

    let promiseCity= fetch(url)
      .then(response => response.json());

    allCitiesPromises.push(promiseCity);
  }
  return Promise.all(allCitiesPromises);
}

let getWeatherForCity = async function(ev) {
  ev.preventDefault();
  // let cities = $('input').val().split('-');
  let cities = input.value.split('-');
  let intervalCounter = 0;

  try {
    let weatherData = await makeAllRequestsSimultaneously(cities);

    let citiesInterval = setInterval(() => {
      if (intervalCounter === weatherData.length - 1) {
        clearInterval(citiesInterval);
      }
      let section = document.createElement('SECTION');
      let heading = document.createElement('H3');
      let tempParagraph = document.createElement('P');
      let desc = document.createElement('SPAN');
      let littleImage = document.createElement('IMG');
      let footer = document.createElement('FOOTER');
      let tempInCelsius = Math.round(weatherData[intervalCounter].main.temp - 273);
      let color = colorTemperatures.find(entry => tempInCelsius > entry.limitTemp).color;
      heading.innerText = weatherData[intervalCounter].name;
      tempParagraph.innerHTML = `<b>${tempInCelsius}</b> <sup>O</sup>C`;
      desc.innerText = weatherData[intervalCounter].weather[0].description;
      littleImage.src = `http://openweathermap.org/img/w/${weatherData[intervalCounter].weather[0].icon}.png`;
      footer.append(desc, littleImage);
      section.append(heading, tempParagraph, footer);
      section.style.background = color;
      // $('#container').append(section);
      // $('section').animate({opacity: '1'}, 500);
      // $('input').val('');

      container.append(section);
      section.style.opacity='1';


      input.value='';


      intervalCounter++;
    }, 350)
  }catch(e) {
    console.warn(e);
  }
}

form.addEventListener('submit', getWeatherForCity);

// $(document).ready(ev => {
//   $('form').submit(getWeatherForCity);
// })

// */}
