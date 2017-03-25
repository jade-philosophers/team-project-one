const locationActionCreator = function(location) {
  return {
    type: 'SET_LOCATION',
    payload: location
  };
}


export default locationActionCreator;