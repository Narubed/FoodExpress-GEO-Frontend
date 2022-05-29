const listReducer = (state = {}, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case 'LISTITEM_ADD':
      newState = action.payload
      localStorage.setItem('shopping', JSON.stringify(newState))
      break
    case 'LISTITEM_EDIT':
      newState[action.payload.key] = {
        complete: action.payload.complete ?? newState[action.payload.key].complete,
        label: action.payload.label ?? newState[action.payload.key].label
      }
      break
    case 'LISTITEM_DELETE':
      delete newState[action.payload]
      localStorage.removeItem('shopping')
      break
    default:
      break
  }

  return newState
}

export default listReducer
