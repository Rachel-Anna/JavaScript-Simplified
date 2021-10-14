const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoicm9vemEiLCJhIjoiY2tzaGhwamFpMDBjbjJ2cjR0Nnh3empkdyJ9.3SDOf20iIrsz-74ruoZBQQ";

var map = new mapboxgl.Map({
  accessToken: MAPBOX_ACCESS_TOKEN,
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
});
