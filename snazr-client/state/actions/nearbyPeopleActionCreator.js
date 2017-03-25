const nearbyPeopleActionCreator = function(people) {
  return {
    type: 'SET_NEARBY_PEOPLE',
    payload: people
  };
}


export default nearbyPeopleActionCreator;