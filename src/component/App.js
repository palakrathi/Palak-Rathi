import React, { Component } from "react";
import "../css/App.css";
import PropTypes from "prop-types";
import "isomorphic-fetch";
import { validateUser } from "./actions.js";
import { connect } from "react-redux";
var backImage = require("./image.jpg");
class App extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.name) {
            this.props.history.push("/main");
        }
    }
    render() {
        return (
            <div
                className="fluid-container"
                style={{
                    backgroundPosition: "fixed",
                    backgroundSize: "cover",
                    backgroundImage: `url(${backImage})`,
                }}
            >
                {" "}
                {!!this.props.error} ?{" "}
                <div
                    style={{
                        color: "white",
                    }}
                >
                    {" "}
                    {this.props.error}{" "}
                </div>{" "}
                <div className="App">
                    <form
                        onSubmit={this.props.onSubmitClick}
                        style={{
                            display: "inline-block",
                            marginTop: 250,
                            marginBottom: 350,
                            textAlign: "center",
                        }}
                    >
                        <div className="row">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                style={{
                                    fontSize: 12,
                                    padding: 5,
                                    height: 30,
                                    width: 250,
                                }}
                            />{" "}
                        </div>{" "}
                        <div className="row">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                style={{
                                    fontSize: 12,
                                    padding: 5,
                                    height: 30,
                                    width: 250,
                                    marginTop: 10,
                                    marginBottom: 10,
                                }}
                            />{" "}
                        </div>{" "}
                        <div className="row">
                            <input
                                type="submit"
                                value="Submit"
                                style={{
                                    width: 250,
                                }}
                            />{" "}
                        </div>{" "}
                    </form>{" "}
                </div>{" "}
            </div>
        );
    }
}
App.propTypes = {
    history: PropTypes.object,
    onSubmitClick: PropTypes.function,
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
