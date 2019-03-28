import React from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";

const Centered = ({ children }) => (
  <Row justify="center" type="flex">
    <Col>{children}</Col>
  </Row>
);

Centered.propTypes = {
  children: PropTypes.node.isRequired
};

export default Centered;
