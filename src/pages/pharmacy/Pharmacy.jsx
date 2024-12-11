import { images } from "../../utils/images";
import Header from "../../layout/Header";
import { useContext, useEffect, useRef, useState } from "react";
import * as regions from "../../constants/regions";
import axios from "axios";
import { mainContext } from "../../App";
import { Toggle } from "./Toggle";
import ProfileImage from "../member/mypage/ProfileImage";
import { getMemberProfile } from "../../apis/services/goldentimeService";

const URL = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire";

const Pharmacy = () => {

    //유저 아이디 체크
    const { loginMember } = useContext(mainContext);



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
        setRating(3);
        setIsModalOpen(true);
        getMemberNickName(loginMember);
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

    // 검색버튼 클릭시 선택된 시/도와 시/군/구 값으로 API 호출
    const handleSearch = () => {

        //군구 나누기
        let newSido = selectedSido;
        let newArea = selectedArea;

        if (selectedArea.split(" ").length >= 2) {
            newSido = selectedArea.split(" ")[0];  // '고양시' 부분
            newArea = selectedArea.split(" ").slice(1).join(" ");  // '덕양구' 부분
        }

        fetchpharm(newSido, newArea, keyword);
        //기존 로직
        // fetchpharm(selectedSido, selectedArea, keyword);
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

            setpharm(response.data);

            if (Array.isArray(response.data?.response?.body?.items?.item)) {
                const hpidList = response.data.response.body.items.item.map(pharmacy => pharmacy.hpid);
                sendHpidsToSpringBoot(hpidList);
                fetchlikeData(hpidList);
            }

            if (!Array.isArray(response.data?.response?.body?.items?.item)) {
                const hpid = response.data?.response?.body?.items?.item?.hpid;
                if (hpid) {
                    fetchlikeDataOne(hpid);
                }
            }

            createMarkers(response.data);

        } catch (e) {

        }

    };

    //한개만 받아와짐
    // const sendHpidsToSpringBoot = async (hpidList) => {
    //     try {
    //         // 각 hpid 값을 Spring Boot의 엔드포인트에 전송
    //         for (const hpid of hpidList) {
    //             const response = await axios.get(`http://localhost:8080/api/review/pharmlist/${hpid}`);
    //             console.log(`HPID ${hpid} sent to Spring Boot, status: ${response.status}`);
    //         }
    //     } catch (error) {
    //         console.error('Error sending hpid to Spring Boot:', error);
    //     }
    // };


    //스프링과 소통
    const sendHpidsToSpringBoot = async (hpidList) => {
        try {
            // hpid 리스트를 쿼리 파라미터로 전송
            const response = await axios.get(`/api/review/pharmlist`, {
                params: {
                    hpid: hpidList.join(',')
                }
            });
            // console.log('HPIDs sent to Spring Boot, status:', response.status);
            // console.log('받은 값:', response.data);

            const reviewCounts = response.data;
            setReviewCounts(reviewCounts);

        } catch (error) {
            // console.error('Error sending hpid to Spring Boot:', error);
        }
    };

    const [reviewCounts, setReviewCounts] = useState([]);

    const fetchlikeData = async (hpidList) => {
        try {
            // hpid 리스트를 쿼리 파라미터로 전송
            // console.log('난로그인멤버', loginMember);
            const response = await axios.get(`/api/review/pharmlike`, {
                params: {
                    memberId: loginMember,
                    hpid: hpidList.join(',')
                }
            });
            // console.log('HPIDs sent to Spring Boot, status:', response.status);
            // console.log('받은 값:', response.data);

            const likelist = response.data;
            setShowlikes(likelist);

        } catch (error) {
            // console.error('Error sending hpid to Spring Boot:', error);
        }
    };

    const [showlikes, setShowlikes] = useState([]);


    //단일객체 좋아요
    const fetchlikeDataOne = async (hpid) => {
        try {
            // hpid 리스트를 쿼리 파라미터로 전송
            const response = await axios.get(`/api/review/pharmlikeone`, {
                params: {
                    memberId: loginMember,
                    hpid: hpid
                }
            });
            // console.log('HPIDs sent to Spring Boot, status:', response.status);
            // console.log('단일 받은 값:', response.data);

            const likeone = response.data;
            setShowlikeone(likeone);

        } catch (error) {
            // console.error('Error sending hpid to Spring Boot:', error);
        }
    };

    const [showlikeone, setShowlikeone] = useState([]);

    const toggleFavorite = (selectedPharm) => {

        const memberId = loginMember;
        if (!memberId) {
            alert("로그인을 해주세요.");
            return;
        }

        setShowlikeone(prevState => prevState === 1 ? 0 : 1); // 1이면 0으로, 0이면 1로 반전

        addlikeone(selectedPharm);

        let index = -1;

        // pharm.response.body.items.item이 배열일 경우
        if (Array.isArray(pharm.response.body.items.item)) {
            index = pharm.response.body.items.item.findIndex(pharmacy => pharmacy.hpid === selectedPharm.hpid);
        }
        // pharm.response.body.items.item이 객체일 경우
        else if (pharm.response.body.items.item && pharm.response.body.items.item.hpid === selectedPharm.hpid) {
            // 객체일 경우에는 인덱스가 0인 것처럼 처리
            index = 0;
        }

        if (index !== -1) {
            // showlikes 배열에서 해당 인덱스를 찾아 0과 1을 토글
            const newShowlikes = [...showlikes];
            newShowlikes[index] = newShowlikes[index] === 1 ? 0 : 1;
            setShowlikes(newShowlikes);
        }
    };

    const addlikeone = async (selectedPharm, sido, area) => {
        const pharmacyId = selectedPharm.hpid;  // 해당 약국의 hpid
        const pharmacyName = selectedPharm.dutyName;
        const pharmacyCall = selectedPharm.dutyTel1;

        const memberId = loginMember;

        //로그인 체크


        if (!pharmacyId) {
            alert("약국을 선택해 주세요.");
            return;
        }

        try {
            const response = await axios.post('/api/review/likeadd', {
                dutyId: pharmacyId,
                dutyName: pharmacyName,
                dutyTel: pharmacyCall,
                memberId: memberId
            });

            if (response.status === 200) {

                //리뷰 정보 다시 불러오기
                // rerenderpharm(sido, area);

            }
        } catch (error) {
            console.error("리뷰 등록 실패:", error);
            alert("리뷰 등록에 실패했습니다.");
        }
    };

    // useEffect(() => {
    //     fetchpharm();
    // }, []);


    //군/구 선택시 자동으로 데이터를 불러오는 것
    //기존 로직
    // useEffect(() => {
    //     if (selectedSido !== 'all' && selectedArea !== 'all') {
    //         fetchpharm(selectedSido, selectedArea);
    //     }
    // }, [selectedSido, selectedArea]);

    //군/구 선택시 자동으로 데이터를 불러오는 것
    useEffect(() => {
        let newSido = selectedSido;
        let newArea = selectedArea;

        if (selectedArea.split(" ").length >= 2) {
            newSido = selectedArea.split(" ")[0];  // '고양시' 부분
            newArea = selectedArea.split(" ").slice(1).join(" ");  // '덕양구' 부분
        }

        // `selectedSido`와 `selectedArea`가 모두 'all'이 아닌 경우 데이터를 불러옴
        if (newSido !== 'all' && newArea !== 'all') {
            fetchpharm(newSido, newArea);
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
    const markerImage2 = images['marker_current.png'];

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

    const handlePharmacyClick = async (pharmacy) => {
        // 약국의 위치 (위도, 경도) 추출
        const lat = pharmacy.wgs84Lat;
        const lon = pharmacy.wgs84Lon;
        const position = new Tmapv2.LatLng(lat, lon);  // 마커의 위치

        const marker = new Tmapv2.Marker({
            position: position,
            map: map,
            icon: markerImage,
            label: pharmacy.dutyName // 약국 마커 아이콘 설정
        });

        marker.addListener("click", function (evt) {
            handleOpenDetail(pharmacy);
            map.setCenter(position);
            map.setZoom(18);
        });

        markers.push(marker);

        // 지도 중심을 해당 약국의 위치로 이동시키고 줌을 설정
        if (map) {
            map.setCenter(position);
            map.setZoom(18);  // 줌 레벨 설정
        }

        // 약국 세부 정보 표시
        handleOpenDetail(pharmacy);

        // 약국의 hpid를 Spring Boot로 전송하여 리뷰 데이터를 받아오기
        if (pharmacy.hpid) {
            fetchReviewData(pharmacy.hpid);
        }

    };


    // 리뷰 데이터를 받아오는 함수
    const fetchReviewData = async (hpid) => {
        try {
            const response = await axios.get(`/api/review/pharmreview`, {
                params: { hpid }
            });

            // console.log('받은 값:', response.data);

            // 받은 리뷰 카운트 데이터를 상태로 저장
            setShowReviews(response.data);

        } catch (error) {
            console.error('Error sending hpid to Spring Boot:', error);
        }
    };

    const [showreviews, setShowReviews] = useState([]);

    // 평균 별점을 계산하는 함수
    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        return Math.round(averageRating * 10) / 10; // 소수점 첫째 자리까지 반올림
    };

    // 평균 별점을 상태로 설정
    const averageRating = calculateAverageRating(showreviews);

    // 각 별점의 개수를 계산하는 함수
    const countRatings = (reviews) => {
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach((review) => {
            if (counts[review.rating] !== undefined) {
                counts[review.rating]++;
            }
        });
        return counts;
    };

    // 별점별 갯수를 상태로 설정
    const ratingCounts = countRatings(showreviews);

    // 총 리뷰 갯수
    const totalReviews = showreviews.length;

    const calculateWidth = (ratingCount, totalReviews) => {
        return (ratingCount / totalReviews) * 100;
    };

    // 각 별점에 대한 width 계산
    const fiveStarWidth = totalReviews === 0 ? 0 : (countRatings(showreviews)[5] / totalReviews) * 100;
    const fourStarWidth = totalReviews === 0 ? 0 : (countRatings(showreviews)[4] / totalReviews) * 100;
    const threeStarWidth = totalReviews === 0 ? 0 : (countRatings(showreviews)[3] / totalReviews) * 100;
    const twoStarWidth = totalReviews === 0 ? 0 : (countRatings(showreviews)[2] / totalReviews) * 100;
    const oneStarWidth = totalReviews === 0 ? 0 : (countRatings(showreviews)[1] / totalReviews) * 100;



    const [selectedPharm, setSelectedPharm] = useState(null);

    const handleOpenDetail = (pharmacy) => {
        setSelectedPharm(pharmacy);
        setIsDetailOpen(true);

        fetchlikeDataOne(pharmacy.hpid);
    };

    //검색 기능
    const [keyword, setKeyword] = useState('');



    // 길찾기
    const [routeLayer, setRouteLayer] = useState(null);
    // 경로 제거
    const removeRouteLayer = () => {
        if (routeLayer) {
            routeLayer.setMap(null);
            setRouteLayer(null);
        }
    };

    //길찾기 함수
    const getRP = async (pharmacy) => {
        const e_latlog = pharmacy;
        // console.log(pharmacy);

        if (latitude !== null && longitude !== null) {
            const startX = longitude;
            const startY = latitude;
            const endX = e_latlog.wgs84Lon;
            const endY = e_latlog.wgs84Lat;

            const requestData = {
                startX,
                startY,
                endX,
                endY,
                reqCoorType: "WGS84GEO", //내 요청에 제공하는 좌표형식
                resCoordType: "EPSG3857",  //api가 응답으로 반환하는 좌표형식
                searchOption: '0',
                trafficInfo: "Y",
            };

            const headers = {
                appKey: process.env.REACT_APP_TMAP_APP_KEY
            }

            try {
                const response = await axios.post("https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result",
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
        } else {
            console.error("현재 위치 정보를 가져올 수 없습니다.");
        }
    };

    // 경로 그리기
    const drawRoute = (routeData) => {
        const path = []; //경로 좌표 저장 배열

        // 경로 데이터를 기반으로 Polyline 생성
        routeData.forEach((item) => {
            const geometry = item.geometry;
            if (geometry.type === "LineString") {
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

        // 지도 중심 좌표 설정
        if (path.length > 0) {
            map.setCenter(path[0]);
            map.setZoom(14);
        }

        // 도착 마커
        if (selectedPharm) {
            const endPoint = new Tmapv2.LatLng(selectedPharm.wgs84Lat, selectedPharm.wgs84Lon);

            const endMarker = new Tmapv2.Marker({
                position: endPoint,
                map: map,
                icon: markerImage,
                label: selectedPharm.dutyName,
            });

            setMarkers((prevMarkers) => [...prevMarkers, endMarker]);
        }
    };

    // 길찾기 실행
    const handleRP = () => {
        removeMarkers(); //마커 삭제
        removeRouteLayer(); //경로 삭제
        getRP(selectedPharm);
    };

    //유저 아이디 체크



    const [memberNickname, setMemberNickname] = useState([]);

    //닉네임 받아오기
    const getMemberNickName = async (loginMember) => {
        try {
            // hpid 리스트를 쿼리 파라미터로 전송
            const response = await axios.get(`/api/review/getnickname`, {
                params: {
                    memberId: loginMember
                }
            });
            // console.log('HPIDs sent to Spring Boot, status:', response.status);
            // console.log('받은 값:', response.data);

            const NickName = response.data;
            setMemberNickname(NickName);

        } catch (error) {
            // console.error('Error sending hpid to Spring Boot:', error);
        }
    };

    //리뷰 작성
    const handlePostReview = async (selectedPharm) => {
        const reviewContent = document.querySelector('textarea').value;  // 텍스트 에어리어의 값
        const pharmacyId = selectedPharm.hpid;  // 해당 약국의 hpid
        const pharmacyName = selectedPharm.dutyName;
        const pharmacyCall = selectedPharm.dutyTel1;
        const ratingValue = rating;
        const memberId = loginMember;

        // if (!reviewContent || !pharmacyId) {
        //     alert("리뷰 내용을 입력해주세요.");
        //     return;
        // }

        //로그인 체크
        if (!memberId) {
            alert("로그인을 해주세요.");
            return;
        }

        if (!reviewContent) {
            alert("리뷰 내용을 입력해주세요.");
            return;
        }

        if (!pharmacyId) {
            alert("약국을 선택해 주세요.");
            return;
        }

        try {
            const response = await axios.post('/api/review/write', {
                dutyId: pharmacyId,
                content: reviewContent,
                dutyName: pharmacyName,
                dutyTel: pharmacyCall,
                rating: ratingValue,
                memberId: memberId
            });

            if (response.status === 200) {
                alert("리뷰가 성공적으로 등록되었습니다.");
                handleCloseModal();  // 모달 닫기

                //리뷰 정보 다시 불러오기
                fetchReviewData(pharmacyId);
            }
        } catch (error) {
            console.error("리뷰 등록 실패:", error);
            alert("리뷰 등록에 실패했습니다.");
        }
    };

    const [rating, setRating] = useState(3);

    // 별 클릭 시 rating을 설정하는 함수
    const handleStarClick = (index) => {
        setRating(index + 1);  // 클릭된 별에 맞게 rating을 설정
    };

    // 별 이미지를 설정하는 함수
    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <img
                key={index}
                src={images[`grade29_${index < rating ? 'on' : 'off'}.png`]} // rating에 따라 'on' 또는 'off' 이미지를 사용
                alt=""
                onClick={() => handleStarClick(index)} // 클릭 시 해당 별의 rating을 설정
            />
        ));
    };

    const [isFiltered, setIsFiltered] = useState(false);

    // '운영중인 약국만 보기' 버튼 클릭 시 토글
    const handleToggleFilter = () => {
        setIsFiltered(!isFiltered);  // 토글 상태 변경
        setIsDetailOpen(false);
    };

    useEffect(() => {
        if (pharm) {
            // 약국 데이터가 배열인지 객체인지 확인
            const pharmacies = Array.isArray(pharm.response?.body?.items?.item)
                ? pharm.response.body.items.item
                : pharm.response?.body?.items?.item ? [pharm.response.body.items.item] : [];

            // 필터링된 약국 목록 가져오기
            const filteredPharmacies = pharmacies.filter((pharmacy) => {
                if (isFiltered) {
                    const timeStart = pharmacy?.[`dutyTime${currentDay}s`];
                    const timeEnd = pharmacy?.[`dutyTime${currentDay}c`];
                    const status = checkBusinessStatus(timeStart, timeEnd);
                    return status === '영업중';  // '영업중'인 약국만 필터링
                }
                return true;  // isFiltered가 false일 경우 모든 약국을 표시
            });

            // 필터링된 약국 목록으로 마커 재생성
            createMarkers({ response: { body: { items: { item: filteredPharmacies } } } });
        }
    }, [isFiltered, pharm]);


    // 리뷰 작성시 프로필 사진 불러오기 위한 멤버 정보
    const [memberInfo, setMemberInfo] = useState({});
    useEffect(()=>{
        getMemberProfile(sessionStorage.getItem("loginMember"), setMemberInfo)
    },[])

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
                                        ? pharm.response.body.items.item.filter(pharmacy => {
                                            const timeStart = pharmacy?.[`dutyTime${currentDay}s`];
                                            const timeEnd = pharmacy?.[`dutyTime${currentDay}c`];
                                            const status = checkBusinessStatus(timeStart, timeEnd);
                                            return !isFiltered || status === '영업중';  // 영업중일 경우만 포함
                                        }).length
                                        : // 약국 목록이 객체일 경우
                                        pharm?.response?.body?.items?.item
                                            ? (() => {
                                                const pharmacy = pharm.response.body.items.item;
                                                const timeStart = pharmacy?.[`dutyTime${currentDay}s`];
                                                const timeEnd = pharmacy?.[`dutyTime${currentDay}c`];
                                                const status = checkBusinessStatus(timeStart, timeEnd);
                                                // 영업중인 경우에만 카운트 1
                                                return !isFiltered || status === '영업중' ? 1 : 0;
                                            })()
                                            : 0
                                }건</p>
                                {/* <ul class="sorting flex">
                                    <li><a href="#">거리순</a></li>
                                    <li><a href="#">평점순</a></li>
                                    <li><a href="#">방문자순</a></li>
                                </ul> */}
                                <div className="sorting flex">
                                    <p>
                                        운영중인 약국만 보기&nbsp;&nbsp;
                                    </p>
                                    <div><Toggle onToggle={handleToggleFilter}></Toggle></div>
                                </div>

                            </div>
                            <ul class="scroll">

                                {Array.isArray(pharm?.response?.body?.items?.item) && pharm.response.body.items.item.length > 0 ? (
                                    pharm.response.body.items.item
                                        .filter((pharmacy) => {
                                            if (isFiltered) {
                                                const timeStart = pharmacy?.[`dutyTime${currentDay}s`];
                                                const timeEnd = pharmacy?.[`dutyTime${currentDay}c`];
                                                const status = checkBusinessStatus(timeStart, timeEnd);
                                                return status === '영업중';  // '영업중' 상태인 약국만 필터링
                                            }
                                            return true;  // isFiltered가 false일 경우 모든 약국을 표시
                                        })
                                        .map((pharmacy, index) => {
                                            const timeStart = pharmacy?.[`dutyTime${currentDay}s`];
                                            const timeEnd = pharmacy?.[`dutyTime${currentDay}c`];
                                            const status = checkBusinessStatus(timeStart, timeEnd);

                                            const review = reviewCounts.find(item => item.hpid === pharmacy.hpid);
                                            const reviewCount = review ? review.count : 0;
                                            const average = review ? review.averageRating : 0;

                                            // 즐겨찾기 여부 확인 (showlikes 배열에 hpid가 존재하는지 체크)
                                            const favoriteStatus = showlikes[index] === 1 ? "즐겨찾기" : "즐겨찾기 아님";

                                            return (
                                                <li key={index} onClick={() => handlePharmacyClick(pharmacy)}>
                                                    <div className="name">
                                                        {pharmacy.dutyName}
                                                        <a href="#">
                                                            <img
                                                                src={showlikes[index] === 1 ? images['star20_on.png'] : images['star20_off.png']}
                                                            />
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
                                                    {reviewCount !== 0 && (
                                                        <div className="grade flex">
                                                            <span>{average}</span>
                                                            <div className="img">
                                                                <img src={images[`grade${Math.round(average)}.png`]} alt="별점" />
                                                            </div>
                                                            리뷰 {reviewCount}건
                                                        </div>
                                                    )}

                                                </li>
                                            )
                                        })
                                ) : (
                                    // 만약 배열이 아니라 객체일 경우, 이를 배열처럼 처리하여 하나의 항목을 렌더링
                                    pharm?.response?.body?.items?.item ? (
                                        (() => {
                                            const pharmacy = pharm.response.body.items.item;
                                            const timeStart = pharmacy?.[`dutyTime${currentDay}s`];
                                            const timeEnd = pharmacy?.[`dutyTime${currentDay}c`];
                                            const status = checkBusinessStatus(timeStart, timeEnd);

                                            // 리뷰 갯수를 `reviewCounts` 배열에서 찾음
                                            const review = reviewCounts.find(item => item.hpid === pharmacy.hpid);
                                            const reviewCount = review ? review.count : 0;
                                            const average = review ? review.averageRating : 0;

                                            const favoriteStatus = showlikeone === 1 ? "즐겨찾기" : "즐겨찾기 아님";

                                            if (isFiltered && status !== '영업중') {
                                                return null;  // '운영중인 약국만 보기' 상태일 때, 영업중이 아닌 약국은 렌더링하지 않음
                                            }

                                            return (
                                                <li onClick={() => handlePharmacyClick(pharmacy)}>
                                                    <div className="name">
                                                        {pharmacy.dutyName}
                                                        <a href="#">
                                                            <img
                                                                src={showlikeone === 1 ? images['star20_on.png'] : images['star20_off.png']}
                                                            />
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
                                                        {timeStart ? `${formatTime(timeStart)} ~ ${formatTime(timeEnd)}` : "정보 없음"}
                                                    </div>
                                                    {reviewCount !== 0 && (
                                                        <div className="grade flex">
                                                            <span>{average}</span>
                                                            <div className="img">
                                                                <img src={images[`grade${Math.round(average)}.png`]} alt="별점" />
                                                            </div>
                                                            리뷰 {reviewCount}건
                                                        </div>
                                                    )}

                                                </li>
                                            );
                                        })()
                                    )
                                        : (
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
                                        <p>{selectedPharm.dutyName}
                                            <a href="#" onClick={() => toggleFavorite(selectedPharm)}>
                                                <img
                                                    // showlikeone 상태에 따라 즐겨찾기 별 이미지 변경
                                                    src={showlikeone === 1 ? images['star25_on.png'] : images['star25_off.png']}
                                                    alt=""
                                                />
                                            </a>
                                        </p>
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
                                                <td>
                                                    <div id="naviButton"  className="find" onClick={handleRP}>
                                                        <img src={images['navi_icon.png']} alt=""/>
                                                    </div>
                                                </td>
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
                                                            <div><p className="five" style={{ width: `${fiveStarWidth}%` }}></p></div>
                                                        </td>
                                                        <td rowspan="5">
                                                            <p>{averageRating}</p>
                                                            <img src={images[`grade${Math.round(averageRating)}.png`]} alt="" />
                                                            <span>리뷰 {showreviews.length}개</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>4</th>
                                                        <td>
                                                            <div><p className="four" style={{ width: `${fourStarWidth}%` }}></p></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>3</th>
                                                        <td>
                                                            <div><p className="three" style={{ width: `${threeStarWidth}%` }}></p></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>2</th>
                                                        <td>
                                                            <div><p className="two" style={{ width: `${twoStarWidth}%` }}></p></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>1</th>
                                                        <td>
                                                            <div><p className="one" style={{ width: `${oneStarWidth}%` }}></p></div>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <a href="#" onClick={handleOpenModal}>리뷰작성</a>
                                            </div>
                                            <div className="review">
                                                <h4>리뷰</h4>
                                                <ul>

                                                    {showreviews.length === 0 ? (
                                                        <p>등록된 리뷰가 없습니다.</p>
                                                    ) : showreviews.length === 1 ? (
                                                        <li>
                                                            <div className="flex">
                                                                <div className="img">
                                                                    <img src={images['default_image.jpg']} alt="" />
                                                                </div>
                                                                <div>
                                                                    {showreviews[0].nickname}
                                                                    <p>{showreviews[0].createdAt}</p>
                                                                </div>
                                                            </div>
                                                            <img src={images[`grade${showreviews[0].rating}.png`]} alt={`Rating ${showreviews[0].rating}`} />
                                                            <p>{showreviews[0].content}</p>
                                                        </li>
                                                    ) : (
                                                        showreviews.map((review, index) => (
                                                            <li key={index}>
                                                                <div className="flex">
                                                                    <div className="img">
                                                                        <img src={images['default_image.jpg']} alt="" />
                                                                    </div>
                                                                    <div>
                                                                        {review.nickname}
                                                                        <p>{review.createdAt}</p>
                                                                    </div>
                                                                </div>
                                                                <img src={images[`grade${review.rating}.png`]} alt={`Rating ${review.rating}`} />
                                                                <p>{review.content}</p>
                                                            </li>
                                                        ))
                                                    )}
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
                                <p>{selectedPharm.dutyName}</p>
                                <div className="flex">
                                    <div className="flex">
                                        <div className="img">
                                            <ProfileImage systemName={memberInfo.systemName} />
                                        </div>
                                        <p>{memberNickname}</p>
                                    </div>
                                    <div className="grade">
                                        {renderStars()} {/* 별 이미지 렌더링 */}
                                    </div>
                                </div>
                                <textarea name="" id="" rows="4" placeholder="이곳에 다녀온 경험을 자세히 공유해 주세요."></textarea>
                                <div className="btn flex">
                                    <a id="cancel-btn" className="cancel-btn" onClick={handleCloseModal}>취소</a>
                                    <a id="review-btn" className="review-btn" onClick={() => handlePostReview(selectedPharm)}>게시</a>
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