import listReducer from './list'
import loadingReducer from './loading'
import { combineReducers } from 'redux'

const rootReducers = combineReducers({ list: listReducer, loading: loadingReducer })

export default rootReducers
