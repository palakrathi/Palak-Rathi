// import {combineReducers} from "redux";
export default function verifyUser(state = {}, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return Object.assign({}, action);
        case "LOGOUT":
            return Object.assign({}, state, (state.name = ""), (state.SearchResults = {}));
        case "UPDATE_PLANET_SEARCH":
            return Object.assign({}, state, action.results);
        default:
            return state;
    }
}
// function updateResults(state = {name: ""}, action) {
//     if (action.type == "UPDATE_PLANET_SEARCH") {
//         return Object.assign({}, state, action.results);
//     } else return state;
// }
// const rootReducer = combineReducers({verifyUser, updateResults});
// export default rootReducer;
