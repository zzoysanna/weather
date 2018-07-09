import React, { Component } from 'react';
import WeatherDisplay from'./WeatherDisplay.js';

class CityList extends Component {
  render() {
    const list = this.props.list;
    return (
      <div className="city-list">
        {list.map((place, i) => (
          <WeatherDisplay 
            zip={place.zip} 
            city={place.name}
            removeItem={this.props.removeItem}
            temperature={this.props.temperature}
          />
        ))}
      </div>  
    );
  }
}

export default CityList;
