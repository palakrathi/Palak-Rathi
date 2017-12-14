export default function searchResults(state = {}, action) {
    if (action.type == "UPDATE_PLANET_SEARCH") {
        return Object.assign({}, state, action.results);
    } else return state;
}
