import axios from "axios";
import qs from "qs";

const request = axios.create({
  baseURL: process.env.API_ENDPOINT
});

export function get(url, params = {}) {
  const vars = qs.stringify(
    { APPID: process.env.OPEN_WEATHER_MAP_API_KEY, ...params },
    { arrayFormat: "brackets" }
  );
  const querystring = vars ? `?${vars}` : "";
  return request.get(url + querystring);
}

export default {};
