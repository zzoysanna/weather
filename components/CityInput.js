import React, { Component } from 'react';

class CityInput extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		value: '',
  		list: [],
  		selected: {}
  	}
  	this.handleInputChange = this.handleInputChange.bind(this);
  	this.addCity = this.addCity.bind(this);
  }
  changeCity(city) {
  	this.setState({
  		selected: city,
  		value: city.name,
  		list: []
  	});
  }
  addCity() {
  	this.props.addItem(this.state.selected);

  }
  handleInputChange(event) {
  	let value = event.target.value;
  	this.setState({value: value});
  	if (value.length >= 3 && value.match(/^\S\W/)) {
  		const URL = "http://kladr-api.ru/api.php?query=" + value + "&contentType=city&withParent=0&limit=10&typeCode=1";
	    fetch(URL)
	      .then(res => res.json())
	      .then(json => {
	      	let citiesList = json.result.map((item) => {
	      		return {
	      			"name": item.name,
	      			"zip": item.zip
	      		}
	      	})
	        this.setState({ list: citiesList });
	      });
	  	}
  }
  
  render() {
  	const list = this.state.list; 
    return (
      <div className="city-input">
      	<input 
	      	type="text" 
	      	onChange={this.handleInputChange}
	      	value={this.state.value}
      	/>
      	<button onClick={this.addCity}>+</button>
      	{(list.length > 0) && (
      		<ul>
      		{list.map((item) => (
      			<li onClick={() => this.changeCity(item)}>{item.name}</li>
      		))}
      		</ul>
      	)}
      </div>
    );
  }
}

export default CityInput;
