import {useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import makeMarker from './markerMaker';

const {kakao} = window;

const MapContainer = styled.div({
  width: '100%',
  height: '100vh',
});

const Map = () => {
  const container = useRef(null);
  const infoWindows = useRef([]);
  const markers = useRef([]);
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

    datas.forEach(data =>
      makeMarker(data, {map}, infoWindows.current, markers.current),
    );

    const clusterer = new kakao.maps.MarkerClusterer({
      map,
      gridSize: 80,
      averageCenter: true,
      minLevel: 4,
    });

    clusterer.addMarkers(markers.current.map(marker => marker));
  };
  useEffect(() => {
    axios
      .get('/position/all')
      .then(result => {
        const datas = JSON.parse(result.data);
        initMap(datas.rows);
      })
      .catch(err => {
        throw err;
      });
  }, []);

  return <MapContainer id="KakaoMap" ref={container} />;
};

export default Map;
