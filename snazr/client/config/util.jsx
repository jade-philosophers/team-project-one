import axios from 'axios';
const helpers = {
  
  GOOGLE_GEOLOCATION_API_KEY: 'AIzaSyAgyasVNz5q6Aqmq8pFSjpse0TUKKsbah0',

  GOOGLE_MAPS_API_KEY: "AIzaSyD4SQ0tx-fA7WDXl7QU-x2WG3kIq5AuGiM",

  getPosition () {
    return axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${helpers.GOOGLE_GEOLOCATION_API_KEY}`);
  }





}


export default helpers;