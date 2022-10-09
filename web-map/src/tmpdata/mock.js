import toiletData from './toiletData.json';

const {kakao} = window;

const datas = [];

export function setData() {
  datas.splice(0, datas.length);
  const keyList = Object.keys(toiletData);

  keyList.forEach(key => {
    const toilet = toiletData[key];
    if (toilet.xcor !== 'error') {
      const data = {
        id: key,
        name: toilet['화장실명'],
        lating: new kakao.maps.LatLng(
          parseFloat(toilet.ycor),
          parseFloat(toilet.xcor),
        ),
      };
      datas.push(data);
    }
  });
}
export default datas;
