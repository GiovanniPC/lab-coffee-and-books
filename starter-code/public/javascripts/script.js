document.addEventListener('DOMContentLoaded', () => {
  const markers = [];

  const ironhackSP = {
    lat: -23.5617375,
    lng: -46.6601331,
  };

  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 10,
      center: ironhackSP,
    },
  );

  const placeMarkers = (marker) => {
    marker.forEach((markerr) => {
      const center = {
        lat: markerr.location.coordinates[1],
        lng: markerr.location.coordinates[0],
      };
      const pin = new google.maps.Marker({
        position: center,
        map,
        title: markerr.name,
      });
      markers.push(pin);
    });
  };

  const getMarkers = () => {
    axios.get('/api')
      .then((response) => {
        placeMarkers(response.data.shops);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  getMarkers();
}, false);
