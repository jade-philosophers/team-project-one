export default function(state = [], action) {
  switch(action.type) {
    case 'SET_NEARBY_PEOPLE': 
    return action.payload;
  }
  return state;
}