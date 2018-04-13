import React from "react";
import Skycons from "react-skycons";
const icons = {
  "clear-day": "CLEAR_DAY",
  "clear-night": "CLEAR_NIGHT",
  "partly-cloudy-day": "PARTLY_CLOUDY_DAY",
  "partly-cloudy-night": "PARTLY_CLOUDY_NIGHT",
  cloudy: "CLOUDY",
  rain: "RAIN",
  sleet: "SLEET",
  snow: "SNOW",
  wind: "WIND",
  fog: "FOG"
};


class WeatherCard extends React.Component {
  state = {
    isHidden: true
  };
  addWeatherIcon = () => {
    let myIcon = icons[this.props.weatherData.weather.currently.icon];
    return <Skycons color="orange" icon={myIcon} />;
  };
  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };
  fetchGeoData = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.props.getLatLon(event.target.value);
      event.target.value = '';
      this.toggleHidden();
    }
  }
  locationInput = () => {
    return (
      <div className="row">
        <span className="input-span col s4 offset-s4">
          <input onKeyPress={this.fetchGeoData} placeholder="Enter Zip" id="city" type="text" className="validate" /><i className="material-icons md-48 md-light">keyboard_return</i>
        </span>
      </div>
      )
  }
  render() {
    return (
      <div>
        <section className="section no-pad-bot" id="index-banner">
          <div className="container weather">
            <br />
            <br />
            <div className="row center">
              <h5 className="header col s12 light light-blue-text text-lighten-1 thin">
                YOUR CURRENT LOCAL WEATHER IN
              </h5>
            </div>
            <h1 className="header center orange-text condensed light thin">
              {this.state.isHidden
                &&
                <span>
                  {this.props.weatherData.location.city},{" "}
                  {this.props.weatherData.location.region_code}
                </span>
              }
              {!this.state.isHidden && this.locationInput()}
              <span className="white-text bold">
                {this.state.isHidden
                  && <i onClick={this.toggleHidden} className="material-icons md-48 md-light">mode_edit</i>
                }
              </span>
            </h1>
            <br />
          </div>
        </section>
        <section className="container weather">
          <div className="row">
            <div className="col s12 m4 offset-m4">
              <div className="icon-block">
                {this.props.weatherData.weather && this.addWeatherIcon()}
                <h5 className="center thin condensed light-blue-text text-lighten-1">
                  {this.props.weatherData.weather && this.props.weatherData.weather.currently.summary}
                </h5>
                <h4 className="thin center light-blue-text text-lighten-1">
                  {this.props.weatherData.weather && Math.round(this.props.weatherData.weather.currently.temperature)}{" "}
                  &nbsp;&deg;&nbsp;F
                </h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default WeatherCard;
