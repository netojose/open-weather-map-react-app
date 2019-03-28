import React from "react";
import { css } from "glamor";
import PropTypes from "prop-types";

const ListItem = ({ label, value }) => (
  <li>
    <strong>{label}:</strong> {value}
  </li>
);

ListItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

const ChartTooltip = ({ payload }) => {
  if (!payload || !payload.length) {
    return null;
  }
  const { dt_txt: dtTxt, temp, humidity, speed } = payload[0].payload;
  const date = dtTxt.split(" ");
  return (
    <div
      className={css({
        background: "#efefef",
        padding: 5
      })}
    >
      <ul
        className={css({
          listStyle: "none",
          padding: 0
        })}
      >
        <ListItem label="Date" value={date[0]} />
        <ListItem label="Hour" value={date[1]} />
        <ListItem label="Temperature" value={`${temp}º`} />
        <ListItem label="Humidity" value={`${humidity}%`} />
        <ListItem label="Windspeed" value={`${speed}m/s`} />
      </ul>
    </div>
  );
};

ChartTooltip.defaultProps = {
  payload: undefined
};

ChartTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      dt_txt: PropTypes.string.isRequired,
      temp: PropTypes.string.isRequired,
      humidity: PropTypes.string.isRequired,
      speed: PropTypes.string.isRequired
    })
  )
};

export default ChartTooltip;
