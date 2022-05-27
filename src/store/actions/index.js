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
