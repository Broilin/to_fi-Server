import {useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const {kakao} = window;

const MapContainer = styled.div({
  width: '100%',
  height: '100vh',
});

const Map = () => {
  const container = useRef(null);

  const initMap = datas => {
    const centerlating = new kakao.maps.LatLng(
      parseFloat(datas[0].y),
      parseFloat(datas[0].x),
    );
    const center = centerlating;
    const options = {
      center,
      level: 3,
    };
    const map = new kakao.maps.Map(container.current, options);

    datas.forEach(function (data) {
      const lating = new kakao.maps.LatLng(
        parseFloat(data.y),
        parseFloat(data.x),
      );
      const markerPosition = lating;

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
          window.ReactNativeWebView.postMessage(
            JSON.stringify({id: +data.id[0]}),
          );
        }
      });
    });
  };
  useEffect(() => {
    axios
      .get('/position/all')
      .then(result => {
        const datas = JSON.parse(result.data);
        console.log(datas);
        initMap(datas.rows);
      })
      .catch(err => console.log(err));
  }, []);

  return <MapContainer id="KakaoMap" ref={container} />;
};

export default Map;
