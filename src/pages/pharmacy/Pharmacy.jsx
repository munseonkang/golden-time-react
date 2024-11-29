import { images } from "../../utils/images";
import Header from "../../layout/Header";
import { useEffect, useRef, useState } from "react";
import * as regions from "../../constants/regions";
import axios from "axios";

const URL = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire";

const Pharmacy = () => {

    // @@ 탭메뉴 @@
    // 기본적으로 'tab1'을 활성화
    const [activeTab, setActiveTab] = useState('tab1');
    // 탭 클릭 시 activeTab 상태 변경
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    // @@ 디테일모달창 @@
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const handleCloseDetail = () => {
        setIsDetailOpen(false);
    };
    // @@ 리뷰모달창 @@
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };





    const [selectedSido, setSelectedSido] = useState('all');
    const [selectedArea, setSelectedArea] = useState('all');

    const areaMapping = {
        "서울특별시": regions.seoul,
        "부산광역시": regions.busan,
        "대구광역시": regions.daegu,
        "인천광역시": regions.incheon,
        "광주광역시": regions.gwangju,
        "대전광역시": regions.daejeon,
        "울산광역시": regions.ulsan,
        "세종특별자치시": regions.sejong,
        "경기도": regions.gyeonggi,
        "강원특별자치도": regions.gangwon,
        "충청북도": regions.chungbuk,
        "충청남도": regions.chungnam,
        "전북특별자치도": regions.jeonbuk,
        "전라남도": regions.jeonnam,
        "경상북도": regions.gyeongsangbuk,
        "경상남도": regions.gyeongsangnam,
        "제주특별자치도": regions.jeju
    };

    const handleSidoChange = (e) => {
        setSelectedSido(e.target.value);
        // 시/도 변경 시 군/구 초기화
        setSelectedArea('all');
    };

    const handleAreaChange = (e) => {
        setSelectedArea(e.target.value);
        // handleSearch();
    };




    //약국 api 불러오는

    const [pharm, setpharm] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);




    // 검색버튼 클릭시 선택된 시/도와 시/군/구 값으로 API 호출
    const handleSearch = () => {
        fetchpharm(selectedSido, selectedArea, keyword);
    };


    const fetchpharm = async (sido, area) => {
        try {
            //기존 모달창 닫기
            setIsDetailOpen(false);
            
            setpharm(null);

            const response = await axios.get(URL, {
                params: {
                    serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                    Q0: sido === 'all' ? '' : sido,
                    Q1: area === 'all' ? '' : area,
                    QN: keyword ? keyword : '',
                    numOfRows: 700,
                    pageNo: 1
                }
            });

            console.log(response);
            setpharm(response.data);

            createMarkers(response.data);

        } catch (e) {
            // setError(e);
        }
        // setLoading(false);
    };

    // useEffect(() => {
    //     fetchpharm();
    // }, []);

    //군/구 선택시 자동으로 데이터를 불러오는 것
    useEffect(() => {
        if (selectedSido !== 'all' && selectedArea !== 'all') {
            fetchpharm(selectedSido, selectedArea);
        }
    }, [selectedSido, selectedArea]);


    //지도 api

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [region, setRegion] = useState({
        sido: "", // 시/도
        sigungu: "", // 시/군/구
    });

    const getLocation = async () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                        resolve({ latitude, longitude });
                        // console.log("1.위도:", latitude, "/ 경도:", longitude);

                        createCurrentLocationMarker(latitude, longitude);

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

                if (sigungu.includes(' ')) {
                    // 첫 번째 띄어쓰기를 기준으로 잘라서 첫 번째 부분만 사용
                    sigungu = sigungu.split(' ')[0];
                }

                setRegion({
                    sido: cityDo,
                    sigungu: sigungu,
                });

                if (regions.sido.includes(cityDo)) {
                    setSelectedSido(cityDo);

                    // 시/도가 변경되면, 해당 시/도의 군/구 목록에서 군/구를 선택
                    if (areaMapping[cityDo]?.includes(sigungu)) {
                        setSelectedArea(sigungu);
                    }
                }
            }
        } catch (error) {
            console.error("주소 변환 오류: ", error);
        }
    };

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
    }, []);


    const { Tmapv2 } = window;

    const [map, setMap] = useState(null);

    const initTmap = () => {
        const mapDiv = document.getElementById('map_div');
        if (!mapDiv.firstChild) {
            const tmap = new Tmapv2.Map("map_div",
                {
                    center: new Tmapv2.LatLng(latitude, longitude), // 지도 초기 좌표
                    width: "100%",
                    height: "calc(100vh - 70px)",
                    zoom: 15,
                    zoomControl: true
                });
            setMap(tmap);
        }
    };

    const [markers, setMarkers] = useState([]);
    const markerImage = images['marker_pharmacy.png'];


    // 모든 마커를 제거하는 함수

    const createMarkers = (data) => {
        const pharmacies = data?.response?.body?.items?.item;

        if (pharmacies) {
            removeMarkers(); // 기존 마커 제거

            // pharmacies가 배열인지 확인 후 순회
            if (Array.isArray(pharmacies)) {
                pharmacies.forEach((pharmacy) => {
                    const lat = pharmacy.wgs84Lat;
                    const lon = pharmacy.wgs84Lon;
                    const title = pharmacy.dutyName;

                    if (lat && lon) {
                        const position = new Tmapv2.LatLng(lat, lon);
                        const marker = new Tmapv2.Marker({
                            position: position,
                            map: map,
                            icon: markerImage
                        });

                        marker.addListener("mouseenter", function (evt) {
                            marker.setLabel(title);
                        });

                        marker.addListener("mouseleave", function (evt) {
                            marker.setLabel('');
                        });

                        marker.addListener("click", function (evt) {
                            handleOpenDetail(pharmacy);
                            map.setCenter(position);
                            map.setZoom(18);
                        });

                        setMarkers(prevMarkers => [...prevMarkers, marker]);
                        map.setCenter(position);
                        map.setZoom(13);
                    }
                });
            } else if (pharmacies) {
                // pharmacies가 배열이 아닌 경우 (단일 객체일 때)
                const pharmacy = pharmacies;
                const lat = pharmacy.wgs84Lat;
                const lon = pharmacy.wgs84Lon;
                const title = pharmacy.dutyName;

                if (lat && lon) {
                    const position = new Tmapv2.LatLng(lat, lon);
                    const marker = new Tmapv2.Marker({
                        position: position,
                        map: map,
                        icon: markerImage
                    });

                    marker.addListener("mouseenter", function (evt) {
                        marker.setLabel(title);
                    });

                    marker.addListener("mouseleave", function (evt) {
                        marker.setLabel('');
                    });

                    marker.addListener("click", function (evt) {
                        handleOpenDetail(pharmacy);
                        map.setCenter(position);
                        map.setZoom(18);
                    });

                    setMarkers(prevMarkers => [...prevMarkers, marker]);
                    map.setCenter(position);
                    map.setZoom(13);
                }
            }
        }
    };


    const removeMarkers = () => {
        markers.forEach(marker => {
            marker.setMap(null);
        });
        setMarkers([]); // 상태 초기화
    };

    const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
    const markerImage2 = images['marker_checkup.png'];

    const createCurrentLocationMarker = (latitude, longitude) => {
        if (map) {
            // 기존 현재 위치 마커가 있으면 제거
            if (currentLocationMarker) {
                currentLocationMarker.setMap(null);
            }

            // 새로운 현재 위치 마커 생성
            const position = new Tmapv2.LatLng(latitude, longitude);
            const marker = new Tmapv2.Marker({
                position: position,
                map: map,
                icon: markerImage2, // 현재 위치를 나타내는 마커 아이콘
                label: '현재위치'
            });

            // 상태에 현재 위치 마커 저장
            setCurrentLocationMarker(marker);
        }
    };

    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            if (map) {
                createCurrentLocationMarker(latitude, longitude);
            }
        }
    }, [latitude, longitude, map]);


    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            initTmap();
        }
    }, [latitude, longitude]);

    //날짜 계산
    const formatTime = (time) => {

        const timeString = String(time);
        const hours = timeString.slice(0, 2);
        const minutes = timeString.slice(2, 4);

        return `${hours}:${minutes}`;
    };

    const getCurrentDayOfWeek = () => {
        const today = new Date();
        const day = today.getDay(); // getDay()는 0(일요일)부터 6(토요일)까지 반환

        // 일요일을 7로 변경하고, 월요일부터 일요일까지 1부터 7로 반환
        return day === 0 ? 7 : day; // 0(일요일)을 7로 변환, 나머지 값은 그대로

    };

    const currentDay = getCurrentDayOfWeek();


    const timeStartsol = pharm?.response?.body?.items?.item?.[`dutyTime${currentDay}s`];
    const timeEndsol = pharm?.response?.body?.items?.item?.[`dutyTime${currentDay}c`];

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        return hours * 100 + minutes; // 현재 시간을 'HHMM' 형식으로 반환
    };

    // 현재 시간이 영업 시간 내에 있는지 확인하는 함수
    const checkBusinessStatus = (start, end) => {
        if (!start || !end) {
            return '휴무';
        }
        const currentTime = getCurrentTime();
        if (currentTime >= start && currentTime <= end) {
            return '영업중';
        } else {
            return '영업종료';
        }
    };

    const handlePharmacyClick = (pharmacy) => {
        // 약국의 위치 (위도, 경도) 추출
        const lat = pharmacy.wgs84Lat;
        const lon = pharmacy.wgs84Lon;
        const position = new Tmapv2.LatLng(lat, lon);  // 마커의 위치

        // 지도 중심을 해당 약국의 위치로 이동시키고 줌을 설정
        if (map) {
            map.setCenter(position);
            map.setZoom(18);  // 줌 레벨 설정
        }

        // 약국 세부 정보 표시
        handleOpenDetail(pharmacy);
    };

    const [selectedPharm, setSelectedPharm] = useState(null);

    const handleOpenDetail = (pharmacy) => {
        setSelectedPharm(pharmacy);
        setIsDetailOpen(true);
    };

    //검색 기능
    const [keyword, setKeyword] = useState('');


    return (
        <>
            <div id="yakgook">
                <div class="flex top">

                    <div class="info">
                        <div class="search">
                            <form name="searchForm" id="searchForm" action="/plan/list">
                                <div class="flex">
                                    <select name="keywordA" id="keywordA" value={selectedSido} onChange={handleSidoChange}>
                                        <option value="all">시/도 선택</option>
                                        {regions.sido.map((city) => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                    <select
                                        name="keywordB"
                                        id="keywordB"
                                        value={selectedArea}
                                        onChange={handleAreaChange}
                                        disabled={selectedSido === 'all'}
                                    >
                                        <option value="all">군/구 선택</option>
                                        {selectedSido !== 'all' && areaMapping[selectedSido]?.map((area) => (
                                            <option key={area} value={area}>{area}</option>
                                        ))}
                                    </select>
                                </div>
                                <div class="flex">
                                    <input type="search" id="keyword" name="keyword" placeholder="약국명 검색"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleSearch();
                                            }
                                        }} />
                                    <a id="search-btn" class="btn" onClick={handleSearch}>
                                        <img src={images['search20_w.png']} alt="" />
                                    </a>
                                </div>
                            </form>
                        </div>
                        <div class="list">
                            <div class="flex">
                                <p>총 {
                                    Array.isArray(pharm?.response?.body?.items?.item)
                                        ? pharm.response.body.items.item.length >= 2
                                            ? pharm.response.body.items.item.length
                                            : 1
                                        : pharm?.response?.body?.items?.item
                                            ? 1
                                            : 0
                                }건</p>
                                <ul class="sorting flex">
                                    <li><a href="#">거리순</a></li>
                                    <li><a href="#">평점순</a></li>
                                    <li><a href="#">방문자순</a></li>
                                </ul>
                            </div>
                            <ul class="scroll">

                                {Array.isArray(pharm?.response?.body?.items?.item) && pharm.response.body.items.item.length > 0 ? (
                                    pharm.response.body.items.item.map((pharmacy, index) => {

                                        const timeStart = pharmacy?.[`dutyTime${currentDay}s`];
                                        const timeEnd = pharmacy?.[`dutyTime${currentDay}c`];
                                        // {formatTime(pharmacy?.[`dutyTime${currentDay}c`])}

                                        const status = checkBusinessStatus(timeStart, timeEnd);

                                        return (
                                            <li key={index} onClick={() => handlePharmacyClick(pharmacy)}>
                                                <div className="name">
                                                    {pharmacy.dutyName}
                                                    <a href="#">
                                                        <img src={images['star20_off.png']} alt="별점 이미지" />
                                                    </a>
                                                </div>
                                                <span>{pharmacy.dutyAddr}</span>
                                                <div className="call">
                                                    <img src={images['detail_icon_tel.png']} alt="전화 아이콘" />
                                                    <div className="white">
                                                        <p>{pharmacy.dutyTel1}</p>
                                                    </div>
                                                </div>
                                                <div className="open">
                                                    <p className={status === '영업중' ? 'green' : status === '휴무' ? 'gray' : 'red'}>{status}</p>
                                                    {/* <p className="green">영업중</p> */}
                                                    {timeStart ? `${formatTime(timeStart)} ~ ${formatTime(timeEnd)}` : "정보 없음"}
                                                </div>
                                                <div className="grade flex">
                                                    <span>3.2</span>
                                                    <div className="img">
                                                        <img src={images['grade3.png']} alt="별점" />
                                                    </div>
                                                    리뷰 19건
                                                </div>
                                                <div className="find">
                                                    <p>길찾기</p>
                                                </div>
                                            </li>
                                        )
                                    })
                                ) : (
                                    // 만약 배열이 아니라 객체일 경우, 이를 배열처럼 처리하여 하나의 항목을 렌더링
                                    pharm?.response?.body?.items?.item ? (
                                        <li onClick={() => handlePharmacyClick(pharm.response.body.items.item)}>
                                            <div className="name">
                                                {pharm?.response?.body?.items?.item?.dutyName}
                                                <a href="#">
                                                    <img src={images['star20_off.png']} alt="별점 이미지" />
                                                </a>
                                            </div>
                                            <span>{pharm?.response?.body?.items?.item?.dutyAddr}</span>
                                            <div className="call">
                                                <img src={images['detail_icon_tel.png']} alt="전화 아이콘" />
                                                <div className="white">
                                                    <p>{pharm?.response?.body?.items?.item?.dutyTel1}</p>
                                                </div>
                                            </div>
                                            <div className="open">
                                                <p className="green">영업중</p>
                                                {formatTime(timeStartsol)} ~ {formatTime(timeEndsol)}
                                            </div>
                                            <div className="grade flex">
                                                <span>3.2</span>
                                                <div className="img">
                                                    <img src={images['grade3.png']} alt="별점" />
                                                </div>
                                                리뷰 19건
                                            </div>
                                            <div className="find">
                                                <p>길찾기</p>
                                            </div>
                                        </li>
                                    ) : (
                                        // 배열도 없고 객체도 없을 경우
                                        <li>검색된 항목이 없습니다.</li>
                                    )
                                )}

                            </ul>
                        </div>
                        {isDetailOpen && selectedPharm && (
                            <div class="detail">
                                <div class="scroll">
                                    <p>약국상세<span><img src={images['close16.png']} alt="" onClick={handleCloseDetail} /></span></p>
                                    <div class="data">
                                        <p>{selectedPharm.dutyName}<a href="#"><img src={images['star25_off.png']} alt="" /></a></p>
                                        <div class="open"><p className={checkBusinessStatus(selectedPharm[`dutyTime${currentDay}s`], selectedPharm[`dutyTime${currentDay}c`]) === '영업중' ? 'green' : 'red'}>
                                            {checkBusinessStatus(selectedPharm[`dutyTime${currentDay}s`], selectedPharm[`dutyTime${currentDay}c`])}
                                        </p>
                                            {selectedPharm[`dutyTime${currentDay}s`] && selectedPharm[`dutyTime${currentDay}c`] ?
                                                `${formatTime(selectedPharm[`dutyTime${currentDay}s`])} ~ ${formatTime(selectedPharm[`dutyTime${currentDay}c`])}`
                                                : "정보 없음"}</div>
                                        <table>
                                            <tr>
                                                <th><img src={images['detail_icon_place.png']} alt="" /></th>
                                                <td>{selectedPharm.dutyAddr}</td>
                                            </tr>
                                            <tr>
                                                <th><img src={images['detail_icon_tel.png']} alt="" /></th>
                                                <td>{selectedPharm.dutyTel1}</td>
                                            </tr>

                                        </table>
                                    </div>
                                    <div className="detail-tab flex">
                                        <p className={`tab1 ${activeTab === 'tab1' ? 'on' : ''}`} onClick={() => handleTabClick('tab1')}>정보</p>
                                        <p className={`tab2 ${activeTab === 'tab2' ? 'on' : ''}`} onClick={() => handleTabClick('tab2')}>리뷰</p>
                                    </div>
                                    <div className="tab-container">
                                        <div className={`tab-con con1 ${activeTab === 'tab1' ? 'show' : 'hide'}`}>
                                            <div className="time">
                                                <h4>운영시간</h4>
                                                <table>
                                                    <tr>
                                                        <th>월요일</th>
                                                        <td>{selectedPharm.dutyTime1s && selectedPharm.dutyTime1c ? `${formatTime(selectedPharm.dutyTime1s)} - ${formatTime(selectedPharm.dutyTime1c)}` : '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>화요일</th>
                                                        <td>{selectedPharm.dutyTime2s && selectedPharm.dutyTime2c ? `${formatTime(selectedPharm.dutyTime2s)} - ${formatTime(selectedPharm.dutyTime2c)}` : '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>수요일</th>
                                                        <td>{selectedPharm.dutyTime3s && selectedPharm.dutyTime3c ? `${formatTime(selectedPharm.dutyTime3s)} - ${formatTime(selectedPharm.dutyTime3c)}` : '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>목요일</th>
                                                        <td>{selectedPharm.dutyTime4s && selectedPharm.dutyTime4c ? `${formatTime(selectedPharm.dutyTime4s)} - ${formatTime(selectedPharm.dutyTime4c)}` : '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>금요일</th>
                                                        <td>{selectedPharm.dutyTime5s && selectedPharm.dutyTime5c ? `${formatTime(selectedPharm.dutyTime5s)} - ${formatTime(selectedPharm.dutyTime5c)}` : '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>토요일</th>
                                                        <td>{selectedPharm.dutyTime6s && selectedPharm.dutyTime6c ? `${formatTime(selectedPharm.dutyTime6s)} - ${formatTime(selectedPharm.dutyTime6c)}` : '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>일요일</th>
                                                        <td>{selectedPharm.dutyTime7s && selectedPharm.dutyTime7c ? `${formatTime(selectedPharm.dutyTime7s)} - ${formatTime(selectedPharm.dutyTime7c)}` : '-'}</td>
                                                    </tr>
                                                    <tr className="holiday">
                                                        <th>공휴일</th>
                                                        <td>{selectedPharm.dutyTime8s && selectedPharm.dutyTime8c ? `${formatTime(selectedPharm.dutyTime8s)} - ${formatTime(selectedPharm.dutyTime8c)}` : '-'}</td>
                                                    </tr>
                                                </table>

                                            </div>
                                        </div>
                                        <div className={`tab-con con2 ${activeTab === 'tab2' ? 'show' : 'hide'}`}>
                                            <div className="score">
                                                <h4>평점</h4>
                                                <table>
                                                    <tr>
                                                        <th>5</th>
                                                        <td>
                                                            <div><p></p></div>
                                                        </td>
                                                        <td rowspan="5">
                                                            <p>3.2</p>
                                                            <img src={images['grade3.png']} alt="" />
                                                            <span>리뷰 19개</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>4</th>
                                                        <td>
                                                            <div><p></p></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>3</th>
                                                        <td>
                                                            <div><p></p></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>2</th>
                                                        <td>
                                                            <div><p></p></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>1</th>
                                                        <td>
                                                            <div><p></p></div>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <a href="#" onClick={handleOpenModal}>리뷰작성</a>
                                            </div>
                                            <div className="review">
                                                <h4>리뷰</h4>
                                                <ul>
                                                    <li>
                                                        <div className="flex">
                                                            <div className="img">
                                                                <img src={images['default_image.jpg']} alt="" />
                                                            </div>
                                                            <div>
                                                                애플이
                                                                <p>2024년 11월 12일</p>
                                                            </div>
                                                        </div>
                                                        <img src={images['grade3.png']} alt="" />
                                                        <p>
                                                            리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="flex">
                                                            <div className="img">
                                                                <img src={images['default_image.jpg']} alt="" />
                                                            </div>
                                                            <div>
                                                                애플이
                                                                <p>2024년 11월 12일</p>
                                                            </div>
                                                        </div>
                                                        <img src={images['grade3.png']} alt="" />
                                                        <p>
                                                            리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="flex">
                                                            <div className="img">
                                                                <img src={images['default_image.jpg']} alt="" />
                                                            </div>
                                                            <div>
                                                                애플이
                                                                <p>2024년 11월 12일</p>
                                                            </div>
                                                        </div>
                                                        <img src={images['grade3.png']} alt="" />
                                                        <p>
                                                            리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="flex">
                                                            <div className="img">
                                                                <img src={images['default_image.jpg']} alt="" />
                                                            </div>
                                                            <div>
                                                                애플이
                                                                <p>2024년 11월 12일</p>
                                                            </div>
                                                        </div>
                                                        <img src={images['grade3.png']} alt="" />
                                                        <p>
                                                            리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 오른쪽 지도 */}
                    <div className="map_div" id="map_div">

                    </div>
                </div>

                {isModalOpen && (
                    <div className="review-modal">
                        <div className="box">
                            <form name="reviewForm" id="reviewForm" action="">
                                <p>라움성형외과의원</p>
                                <div className="flex">
                                    <div className="flex">
                                        <div className="img">
                                            <img src={images['default_image.jpg']} alt="" />
                                        </div>
                                        <p>애플이</p>
                                    </div>
                                    <div className="grade">
                                        <img src={images['grade29_on.png']} alt="" />
                                        <img src={images['grade29_on.png']} alt="" />
                                        <img src={images['grade29_on.png']} alt="" />
                                        <img src={images['grade29_off.png']} alt="" />
                                        <img src={images['grade29_off.png']} alt="" />
                                    </div>
                                </div>
                                <textarea name="" id="" rows="4" placeholder="이곳에 다녀온 경험을 자세히 공유해 주세요."></textarea>
                                <div className="btn flex">
                                    <a id="cancel-btn" className="cancel-btn" onClick={handleCloseModal}>취소</a>
                                    <a id="review-btn" className="review-btn">게시</a>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}
export default Pharmacy;