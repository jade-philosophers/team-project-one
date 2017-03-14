import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import axios from 'axios';
import '../styles/slider.css';
import helpers from '../../config/util.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false
    };
    this.changeToMap = this.changeToMap.bind(this);
    this.toggleLocation = this.toggleLocation.bind(this);
    this.getAndSendLocationData = this.getAndSendLocationData.bind(this);
    this.searchAndRemoveLocationData = this.searchAndRemoveLocationData.bind(this);
  }

  changeToMap() {
    if(this.state.toggled) {
      hashHistory.push('/map');
    } else {
      console.log('you must toggle your location on to search for others');
    }
  }

  toggleLocation() {
    this.setState({toggled: !this.state.toggled});
    if( this.state.toggled ) {
      this.getAndSendLocationData();
    }  else {
      this.searchAndRemoveLocationData();
    }
  }

  getAndSendLocationData() {
    helpers.getPosition().then(res => {
      //send res.data.location object to the cache
    });
  }

  searchAndRemoveLocationData() {
    //query cache for location object and remove from the cache
  }

  render () {
    return (
      <div>
        <div>
          <label className="switch">
            <input type="checkbox" onClick={this.toggleLocation}></input>
            <div className="slider round"></div>
          </label>
        </div>
        <button onClick={this.changeToMap}>Find Others!</button>
        <div>Hello world what up lol </div>
      </div>
    );
  }
};

export default App;