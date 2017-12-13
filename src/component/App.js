import React, {Component} from "react";
import "../css/app.css";
import PropTypes from "prop-types";
import fetchData from "../helpers/fetchData.js";
import cookie from "react-cookies";
import Loadable from "react-loading-overlay";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.onButtonClick = this.onButtonClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validateData = this.validateData.bind(this);

        this.state = {
            username: "",
            password: "",
            error: "",
            loader: false,
        };
    }

    componentWillMount() {
        if (cookie.load("username")) {
            this.props.addUser(cookie.load("username"));
            this.props.history.push("/main");
        }
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    validateData(data) {
        let results = {
            loader: false,
            error: "",
            verified: false,
        };

        if (data.results.length === 0) {
            results.loader = false;
            results.error = "Name not found!";
        } else {
            if (this.state.username === data.results[0].name) {
                if (this.state.password === data.results[0].birth_year) {
                    results.verified = true;
                } else {
                    results.loader = false;
                    results.error = "Incorrect Password!";
                }
            } else {
                results.loader = false;
                results.error = "Name not found!";
            }
        }

        return results;
    }

    onButtonClick() {
        this.setState({loader: true});
        let comp = this;
        fetchData(`people/?search=${this.state.username}`).then(function(data) {
            let results = comp.validateData(data);
            if (results.verified) {
                comp.props.addUser(comp.state.username);
                cookie.save("username", comp.state.username);
                comp.props.history.push("/main");
            } else {
                comp.setState({
                    loader: results.loader,
                    error: results.error,
                });
            }
        });
    }

    render() {
        return (
            <div className=" App-page">
                <Loadable
                    active={this.state.loader}
                    className="App-loader"
                    spinner
                    background="gray"
                    color="white"
                >
                    <figure className="figure App-form">
                        <form>
                            <div className="form-group">
                                <input
                                    required
                                    type="text"
                                    name="username"
                                    placeholder="Name"
                                    className="form-control"
                                    onChange={this.onChange}
                                    value={this.state.username}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                    value={this.state.password}
                                />
                            </div>
                            <div className="AppError">{this.state.error}</div>
                            <div className="form-group">
                                <input
                                    type="button"
                                    value="Submit"
                                    className="App-button btn btn-primary"
                                    onClick={this.onButtonClick}
                                />
                            </div>
                        </form>
                    </figure>
                </Loadable>
            </div>
        );
    }
}
App.propTypes = {
    history: PropTypes.object,
    addUser: PropTypes.func,
};
