import axios from 'axios';
export default {
  differentSpeed(params){
    return "fdsafd"
  },
  differentLevel(params){
    return axios
    .post("http://localhost:8080/getCompareRepotrByTile", params)
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      console.log(response)
    });
  },
  inSomethingButNotInOther(params){
    return axios.post("http://localhost:8080/getDifferentRoadeByTile",params)
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      console.log(response)
    });
  },

  getCompareReport(){
   return axios
   .get("http://localhost:8080/getCompareReport" , {
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
  search(params) {
    return axios
      .post("http://localhost:8080/findByTile", params)
      .then(function (response) {
        return response;
      })
      .catch(function (response) {
        console.log(response)
      });
  },

  loadroute(key) {
    return axios
      .get("http://localhost:8080/findByWayId/" + key, {
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
  loadTime(time) {
    return axios

      .get("http://localhost:8080/findWayAndDateById/" + time, {
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
  loadSpeed(wayid,date){
    return axios.get("http://localhost:8080/findSpeed"+"?wayid="+wayid+"&date="+date,{
      headers: {
        "Access-Control-Allow-Origin":
          "Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie "
      },
      crossdomain: true
    }).then(function(response){
       return response;
    }).catch(function(response){
      console.log(response);
    })
  }
};
