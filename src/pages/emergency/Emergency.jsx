import { useEffect, useRef, useState } from 'react';
import '../../assets/style/emergency.css';
import { images } from '../../utils/images';
import EmergencySearch from './EmergencySearch';
import EmergencyList from './EmergencyList';
import EmergencyDetail from './EmergencyDetail';
import axios from 'axios';

// 컴포넌트로 따로 분리 고민
const SimpleDetail = ({selectedEmergency}) => {
    return (
        <div className="simple-detail">
            <h2 className="emergency-name b25mc">{selectedEmergency.dutyName}</h2>
            <div className="hospital-detail">
                <div>종합상황판이 없어요.</div>
                <button className="button r17w">병원 상세보기</button>
            </div>
        </div>
    );
}

const Emergency = ()=>{
    const {Tmapv2} = window;
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]);
    const [realResults, setRealResults] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedEmergency, setSelectedEmergency] = useState(null);
    const [selectedSido, setSelectedSido] = useState("");
    const [region, setRegion] = useState("");
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const API_BASE_URL = "https://apis.data.go.kr/B552657/ErmctInfoInqireService";

    // 지도
    useEffect(() => {
        const mapDiv = document.getElementById("map_div");
        if(!mapDiv.firstChild) {
            // Geolocation API로 현재 위치 가져오기
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLat = position.coords.latitude;
                        const userLng = position.coords.longitude;

                        if(Tmapv2){
                            const map = new Tmapv2.Map("map_div", {
                                center: new Tmapv2.LatLng(userLat, userLng),
                                zoom: 15,
                            });
                            mapRef.current = map;
                        } else {
                            console.error("Tmap API 가 로드되지 않았습니다.");
                        }
                    },
                    (error) => {
                        console.error("현재 위치를 가져올 수 없습니다: ", error);

                        // 실패 시 기본 좌표로 지도 표시
                        if(Tmapv2) {
                            const map = new Tmapv2.Map("map_div", {
                                center: new Tmapv2.LatLng(37.566481622437934,126.98502302169841), // 지도 초기 좌표
                                zoom: 15,
                            });
                            mapRef.current = map;
                        }
                    }
                )
            } else {
                console.error("Geolocation API를 사용할 수 없습니다.");
            }
        }
    }, []);

    // 응급실 api 
    const getSearchResults = async ({selectedSido, region, keyword}) => {
        setSelectedSido(selectedSido);
        setRegion(region);

        try {
            const [response1, response2] = await axios.all([
                // 응급실 실시간 가용병상정보 조회
                axios.get(`${API_BASE_URL}/getEmrrmRltmUsefulSckbdInfoInqire`, {
                    params: {
                        serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                        STAGE1: selectedSido,
                        STAGE2: region,
                        pageNo: 1,
                        numOfRows: 30
                    },
                }),
                // 기관 정보 
                axios.get(`${API_BASE_URL}/getEgytListInfoInqire`, {
                    params: {
                        serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                        Q0: selectedSido,
                        Q1: region,
                        pageNo: 1,
                        numOfRows: 30
                    },
                }),
            ]);

            const realTime = response1.data?.response?.body?.items?.item || [];
            const organList = response2.data?.response?.body?.items?.item || [];

            // 데이터 병합
            const realData = organList.map((organItem) => {
                const realItem = realTime.find((real) => real.hpid === organItem.hpid);
                return {...organItem, ...realItem};
            })

            // keyword 기반 필터링
            const filteredData = keyword ? realData.filter((item) => 
                item.dutyName?.includes(keyword) || item.dutyAddr?.includes(keyword)
            )
            : realData;
            
            setRealResults(filteredData);
            
            // 이전 선택된 마커 제거
            if(selectedMarker) {
                selectedMarker.setMap(null);
                setSelectedMarker(null);
            }
            
            // 기존 마커 리스트 제거
            markers.forEach((marker) => marker.setMap(null));
            setMarkers([]);
            
            // 새 마커 추가
            const listMarkers = filteredData.map((emergency) => {
                const {wgs84Lat: latitude, wgs84Lon: longitude} = emergency;
                const marker = new Tmapv2.Marker({
                    position: new Tmapv2.LatLng(latitude, longitude),
                    map: mapRef.current,
                });
                return marker;
            });
            setMarkers(listMarkers);

        } catch (error) {
            console.error("api 요청 실패한 이유: ", error);
        }
    };

    // 클릭된 응급실
    const handleEmergencyClick = (selectedEmergency) => {
        // 종합상황판 열기
        setSelectedEmergency(selectedEmergency);
        setIsDetailOpen(true);
        
        if(selectedMarker) { 
            selectedMarker.setMap(null);
            setSelectedMarker(null);
        }
        
        markers.forEach((marker) => marker.setMap(null));
        setMarkers([]);

        const {wgs84Lat: latitude, wgs84Lon: longitude} = selectedEmergency;
        const marker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(latitude, longitude),
            map: mapRef.current,
        });

        setSelectedMarker(marker);
        mapRef.current.setCenter(new Tmapv2.LatLng(latitude, longitude));
    };

    // 종합상환판 닫힘
    const handleCloseDetail = () => {
        if(selectedMarker) { 
            selectedMarker.setMap(null);
        }
        setSelectedEmergency(null);
        setIsDetailOpen(false);
        setSelectedMarker(null);
    }

    return (
        <div id="emergency" className="emergency-container">
            <div id="map_div" className="map-background" ></div>
            <div className="sidebar scroll">
                <EmergencySearch onSearch={getSearchResults} />
                <div className="total-count r15b">총 {realResults.length} 건</div>
                <EmergencyList results={realResults} onClick={handleEmergencyClick} />
            </div>
            {isDetailOpen && (
                <div className={selectedEmergency?.dutyEmclsName === "응급실운영신고기관" ? "simple-detail" : "situation-board scroll"}>
                    {selectedEmergency ? ( 
                        selectedEmergency.dutyEmclsName === "응급실운영신고기관" ? (
                            <>
                                <h2 className="emergency-name b25mc">{selectedEmergency.dutyName}</h2>
                                <div className="hospital-detail">
                                    <div>종합상황판이 없어요.</div>
                                    <button className="button r17w">병원 상세보기</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="top-title">
                                    <div className="name r20b">응급실 종합상황판</div>
                                    <button className="close-button" onClick={handleCloseDetail}>
                                        <img src={images['close16.png']} alt="닫기" />
                                    </button>
                                </div>
                                <EmergencyDetail selectedEmergency={selectedEmergency} selectedSido={selectedSido} region={region} />
                            </>
                        )
                    ) : (
                        <div>선택된 응급실 정보가 없습니다.</div>
                    )}
                </div>
            )}
        </div>
    );
}
export default Emergency;