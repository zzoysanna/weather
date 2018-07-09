import React, { Component } from 'react';

class CityFilter extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		value: this.props.temperature
  	}
  	this.onFilterChange = this.onFilterChange.bind(this);
  }	
  onFilterChange(event) {
  	const newValue = event.target.value;
  	this.setState({
  		value: newValue
  	})
  	this.props.setTemperature(newValue);
  }
  render() {    
    return (
      <div className="city-filter">
      	<p>Где сейчас теплее, чем</p>
      	<input 
	      	type="range" 
	      	max="40" 
	      	min="-40" 
	      	step="1"
	      	value={this.state.value}
	      	onChange={this.onFilterChange}
      	/>
      	<span>{this.state.value}°С</span>
      </div>
    );
  }
}

export default CityFilter;
