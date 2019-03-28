import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";

class SearchForm extends Component {
  static defaultProps = {
    country: true
  };

  handleSubmit = e => {
    const {
      onSubmit,
      form: { validateFields }
    } = this.props;
    e.preventDefault();
    validateFields((err, values) => {
      if (err) {
        return;
      }
      onSubmit(values);
    });
  };

  render() {
    const {
      country,
      form: { getFieldDecorator }
    } = this.props;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("city", {
            rules: [{ required: true, message: "This field is required" }]
          })(<Input placeholder="City name" />)}
        </Form.Item>
        {country && (
          <Form.Item>
            {getFieldDecorator("country", {
              rules: [{ required: true, message: "This field is required" }]
            })(<Input placeholder="Country code" />)}
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Get weather
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

SearchForm.propTypes = {
  country: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired
  }).isRequired
};

export default Form.create()(SearchForm);
