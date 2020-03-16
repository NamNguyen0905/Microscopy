$(document).ready(function() {
  let page = localStorage.getItem("slide");

  //Get URL to given slide
  let slide = "../slides/" + page + "/{z}/{y}/{x}.jpg";
  let map = L.map("map", {
    center: [0, 0],
    zoom: 2
  });

  let layer = new L.tileLayer(slide, {
    minZoom: 2,
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

  //Side bar
  let sidebar = L.control.sidebar("sidebar").addTo(map);

  //Get click_coordinate
  let coord;
  let markers = [];
  let remove_coordinate;
  map.on("click", function(e) {
    console.log(
      "You clicked the map at latitude: " +
        e.latlng.lat +
        " and longitude: " +
        e.latlng.lng
    );

    let marker = L.marker([e.latlng.lat, e.latlng.lng])
      .bindPopup("")
      .addTo(map);

    marker.on("click", function(e) {
      remove_coordinate = e.latlng;
      console.log(
        "Your marker is at latitude: " +
          e.latlng.lat +
          " and longitude: " +
          e.latlng.lng
      );
    });

    markers.push(marker);
  });

  //Sample markers
  let marker_1 = L.marker([7.36246686553575, -49.5703125])
    .bindPopup("Test 1")
    .addTo(map);

  let marker_2 = L.marker([8.407168163601076, -4.570312500000001])
    .bindPopup("Test 2")
    .addTo(map);

  marker_1.on("click", function(e) {
    remove_coordinate = e.latlng;
    console.log(
      "Your marker is at latitude: " +
        e.latlng.lat +
        " and longitude: " +
        e.latlng.lng
    );
  });

  marker_2.on("click", function(e) {
    remove_coordinate = e.latlng;
    console.log(
      "Your marker is at latitude: " +
        e.latlng.lat +
        " and longitude: " +
        e.latlng.lng
    );
  });
  markers.push(marker_1);
  markers.push(marker_2);

  // miniMap.on("click", function(e) {
  //   coord = e.latlng;
  //   let lat = coord.lat;
  //   let lng = coord.lng;
  //   console.log(
  //     "You clicked the map at latitude: " + lat + " and longitude: " + lng
  //   );
  // });

  //Disable dragging on minZoom
  map.on("zoomend", function() {
    var zoomlevel = map.getZoom();
    if (zoomlevel > 2) map.dragging.enable();
    else {
      map.setView(map.getCenter());
      map.dragging.disable();
    }
  });

  //Function to remove marker
  let remove_marker;
  $('input[type="button"]').on("click", function() {
    for (let i = 0; i < markers.length; i++)
      if (markers[i]._latlng == remove_coordinate) {
        remove_marker = markers[i];
        markers.splice(i, 1);
        break;
      }

    remove_marker.remove();
  });

  //Function to edit annotation
  let edit_marker;
  $('input[type="text"]').keypress(function(e) {
    for (let i = 0; i < markers.length; i++)
      if (markers[i]._latlng == remove_coordinate) {
        edit_marker = markers[i];
        break;
      }
    if (!e) e = window.event;
    let keyCode = e.keyCode || e.which;
    if (keyCode == "13") {
      edit_marker._popup.setContent($('input[type="text"]').val());
      return false;
    }
  });
});
