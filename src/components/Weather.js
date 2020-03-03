
import React, { Component } from 'react';

export default class Weather extends Component {

  render() {
    return(
      <div>
        {this.props.city && <p>Location: {this.props.city}, {this.props.country}</p>}
        {this.props.temperature && <p>temperature: {this.props.temperature}</p>}
        {this.props.description && <p>description: {this.props.description}</p>}
        {this.props.error && <p>{this.props.error}</p>}
        {this.props.cityNameError && <p>{this.props.cityNameError}</p>}

      </div>
    );
  }
}
