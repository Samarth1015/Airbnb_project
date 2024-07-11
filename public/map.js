mapboxgl.accessToken = map_token;
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: coordinate, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 10, // starting zoom
});

const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordinate)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `${listing.location}<h4>${listing.title}</h4>`
    )
  )

  .addTo(map);
