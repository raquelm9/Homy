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
}

export default HttpService;
