import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";


class App extends Component {
  state = {
    weather: '',
    location: ''
  };
  getLatLon = (zip) => {
    const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip},US&${googleKey}`
    fetch(googleUrl).then(res => res.json()).then(data => {
      let latAndLng = {
        latitude: data.results[0].geometry.location.lat,
        longitude: data.results[0].geometry.location.lng,
        city: data.results[0].address_components[1].long_name,
        region_code: data.results[0].address_components[3].short_name
      }
      this.setState({ location: latAndLng })
      return data;
    }).then(this.getWeatherData)
  }
  getLocationData = () => {
    const geoUrl = "https://freegeoip.net/json/";
    return fetch(geoUrl)
      .then(res => res.json())
      .then(geoData => {
        this.setState({ location: geoData });
        return geoData;
      })
  };
  getWeatherData = () => {
    const weatherUrl = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyKey}/${this.state.location.latitude},${this.state.location.longitude}`;
    return fetch(weatherUrl)
      .then(res => res.json())
      .then(weatherData => {
        this.setState({weather: weatherData})
      })
      .catch(err => err);
  };
  componentDidMount() {
    this.getLocationData().then(this.getWeatherData);
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <WeatherCard getLatLon={this.getLatLon} weatherData={this.state}/>
      </div>
    );
  }
}

export default App;