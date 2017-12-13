import {combineReducers} from "redux";
function username(state = "", action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return action.name;
        case "LOGOUT":
            return "";
        default:
            return state;
    }
}
function searchResults(state = {}, action) {
    if (action.type == "UPDATE_PLANET_SEARCH") {
        return Object.assign({}, state, action.results);
    } else return state;
}
const rootReducer = combineReducers({username, searchResults});
export default rootReducer;
