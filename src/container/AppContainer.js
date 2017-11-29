import {connect} from "react-redux";
import App from "../component/App.js";
import loginAction from "../actions/actions.js";

function mapDispatchToProps(dispatch) {
    return {
        addUser: event => {
            dispatch(loginAction.loginSuccess(event));
        },
    };
}
export default connect(null, mapDispatchToProps)(App);
