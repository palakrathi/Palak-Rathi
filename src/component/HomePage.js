import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        if (!this.props.verify) {
            this.props.history.replace({
                pathname: "/login",
            });
        }
    }
    render() {
        return (
            <div
                className="App"
                style={{
                    display: "flex",
                }}
            >
                Welcome {this.props.name}{" "}
            </div>
        );
    }
}
HomePage.propTypes = {
    verify: PropTypes.bool,
    history: PropTypes.object,
    name: PropTypes.string,
};
function mapStateToProps(state) {
    return {
        name: state.name,
        verify: state.verify,
    };
}
export default connect(mapStateToProps)(HomePage);
