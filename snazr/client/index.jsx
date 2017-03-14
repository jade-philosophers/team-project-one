import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import People from './components/People.jsx';
import MapWrapper from './components/Map/MapWrapper.jsx';
import App from './components/App/App.jsx';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/people" component={People} />
    <Route path="/map" component = {MapWrapper} />
  </Router>
), document.getElementById('app'));


