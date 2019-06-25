import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Index from "./components/layouts/Index";
import Lyrics from "./components/tracks/Lyrics";
import { Provider } from "./context";

export default class App extends Component {
  render() {
    return (
      <Provider>
        <HashRouter basename="/">
          <React.Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/lyrics/track/:id" component={Lyrics} />
              </Switch>
            </div>
          </React.Fragment>
        </HashRouter>
      </Provider>
    );
  }
}
