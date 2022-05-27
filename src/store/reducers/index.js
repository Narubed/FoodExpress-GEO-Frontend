import listReducer from './list'
import { combineReducers } from 'redux'

const rootReducers = combineReducers({ list: listReducer })

export default rootReducers
