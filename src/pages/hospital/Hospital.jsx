import { useContext, useEffect, useRef, useState } from "react";
import { images } from '../../utils/images';
import axios from 'axios';
import HospitalSearch from "./HospitalSearch";
import HospitalDetail from "./HospitalDetail";
import HospitalMap from "./HospitalMap.jsx";
import { mainContext } from "../../App";
import HospitalListItem from "./HospitalListItem.jsx";

const Hospital = ()=>{
    // 로그인 확인(아이디 or null)
    const { loginMember } = useContext(mainContext);

    // 병원 리스트 호출
    const [allHospitalData, setAllHospitalData] = useState([]); //모든데이터
    const [hospitalData, setHospitalData] = useState([]); //보이는데이터
    const [itemsToShow, setItemsToShow] = useState(15); // 처음 보여줄 병원 수
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 병원 검색 필터 (시/도, 시/군/구)
    const [region, setRegion] = useState({
        sido: "", // 시/도
        sigungu: "", // 시/군/구
    });
    const [searchKeyword, setSearchKeyword] = useState("");

    // 병원 상세정보
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectIndex, setSelectIndex] = useState("");
    const [selectedHospital, setSelectedHospital] = useState("병원 미선택");

    // 병원 즐겨찾기
    const [favorites, setFavorites] = useState([]);
    const [favoriteIndex, setFavoriteIndex] = useState("");
    const [isFavorite, setIsFavorite] = useState(null);

    // 병원리스트에서 응급실정보
    const emergencyRef = useRef([]); 
    // 병원리스트에서 병원 분류명
    const classificationRef = useRef([]);
    // 리스트 스크롤 초기화
    const ulRef = useRef(null);


    // 병원 리스트 불러오기(axios)
    useEffect(() => {
        const fetchHospitalData = async () => {
            // 공공데이터 API URL과 API 키 설정
            const apiUrl = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire";
            const apiKey = process.env.REACT_APP_DATA_SERVICE_KEY;
            const { sido, sigungu } = region;
            const QN = searchKeyword.trim();
 
            try {
                let newSido = sido;
                let newSigungu = sigungu;

                if(sigungu.split(" ").length >= 2){
                    newSido = sigungu.split(" ")[0];
                    newSigungu = sigungu.split(" ")[1];
                }

                // axios를 사용하여 데이터 호출
                const response = await axios.get(
                    `${apiUrl}?serviceKey=${apiKey}&Q0=${newSido === "all" ? "" : newSido}&Q1=${newSigungu === "all" ? "" : newSigungu}&QN=${QN}&pageNo=1&numOfRows=3000`
                );
                
                // 파싱된 데이터에서 병원 목록 추출
                const item = response?.data?.response?.body?.items?.item || [];
                const hospitals = Array.isArray(item) ? item : item ? [item] : [];
                setAllHospitalData(hospitals); // 받아온 데이터 저장
                setHospitalData(hospitals.slice(0, itemsToShow)); // 초기 데이터 렌더링

                // 응급실 여부 데이터를 useRef에 저장
                emergencyRef.current = hospitals.map((hospital) => hospital.dutyEmclsName || "응급실 정보 없음");
                // 병원 분류명 데이터를 useRef에 저장
                classificationRef.current = hospitals.map((hospital) => hospital.dutyDivNam || "병원 분류명 없음");

                setLoading(false);

            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        // 키워드 또는 지역 조건 변경 시 트리거
        if (region.sido !== "all" || searchKeyword) {
            fetchHospitalData();
        }

    }, [region, searchKeyword]);

    
    // 검색 조건 업데이트 함수
    const handleRegionChange = (newRegion) => {
        setRegion(newRegion);
        resetScroll();
    };

    // 검색 키워드 업데이트
    const handleSearch = (keyword) => {
        setSearchKeyword(keyword); 
        resetScroll();
    };

    // 스크롤 높이값 초기화
    const resetScroll = () => {
        if (ulRef.current) {
            ulRef.current.scrollTop = 0;
        }
    };

    // 무한 스크롤 이벤트 핸들러
    const handleScroll = () => {
        if (
            ulRef.current &&
            ulRef.current.scrollTop + ulRef.current.clientHeight >= ulRef.current.scrollHeight - 10
        ) {
            setItemsToShow((prev) => prev + 15); // 추가 데이터 렌더링
        }
    };

    // 보여줄 데이터 업데이트
    useEffect(() => {
        setHospitalData(allHospitalData.slice(0, itemsToShow));
    }, [itemsToShow, allHospitalData]);

    
    // 즐겨찾기 상태확인
    useEffect(() => {
        const fetchFavorites = async () => {
            if (!loginMember) return;

            try {
                const updatedFavorites = await Promise.all(
                    hospitalData.map(async (hospital) => {
                        try {
                            const response = await axios.post('/api/hospital/checkFavorite', {
                                memberId : loginMember,
                                dutyId : hospital.hpid,
                            });

                            return response.data.isFavorite;
                        } catch (error) {
                            console.error('병원 즐겨찾기 상태를 확인하는 중 오류 발생:', error);
                            return false;
                        }
                    })
                );
                setFavorites(updatedFavorites);
            } catch (error) {
                console.error('즐겨찾기 여부를 가져오는 중 오류 발생:', error);
            }
        };
    
        fetchFavorites();
    }, [hospitalData]);

    // 즐겨찾기 on/off
    const favoriteStar = async (hospital, index) => {
        if(!loginMember){
            alert("즐겨찾기는 로그인 이후 설정 가능합니다. ")
            return;
        }
        const isFavorited = favorites[index]; // 현재 즐겨찾기 상태
        setFavoriteIndex(index);
        try {
            if (!isFavorited) {
                const dutyDiv = renameClassification(hospital.dutyDivNam,hospital.dutyName);
                // 즐겨찾기 추가
                const response = await axios.post('/api/hospital/favorite', {
                    classification : "병원",
                    memberId : loginMember,
                    dutyId : hospital.hpid,
                    dutyName : hospital.dutyName,
                    dutyDiv : dutyDiv,
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


    // 병원 상세정보 open/close
    const handleOpenDetail = (hospital, index) => {
        fetchHospitalDetail(hospital.hpid, index); // 병원 상세 정보 불러오기
        setIsFavorite(favorites[index]);
        setIsDetailOpen(true);
        setSelectIndex(index);
    };
    const handleCloseDetail = () => {
        setIsDetailOpen(false);
    };


    // 병원 상세정보 불러오기
    const fetchHospitalDetail = async (hpid, index) => {
        const apiUrl = "https://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlBassInfoInqire";
        const apiKey = process.env.REACT_APP_DATA_SERVICE_KEY;

        try {
            const response = await axios.get(
                `${apiUrl}?serviceKey=${apiKey}&HPID=${hpid}`
            );

            const result = response?.data?.response?.body?.items?.item || null;
            setSelectedHospital({...result, emergency:emergencyRef.current[index], dutyDivNam:classificationRef.current[index]});

        } catch (error) {
            setError(error);
        }
    };

    // 병원 분류명 변경
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


    if (loading || !hospitalData) {
        return (
            <div id="hospital">
                <p className="get-data">데이터를 불러오는 중입니다...</p>
            </div>
        )
    }
    if (error) {
        return <p>데이터를 불러오는 데 실패했습니다: {error.message}</p>;
    }

    return (
        <>
            <div id="hospital">
                <div className="flex top">
                    {/* 왼쪽 정보 */}
                    <div className="info">

                        {/* 검색 */}
                        <HospitalSearch 
                            selectedRegion={region} 
                            onRegionChange={handleRegionChange} 
                            onSearch={handleSearch}
                        />

                        <div className="list">
                            <div className="flex">
                                <p>총 {allHospitalData.length == 3000 ? 0 : allHospitalData.length}건</p> 
                                <ul className="sorting flex">
                                    <li><a href="#">거리순</a></li>
                                    <li><a href="#">평점순</a></li>
                                    <li><a href="#">방문자순</a></li>
                                </ul>
                            </div>
                            <ul className="scroll" ref={ulRef} onScroll={handleScroll}>
                                {/* 병원 리스트 렌더링 */}
                                {hospitalData.length > 0 ? (
                                    hospitalData.map((hospital, index) => {
                                        return (
                                            // 각 병원 정보
                                            <HospitalListItem 
                                                hospital={hospital} 
                                                index={index} 
                                                handleOpenDetail={handleOpenDetail}
                                                handleCloseDetail={handleCloseDetail}
                                                renameClassification={renameClassification}
                                                favoriteStar={favoriteStar}
                                                favorites={favorites}
                                            />
                                        );
                                    })
                                ) : (
                                    <p>등록된 병원이 없습니다.</p>
                                )}
                            </ul>
                        </div>

                        {/* 선택한 병원 상세정보 */}
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
                    </div>

                    {/* 오른쪽 지도 */}
                    <HospitalMap 
                        setRegion={setRegion} 
                        hospitalData={hospitalData}
                        setIsDetailOpen={setIsDetailOpen}
                        isDetailOpen={isDetailOpen}
                        handleOpenDetail={handleOpenDetail}
                        selectedHospital={selectedHospital}
                    />
                </div>
            </div>
        </>
    );
}
export default Hospital;

// 진료시간 확인
export const getFormattedTime = (time) => {
    if (!time) return null;
    const timeStr = time.toString().padStart(4, '0');
    return `${timeStr.slice(0, 2)}:${timeStr.slice(2)}`;
};

// 오픈 유/무
export const checkOpenStatus = (hospital) => {
    const today = new Date();
    const currentDay = today.getDay() === 0 ? 7 : today.getDay();
    const currentTime = `${today.getHours().toString().padStart(2, '0')}${today.getMinutes().toString().padStart(2, '0')}`; // 현재 시간 'HHmm' 포맷

    const openTime = hospital[`dutyTime${currentDay}s`];
    const closeTime = hospital[`dutyTime${currentDay}c`];

    if (!openTime || !closeTime) {
        return { status: "오늘 휴무", open: null, close: null };
    }

    const isOpen = currentTime >= openTime && currentTime <= closeTime;

    return {
        status: isOpen ? "진료중" : "진료 종료",
        open: getFormattedTime(openTime),
        close: getFormattedTime(closeTime),
    };
};

// 병원이름 정규식 정리
export const cleanHospitalName = (name) => {
    // (사), (의), "사", "의", &#40;사&#41;, &#40;의&#41; 등을 제거
    return name ? name.replace(/(\(사\)|\(의\)|"사"|"의"|&#40;사&#41;|&#40;의&#41;)/g, "").trim() : "";
};