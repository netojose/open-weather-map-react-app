import React, { PureComponent } from "react";
import { Row, Col, Card, Form, Input, Button, Icon, message } from "antd";
import PropTypes from "prop-types";
import { checkCredentials } from "../../helpers/auth";

const FormItem = Form.Item;

class Login extends PureComponent {
  handleSubmit = () => {
    const {
      form: { validateFields }
    } = this.props;
    validateFields((err, values) => {
      if (err) {
        return;
      }
      const pass = checkCredentials(values);
      if (pass) {
        const { history } = this.props;
        history.push("/today");
        return;
      }
      message.error("Wrong credentials, try again");
    });
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <Row>
        <Col
          xs={{ span: 22, offset: 1 }}
          sm={{ span: 12, offset: 6 }}
          md={{ span: 8, offset: 8 }}
          lg={{ span: 6, offset: 9 }}
        >
          <Card title="Login" style={{ marginTop: 20 }}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator("username", {
                  initialValue: "arthur",
                  rules: [{ required: true, message: "This field is required" }]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                    placeholder="Username"
                  />
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator("password", {
                  initialValue: "42",
                  rules: [{ required: true, message: "This field is required" }]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                    type="password"
                    placeholder="Password"
                  />
                )}
              </FormItem>

              <FormItem>
                <Button type="primary" htmlType="submit">
                  Sign in
                </Button>
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

Login.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

export default Form.create()(Login);
