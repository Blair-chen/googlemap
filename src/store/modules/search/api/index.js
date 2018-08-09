import axios from 'axios';
export default {
  searchCompare(params){
    // return [{
    //   color:'#FF4933',
    //   positions:[{lat:39.9042,lng:116.4074},{lat:39.9,lng:116.4074}],
    //   listSource:[{type:"autonavi",id:12345,reportTime:"2018-07-26",speed:12,level:3},{type:"palmgo",id:12345,reportTime:"2018-07-26",speed:12,level:3}]},
    // {color:'#FFB833',
    // positions:[{lat:39.9046,lng:116.7074},{lat:39.9,lng:116.4074}],
    // listSource:[{type:"autonavi",id:12345,reportTime:"2018-07-26",speed:12,level:3},{type:"palmgo",id:12345,reportTime:"2018-07-26",speed:12,level:3}]}]
    return axios
    .post("http://localhost:8080/getCompareRepotrByTile", params)
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      console.log(response)
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
