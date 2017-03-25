import { combineReducers } from 'redux';
import LocationReducer from './LocationReducer';
import NearbyPeopleReducer from './NearbyPeopleReducer';
// import ToggleReducer from './ToggleReducer';

const rootReducer = combineReducers({
  location: LocationReducer,
  nearbyPeople: NearbyPeopleReducer,
  // toggled: ToggleReducer
});

export default rootReducer;

