import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import People from './components/People.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.initPusher()
    
    this.socket = io();
    // let userId = Math.floor(Math.random()*100000)
    let userId = 12345
    console.log('generated ID: ', userId)

    this.socket.emit('auth', userId)
    this.listeners()
    this.clicker1 = this.clicker1.bind(this);
    this.clicker2 = this.clicker2.bind(this);
    this.clicker3 = this.clicker3.bind(this);
    this.clicker4 = this.clicker4.bind(this);
  }

  listeners(){
    //pulll master branch
    //download expo

    this.socket.on('set private channel', data => {
      console.log('were building private channel: ', data)
    })
    let message = 'listen for:' + this.userId + ''
    this.socket.on('request connection ', data => {
      console.log('request connection from ', data.requestId)
      console.log('request connection to : ', data.userId)
    })
    // this.socket.on('hello', data => {
    //   console.log('hello event data: ', data)
    // })
  }

  clicker1(){
    this.socket.emit('chat message', 'elllo world')
  }

  clicker2(){
    let data = {
      userId: 12345,
      requestId: 23456
    }
    this.socket.emit('request connection', data)
  }

  clicker3(){
    this.socket.emit('confirmed', { userId: this.userId })
  }

  clicker4(){
    // Axios.get('/api/toggled_users', {
    //   params: { "lng":123.22, "lat":56.33, "id":12345 }
    // })
    axios.get('/api/toggled_users', {
    params: { 
      "lng":123.22, 
      "lat":56.33, 
      "id":12345 }
   })
    .then( msg => console.log('success: ', msg))
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
      <div>
          <div onClick={this.clicker1}>Turn me on </div>
          <div onClick={this.clicker2}>Photographer: I want to photograph JOE</div>
          <div onClick={this.clicker3}>JOE: okay I confirm </div>
          <div onClick={this.clicker4}>send Get request</div>
      </div>
    );
  }
};

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/people" component={People} />
  </Router>
), document.getElementById('app'));


