
import AskLocation from './components/AskLocation';


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


<AskLocation
  locationAllowed={this.locationAllowed}
  locationDenied={this.locationDenied}
  />
