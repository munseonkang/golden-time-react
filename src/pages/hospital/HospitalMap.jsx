import { useEffect, useState } from "react";
import { images } from '../../utils/images';

const HospitalMap = ({ 
    setRegion, 
    hospitalData, 
    isDetailOpen,
    handleOpenDetail,
    selectedHospital
 }) => {
    const { Tmapv2 } = window;
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    // const [latitude, setLatitude] = useState(37.297305);
    // const [longitude, setLongitude] = useState(127.010610);
    
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
    
    // TMAP API를 사용해서 위도,경도를 주소로 변환
    const getAddress = async (latitude, longitude) => {
        const appKey = process.env.REACT_APP_TMAP_APP_KEY;
        const version = "1";
        const url = `https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=${version}&lat=${latitude}&lon=${longitude}&appKey=${appKey}`;
        
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
            console.log("위도:", latitude, "경도:", longitude);
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
        }
    }, [latitude, longitude]);
    
    useEffect(()=>{
        createMarkers();
    },[hospitalData])

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
                        handleOpenDetail(hospital, hospital.rnum-1);  // hospital 객체를 전달하여 handleOpenDetail 호출
                    });
    
                    // 상태에 마커 추가
                    setMarkers(prevMarkers => [...prevMarkers, marker]);

                }
            });
        }
    };
    
    // 모든 마커를 제거
    const removeMarkers = () => {
        markers.forEach(marker => {
            marker.setMap(null);
        });
        setMarkers([]);
    };

    return (
        <div className="map">
            <div id="map_div"></div>
            {isDetailOpen  &&
                <button id="naviButton">
                    <img src={images['navi_icon.png']} />
                </button>
            }
        </div>
    );
};

export default HospitalMap;
