import React, { Component } from "react";
import "./sass/main.css";
// import Weather from './components/Weather';
import Form from "./components/Form";
import WeatherContainer from "./components/WeatherContainer";
import AlertComponent from "./components/AlertComponent";

const authToken = "bd3be3a2a884168866b96b0f81237152";
// const url= `https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&APPID=${authToken}`;
// iconAddress: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
// fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${authToken}`)

class App extends Component {
  state = {
    city: undefined,
    citiesWeather: [],
    wrongCity: false,
  };

  // get weather #####################
  getWeather = async (ev) => {
    ev.preventDefault();

    try {
      const fetchWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=${authToken}`
      );
      const weatherData = await fetchWeather.json();
      // console.log(weatherData);
      // console.log(weatherData.sys.country);

      if (this.state.city) {
        // let url= await fetch(`https://restcountries.eu/rest/v2/alpha/${this.state.flag}`);
        let flagUrl = await fetch(
          `https://restcountries.eu/rest/v2/alpha/${weatherData.sys.country}`
        );
        let flagData = await flagUrl.json();

        const flagImageSrc = flagData.flag;
        const iconImageSrc = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

        const cityWeather = {
          id: this.state.citiesWeather.length + 1,
          liveTemperature: Math.round(weatherData.main.temp - 273),
          minTemperature: Math.round(weatherData.main.temp_min - 273),
          maxTemperature: Math.round(weatherData.main.temp_max - 273),
          flagImage: flagImageSrc,
          iconImage: iconImageSrc,
          cityName: weatherData.name,
        };

        console.log(cityWeather.id);

        this.setState({
          citiesWeather: [cityWeather, ...this.state.citiesWeather],
        });
      }
    } catch (e) {
      console.warn(e);
      this.setState({ wrongCity: true });
    }
  };

  // cityNameHandler ##################################
  cityNameHandler = (ev) => {
    const city = ev.target.value;
    this.setState({ city });
  };

  // handleWrongCity ################################
  handleWrongCity = () => {
    this.setState({ wrongCity: false });
  };

  render() {
    const { citiesWeather, wrongCity } = this.state;
    return (
      <div className="mainContainer" ref="mainContainer">
        <Form
          getWeather={this.getWeather}
          cityNameHandler={this.cityNameHandler}
        />

        {wrongCity && <AlertComponent onWrongCity={this.handleWrongCity} />}

        {citiesWeather.length > 0 &&
          citiesWeather.map((c) => {
            return (
              <WeatherContainer
                key={c.id}
                liveTemperature={c.liveTemperature}
                minTemperature={c.minTemperature}
                maxTemperature={c.maxTemperature}
                flagImage={c.flagImage}
                iconImage={c.iconImage}
                cityName={c.cityName}
              />
            );
          })}
      </div>
    );
  }
}

export default App;
