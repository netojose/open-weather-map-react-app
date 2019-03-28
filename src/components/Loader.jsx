import React from "react";
import { Spin } from "antd";
import { css } from "glamor";
import Centered from "./Centered";

export default ({ render = true }) =>
  render && (
    <Centered>
      <div
        className={css({
          margin: "20px 0"
        })}
      >
        <Spin size="large" />
      </div>
    </Centered>
  );
