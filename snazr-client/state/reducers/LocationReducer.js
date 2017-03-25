const initial = {
  latitude: 0,
  longitude: 0
}

export default function(state = initial, action) {
  switch(action.type) {
    case 'SET_LOCATION': 
    return action.payload;
  }
  return state;
}