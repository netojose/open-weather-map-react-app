export function getTime(time) {
  if (!time) {
    return null;
  }
  const date = new Date(time * 1000);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export function getDayName(dateString) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(dateString);
  return days[date.getDay()];
}
