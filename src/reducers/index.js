import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import chat from "./chatReducer";
import user from './userReducer'
import room from './roomReducer'

const chatState = combineReducers({
    routing: routerReducer,
    chat,
    user,
    room
  });
  
  export default chatState