
import React, { Component } from 'react';

export default class AskLocation extends Component {

  render() {
    return(
        <div className="form-ask-container">
        <form className="form-ask">
            <h2 className="form-ask__title">Weather App wants to access your location?</h2>

            <button type="submit" className="form-ask__btn" onClick={this.props.locationAllowed}>allow</button>

            <button type="submit" className="form-ask__btn" onClick={this.props.locationDenied}>deny</button>

        </form>
        </div>
    );
  }
}
