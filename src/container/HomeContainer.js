import {connect} from "react-redux";
import HomePage from "../component/HomePage.js";
import loginAction from "../actions/loginAction.js";
import searchPlanetsAction from "../actions/searchPlanetsAction.js";

function mapStateToProps(state) {
    return {
        name: state.username,
        SearchResults: state.searchResults,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => {
            dispatch(loginAction.logout());
        },
        updateResults: results => {
            dispatch(searchPlanetsAction.UpdatePlanetsSearch(results));
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
