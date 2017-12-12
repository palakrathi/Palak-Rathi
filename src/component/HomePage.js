import React, {Component} from "react";
import PropTypes from "prop-types";
import fetch from "isomorphic-fetch";
import "../css/App.css";
import cookie from "react-cookies";
import Loadable from "react-loading-overlay";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "",
            loader: false,
        };
        this.onButtonClick = this.onButtonClick.bind(this);
        this.SearchUpdated = this.SearchUpdated.bind(this);
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

    SearchUpdated(e) {
        if (e.target.value.length > 1) {
            this.setState({key: e.target.value});
            if (this.props.SearchResults && this.props.SearchResults[e.target.value]) {
                console.log("from store");
            } else {
                this.setState({loader: true});
                fetch(`https://swapi.co/api/planets/?search=${e.target.value}`)
                    .then(results => {
                        this.setState({loader: false});
                        return results.json();
                    })
                    .then(data => {
                        const results = {};

                        results[this.state.key] = {
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

                        this.props.updateResults(results);
                    });
            }
        } else {
            this.setState({key: ""});
        }
    }

    render() {
        const sortedResult = function(props, state) {
            if (props.SearchResults && props.SearchResults[state.key]) {
                if (props.SearchResults[state.key].count) {
                    const mapped = props.SearchResults[state.key].results.map(function(key, index) {
                        let cname = `f${index}`;
                        return (
                            <tr key={index} className={cname}>
                                <td>{key.name}</td>
                                <td>{key.population}</td>
                            </tr>
                        );
                    });
                    const thead = (
                        <tr>
                            <th>Planet</th>
                            <th>Population</th>
                        </tr>
                    );
                    const ele = [thead, mapped];
                    return ele;
                } else {
                    return <tbody>No Result found!</tbody>;
                }
            } else {
                return <div />;
            }
        };

        const PlaPop = sortedResult(this.props, this.state);

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
                            onChange={this.SearchUpdated}
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
                            <table className="table table-dark">{PlaPop}</table>
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
