import React, {Component} from "react";
import PropTypes from "prop-types";
import "../css/app.css";
import cookie from "react-cookies";
import Loadable from "react-loading-overlay";
import fetchData from "../helpers/fetchData.js";
import PlanetsPopulation from "../component/PlanetsPopulation.js";

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.onButtonClick = this.onButtonClick.bind(this);
        this.onPlanetSearch = this.onPlanetSearch.bind(this);
        this.state = {
            key: "",
            loader: false,
        };
    }

    componentWillMount() {
        if (!this.props.name) {
            this.props.history.replace({
                pathname: "/",
            });
        }
    }

    onButtonClick() {
        this.props.logout();
        cookie.remove("username");
        this.props.history.push("/");
    }

    onPlanetSearch(event) {
        if (event.target.value.length > 1) {
            this.setState({key: event.target.value});
            if (!this.props.SearchResults || !this.props.SearchResults[event.target.value]) {
                this.setState({loader: true});
                let comp = this;
                fetchData(`planets/?search=${event.target.value}`).then(results => {
                    comp.setState({loader: false});
                    comp.props.updateResults(results);
                });
            }
        } else {
            this.setState({key: ""});
        }
    }

    render() {
        const PlanetPopulation = PlanetsPopulation(this.props, this.state);

        return (
            <div className="container-fluid">
                <div className="Main-head row justify-content-end">
                    <div className=" col-7"> Welcome {this.props.name} ! </div>
                    <div className="col-2">
                        <button
                            name="Logout"
                            className="btn btn-primary App-signout"
                            onClick={this.onButtonClick}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                <div className="row justify-content-start">
                    <div className="col-8">
                        <input
                            placeholder="Type a name of planet.."
                            name="search"
                            type="search"
                            className="Input-search form-control"
                            onChange={this.onPlanetSearch}
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6">
                        <Loadable
                            active={this.state.loader}
                            className="App-loader"
                            spinner
                            background="gray"
                            color="white"
                        >
                            <table className="table table-dark">{PlanetPopulation}</table>
                        </Loadable>
                    </div>
                </div>
            </div>
        );
    }
}
HomePage.propTypes = {
    history: PropTypes.object,
    name: PropTypes.string,
};
