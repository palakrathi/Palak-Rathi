import React, {Component} from "react";
import "../css/App.css";
import PropTypes from "prop-types";
import fetch from "isomorphic-fetch";
import cookie from "react-cookies";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            username: "",
            password: "",
            error: "",
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

    onButtonClick() {
        console.log(this.props);
        var comp = this;
        fetch(`https://swapi.co/api/people/?search=${this.state.username}`)
            .then(results => {
                return results.json();
            })
            .then(data => {
                if (data.results.length === 0) {
                    comp.setState({
                        error: "Name not found!",
                    });
                } else {
                    let UserName = data.results[0].name;
                    let BirthYear = data.results[0].birth_year;
                    if (comp.state.username === UserName) {
                        if (comp.state.password === BirthYear) {
                            comp.props.addUser(comp.state.username);
                            cookie.save("username", comp.state.username);
                            comp.props.history.push("/main");
                        } else {
                            this.setState({
                                error: "Incorrect Password!",
                            });
                        }
                    } else {
                        this.setState({
                            error: "Name not found!",
                        });
                    }
                }
            });
    }

    render() {
        return (
            <div className="App-background">
                <div className="App-page">
                    <form className="App-form">
                        <div className="row">
                            <input
                                required
                                type="text"
                                name="username"
                                placeholder="Name"
                                className="App-input"
                                onChange={this.onChange}
                                value={this.state.username}
                            />
                        </div>
                        <div className="row">
                            <input
                                required
                                type="password"
                                name="password"
                                className="App-input"
                                placeholder="Password"
                                onChange={this.onChange}
                                value={this.state.password}
                            />
                        </div>
                        <div className="AppError">{this.state.error}</div>
                        <div className="row">
                            <input
                                type="button"
                                value="Submit"
                                className="App-button"
                                onClick={this.onButtonClick}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
App.propTypes = {
    history: PropTypes.object,
};
