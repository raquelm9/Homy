import "whatwg-fetch";
import { config } from "../config/config";

var endPoints = `${config.SERVER_URL}/api/service-requests`;
const endPointsResidents = `${config.SERVER_URL}/api/residents`;

class HttpService {
  commentOnRequest = (requestId, name, comment) => {
    const commentUrl = `${endPoints}/${requestId}/comment`;

    var promise = new Promise((resolve, reject) => {
      fetch(commentUrl, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          comment,
        }),
      }).then((response) => {
        resolve(response.json());
      });
    });
    return promise;
  };

  getRequests = () => {
    var promise = new Promise((resolve, reject) => {
      fetch(endPoints, {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        resolve(response.json());
      });
    });
    return promise;
  };

  getResidents = () => {
    const promise = new Promise((resolve, reject) => {
      fetch(endPointsResidents, {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        resolve(response.json());
      });
    });
    return promise;
  };

  addServiceRequest = (value) => {
    var promise = new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("type", value.type);
      data.append("date", value.date);
      data.append("subject", value.subject);
      data.append("description", value.description);
      data.append("image", value.image);
      data.append("unit_num", value.unit_num);
      data.append("resident_name", value.resident_name);

      fetch(endPoints, {
        method: "post",
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
        body: data,
      }).then((res) => {
        resolve(res.json());
      });
    });
    return promise;
  };
}

export default HttpService;
