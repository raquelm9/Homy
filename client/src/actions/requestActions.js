import HttpService from "../services/http-service";

export const commentOnRequest = (requestId, residentName, comment) => (
  dispatch
) => {
  return HttpService.commentOnRequest(requestId, residentName, comment);
};
