import {combineReducers} from "redux";
import username from "./username.js";
import searchResults from "./searchResults.js";

const rootReducer = combineReducers({username, searchResults});
export default rootReducer;
