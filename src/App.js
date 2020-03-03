
import React , { Component } from 'react';
import './css/App.css';
import Weather from './components/Weather';
import Form from './components/Form';
import UserLocation from './components/UserLocation';
import AskLocation from './components/AskLocation';


const authToken = 'bd3be3a2a884168866b96b0f81237152';
// const url= `https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&APPID=${authToken}`;
// iconAddress: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
// fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${authToken}`)

class App extends Component {

  state = {
    city: undefined
  }

 // deny location ###################
  locationDenied= ev => {
    ev.preventDefault();
    let formAsked= document.querySelector('.form-ask-container');
    formAsked.style.display= 'none';
  }

  // allow location ################
  locationAllowed = async ev => {
    ev.preventDefault();

    let formAsked= document.querySelector('.form-ask-container');
    formAsked.style.display= 'none';

        try {
          // getting location details
          let userLocationUrl= await fetch('http://ip-api.com/json/');
          let userLocationData= await userLocationUrl.json();
          let userLocationCity= userLocationData.city;
          // console.log(userLocationData);

            let flagUrl= await fetch(`https://restcountries.eu/rest/v2/alpha/${userLocationData.countryCode}`);
            let flagData= await flagUrl.json();
            // console.log(flagData);

          const userLocationWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userLocationCity}&APPID=${authToken}`);
          const userLocationWeatherData = await userLocationWeather.json();
          // console.log(userLocationWeatherData);

            let mainContainer= this.refs.mainContainer;
            let UserLocationContainer= document.createElement('DIV');
            let flagContainer= document.createElement('DIV');
            let iconContainer= document.createElement('DIV');
            let flagImage= document.createElement('IMG');
            let iconImage= document.createElement('IMG');
            let liveTemperature= document.createElement('H1');
            let cityName= document.createElement('H3');
            let minTemperature= document.createElement('P');
            let maxTemperature= document.createElement('P');
            UserLocationContainer.classList.add('mainContainer__userContainer');
            flagContainer.classList.add('mainContainer__flagContainer');
            iconContainer.classList.add('mainContainer__iconContainer');
            liveTemperature.classList.add('mainContainer__liveTemperature');
            cityName.classList.add('mainContainer__cityName');
            minTemperature.classList.add('mainContainer__minTemperature');
            maxTemperature.classList.add('mainContainer__maxTemperature');

            mainContainer.appendChild(UserLocationContainer);
            UserLocationContainer.appendChild(cityName);
            UserLocationContainer.appendChild(flagContainer);
            UserLocationContainer.appendChild(liveTemperature);

            UserLocationContainer.appendChild(minTemperature);
            UserLocationContainer.appendChild(iconContainer);
            iconContainer.appendChild(iconImage);
            UserLocationContainer.appendChild(maxTemperature);
            flagContainer.appendChild(flagImage);

            liveTemperature.innerHTML=`<b>${Math.round(userLocationWeatherData.main.temp-273)}</b> <sup>O</sup>C`;
            minTemperature.innerHTML=`<b>${Math.round(userLocationWeatherData.main.temp_min-273)}</b> <sup>O</sup>C`;
            maxTemperature.innerHTML=`<b>${Math.round(userLocationWeatherData.main.temp_max-273)}</b> <sup>O</sup>C`;
            flagImage.src= flagData.flag;
            iconImage.src= `http://openweathermap.org/img/w/${userLocationWeatherData.weather[0].icon}.png`;
            cityName.innerHTML=userLocationWeatherData.name;

        } catch(e) {
          console.warn(e);

        }
  }

// get weather #####################
  getWeather = async ev => {
    ev.preventDefault();
    const city = ev.target.city.value;
    // console.log(city);

    this.setState({})

    try {
      const fetchWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=${authToken}`);
      const weatherData = await fetchWeather.json();
      // console.log(weatherData);
      // console.log(weatherData.sys.country);

      if (this.state.city) {

          // let url= await fetch(`https://restcountries.eu/rest/v2/alpha/${this.state.flag}`);
          let flagUrl= await fetch(`https://restcountries.eu/rest/v2/alpha/${weatherData.sys.country}`);
          let flagData= await flagUrl.json();
          // console.log(weatherData);
          let mainContainer= this.refs.mainContainer;
          let UserLocationContainer= document.createElement('DIV');
          let flagContainer= document.createElement('DIV');
          let iconContainer= document.createElement('DIV');
          let flagImage= document.createElement('IMG');
          let iconImage= document.createElement('IMG');
          let liveTemperature= document.createElement('H1');
          let cityName= document.createElement('H3');
          let minTemperature= document.createElement('P');
          let maxTemperature= document.createElement('P');
          UserLocationContainer.classList.add('mainContainer__userContainer');
          flagContainer.classList.add('mainContainer__flagContainer');
          iconContainer.classList.add('mainContainer__iconContainer');
          liveTemperature.classList.add('mainContainer__liveTemperature');
          cityName.classList.add('mainContainer__cityName');
          minTemperature.classList.add('mainContainer__minTemperature');
          maxTemperature.classList.add('mainContainer__maxTemperature');

          mainContainer.appendChild(UserLocationContainer);
          UserLocationContainer.appendChild(cityName);
          UserLocationContainer.appendChild(flagContainer);
          UserLocationContainer.appendChild(liveTemperature);

          UserLocationContainer.appendChild(minTemperature);
          UserLocationContainer.appendChild(iconContainer);
          iconContainer.appendChild(iconImage);
          UserLocationContainer.appendChild(maxTemperature);
          flagContainer.appendChild(flagImage);

          liveTemperature.innerHTML=`<b>${Math.round(weatherData.main.temp-273)}</b> <sup>O</sup>C`;
          minTemperature.innerHTML=`<b>${Math.round(weatherData.main.temp_min-273)}</b> <sup>O</sup>C`;
          maxTemperature.innerHTML=`<b>${Math.round(weatherData.main.temp_max-273)}</b> <sup>O</sup>C`;
          flagImage.src= flagData.flag;
          iconImage.src= `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
          cityName.innerHTML=weatherData.name;


      } else {
        this.setState({
          temperature:undefined,
          city: undefined,
          description: undefined,
          error: 'Please enter City name!'
        });

      }

    } catch(e) {
      console.warn(e);
      this.setState({cityNameError: 'Please insert the city Name correctly!'})
    }
  }

// cityNameHandler ##################################
  cityNameHandler= ev => {
    // this.setState({
    //   error: undefined,
    //   cityNameError: undefined
    // })
    // let myInterval= () =>
    this.setState({city: ev.target.value});
    // ev.target.value.length= '0';
  }


  render() {
    return (
      <div className="mainContainer" ref="mainContainer">
        <Form
          getWeather={this.getWeather}
          cityNameHandler={this.cityNameHandler}
          />

        <AskLocation
          locationAllowed={this.locationAllowed}
          locationDenied={this.locationDenied}
          />

      </div>
    );
  }
}

export default App;

// {this.state.allowed && <UserLocation
//   userCity={this.state.userCity}
//   temperature={this.state.temperature}
//   minTemperature={this.state.minTemperature}
//   maxTemperature={this.state.maxTemperature}
//   country={this.state.country}
//   description={this.state.description}
//   icon={this.state.icon}
//   img={this.state.img}
//     />}
//
// <Weather
//   temperature={this.state.temperature}
//   city={this.state.city}
//   country={this.state.country}
//   description={this.state.description}
//   icon={this.state.icon}
//   error={this.state.error}
//   cityNameError={this.state.cityNameError}
//   />
