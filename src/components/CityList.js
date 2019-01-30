import React, {Component} from 'react';
import WeatherDisplay from './WeatherDisplay.js';

class CityList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateDate: ''
        }
    }
    componentWillMount() {
        this.updateWeatherInfo();
    }

    filterList() {
        return this.props.list.filter(item => {
            let weather = item.weather;
            return Object.keys(weather).length > 0 && weather.main.temp > this.props.temperature;
        });
    }

    updateWeatherInfo() {
        const weatherUrls = this.props.list.map(item => {
            const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' +
                item.zip + '&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric';
            return fetch(URL)
                .then(res => res.json())
                .then(json => {
                    return {
                        wind: json.wind,
                        main: json.main,
                        icon: json.weather[0].icon
                    };
                })
        });
        Promise.all(weatherUrls)
            .then(weather => {
                this.updateList(weather);
                let updateDate = new Date();
                this.setState({
                    updateDate: updateDate.toLocaleString("ru", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timezone: 'UTC',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'
                    })
                });
            })
            .catch(error => {
                console.log(error)
            });
    }
    updateList(weather) {
        if (this.props && 'updateList' in this.props && this.props.updateList === 'function') {
            this.props.updateList(weather);
        }
    }

    render() {
        const list = this.props.list;
        const filteredList = this.filterList();
        return (
            <div className="city-list">
                <p className="city-list_title">Количество городов в списке: {filteredList.length} из {list.length}</p>
                {filteredList.map((place, i) => (
                    <WeatherDisplay
                        key={i}
                        zip={place.zip}
                        city={place.name}
                        weather={place.weather}
                        removeItem={this.props.removeItem}
                    />
                ))}
                {!!list.length && (
                    <div>
                        <p className="city-list_update">
                            Дата последнего обновления данных о погоде: {this.state.updateDate}
                        </p>
                        <button className="city-list_btn" onClick={() => this.updateWeatherInfo()}>Обновить данные</button>
                    </div>
                )}

            </div>
        );
    }
}

export default CityList;
