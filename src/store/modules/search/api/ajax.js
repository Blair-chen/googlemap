import axios from 'axios';
const local = "http://localhost:8080";
export default {
  post(url, params) {
    return axios
      .post(local + url, params)
      .then(function (response) {
        return response;
      })
      .catch(function (response) {
        console.log(response)
      });
  },
  aget(url,param){

    let urls =url+"?"+param
    return axios
    .get(urls, {
      headers: {
        "Access-Control-Allow-Origin":
          "Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie "
      },
      crossdomain: true
    })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      console.log(response);
    });
  },
  get(url, params) {
    let urls;
    if (params) {
      urls = local + url + params;
    } else {
      urls = local + url;
    }
    return axios
      .get(urls, {
        headers: {
          "Access-Control-Allow-Origin":
            "Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie "
        },
        crossdomain: true
      })
      .then(function (response) {
        return response;
      })
      .catch(function (response) {
        console.log(response);
      });

  },
}
