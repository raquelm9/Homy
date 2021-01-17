import "whatwg-fetch";

var endPoints = "http://localhost:3008/api/service-requests";

class HttpService {
  getRequests = () => {
    var promise = new Promise((resolve, reject) => {
      fetch(endPoints).then((response) => {
        resolve(response.json());
      });
    });
    return promise;
  };

  addServiceRequest = (value) => {
    console.log(value);

    var promise = new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("type", value.type);
      data.append("date", value.date);
      data.append("subject", value.subject);
      data.append("description", value.description);
      data.append("image", value.image);

      fetch(endPoints, {
        method: "post",
        body: data,
      }).then((res) => {
        resolve(res.json());
      });
    });
    return promise;
  };
}

export default HttpService;
