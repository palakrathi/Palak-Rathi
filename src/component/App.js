import React, {Component} from "react";
import "../css/App.css";
import PropTypes from "prop-types";
import {validateUser} from "../actions/actions.js";
import {connect} from "react-redux";

class App extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.name) {
            this.props.history.push("/main");
        }
    }
    render() {
        return (
            <div className="App-background">
                <div className="AppError">{this.props.error}</div>
                <div className="App-page">
                    <form className="App-form" onSubmit={this.props.onSubmitClick}>
                        <div className="row">
                            <input type="text" name="name" placeholder="Name" className="App-input" />
                        </div>
                        <div className="row">
                            <input
                                type="password"
                                name="password"
                                className="App-input"
                                placeholder="Password"
                            />
                        </div>
                        <div className="row">
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
App.propTypes = {
    history: PropTypes.object,
    onSubmitClick: PropTypes.func,
    error: PropTypes.string,
    name: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        name: state.name,
        verify: state.verify,
        error: state.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSubmitClick: event => {
            dispatch(validateUser(event));
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
