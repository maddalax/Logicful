let memoryToken = "";
export function setToken(token, remember = true) {
  if (!localStorage) {
    return;
  }
  localStorage.removeItem("token");
  if (remember) {
    localStorage.setItem("token", JSON.stringify(token));
  } else {
    memoryToken = JSON.stringify(token);
  }
}
export function getToken() {
  if (!localStorage) {
    return void 0;
  }
  const token = localStorage.getItem("token") ?? memoryToken;
  if (!token) {
    return void 0;
  }
  try {
    const parsed = JSON.parse(token);
    return parsed.token;
  } catch (ex) {
    localStorage.removeItem("token");
    memoryToken = "";
    return void 0;
  }
}
export function me() {
  const emptyUser = {
    fullName: "",
    displayName: "",
    email: "",
    id: "",
    teamId: ""
  };
  const token = getToken();
  if (!token) {
    return emptyUser;
  }
  try {
    const user = parseJwt(token);
    return user;
  } catch {
    return emptyUser;
  }
}
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(atob(base64).split("").map(function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
  return JSON.parse(jsonPayload);
}
export function refreshToken() {
}
