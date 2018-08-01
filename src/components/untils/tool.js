//Googlemap's zoom corresponds to zoomlevel
export const zoomMapping = (zoom) => {
  if (1<=zoom&&zoom<=5) {
    return 0;
  }
  if (6<=zoom&&zoom<=11) {
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
    return "#33FF44"
  }
  if (4<=flow && flow<8) {
    return "#FFBE33"
  }
  if (8<=flow && flow<10) {
    return "#FF4533"
  }
}

