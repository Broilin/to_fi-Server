const {kakao} = window;

export default function makeMarker(data, {map}, infoWindows, markers) {
  const lating = new kakao.maps.LatLng(parseFloat(data.y), parseFloat(data.x));
  const markerPosition = lating;

  const marker = new kakao.maps.Marker({
    position: markerPosition,
    clickable: true,
  });

  marker.setMap(map);
  markers.push(marker);

  const iwContent = `<div style = "padding:5px;">${data.name}</div>`;
  const infoWindow = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: true,
  });
  kakao.maps.event.addListener(marker, 'click', function () {
    while (infoWindows.length !== 0) {
      infoWindows.pop().close();
    }
    infoWindow.open(map, marker);
    infoWindows.push(infoWindow);
    map.panTo(lating);
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({id: data.id}));
    }
  });
}
