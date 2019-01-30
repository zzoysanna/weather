import React, {Component} from 'react';

class CityInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            autocomplete: [],
            selectedCity: '',
            selectedZip: '',
            selectedWeather: '',
            errorMessage: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addCity = this.addCity.bind(this);
        this.getSelectedWeather = this.getSelectedWeather.bind(this);
    }

    // при выборе города в автокомплите записываем название и zip в state, очищаем автокомплит
    changeCity(city) {
        this.setState({
            selectedCity: city.name,
            selectedZip: city.zip,
            value: city.name,
            autocomplete: []
        });
    }

    // добавляем карточку города
    addCity() {
        let isDuplicate = this.checkDuplicate(this.state.selectedZip);
        if (isDuplicate) {
            this.setState({
                errorMessage: 'Город уже добавлен',
                value: ''
            })
        } else if (this.state.selectedCity && this.state.selectedZip && this.state.selectedWeather) {
            this.addItem({
                name: this.state.selectedCity,
                zip: this.state.selectedZip,
                weather: this.state.selectedWeather
            });
            this.setState({
                value: '',
                selectedCity: '',
                selectedZip: '',
                selectedWeather: '',
                errorMessage: ''
            })
        }
    }

    addItem(data) {
        if(this.props && 'addItem' in this.props && typeof this.props.addItem === 'function') {
            this.props.addItem(data);
        }
    }

    // проверяем, есть ли город среди карточек
    checkDuplicate(zip) {
        let isDuplicate = false;
        const list = this.props.list;
        list.forEach(item => {
            if (item.zip === zip) {
                isDuplicate = true;
            }
        });
        return isDuplicate;
    }

    // отправляем запрос о погоде в городе, когда данные получены - добавляем карточку города в список
    getSelectedWeather() {
        if (this.state.selectedZip) {
            const URL = 'http://api.openweathermap.org/data/2.5/weather?q=' +
                this.state.selectedZip + '&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric';
            fetch(URL)
                .then(res => res.json())
                .then(json => {
                    let weatherData = {
                        wind: json.wind,
                        main: json.main,
                        icon: json.weather[0].icon
                    };
                    this.setState({selectedWeather: weatherData});
                })
                .then(() => this.addCity())
                .catch(error => {
                    console.log(error);
                    this.setState({
                        value: '',
                        errorMessage: 'Данные не найдены'
                    })
                });
        } else {
            this.setState({
                errorMessage: 'Город не выбран из списка'
            })
        }
    }

    // при вводе текста в инпут отправляем запрос, получаем автокомплит для городов
    handleInputChange(event) {
        let value = event.target.value;
        this.setState({
            value: value,
            errorMessage: ''
        });
        if (value.length >= 3 && value.match(/^\S\W/)) {
            // todo: find better geo api
            const url = 'http://kladr-api.ru/api.php?query=' + value + '&contentType=city&withParent=0&limit=10&typeCode=1';
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    let citiesList = json.result.map((item) => {
                        return {
                            'name': item.name,
                            'zip': item.zip
                        }
                    });
                    this.setState({autocomplete: citiesList});
                })
                .catch(error => console.log(error));
        }
    }

    render() {
        const autocomplete = this.state.autocomplete;
        return (
            <div className="city-input">
                <input
                    type="text"
                    onChange={this.handleInputChange}
                    value={this.state.value}
                />
                <button onClick={this.getSelectedWeather}>+</button>
                {(autocomplete.length > 0) && (
                    <ul>
                        {autocomplete.map((item, i) => (
                            <li key={i} onClick={() => this.changeCity(item)}>{item.name}</li>
                        ))}
                    </ul>
                )}
                {!!this.state.errorMessage && (<div className="city-warning">{this.state.errorMessage}</div>)}
            </div>
        );
    }
}

export default CityInput;
