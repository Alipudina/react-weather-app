import React, { Component } from 'react';

export default class Form extends Component {

  render() {
    return(
      <div className="formContainer">
        <form className="form" onSubmit={this.props.getWeather}>
          <div className="form__title-container">
            <h2 className="form__title">Enter the City Name</h2>
          </div>

          <div className="form__group">
            <input type="text" name="city" placeholder="City Name" className="form__input" required id="name" onChange={this.props.cityNameHandler}/>
            <label htmlFor="name" className="form__label">City Name</label>
        </div>

        <div className="form__group-btn">
          <button type="submit" className="form__btn form__btn-white">Get weather &rarr;</button>
        </div>

        </form>
      </div>
    );
  }
}
