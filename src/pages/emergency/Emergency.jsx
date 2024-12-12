import { useContext, useEffect, useRef, useState } from 'react';
import { images } from '../../utils/images';
import EmergencySearch from './EmergencySearch';
import EmergencyList from './EmergencyList';
import EmergencyDetail from './EmergencyDetail';
import axios from 'axios';
import HospitalDetail from '../hospital/HospitalDetail';

import FindRoute from '../../components/FindRoute';
import { mainContext } from '../../App';

const Emergency = ()=>{
    const {Tmapv2} = window;
    const markerImage = images['marker_emergency.png'];
    const markerImage2 = images['marker_current.png'];

    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [routeLayer, setRouteLayer] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [currentMarker, setCurrentMarker] = useState(null);
    const [realResults, setRealResults] = useState([]); //검색결과
    const [selectedEmergency, setSelectedEmergency] = useState(null);
    const [region, setRegion] = useState({sido:"", sigungu:""});
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isBoardDetailOpen, setIsBoardDetailOpen] = useState(false); //종합상황판 열림 여부
    const [isBoardDetailVisible, setIsBoardDetailVisible] = useState(true); // 초기값: 보이도록 설정
    const [isRouteButtonVisible, setIsRouteButtonVisible] = useState(false); // 길찾기 버튼
    const [sortedResults, setSortedResults] = useState([]);
    const [isDistanceSorted, setIsDistanceSorted] = useState(false); //거리순 정렬상태
    
    // 병원
    const { loginMember } = useContext(mainContext);
    const [isDetailOpen, setIsDetailOpen] = useState(false); //병원 상세보기 열림 여부
    const [selectIndex, setSelectIndex] = useState("");
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [favoriteIndex, setFavoriteIndex] = useState("");
    const [isFavorite, setIsFavorite] = useState(null);

    const API_BASE_URL = "https://apis.data.go.kr/B552657/ErmctInfoInqireService";



    // 지도 초기화, 현재 위치
    useEffect(() => {
        const mapDiv = document.getElementById("map_div");
        if(!mapDiv.firstChild && Tmapv2) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ latitude, longitude });
                    initializeMap(latitude, longitude);
                },
                () => {
                    // 실패 시 기본 좌표
                    initializeMap(37.566481622437934,126.98502302169841);
                }
            );
        }
    }, []);

    // 현재 위치 업데이트
    useEffect(() => {
        if (currentPosition && map) {
            showCurrentMarker();
        }
    }, [currentPosition, map]);

    // 자동검색 - 지역 업데이트
    useEffect(() => {
        if (region.sigungu) {
            removeMarkers();
            setSortedResults([]);
            setIsDistanceSorted(false);
            getSearchResults({ region, keyword: searchKeyword });
            setIsRouteButtonVisible(false);
        }
    }, [region.sigungu, searchKeyword]);

    // 전체 검색 업데이트
    useEffect(() => {
        if (!region.sigungu && searchKeyword.trim()) {
            removeMarkers();
            setSortedResults([]);
            setIsDistanceSorted(false);
            setIsRouteButtonVisible(false);
            getSearchResults({ region: { sido: "", sigungu: "" }, keyword: searchKeyword });
        }
    }, [region, searchKeyword]);

    // 응급실 리스트 업데이트
    useEffect(() => {
        removeMarkers();
        removeRouteLayer();
        setIsRouteButtonVisible(false);
        if (realResults.length > 0) {
            updateMarkers(realResults); 
        }
    }, [realResults]);

    // 응급실 api 요청
    const getSearchResults = async () => {
        const {sido, sigungu} = region;
        try {
            let newSido = sido || "";
            let newSigungu = sigungu || "";

            if(sigungu.split(" ").length >= 2){
                newSido = sigungu.split(" ")[0];
                newSigungu = sigungu.split(" ")[1];
            }

            const params1 = {
                serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                pageNo: 1,
                numOfRows: 600,
            };
    
            const params2 = {
                serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                pageNo: 1,
                numOfRows: 600,
            };

            if (newSido) params1.STAGE1 = newSido;
            if (newSigungu) params2.STAGE2 = newSigungu;

            if (newSido) params2.Q0 = newSido;
            if (newSigungu) params2.Q1 = newSigungu;    

            const [response1, response2] = await axios.all([
                // 응급실 실시간 가용병상정보 조회
                axios.get(`${API_BASE_URL}/getEmrrmRltmUsefulSckbdInfoInqire`, { params: params1 }),
                // 기관 정보 
                axios.get(`${API_BASE_URL}/getEgytListInfoInqire`, { params: params2 }),
            ]);

            const realTime = response1.data?.response?.body?.items?.item;
            const organList = response2.data?.response?.body?.items?.item;
            
            
            const realTimeArray = Array.isArray(realTime) ? realTime : realTime ? [realTime] : [];
            const organListArray = Array.isArray(organList) ? organList : organList ? [organList] : [];

            // 데이터 병합
            const realData = organListArray.map((organItem) => {
                const realItem = realTimeArray.find((real) => real.hpid === organItem.hpid);
                return {...organItem, ...realItem};
            })

            // keyword 기반 필터링
            const filteredData = searchKeyword 
                ? realData.filter((item) => 
                    item.dutyName?.includes(searchKeyword) || item.dutyAddr?.includes(searchKeyword))
                : realData;

            setRealResults(filteredData); //결과 업데이트
        } catch (error) {
            console.error("api 요청 실패한 이유: ", error);
        }
    };
    
    // 지도 초기화 함수
    const initializeMap = (lat, lon) => {
        if(!map && Tmapv2) {
            const newMap = new Tmapv2.Map("map_div", {
                center: new Tmapv2.LatLng(lat, lon),
                zoom: 15,
            });
            setMap(newMap);
        }
    };

    // 마커 제거
    const removeMarkers = () => {
        markers.forEach(marker => {
            marker.setMap(null);
        });
        setMarkers([]); 
    };

    // 경로 제거
    const removeRouteLayer = () => {
        if(routeLayer) {
            routeLayer.setMap(null);
            setRouteLayer(null);
        }
    };

    // 마커
    const updateMarkers = (filteredData) => {
        if(map) {
            const newMarkers = filteredData.map((emergency) => {
                const marker = new Tmapv2.Marker({
                    position: new Tmapv2.LatLng(emergency.wgs84Lat, emergency.wgs84Lon),
                    map,
                    icon: markerImage,
                });
                marker.addListener("click", () => handleMarkerClick(emergency));
                marker.addListener("mouseenter", function(evt) {
                    marker.setLabel('<span style="position:relative; display:inline-block; padding:3px 5px; border-radius:3px; background-color: #fc7486; color:white; z-index:1000;">'+emergency.dutyName+'</span>');
                });
                marker.addListener("mouseleave", function(evt) {
                    marker.setLabel(''); 
                });
                return marker; 
            });
            setMarkers(newMarkers);      
        }
    };

    // 현재 위치 마커
    const showCurrentMarker = () => {
        const nowMarker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(
                currentPosition.latitude,
                currentPosition.longitude
            ),
            map,
            icon: markerImage2,
        });
        nowMarker.setLabel(`<span style="position:relative; display:inline-block; padding:3px 5px; border-radius:3px;background-color:#1e7fff; color:white; z-index:1000;">현재위치</span>`);
        setCurrentMarker(nowMarker);
    }

    // 응급실 클릭 이벤트 핸들러
    const handleMarkerClick = (emergency) => {
        removeMarkers();
        removeRouteLayer();
        setIsBoardDetailVisible(true);

        const marker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(emergency.wgs84Lat, emergency.wgs84Lon),
            map,
            icon: markerImage,
        });

        if(map) {
            map.setCenter(new Tmapv2.LatLng(emergency.wgs84Lat, emergency.wgs84Lon));
            map.setZoom(15);
        }

        setMarkers([marker]);
        setSelectedEmergency(emergency);
        setIsRouteButtonVisible(true);
    };


    //길찾기 API
    const getRP = async () => {
        if(!currentPosition && !selectedEmergency) return;

        const requestData = {
            startX: currentPosition.longitude,
            startY: currentPosition.latitude, 
            endX: selectedEmergency.wgs84Lon, 
            endY: selectedEmergency.wgs84Lat,
            reqCoorType: "WGS84GEO", //내 요청에 제공하는 좌표형식
            resCoordType: "EPSG3857",  //api가 응답으로 반환하는 좌표형식
            searchOption: '0',
            trafficInfo: "Y",
        };
    
        const headers = {
            appKey: process.env.REACT_APP_TMAP_APP_KEY
        }
    
        try {
            const response = await axios.post ("https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result", 
                requestData,
                { headers: headers }
            ); 

            // 결과 데이터 처리
            const resultData = response.data.features;

            // 경로 표시
            drawRoute(resultData);
            
        } catch (error) {
            console.log("경로 요청 실패: ", error);
        }
    };

    // 경로 그리기
    const drawRoute = (routeData) => {
        removeRouteLayer();
        const path = []; //경로 좌표 저장 배열

        // 경로 데이터를 기반으로 Polyline 생성
        routeData.forEach((item) => {
            const geometry = item.geometry;
            if(geometry.type === "LineString") {
                geometry.coordinates.forEach((coord) => {
                    // EPSG3857 좌표를 WGS84 좌표로 변환
                    const point = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                        new Tmapv2.Point(coord[0], coord[1])
                    );
                    path.push(new Tmapv2.LatLng(point._lat, point._lng));
                });
            }
        });

        // Polyline 생성
        const polyline = new Tmapv2.Polyline({
            path,
            strokeColor: "#FF0000",
            strokeWeight: 4,
            map: map,
        });

        setRouteLayer(polyline);

        // 경로 경계로 지도줌
        if(path.length > 0) {
            const bounds = new Tmapv2.LatLngBounds();

            path.forEach(latLng => bounds.extend(latLng));

            // 도착 마커
            if(selectedEmergency) {
                const endPoint = new Tmapv2.LatLng(selectedEmergency.wgs84Lat, selectedEmergency.wgs84Lon);
                const endMarker = new Tmapv2.Marker({
                    position: endPoint,
                    map: map,
                    icon: markerImage,
                });
                endMarker.setLabel(`<span style="position:relative; display:inline-block; padding:3px 5px; border-radius:3px;background-color:#fc7486; color:white; z-index:1000;">`+selectedEmergency.dutyName+`</span>`);
                
                setMarkers((prevMarkers) => [...prevMarkers, endMarker]);
                bounds.extend(endPoint);
            }
            
            map.fitBounds(bounds);
            map.setZoom(map.getZoom() - 1);
        }
    };

    // 길찾기 실행
    const handleFindRoute = () => {
        removeMarkers(); //마커 삭제
        removeRouteLayer(); //경로 삭제
        getRP(selectedEmergency); 
        setIsBoardDetailVisible(false); // EmergencyDetail 숨기기
    };
    

    // 종합상환판 열림
    const handleOpenBoardDetail = (emergency) => {
        setSelectedEmergency(emergency);
        setIsBoardDetailOpen(true);
        setSelectedHospital(null); 
        setIsDetailOpen(false);
    };

    // 종합상환판 닫힘
    const handleCloseBoardDetail = () => {
        setSelectedEmergency(null);
        setIsBoardDetailOpen(false);
        setIsDetailOpen(false);
        setIsRouteButtonVisible(false);
    };

    // onSearch 핸들러 - 지역/키워드 업데이트
    const handleSearch = ({region, keyword }) => {
        setRegion(region);
        setSearchKeyword(keyword);
        setSelectedEmergency(null);
        setIsBoardDetailOpen(false);
        setSelectedHospital(null); 
        setIsDetailOpen(false);
    }; 

    // 병원에 관한 것
    const renameClassification = (dutyDivNam, dutyName) => {
        if (dutyDivNam === '의원') {
            const departmentMap = {
                '안과': '안과',
                '내과': '내과',
                '이비인후과': '이비인후과',
                '성형외과': '성형외과',
                '정형외과': '정형외과',
                '피부과': '피부과'
            };
            for (const [key, value] of Object.entries(departmentMap)) {
                if (dutyName.includes(key)) {
                    return value;
                }
            }
            return '';
        }
        return dutyDivNam;
    };
    const handleEmergencyToHospital = () => {
        fetchHospitalDetail(selectedEmergency);
    };
    const handleCloseDetail = () => {
        setIsDetailOpen(false);
        setSelectedHospital(null);
    };
    const fetchHospitalDetail = async (selectedEmergency) => {
        // 이미 로드된 병원인지 확인
        if (selectedHospital?.hpid === selectedEmergency.hpid) {
            setIsDetailOpen(true); 
            return;
        }

        const apiUrl = "https://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlBassInfoInqire";
        const apiKey = process.env.REACT_APP_DATA_SERVICE_KEY;
        const hpid = selectedEmergency.hpid;

        try {
            const response = await axios.get(
                `${apiUrl}?serviceKey=${apiKey}&HPID=${hpid}`
            );

            const result = response?.data?.response?.body?.items?.item || null;

            if (!result) {
                console.error("API에서 병원 데이터를 가져오지 못했습니다.");
                return;
            }

            setSelectedHospital(Array.isArray(result) ? result[0] : result); 
            setIsDetailOpen(true);
            
        } catch (error) {
            console.error("api 요청 실패한 이유: ", error);
        }
    };
    const favoriteStar = async (hospital, index) => {
        if(!loginMember){
            alert("즐겨찾기는 로그인 이후 설정 가능합니다. ")
            return;
        }
        const isFavorited = favorites[index]; // 현재 즐겨찾기 상태
        setFavoriteIndex(index);
        try {
            if (!isFavorited) {
                // 즐겨찾기 추가
                const response = await axios.post('/api/hospital/favorite', {
                    classification : hospital.dutyDivNam,
                    memberId : loginMember,
                    dutyId : hospital.hpid,
                    dutyName : hospital.dutyName,
                    dutyDiv : hospital.dutyDivNam,
                    dutyTel : hospital.dutyTel1,
                });
            } else {
                // 즐겨찾기 삭제
                const response = await axios({
                    method: 'delete',
                    url: `/api/hospital/favorite`,
                    data: {
                        memberId: loginMember,
                        dutyId: hospital.hpid,
                    },
                });
            }
      
            // 즐겨찾기 상태 업데이트
            setFavorites((prevFavorites) => 
                prevFavorites.map((fav, i) => (i === index ? !fav : fav))
            );
            
        } catch (error) {
            console.error('즐겨찾기 요청 중 오류 발생:', error);
            console.log(error.response?.data); 
        }
    }

    const handleEmergencyList = (emergency) => {
        handleOpenBoardDetail(emergency) //상황종합판 열림
        handleMarkerClick(emergency)  //마커 클릭 처리
    }

    // 거리 계산
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // 거리 정보
    const enrichedData = (data) => {
        return data.map((item) => {
            const distance = calculateDistance(
                currentPosition.latitude,
                currentPosition.longitude,
                item.wgs84Lat,
                item.wgs84Lon
            );
            return { ...item, distance };
        });
    };

    // 거리순 정렬
    const sortByDistance = () => {
        if(isDistanceSorted) {
            setSortedResults(realResults);
            setIsDistanceSorted(false);
        } else {
            const enrichedSortedData = enrichedData(realResults);
            const sorted = enrichedSortedData.sort((a, b) => a.distance - b.distance);
            setSortedResults(sorted);
            setIsDistanceSorted(true);
        }
    };

    // EmergencyList 에 전달한 데이터 선택
    const resultsToShow = isDistanceSorted ? sortedResults : realResults;

    return (
        <div id="emergency" className="emergency-container">
            <div id="map_div" className="map-background" ></div>
            {(isBoardDetailOpen || isRouteButtonVisible) &&
                <button id="naviButton" onClick={handleFindRoute}>
                    <img src={images['navi_icon.png']} alt=""/>
                </button>
            }
            <div className="sidebar">
                <EmergencySearch onSearch={handleSearch} />
                <div className="flex">
                    <div className="total-count r16b">총 {realResults.length} 건</div>
                    <ul className="sorting">
                        <li onClick={sortByDistance}>거리순</li>
                    </ul>
                </div>
                <div className="scroll">
                    <EmergencyList 
                        results={resultsToShow} 
                        onClick={handleEmergencyList}
                    />
                </div>
            </div>

            {/* 종합상황판 */}
            {isBoardDetailOpen ? (
                selectedEmergency ?.dutyEmclsName === "응급실운영신고기관" ? (
                    <div className="simple-detail">
                        <div className="non-title">
                            <div className="name r20b">응급실운영신고기관</div>
                            <button className="close-button right-0" onClick={handleCloseBoardDetail}>
                                <img src={images['close16.png']} alt="닫기" />
                            </button>
                        </div>
                        <div className="name-title">
                            <h2 className="emergency-name b25mc">{selectedEmergency.dutyName}</h2>
                        </div>
                        <div>현재 제공되는 종합상황판이 없습니다.</div>
                        <div className="hospital-detail">
                            <button className="button absolute-button r17w"
                                onClick={handleEmergencyToHospital}>병원 상세보기
                            </button>
                        </div>
                    </div>
                    ) : (
                        isBoardDetailVisible && (
                            <div className="situation-board scroll">
                                <div className="top-title">
                                    <div className="name r20b">응급실 종합상황판</div>
                                    <button className="close-button" onClick={handleCloseBoardDetail}>
                                        <img src={images['close16.png']} alt="닫기" />
                                    </button>
                                </div>
                                <EmergencyDetail 
                                    selectedEmergency={selectedEmergency} 
                                    region={region}
                                    onHospitalDetail={handleEmergencyToHospital}
                                    onFindRoute={handleFindRoute}
                                />
                            </div>
                        )
                    )
            ) : (
                <div>선택된 응급실 정보가 없습니다.</div>
            )}
            
            {/* 병원 상세정보 */}
            {isDetailOpen && selectedHospital && (
                <HospitalDetail
                    isDetailOpen={isDetailOpen}
                    selectIndex={selectIndex}
                    selectedHospital={selectedHospital} 
                    isFavorite={isFavorite}
                    setIsFavorite={setIsFavorite}
                    onClose={handleCloseDetail}
                    renameClassification={renameClassification}
                    favoriteStar={favoriteStar}
                />
            )}
        </div>
    );
}
export default Emergency;