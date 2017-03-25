const toggleActionCreator = function (bool) {
  return {
    type: 'SET_TOGGLE',
    payload: bool
  }
}

export default toggleActionCreator;