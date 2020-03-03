$(document).ready(function() {
  let page = window.location.pathname
    .split("/")
    .pop()
    .split(".")[0];
  let slide = "./slides/" + page + "/{z}/{y}/{x}.jpg";
  console.log(page);
  let map = L.map("map", {
    center: [0, 0],
    zoom: 3
  });

  let layer = new L.tileLayer(slide, {
    //the image directory is here
    minZoom: 3,
    maxZoom: 8,
    continousWorld: false,
    noWrap: true
  });
  map.addLayer(layer);

  //Disable draggin on minZoom
  map.dragging.disable();

  //Mini Map
  let layer2 = new L.TileLayer(slide, {
    minZoom: 0,
    maxZoom: 0,
    continousWorld: false,
    noWrap: true
  });
  let miniMap = new L.Control.MiniMap(layer2, {
    centerFixed: [0, 0],
    zoomLevelFixed: 0,
    toggleDisplay: true,
    width: 225
  }).addTo(map);

  let coord;
  map.on("click", function(e) {
    coord = e.latlng;
    let lat = coord.lat;
    let lng = coord.lng;
    console.log(
      "You clicked the map at latitude: " + lat + " and longitude: " + lng
    );

    // L.marker([lat, lng]).addTo(map);
  });
  L.marker([7.36246686553575, -49.5703125])
    .bindPopup("Test")
    .addTo(map);
  console.log(map.getBounds());

  map.on("zoomend", function() {
    var zoomlevel = map.getZoom();
    if (zoomlevel > 3) map.dragging.enable();
    else {
      map.setView([0, 0]);
      map.dragging.disable();
    }
  });
});
