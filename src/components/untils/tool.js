//Googlemap's zoom corresponds to zoomlevel
export const zoomMapping = (zoom) => {
  if (1<=zoom&&zoom<=5) {
    return 0;
  }
  if (6<=zoom&&zoom<=12) {
    return 1;
  }
  if (13<=zoom&&zoom<=15) {
    return 2;
  }
  if (16<=zoom&&zoom<=19) {
    return 3;
  }
  if (20<=zoom&&zoom<=22) {
    return 4;
  }
};
//traffic flow corresponds to color
export const colorMapping =(flow)=>{
  if (0<=flow && flow<4) {
    return "#2CA407"
  }
  if (4<=flow && flow<8) {
    return "#EBA31C"
  }
  if (8<=flow && flow<10) {
    return "#E00E0B"
  }
}

export const isCatains=(source, target)=>{
  let sourceright = source + 1;
  let sourceleft = source - 1;
  if (target > sourceleft && target < sourceright) {
    return true;
  }
  return false;
}

export const getCenter=(key)=>{
  switch(key){
    case "EU": return  {lat:52.3555 ,lng: 1.1743};
    case "CN": return { lat: 39.9042, lng: 116.4074 };
    case "ANZ":return { lat: -33.88658145569154, lng: 151.13988831025813 };
    case "KOR" : return {lat:35.9078 ,lng: 127.7669};
    case "NA":return {lat:54.5260,lng: 105.255};
    case "SA":return{lat:8.7832, lng:55.4915}
  }
}

