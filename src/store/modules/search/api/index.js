import axios from 'axios';
import _ from 'lodash';

const urls = {
  findRoade: 'http://localhost:8080/findRoade'
};
export default {

  search(param) {
  return   axios.get(urls.findRoade, {
      params: {
        tile: param
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (response) {
      console.log(response);
    })
    // if(_.indexOf(param,'a')) {
    //   return{
    //     positions: [[
    //       { lat: 30.211245659387767, lng: 121.40444739359441 },
    //        { lat: 30.21152896709536, lng: 121.4045184721333 },
    //        {lat: 30.211499145271393, lng: 121.4045284721333},
    //        {lat: 30.211664312178343, lng: 121.40453858870092},
    //        {lat: 30.21172510270341, lng: 121.40455602305951},
    //        {lat: 30.211772129309217, lng: 121.4045684721333},
    //        {lat: 30.211892563193025, lng: 121.40457479852262},
    //        {lat: 30.21199693910159, lng: 121.40456943410459},
    //       ]],
    //     center:   { lat: 30.211499145271393, lng: 121.40444739359441 },
    //   }
    // }
    // return {
    //   positions: [[
    //     { lat: 31.211245659387767, lng: 121.40444739359441 },
    //      { lat: 31.21152896709536, lng: 121.4045184721333 },
    //      {lat: 31.211499145271393, lng: 121.4045284721333},
    //      {lat: 31.211664312178343, lng: 121.40453858870092},
    //      {lat: 31.21172510270341, lng: 121.40455602305951},
    //      {lat: 31.211772129309217, lng: 121.4045684721333},
    //      {lat: 31.211892563193025, lng: 121.40457479852262},
    //      {lat: 31.21199693910159, lng: 121.40456943410459},
    //     ]],
    //   center:   { lat: 31.211245659387767, lng: 121.40444739359441 },
    // }

  },
};
