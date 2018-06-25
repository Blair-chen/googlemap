import axios from 'axios';
import _ from 'lodash';

const urls = {
  getCbdk: '/basedata/contractLand/list'
};
export default {
  search(param) {
    //return ajax.get(urls.getTemporary + param);
    return {
      positions: [[
        { lat: 31.211245659387767, lng: 121.40444739359441 },
         { lat: 31.21152896709536, lng: 121.4045184721333 },
         {lat: 31.211499145271393, lng: 121.4045284721333},
         {lat: 31.211664312178343, lng: 121.40453858870092},
         {lat: 31.21172510270341, lng: 121.40455602305951},
         {lat: 31.211772129309217, lng: 121.4045684721333},
         {lat: 31.211892563193025, lng: 121.40457479852262},
         {lat: 31.21199693910159, lng: 121.40456943410459},
        ]],
      center:   { lat: 31.211245659387767, lng: 121.40444739359441 },
    }
  },
};
