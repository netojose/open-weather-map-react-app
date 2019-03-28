import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "./pages/Login";
import Today from "./pages/Today";
import History from "./pages/History";
import Logout from "./pages/Logout";

export default () => (
  <Router>
    <Fragment>
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/today" component={Today} />
      <PrivateRoute path="/history" component={History} />
      <PrivateRoute path="/logout" component={Logout} />
    </Fragment>
  </Router>
);
