import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logo from './logo.svg';
import './App.css';
import CityList from'./components/CityList.js';
import CityInput from'./components/CityInput.js';
import CityFilter from'./components/CityFilter.js';
import * as listActions from './actions/index.js';

class App extends Component {
  render() {
    const actions = this.props.listActions;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Давайте что-нибудь намутим :)</h1>
        </header>
        <div className="App-content">
          <CityInput 
            addItem={actions.addItem} 
          />
          <CityFilter 
            temperature={this.props.temperature} 
            setTemperature={actions.setTemperature}
          />
          <CityList 
            list={this.props.list} 
            removeItem={actions.removeItem}
            temperature={this.props.temperature}
          />
        </div>  
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.list,
    temperature: state.temperature
  }
}
function mapDispatchToProps(dispatch) {
  return {
    listActions: bindActionCreators(listActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
