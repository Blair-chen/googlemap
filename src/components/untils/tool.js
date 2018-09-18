//Googlemap's zoom corresponds to zoomlevel
export const zoomMapping = (zoom) => {
  if (1 <= zoom && zoom <= 5) {
    return 0;
  }
  if (6 <= zoom && zoom <= 12) {
    return 1;
  }
  if (13 <= zoom && zoom <= 15) {
    return 2;
  }
  if (16 <= zoom && zoom <= 19) {
    return 3;
  }
  if (20 <= zoom && zoom <= 22) {
    return 4;
  }
};
//traffic flow corresponds to color
export const colorMapping = (flow) => {
  if (0 <= flow && flow < 4) {
    return "#2CA407"
  }
  if (4 <= flow && flow < 8) {
    return "#EBA31C"
  }
  if (8 <= flow && flow < 10) {
    return "#E00E0B"
  }
}

export const isCatains = (source, target) => {
  let sourceright = source + 1;
  let sourceleft = source - 1;
  if (target > sourceleft && target < sourceright) {
    return true;
  }
  return false;
}
export const isCantainsBounds = (prevPosition, newPosition) => {
  if (prevPosition.northeast.lat < newPosition.northeast.lat && prevPosition.northeast.lng < newPosition.northeast.lng) {
    if (prevPosition.sourthwest.lat > newPosition.sourthwest.lat && prevPosition.sourthwest.lng > newPosition.sourthwest.lng) {
      return true;
    }
  }
}
export const spiltBoundingBox = (northeast, sourthwest, zoom) => {
  let boundcenter = {};
  let boundList = [];
  if (zoom < 16) {
    const averageLat = (northeast.lat() - sourthwest.lat()) / 4;
    const averageLng = (northeast.lng() - sourthwest.lng()) / 4;
    // boundList.push({ zoom: zoom, sourthwest: { lat: sourthwest.lat() + 2 * averageLat, lng: sourthwest.lng() + averageLng }, northeast: { lat: sourthwest.lat() + 3 * averageLat, lng: sourthwest.lng() + 2 * averageLng } });
    // boundList.push({ zoom: zoom, sourthwest: { lat: sourthwest.lat() + 2 * averageLat, lng: sourthwest.lng() + 2 * averageLng }, northeast: { lat: sourthwest.lat() + 3 * averageLat, lng: sourthwest.lng() + 3 * averageLng } });
    // boundList.push({ zoom: zoom, sourthwest: { lat: sourthwest.lat() + averageLat, lng: sourthwest.lng() + averageLng }, northeast: { lat: sourthwest.lat() + 2 * averageLat, lng: sourthwest.lng() + 2 * averageLng } });
    // boundList.push({ zoom: zoom, sourthwest: { lat: sourthwest.lat() + averageLat, lng: sourthwest.lng() + 2 * averageLng }, northeast: { lat: sourthwest.lat() + 2 * averageLat, lng: sourthwest.lng() + 3 * averageLng } });
    boundcenter = {
      zoom: zoom,
      sourthwest: {
        lat: sourthwest.lat() + averageLat,
        lng: sourthwest.lng() + averageLng
      },
      northeast: {
        lat: northeast.lat() + averageLat,
        lng: northeast.lng() + averageLng
      }
    };
    boundList.push({
      zoom: zoom,
      northeast: { lat: sourthwest.lat() + averageLat, lng: northeast.lng() },
      sourthwest: { lat: sourthwest.lat(), lng: sourthwest.lng() }
    });
    boundList.push({
      zoom: zoom,
      northeast: { lat: northeast.lat(), lng: northeast.lng() },
      sourthwest: {
        lat: sourthwest.lat() + 3 * averageLat,
        lng: sourthwest.lng()
      }
    });
    boundList.push({
      zoom: zoom,
      northeast: {
        lat: sourthwest.lat() + 3 * averageLat,
        lng: sourthwest.lng() + averageLng
      },
      sourthwest: {
        lat: sourthwest.lat() + averageLat,
        lng: sourthwest.lng()
      }
    });
    boundList.push({
      zoom: zoom,
      northeast: {
        lat: sourthwest.lat() + 3 * averageLat,
        lng: northeast.lng()
      },
      sourthwest: {
        lat: sourthwest.lat() + averageLat,
        lng: sourthwest.lng() + 3 * averageLng
      }
    });
  } else {
    boundcenter = {
      zoom: zoom,
      sourthwest: {
        lat: sourthwest.lat() + averageLat,
        lng: sourthwest.lng() + averageLng
      },
      northeast: {
        lat: northeast.lat() + averageLat,
        lng: northeast.lng() + averageLng
      }
    };
  }
  return { "boundList": boundList, "boundcenter": boundcenter };
}
export const getCenter = (key) => {
  switch (key) {
    case "EU": return { lat: 52.3555, lng: 1.1743 };
    case "CN": return { lat: 39.9042, lng: 116.4074 };
    case "ANZ": return { lat: -33.88658145569154, lng: 151.13988831025813 };
    case "KOR": return { lat: 35.9078, lng: 127.7669 };
    case "NA": return { lat: 43.5260, lng: -105.255 };
    case "SA": return { lat: -15.45, lng: -47.57 }
  }
}

