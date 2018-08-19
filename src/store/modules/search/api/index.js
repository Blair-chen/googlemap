
import ajax from './ajax';
const url={
  differentLevel:"/getCompareRepotrByTile",
  inSomethingButNotInOther:"/getDifferentRoadeByTile",
  getCompareReport:"/getCompareReport",
  search:"/findByTile",
  loadroute:"/findByWayId/",
  loadTime:"/findWayAndDateById/",
  loadSpeed:"/findSpeed",
  functionCount:"/getFunctionClassCountByTile"
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
  },
  getGraph(){
    return [{key:'123',name:'中国'},{key:'456',name:'澳大利亚'},{key:'789',name:'北美'},{key:'987',name:'南美'},{key:'654',name:'韩国'},{key:'321',name:'欧洲'}]
  },
  loadMap(key){
    return "ANZ";
  },
  functionCount(params){
    return ajax.post(url.functionCount,params);
  }
};
