
import ajax from './ajax';
const url={
  differentLevel:"/getCompareRepotrByTile",
  inSomethingButNotInOther:"/getDifferentRoadeByTile",
  getCompareReport:"/getCompareReport",
  search:"/findByTile",
  loadroute:"/findByWayId/",
  loadTime:"/findWayAndDateById/",
  loadSpeed:"/findSpeed"
}
export default {
  differentLevel(params){
    return ajax.post(url.differentLevel,params);
  },
  inSomethingButNotInOther(params){
    return ajax.post(url.inSomethingButNotInOther,params);
  },
  getCompareReport(){
    return ajax.get(url.getCompareReport);
  },
  search(params){
    return ajax.post(url.search,params);
  },
  loadroute(params){
    return ajax.get(url.loadroute,params)
  },
  loadTime(params){
    return ajax.get(url.loadTime,params);
  },
  loadSpeed(wayid,date){
   let urls = url.loadSpeed+"?wayid="+wayid+"&date="+date;
   return ajax.get(urls);
  }
};
