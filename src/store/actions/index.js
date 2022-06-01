export const addItem = payload => {
  return {
    type: 'LISTITEM_ADD',
    payload
  }
}

export const editItem = payload => {
  return {
    type: 'LISTITEM_EDIT',
    payload
  }
}

export const deleteItem = payload => {
  return {
    type: 'LISTITEM_DELETE',
    payload
  }
}

export const openLoading = payload => {
  return {
    type: 'OPEN_LOADING',
    payload
  }
}

export const turnOffLoading = payload => {
  return {
    type: 'TURNOFF_LOADING',
    payload
  }
}

