import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import "../css/App.css";

class HomePage extends Component {
    componentWillMount() {
        if (!this.props.verify) {
            this.props.history.replace({
                pathname: "/login",
            });
        }
    }

    render() {
        return (
            <div className="App-background">
                <div className="App-page">
                    <div className="Main-head"> Welcome {this.props.name} !</div>;
                </div>
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
