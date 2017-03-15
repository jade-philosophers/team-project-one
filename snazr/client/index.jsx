import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import People from './components/People.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.initPusher()
    
    this.socket = io();
  }

  initPusher(){
    Pusher.logToConsole = true;

    var pusher = new Pusher('ac3afe09526e683a87c4', {
      encrypted: true
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      console.log(data.message);
      console.log('my loc is: ', data.location)
    });


  }

  render () {
    return (
      <div>Hello world what up lol </div>
    );
  }
};

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/people" component={People} />
  </Router>
), document.getElementById('app'));


