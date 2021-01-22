import HttpService from "../services/http-service";

export const commentOnRequest = (requestId, residentName, comment) => (
  dispatch
) => {
  return HttpService.commentOnRequest(requestId, residentName, comment);
  // fetch(`http://localhost:3008/api/login`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(userInfo)
  // })
  //     .then(res => {
  //         localStorage.setItem("token", res.headers.get('x-auth-token'))
  //         return res.json()
  //     })
  //     .then(data => dispatch(setUser(data)))
};
