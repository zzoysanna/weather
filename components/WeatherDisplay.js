import React, { Component } from 'react';

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip + "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
    fetch(URL)
      .then(res => res.json())
      .then(json => {
        this.setState({ weatherData: json });
      });
  }
  convertToMMHG(hpa) {
    return Math.round(hpa * 0.75006375541921);
  }
  delete() {
    this.props.removeItem({
      name: this.props.city,
      zip: this.props.zip
    })
  }
  render() {
    const weatherData = this.state.weatherData;

    if (!weatherData) {
      return (
        <div className="city">
          <p className="city-name">{this.props.city}</p>
          <p className="city-content">Загружаем...</p>
          <button className="city-close">&times;</button>
        </div>
      )
    }
    if (!weatherData.weather) {
      return (
        <div className="city">
          <p className="city-name">{this.props.city}</p>
          <p className="city-content">Данные не найдены</p>
          <button className="city-close">&times;</button>
        </div>
      )  
    }
    if (!!weatherData) {
      const weather = weatherData.weather[0];
      const iconUrl = "http:/\/openweathermap.org/img/w/" + weather.icon + ".png";
      const mainData = weatherData.main;
      const wind = weatherData.wind;
      const temp = Math.round(mainData.temp);

      return (
        (temp > this.props.temperature) && (
          <div className="city" style={{backgroundImage: `url(${iconUrl})`}}>
            <button className="city-close" onClick={() => this.delete()}>&times;</button>
            <p className="city-name">{this.props.city}</p>
            <p className="city-temperature">
              {mainData.temp > 0 ? "+" : "-"}
              {Math.round(mainData.temp)}°С
            </p>
            <p>Ветер: {wind.speed} м/с</p>
            <p>Давление: {this.convertToMMHG(mainData.pressure)} мм</p>
          </div>
        )
      );
    }
  }
}

export default WeatherDisplay;
