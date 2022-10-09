import {useEffect, useRef} from 'react';
import styled from 'styled-components';
import datas from '../tmpdata/mock';

const {kakao} = window;

const MapContainer = styled.div({
  width: '100%',
  height: '100vh',
});

const Map = () => {
  const container = useRef(null);

  const initMap = () => {
    const center = datas[0].lating;
    const options = {
      center,
      level: 6,
    };
    const map = new kakao.maps.Map(container.current, options);

    datas.forEach(function (data) {
      const markerPosition = data.lating;

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        clickable: true,
      });

      marker.setMap(map);

      const iwContent = `<div style = "padding:5px;">${data.name}</div>`;
      const infoWindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: true,
      });
      kakao.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({id: data.id}));
        }
      });
    });
  };
  useEffect(() => {
    initMap();
  }, []);

  return <MapContainer id="KakaoMap" ref={container} />;
};

export default Map;
