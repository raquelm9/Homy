import "whatwg-fetch";
import { config } from "../config/config";

const endPoints = `${config.SERVER_URL}/api/service-requests`;
const endPointsResidents = `${config.SERVER_URL}/api/residents`;
const endPointsPayment = `${config.SERVER_URL}/api/shop/pay`;
const endPointsProducts = `${config.SERVER_URL}/api/shop/products`;
const endPointsAllServiceRequests = `${config.SERVER_URL}/api/service-requests/manager/all-service-requests`;
const endPointsOrders = `${config.SERVER_URL}/api/shop/orders`
const endPointsPosts = `${config.SERVER_URL}/api/post/`

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

  commentOnRequestAsManager = (requestId, name, comment) => {
    const commentUrl = `${endPoints}/${requestId}/comment/manager`;

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
  updateStatusOnRequest = (requestId, status) => {
    const commentUrl = `${endPoints}/${requestId}/status`;

    var promise = new Promise((resolve, reject) => {
      fetch(commentUrl, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          status,
        }),
      }).then((response) => {
        resolve(response.json());
      });
    });
    return promise;
  };


  updateStatusOnRequestAsManager = (requestId, status) => {
    const commentUrl = `${endPoints}/${requestId}/status/manager`;

    var promise = new Promise((resolve, reject) => {
      fetch(commentUrl, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          status,
        }),
      }).then((response) => {
        resolve(response.json());
      });
    });
    return promise;
  };

  getRequestsById = (requestId) => {
    let promise = new Promise((resolve, reject) => {
      fetch(`${endPoints}/${requestId}`, {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`
        }
      }).then(resp => {
        resolve(resp.json())
      })
    })
    return promise;
  }

  /**
   * Get all posts
   */
  getAllPosts = () => {
    let promise = new Promise((resolve, reject) => {
      fetch(endPointsPosts)
        .then((response) => {
          resolve(response.json())
        })
    })
    return promise;
  }

  /**
   * Creates a post
   */
  createPost = (username, caption, isManager) => {
    let promise = new Promise((resolve, reject) => {
      fetch(endPointsPosts, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": username,
          "avatarUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg/220px-Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg",
          "imageUrl": "https://miro.medium.com/max/700/1*WNr4o3XKVcb556Al3beWAQ.jpeg",
          "caption": caption,
          "comments": [],
          "isManager": isManager
        })
      })

    })
    return promise;
  }

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

  getAllServiceRequests = () => {
    var promise = new Promise((resolve, reject) => {
      fetch(endPointsAllServiceRequests, {
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
      data.append("notification", value.notification)

      // data.append("status",0);

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

  //*****Payment*** */
  postPaymentMethod = (paymentMethodId, productId, userId) => {
    var promise = new Promise((resolve, reject) => {
      fetch(endPointsPayment, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          payment_method_id: paymentMethodId,
          product_id: productId,
          user_id: userId,
        }),
      }).then((res) => resolve(res.json()));
    });
    return promise;
  };

  /*******Products**********/
  getProducts = () => {
    var promise = new Promise((resolve, reject) => {
      fetch(endPointsProducts, {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      }).then((resp) => resolve(resp.json()));
    });
    return promise;
  };

  /***********Orders***********/
  getAllOrders = () => {
    var promise = new Promise((resolve, reject) => {
      fetch(endPointsOrders, {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      }).then((resp) => resolve(resp.json()));
    });
    return promise;
  }
}
export default HttpService;
