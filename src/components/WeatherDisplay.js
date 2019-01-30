import React, {Component} from 'react';

class WeatherDisplay extends Component {
    static convertToMMHG(hpa) {
        return Math.round(hpa * 0.75006375541921);
    }

    // удаляем карточку города
    deleteCity() {
        if (this.props && 'removeItem' in this.props && typeof this.props.removeItem === 'function') {
            this.props.removeItem({
                name: this.props.city,
                zip: this.props.zip,
                weather: this.props.weather
            })
        }
    }

    render() {
        const weatherData = this.props.weather;

        if (Object.keys(weatherData).length) {
            const iconUrl = 'http://openweathermap.org/img/w/' + weatherData.icon + '.png';
            const mainData = weatherData.main;
            const wind = weatherData.wind;
            return (
                <div className="city" style={{backgroundImage: `url(${iconUrl})`}}>
                    <button className="city-close" onClick={() => this.deleteCity()}>&times;</button>
                    <p className="city-name">{this.props.city}</p>
                    <p className="city-temperature">
                        {mainData.temp > 0 ? '+' : '-'}
                        {Math.round(mainData.temp)}°С
                    </p>
                    <p>Ветер: {wind.speed} м/с</p>
                    <p>Давление: {WeatherDisplay.convertToMMHG(mainData.pressure)} мм</p>
                </div>
            );
        } else {
            return (
                <div className="city">
                    <p className="city-name">{this.props.city}</p>
                    <p className="city-content">Данные не найдены</p>
                    <button className="city-close" onClick={() => this.deleteCity()}>&times;</button>
                </div>
            )
        }
    }
}

export default WeatherDisplay;
