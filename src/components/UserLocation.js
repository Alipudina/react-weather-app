
import React, { Component } from 'react';

export default class UserLocation extends Component {

  render() {
    return(
      <div className="userLocationWeather">
      <h1>{this.props.userCity}</h1>
      <h1>{this.props.temperature}</h1>
      <h1>{this.props.minTemperature}</h1>
      <h1>{this.props.maxTemperature}</h1>
      <h1>{this.props.description}</h1>

      <div>
        <img className="icon" src={this.props.icon} alt="tasvir"/>
      </div>

      <div>
        <img className="icon" src={this.props.img} alt="tasvir"/>
      </div>
      </div>
    );
  }
}
