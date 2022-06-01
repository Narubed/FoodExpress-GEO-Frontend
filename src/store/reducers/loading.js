const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'OPEN_LOADING':
      return true
    case 'TURNOFF_LOADING':
      return false
    default:
      return state
  }
}

export default loadingReducer
