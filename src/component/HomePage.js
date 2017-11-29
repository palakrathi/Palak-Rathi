import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import "../css/App.css";

class HomePage extends Component {
    componentWillMount() {
        console.log(this.props.name);
        if (!this.props.name) {
            this.props.history.replace({
                pathname: "/",
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
    history: PropTypes.object,
    name: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        name: state.name,
    };
}
export default connect(mapStateToProps)(HomePage);
