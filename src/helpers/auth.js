export function checkCredentials(values) {
  if (values.username === "arthur" && values.password === "42") {
    window.sessionStorage.setItem("token", Math.random());
    return true;
  }
  return false;
}

export function isLoggedIn() {
  const token = window.sessionStorage.getItem("token");
  return !!token;
}
