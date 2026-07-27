mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: coordinates,
  zoom: 11,
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker({ color: "#FF385C" })
  .setLngLat(coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <h6>${listingTitle}</h6>
        <p>Exact location provided after booking.</p>
      `)
  )
  .addTo(map);