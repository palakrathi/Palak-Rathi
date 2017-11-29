import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import AppContainer from "./container/AppContainer";
import HomePage from "./component/HomePage";
import {Provider} from "react-redux";
import verifyUser from "./reducers/reducers.js";
import registerServiceWorker from "./registerServiceWorker";
import {createStore} from "redux";

const store = createStore(verifyUser);
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={AppContainer} />
                <Route path="/main" component={HomePage} />
            </div>
        </Router>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
