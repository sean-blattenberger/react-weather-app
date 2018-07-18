import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
const darkSkyKey = "3795f4e1a5a7d96d565aa6d6daf77fe3";
const googleKey = "AIzaSyDd6kGOzoEZL2gagZAu4Hmm7mpawEJ4Km8";
const geoData ={
  city: "Denver",
  continent_code: "NA",
  continent_name: "North America",
  country_code: "US",
  country_name: "United States",
  ip: "71.229.191.118",
  latitude: 39.7388,
  longitude: -104.4083,
  region_code: "CO",
  region_name: "Colorado",
  type: "ipv4",
  zip: "80238"
}

const AboutModal = () => {
  return (
    <div id="modal1" className="modal">
      <div className="modal-content">
        <h4>About</h4>
        <p>This is a weather app that uses a geolocation api, Google's geo API, and and the Darksky api to retrieve a user's weather based on their location or input. The app is built using HTML, CSS, and ReactJS with end-to-end testing using Cypress.</p>
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Close</a>
      </div>
    </div>
  )
};

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
  // getLocationData = () => {
  //   const geoUrl = "http://api.ipstack.com/check?access_key=d6ac8bb245a7f52824fe950cf3e6f714";
  //   return fetch(geoUrl)
  //     .then(res => res.json())
  //     .then(geoData => {
  //       console.log(geoData);
  //       this.setState({ location: geoData });
  //       return geoData;
  //     })
  // };
  setGeo = () => {
    this.setState({ location: geoData });
    Promise.resolve();
  }
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
    new Promise(((resolve) => {
      this.setState({ location: geoData });
      resolve()
    })).then(this.getWeatherData)
    // this.getLocationData().then(this.getWeatherData);
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <WeatherCard getLatLon={this.getLatLon} weatherData={this.state} />
        <AboutModal/>
      </div>
    );
  }
}

export default App;