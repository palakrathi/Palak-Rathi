import React from "react";
import ReactDOM from "react-dom";
import "../css/index.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "./App";
import HomePage from "./HomePage";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import verifyUser from "./reducers.js";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";

const loggerMiddleware = createLogger();
const store = createStore(verifyUser, applyMiddleware(thunkMiddleware, loggerMiddleware));
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Redirect from="/" to="/login" />
                <Route path="/login" component={App} />
                <Route path="/main" component={HomePage} />
            </div>
        </Router>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
