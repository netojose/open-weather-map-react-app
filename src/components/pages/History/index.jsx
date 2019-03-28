import React, { PureComponent } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { Radio, Alert } from "antd";
import ChartTooltip from "./ChartTooltip";
import Layout from "../../Layout";
import Loader from "../../Loader";
import Centered from "../../Centered";
import SearchForm from "../../SearchForm";
import { get } from "../../../helpers/request";
import { getDayName } from "../../../helpers/format";

export default class Today extends PureComponent {
  state = {
    data: [],
    show: "temp",
    error: false,
    isLoading: false
  };

  handleChangeShow = ({ target: { value: show } }) => this.setState({ show });

  handleSubmit = params => {
    this.setState({ isLoading: true, error: false });
    get("forecast", {
      q: params.city,
      units: "metric"
    })
      .then(response => {
        const {
          data: { list }
        } = response;
        let lastDate = null;
        const data = list.map(row => {
          const date = row.dt_txt.split(" ")[0];
          let name = "";
          if (date !== lastDate) {
            lastDate = date;
            name = getDayName(date);
          }

          return {
            name,
            dt_txt: row.dt_txt,
            temp: row.main.temp,
            humidity: row.main.humidity,
            speed: row.wind.speed
          };
        });
        this.setState({ data, error: false, isLoading: false });
      })
      .catch(() => {
        this.setState({
          data: [],
          error: true,
          isLoading: false
        });
      });
  };

  render() {
    const { data, show, error, isLoading } = this.state;
    return (
      <Layout title="History">
        <SearchForm onSubmit={this.handleSubmit} country={false} />
        <Centered>
          <Radio.Group
            buttonStyle="solid"
            value={show}
            onChange={this.handleChangeShow}
          >
            <Radio.Button value="temp">Temperature</Radio.Button>
            <Radio.Button value="speed">Windspeed</Radio.Button>
            <Radio.Button value="humidity">Humidity</Radio.Button>
          </Radio.Group>
        </Centered>
        {error && <Alert message="Invalid city" type="error" />}
        {isLoading ? (
          <Loader />
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey={show}
                stroke="#096dd9"
                fill="#91d5ff"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Layout>
    );
  }
}
