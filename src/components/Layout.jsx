import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout as AntLayout, Menu, PageHeader, Button } from "antd";
import PropTypes from "prop-types";

const { Header, Content, Footer } = AntLayout;

const Layout = ({ children, title, location }) => (
  <AntLayout>
    <PageHeader
      title="Datavisualisation"
      subTitle={title}
      extra={
        <Button type="danger">
          <Link to="/logout">Logout</Link>
        </Button>
      }
    />
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[location.pathname]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="/today">
          <Link to="/today">Today</Link>
        </Menu.Item>
        <Menu.Item key="/history">
          <Link to="/history">History</Link>
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: "0 50px" }}>
      <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
        {children}
      </div>
    </Content>
    <Footer style={{ textAlign: "center" }}>Siemens ©2019</Footer>
  </AntLayout>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter(Layout);
