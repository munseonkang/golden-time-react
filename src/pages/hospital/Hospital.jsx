import { useEffect, useRef, useState } from "react";
import { images } from '../../utils/images';
// import * as regions from '../../constants/regions';
import axios from 'axios';
// import { XMLParser } from "fast-xml-parser";
import HospitalSearch from "./HospitalSearch";
import HospitalDetail from "./HospitalDetail";
import HospitalMap from "./HospitalMap.jsx";
import Emergency from "../emergency/Emergency.jsx";


const Hospital = ()=>{
    // 병원 리스트 호출
    const [hospitalData, setHospitalData] = useState([]);
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
    const [selectedHospital, setSelectedHospital] = useState("병원 미선택");
    
    // 병원리스트에서 응급실정보
    const emergencyRef = useRef([]); 
    // 병원리스트에서 병원 분류명
    const classificationRef = useRef([]);
    // 리스트 스크롤 초기화
    const ulRef = useRef(null);

    // @@ 병원 리스트 불러오기(axios) @@
    useEffect(() => {
        const fetchHospitalData = async () => {
            // 공공데이터 API URL과 API 키 설정
            const apiUrl = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire";
            const apiKey = process.env.REACT_APP_DATA_SERVICE_KEY;
            const { sido, sigungu } = region;
            const QN = searchKeyword.trim();
            const pageNo = 1;
            const numOfRows = 10;
 
            try {
                let newSido = sido;
                let newSigungu = sigungu;

                if(sigungu.split(" ").length >= 2){
                    newSido = sigungu.split(" ")[0];
                    newSigungu = sigungu.split(" ")[1];
                }

                // axios를 사용하여 데이터 호출
                const response = await axios.get(
                    `${apiUrl}?serviceKey=${apiKey}&Q0=${newSido === "all" ? "" : newSido}&Q1=${newSigungu === "all" ? "" : newSigungu}&QN=${QN}&pageNo=${pageNo}&numOfRows=${numOfRows}`
                );
                
                // 파싱된 데이터에서 병원 목록 추출
                const hospitals = response?.data?.response?.body?.items?.item || [];
                setHospitalData(hospitals); // 받아온 데이터 저장

                // 응급실 여부 데이터를 useRef에 저장
                emergencyRef.current = hospitals.map((hospital) => hospital.dutyEmclsName || "응급실 정보 없음");
                // 병원 분류명 데이터를 useRef에 저장
                classificationRef.current = hospitals.map((hospital) => hospital.dutyDivNam || "병원 분류명 없음");

                setLoading(false);  // 로딩 종료

                // console.log("Hospital Data:", hospitalData); 

            } catch (error) {
                setError(error);  // 에러 발생 시 에러 상태 설정
                setLoading(false);  // 로딩 종료
            }
        };

        if (region.sido !== "all" || searchKeyword) { // 키워드 또는 지역 조건 변경 시 트리거
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


    // @@ 병원 상세정보 open/close @@
    const handleOpenDetail = (hospital, index) => {
        fetchHospitalDetail(hospital.hpid, index); // 병원 상세 정보 불러오기
        setIsDetailOpen(true); // 상세정보 열기
    };
    const handleCloseDetail = () => {
        setIsDetailOpen(false);
    };


    // @@ 병원 상세정보 불러오기 @@
    const fetchHospitalDetail = async (hpid, index) => {
        const apiUrl = "https://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlBassInfoInqire";
        const apiKey = process.env.REACT_APP_DATA_SERVICE_KEY;

        try {
            const response = await axios.get(
                `${apiUrl}?serviceKey=${apiKey}&HPID=${hpid}`
            );

            const result = response?.data?.response?.body?.items?.item || null;
            setSelectedHospital({...result, emergency:emergencyRef.current[index], dutyDivNam:classificationRef.current[index]});

            // console.log("병원아이디 : ", `${apiUrl}?serviceKey=${apiKey}&HPID=${hpid}`);
        } catch (error) {
            setError(error);
        }
    };

    

    // @@ 진료시간 확인 @@
    // '0930' -> '09:30'
    const getFormattedTime = (time) => {
        if (!time) return null;
        const timeStr = time.toString().padStart(4, '0');
        return `${timeStr.slice(0, 2)}:${timeStr.slice(2)}`;
    };
    // 오픈 유/무
    const checkOpenStatus = (hospital) => {
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
    }


    // @@ 병원이름 정규식 정리 @@
    const cleanHospitalName = (name) => {
        // (사), (의), "사", "의", &#40;사&#41;, &#40;의&#41; 등을 제거
        return name ? name.replace(/(\(사\)|\(의\)|"사"|"의"|&#40;사&#41;|&#40;의&#41;)/g, "").trim() : "";
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
        return <p>데이터를 불러오는 중입니다...</p>;
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
                                <p>총 {hospitalData.length}건</p> 
                                <ul className="sorting flex">
                                    <li><a href="#">거리순</a></li>
                                    <li><a href="#">평점순</a></li>
                                    <li><a href="#">방문자순</a></li>
                                </ul>
                            </div>
                            <ul className="scroll" ref={ulRef}>
                                {/* 병원 리스트 렌더링 */}
                                {hospitalData.length > 0 ? (
                                    hospitalData.map((hospital, index) => {
                                        const { status, open, close } = checkOpenStatus(hospital);
                                        return (
                                            <li key={index} onClick={() => handleOpenDetail(hospital, index)}>
                                                <div className="name">
                                                    {cleanHospitalName(hospital.dutyName)}
                                                    <span> {renameClassification(hospital.dutyDivNam, hospital.dutyName)}</span>
                                                    <a href="#"><img src={images['star20_off.png']} alt=""/></a>
                                                </div>
                                                <span>{hospital.dutyAddr}</span>
                                                <div className="open"><p className={status === "진료중" ? "green" : "red"}>{status}</p>{open && close ? `${open} ~ ${close}` : ""}</div>
                                                <div className="grade flex">
                                                    <span>3.2</span>
                                                    <div className="img">
                                                        <img src={images['grade3.png']} alt=""/>
                                                    </div>
                                                    리뷰 19건
                                                </div>
                                            </li>
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
                            selectedHospital={selectedHospital} 
                            onClose={handleCloseDetail} 
                            getFormattedTime={getFormattedTime}
                            checkOpenStatus={checkOpenStatus}
                            cleanHospitalName={cleanHospitalName}
                            renameClassification={renameClassification}
                        />

                    </div>

                    {/* 오른쪽 지도 */}
                    <HospitalMap 
                        region={region} 
                        setRegion={setRegion} 
                        hospitalData={hospitalData}
                        handleOpenDetail={handleOpenDetail}
                    />

                </div>

            </div>
        </>
    );
}
export default Hospital;