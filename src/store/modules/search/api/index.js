
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
    return [{key:'123',name:'China'},{key:'456',name:'Austrical'},{key:'789',name:'North America'},{key:'987',name:'South America'},{key:'654',name:'Korea'},{key:'321',name:'Europe'}]
  },

  functionCount(params){
    return ajax.post(url.functionCount,params);
  },

  loadRegion(){
    return [
      {region:'CN',name:"China",id:'12345',resource:[{map:"here",resource:[{type:'auto',id:'123'},{type:'palmgo',id:'123'}]},{map:"here2",resource:[{type:'auto2',id:'123'},{type:'palmgo2',id:'123'}]}]},
      {region:'EU',name:"Europe",id:'1234',resource:[{map:"here",resource:[{type:'auto',id:'123'},{type:'palmgo',id:'123'}]},{map:"here2",resource:[{type:'auto2',id:'123'},{type:'palmgo2',id:'123'}]}]},
      {region:'KOR',name:"Korea",id:'1',resource:[{map:"here",resource:[{type:'auto',id:'123'},{type:'palmgo',id:'123'}]},{map:"here2",resource:[{type:'auto2',id:'123'},{type:'palmgo2',id:'123'}]}]},
      {region:'ANZ',name:"Australia",id:'2',resource:[{map:"here",resource:[{type:'auto',id:'123'},{type:'palmgo',id:'123'}]},{map:"here2",resource:[{type:'auto2',id:'123'},{type:'palmgo2',id:'123'}]}]},
      {region:'NZ',name:"North America",id:'3',resource:[{map:"here",resource:[{type:'auto',id:'123'},{type:'palmgo',id:'123'}]},{map:"here2",resource:[{type:'auto2',id:'123'},{type:'palmgo2',id:'123'}]}]},
      {region:'SZ',name:"South America",id:'4',resource:[{map:"here",resource:[{type:'auto',id:'123'},{type:'palmgo',id:'123'}]},{map:"here2",resource:[{type:'auto2',id:'123'},{type:'palmgo2',id:'123'}]}]},
    ]
  }
};
