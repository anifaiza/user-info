import { combineReducers } from "redux"
import apiReducer from "./ApiSlice"

const rootReducer = combineReducers({
  data: apiReducer,
})

export default rootReducer
