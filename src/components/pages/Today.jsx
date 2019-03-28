import React, { PureComponent } from "react";
import { Row, Col, Alert, Statistic } from "antd";
import Layout from "../Layout";
import Loader from "../Loader";
import SearchForm from "../SearchForm";
import { get } from "../../helpers/request";
import { getTime } from "../../helpers/format";

export default class Today extends PureComponent {
  state = {
    weather: null,
    error: false,
    isLoading: false
  };

  handleSubmit = data => {
    this.setState({ isLoading: true, weather: null, error: false });
    get("weather", {
      q: `${data.city},${data.country}`,
      units: "metric"
    })
      .then(response => {
        const {
          main: { temp },
          sys: { sunrise, sunset }
        } = response.data;
        this.setState({
          weather: { temp, sunrise, sunset },
          error: false,
          isLoading: false
        });
      })
      .catch(() => {
        this.setState({
          weather: null,
          error: true,
          isLoading: false
        });
      });
  };

  render() {
    const { isLoading, error, weather } = this.state;
    const showInfo = !error && !isLoading && !weather;
    return (
      <Layout title="Today">
        <SearchForm onSubmit={this.handleSubmit} />
        <Loader render={isLoading} />
        {error && <Alert message="Invalid city/country code" type="error" />}
        {showInfo && (
          <Alert
            message="Please, search above with a city and a country code"
            type="info"
          />
        )}
        {weather && (
          <Row gutter={16}>
            <Col md={{ span: 8 }}>
              <Statistic title="Temperature" value={`${weather.temp}º`} />
            </Col>
            <Col md={{ span: 8 }}>
              <Statistic title="Sunrise" value={getTime(weather.sunrise)} />
            </Col>
            <Col md={{ span: 8 }}>
              <Statistic title="Sunset" value={getTime(weather.sunset)} />
            </Col>
          </Row>
        )}
      </Layout>
    );
  }
}
