import { useEffect, useState } from "react";
import { images } from '../../utils/images';

const HospitalMap = ({ 
    setRegion, 
    hospitalData, 
    isDetailOpen,
    setIsDetailOpen,
    handleOpenDetail,
    selectedHospital
 }) => {
    const { Tmapv2 } = window;
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [currentMarker, setCurrentMarker] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [routeLayer, setRouteLayer] = useState(null);
    
    // 사용자의 현재 위치(위도, 경도)를 가져오는 함수
    const getLocation = async () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                        resolve({ latitude, longitude });

                        getAddress(latitude, longitude);
                    },
                    (error) => {
                        console.error("위치 정보를 가져오는 데 실패했습니다.", error);
                        reject(error);
                    }
                );
            } else {
                alert("Geolocation을 지원하지 않는 브라우저입니다.");
                reject(new Error("Geolocation not supported"));
            }
        });
    };

    // 현재 위치 마커 생성 및 지도에 표시
    const showCurrentMarker = () => {
        if (map && latitude && longitude) {
            // 기존의 현재 위치 마커 제거
            removeCurrentMarker();

            const nowMarker = new Tmapv2.Marker({
                position: new Tmapv2.LatLng(latitude, longitude),
                map: map,
                icon: images['marker_current.png'], // 현재 위치를 표시할 커스텀 마커 이미지
            });
            nowMarker.setLabel(`<span style="position:relative; display:inline-block; padding:3px 5px; border-radius:3px;background-color:#1e7fff; color:white; z-index:1000;">현재위치</span>`);

            setCurrentMarker(nowMarker);
        }
    };

    const removeCurrentMarker = () => {
        if(currentMarker !== null) {
            setCurrentMarker(null)
        }
    };
    
    // TMAP API를 사용해서 위도,경도를 주소로 변환
    const getAddress = async (latitude, longitude) => {
        const appKey = process.env.REACT_APP_TMAP_APP_KEY;
        const url = `https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=${latitude}&lon=${longitude}&appKey=${appKey}`;
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
            const data = await response.json();
            if (data) {
                const cityDo = data.addressInfo.city_do; // 시/도
                const sigungu = data.addressInfo.gu_gun; // 시/군/구
                setRegion({
                    sido: cityDo,
                    sigungu: sigungu,
                });
            }
        } catch (error) {
            console.error("주소 변환 오류: ", error);
        }
    };

    // TMAP 초기화
    const initTmap = () => {
        const mapDiv = document.getElementById('map_div');
        if (!mapDiv.firstChild && latitude && longitude) {
            // console.log("위도:", latitude, "경도:", longitude);
            const tmap = new Tmapv2.Map("map_div", {
                center: new Tmapv2.LatLng(latitude, longitude), // 지도 초기 좌표
                width: "100%",
                height: "calc(100vh - 70px)",
                zoom: 15
            });
            setMap(tmap);
        }
    };

    // 컴포넌트가 마운트될 때 위치를 가져오고 지도 초기화
    useEffect(() => {
        const initialize = async () => {
            try {
                const location = await getLocation();
                await getAddress(location.latitude, location.longitude);
            } catch (error) {
                console.error("초기화 오류:", error);
            }
        };
        initialize();
    }, [setRegion]);

    // 위치 값이 설정된 이후에 TMAP 초기화
    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            initTmap();
            showCurrentMarker();
        }
    }, [latitude, longitude]);
    
    // 병원 리스트 클릭시 해당병원을 중심으로 이동
    const focusOnHospital = (selectedHospital) => {
        const { wgs84Lat, wgs84Lon } = selectedHospital;

        if (map && wgs84Lat && wgs84Lon) {
            const position = new Tmapv2.LatLng(wgs84Lat, wgs84Lon);
            map.setCenter(position);
            map.setZoom(16);
        }
    };
    useEffect(() => {
        if (selectedHospital) {
            focusOnHospital(selectedHospital);
        }
        // 기존 경로 레이어 제거
        if (routeLayer) {
            routeLayer.setMap(null); // 기존 경로 레이어 제거
            setRouteLayer(null);
        }
    }, [selectedHospital]);
    
    // 병원 배열 받아서 위치값 기준으로 마커 생성
    const createMarkers = () => {
        if (hospitalData) { 
            removeMarkers();
    
            hospitalData.forEach((hospital) => {
                const lat = hospital.wgs84Lat;
                const lon = hospital.wgs84Lon;
                const title = hospital.dutyName;
                const markerImage = images['marker_hospital.png']; 
                
                if (lat && lon) {
                    const position = new Tmapv2.LatLng(lat, lon);
                    const marker = new Tmapv2.Marker({
                        position: position,
                        map: map, // 마커가 표시될 Map 객체
                        icon: markerImage,
                    });

                    // label(병원 이름) hover효과
                    marker.addListener("mouseenter", function(evt) {
                        marker.setLabel('<span style="position:relative; display:inline-block; padding:3px 5px; border-radius:3px; background-color: #fc7486; color:white; z-index:1000;">'+title+'</span>');
                    });
                    marker.addListener("mouseleave", function(evt) {
                        marker.setLabel(''); 
                    });

                    marker.addListener("click", function(evt) {
                        handleOpenDetail(hospital, hospital.rnum-1);
                    });
    
                    // 상태에 마커 추가
                    setMarkers(prevMarkers => [...prevMarkers, marker]);

                }
            });
        }
    };
    useEffect(()=>{
        createMarkers();
        showCurrentMarker();
    },[hospitalData])
    
    // 모든 마커를 제거
    const removeMarkers = () => {
        markers.forEach(marker => {
            marker.setMap(null);
        });
        setMarkers([]);
    };

    // 경로 삭제
    const removeRouteLayer = () => {
        if (routeLayer) {
            routeLayer.setMap(null);
            setRouteLayer(null);
        }
    };


    // POST 방식으로 길찾기 API 호출
    const getRouteWithPost = async () => {
        if (!latitude || !longitude || !selectedHospital?.wgs84Lat || !selectedHospital?.wgs84Lon) {
            console.log("길찾기 실패, 필수 데이터 없음");
            return;
        }

        const requestData = {
            startX: longitude,
            startY: latitude,
            endX: selectedHospital.wgs84Lon,
            endY: selectedHospital.wgs84Lat,
            reqCoorType: "WGS84GEO", // 요청 좌표 형식
            resCoordType: "EPSG3857", // 응답 좌표 형식
            searchOption: "0",
            trafficInfo: "N", // 교통 정보 포함 여부
        };

        const headers = {
            appKey: process.env.REACT_APP_TMAP_APP_KEY, // 환경 변수에서 API 키 읽기
        };

        try {
            const response = await fetch("https://apis.openapi.sk.com/tmap/routes?version=1&format=json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();
            console.log("경로 응답 데이터:", data);

            if (data.features) {
                drawRoute(data.features);
            } else {
                console.log("경로 데이터가 없거나 오류 발생");
            }
        } catch (error) {
            console.error("경로 요청 실패:", error);
        }
    };

    // 경로 그리기
    const drawRoute = (routeData) => {
        const path = []; // 경로 좌표 저장 배열

        // 기존 경로 레이어 제거
        if (routeLayer) {
            routeLayer.setMap(null); // 기존 경로 레이어 제거
            setRouteLayer(null);
        }

        // 최근 마커 제거 (마지막 두 개: 현재 위치와 목적지 마커)
        if (markers.length >= 2) {
            const lastMarkers = markers.slice(-2); // 마지막 두 개 마커 가져오기
            lastMarkers.forEach(marker => marker.setMap(null)); // 지도에서 제거
            setMarkers(markers.slice(0, -2)); // 상태에서 마지막 두 개 제거
        }


        routeData.forEach((item) => {
            const geometry = item.geometry;
            if (geometry.type === "LineString") {
                geometry.coordinates.forEach((coord) => {
                    // EPSG3857 좌표를 WGS84GEO 좌표로 변환
                    const point = Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                        new Tmapv2.Point(coord[0], coord[1])
                    );
                    path.push(new Tmapv2.LatLng(point._lat, point._lng));
                });
            }
        });

        if (path.length > 0) {
            // Polyline 생성
            const polyline = new Tmapv2.Polyline({
                path,
                strokeColor: "#FF0000", // 경로 색상
                strokeWeight: 4, // 경로 두께
                map: map,
            });

            setRouteLayer(polyline);

            // 경로가 그려지면, 경로의 경계가 포함되도록 지도 줌 레벨 자동 설정
            const bounds = new Tmapv2.LatLngBounds();
            path.forEach(latLng => bounds.extend(latLng));

            // 경로를 감싸도록 지도 중앙과 줌 설정
            map.setCenter(bounds.getCenter());
            map.fitBounds(bounds);

            // 현재 위치 마커 추가
            const currentMarker = new Tmapv2.Marker({
                position: new Tmapv2.LatLng(latitude, longitude),
                map,
                icon: images["marker_current.png"],
            });
    
            // 목적지 마커 추가
            const destinationMarker = new Tmapv2.Marker({
                position: new Tmapv2.LatLng(selectedHospital.wgs84Lat, selectedHospital.wgs84Lon),
                map,
                icon: images["marker_hospital.png"],
            });
            destinationMarker.setLabel(`<span style="position:relative; display:inline-block; padding:3px 5px; border-radius:3px;background-color:#fc7486; color:white; z-index:1000;">`+selectedHospital.dutyName+`</span>`);
    
            setMarkers((prevMarkers) => [...prevMarkers, currentMarker, destinationMarker]);
        }
    };

    // 길찾기 실행
    const handleFindRoute = () => {
        removeRouteLayer(); // 기존 경로 제거
        getRouteWithPost(); // POST 방식으로 경로 탐색 실행
        setIsDetailOpen(false);
    };


    // // 길찾기 API
    // const getRoute = async () => {
    //     if(!latitude || !longitude || !selectedHospital?.wgs84Lat || !selectedHospital?.wgs84Lon) {
    //         console.log("길찾기 실패, 필수 데이터 없음");
    //         return;
    //     }

    //     const appKey = process.env.REACT_APP_TMAP_APP_KEY;
    //     const startLat = latitude;
    //     const startLon = longitude;
    //     const endLat = selectedHospital.wgs84Lat;
    //     const endLon = selectedHospital.wgs84Lon;

    //     try {
    //         const response = await fetch(`https://apis.openapi.sk.com/tmap/routes?version=1&format=json&appKey=${appKey}&startX=${startLon}&startY=${startLat}&endX=${endLon}&endY=${endLat}&searchOption=0`, { method: 'GET' });
    //         const data = await response.json();
    //         console.log("경로 응답 데이터:", data);
    
    //         if (data.features.length > 0) {
    //             const routeData = data.features[0].geometry.coordinates; // 첫 번째 경로 선택
    //             console.log("경로 데이터:", routeData);
    
    //             // 경로를 지도에 표시하기 위해 경로 레이어 생성
    //             if (routeLayer) {
    //                 routeLayer.setMap(null);  // 기존 경로 레이어 제거
    //             }
    
    //             // 받아온 경로데이터로 라인그리기
    //             const routeCoords = routeData.map(coord => new Tmapv2.LatLng(coord[1], coord[0]));

    //             const route = new Tmapv2.Polyline({
    //                 path: routeCoords,
    //                 strokeColor: "#0000FF",
    //                 strokeWeight: 5,
    //                 map: map,
    //             });
    //             console.log("map 객체:", map);

    //             // 새 경로 레이어 설정
    //             setRouteLayer(route);
    //         } else {
    //             console.log("경로 데이터가 없거나 오류 발생");
    //         }
    //     } catch (error) {
    //         console.error("경로 요청 오류:", error);
    //     }
    // }

    // 길찾기 실행
    // const handleFindRoute = () => {
    //     // removeMarkers(); // 마커 삭제
    //     removeRouteLayer(); // 기존 경로 삭제
    //     getRoute(); // 경로 탐색 실행
    //     setIsDetailOpen(false);
    // };

    return (
        <div className="map">
            <div id="map_div"></div>
            {isDetailOpen  &&
                <button id="naviButton" onClick={handleFindRoute}>
                    <img src={images['navi_icon.png']} alt=""/>
                </button>
            }
        </div>
    );
};

export default HospitalMap;
