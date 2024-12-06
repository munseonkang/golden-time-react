// import axios from "axios";
// import { useState } from "react";

// const FindRoute = ({ startLocation, destination, map, markerImage, children }) => {
//     const [markers, setMarkers] = useState([]);
//     const [routeLayer, setRouteLayer] = useState(null);

//     // 마커 제거
//     const removeMarkers = () => {
//         markers.forEach(marker => {
//             marker.setMap(null);
//         });
//         setMarkers([]); 
//     };

//     // 경로 제거
//     const removeRouteLayer = () => {
//         if(routeLayer) {
//             routeLayer.setMap(null);
//             setRouteLayer(null);
//         }
//     };

//     //길찾기 API
//     const getRP = async () => {
//         if(startLocation && destination) {
//             const requestData = {
//                 startX: startLocation.longitude,
//                 startY: startLocation.latitude, 
//                 endX: destination.wgs84Lon, 
//                 endY: destination.wgs84Lat,
//                 reqCoorType: "WGS84GEO", //내 요청에 제공하는 좌표형식
//                 resCoordType: "EPSG3857",  //api가 응답으로 반환하는 좌표형식
//                 searchOption: '0',
//                 trafficInfo: "Y",
//             };
        
//             const headers = {
//                 appKey: process.env.REACT_APP_TMAP_APP_KEY
//             }
        
//             try {
//                 const response = await axios.post ("https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result", 
//                     requestData,
//                     { headers: headers }
//                 ); 

//                 // 결과 데이터 처리
//                 const resultData = response.data.features;

//                 // 경로 표시
//                 drawRoute(resultData);
                
//             } catch (error) {
//                 console.log("경로 요청 실패: ", error);
//             }

//         } else {
//             console.error("현재 위치 정보를 가져올 수 없습니다.");
//         }
//     };

//     // 경로 그리기
//     const drawRoute = (routeData) => {
//         const path = []; //경로 좌표 저장 배열

//         // 경로 데이터를 기반으로 Polyline 생성
//         routeData.forEach((item) => {
//             const geometry = item.geometry;
//             if(geometry.type === "LineString") {
//                 geometry.coordinates.forEach((coord) => {
//                     // EPSG3857 좌표를 WGS84 좌표로 변환
//                     const point = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
//                         new Tmapv2.Point(coord[0], coord[1])
//                     );
//                     path.push(new Tmapv2.LatLng(point._lat, point._lng));
//                 });
//             }
//         });

//         // Polyline 생성
//         const polyline = new Tmapv2.Polyline({
//             path,
//             strokeColor: "#FF0000",
//             strokeWeight: 4,
//             map: map,
//         });

//         setRouteLayer(polyline);

//         // 지도 중심 좌표 설정
//         if(path.length > 0) {
//             map.setCenter(path[0]);
//             map.setZoom(14);
//         }

//         // 도착 마커
//         if(selectedPharm) {
//             const endPoint = new Tmapv2.LatLng(destination.wgs84Lat, destination.wgs84Lon);
//             const endMarker = new Tmapv2.Marker({
//                 position: endPoint,
//                 map: map,
//                 icon: markerImage,
//                 label: destination.dutyName,
//             });

//             setMarkers((prevMarkers) => [...prevMarkers, endMarker]);
//         }
//     };

//     // 길찾기 실행
//     const handleRP = () => {
//         removeMarkers(); //마커 삭제
//         removeRouteLayer(); //경로 삭제
//         getRP(selectedPharm); 
//     };

//     return (
//         <div onClick={handleRP}>
//             {children || <button>깇찾기</button>}
//         </div>
//     );
// };
// export default FindRoute;