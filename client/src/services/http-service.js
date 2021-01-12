import "whatwg-fetch";

var endPoints = "http://localhost:3008/service-requests";

class HttpService {
  getRequests = () => {
    var promise = new Promise((resolve, reject) => {
      fetch(endPoints).then((response) => {
        resolve(response.json());
      });
    });
    return promise;
  };

  addServiceRequest = (data) => {
    console.log(data);
    var promise = new Promise((resolve, reject) => {
      fetch(endPoints, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        resolve(res.json());
      });
    });
    return promise;
  };
}

export default HttpService;
