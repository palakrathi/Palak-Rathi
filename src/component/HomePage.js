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
        this.onFetchedData = this.onFetchedData.bind(this);
        this.sortData = this.sortData.bind(this);

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

    sortData(data, key) {
        let sortedData = {};
        sortedData[key] = {
            count: data.results.length,
            results: data.results
                .sort(function(obj1, obj2) {
                    let a = Number(obj1.population);
                    let b = Number(obj2.population);
                    if (isNaN(a)) {
                        return 1;
                    } else if (isNaN(b)) {
                        return -1;
                    }
                    return b - a;
                })
                .map(function(obj) {
                    return {name: obj.name, population: obj.population};
                }),
        };
        return sortedData;
    }

    onFetchedData(results) {
        this.setState({loader: false});
        this.props.updateResults(this.sortData(results, this.state.key));
    }

    onPlanetSearch(event) {
        if (event.target.value.length > 1) {
            this.setState({key: event.target.value});
            if (!this.props.searchResults || !this.props.searchResults[event.target.value]) {
                this.setState({loader: true});
                let comp = this;
                fetchData(`planets/?search=${event.target.value}`).then(results =>
                    this.onFetchedData(results)
                );
            }
        } else {
            this.setState({key: ""});
        }
    }

    render() {
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
                            <table className="table table-dark">
                                <PlanetsPopulation
                                    searchResults={
                                        this.props.searchResults
                                            ? this.props.searchResults[this.state.key]
                                            : null
                                    }
                                />
                            </table>
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
    searchResults: PropTypes.object,
    logout: PropTypes.func,
};
