import {connect} from "react-redux";
import HomePage from "../component/HomePage.js";
import loginAction from "../actions/actions.js";

function mapStateToProps(state) {
    return {
        name: state.name,
        SearchResults: state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => {
            dispatch(loginAction.logout());
        },
        updateResults: results => {
            dispatch(loginAction.UpdatePlanetsSearch(results));
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
