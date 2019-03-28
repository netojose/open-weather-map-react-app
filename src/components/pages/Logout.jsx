import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Logout extends Component {
  componentWillUnmount() {
    window.sessionStorage.removeItem("token");
  }

  render() {
    return <Redirect to="/" />;
  }
}
