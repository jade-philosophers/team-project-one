import { AsyncStorage } from 'react-native';

export default async function(state, action ) {
  const toggled = await AsyncStorage.getItem('com.snazr.toggled') ? true : false;
  state = toggled;
  switch(action.type) {
    case 'SET_TOGGLE': 
    return action.payload;
  }
  return state;
}