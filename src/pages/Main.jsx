import { useEffect, useRef, useState, version } from "react";
import { images } from '../utils/images';
import { Link } from "react-router-dom";
import axios from "axios";

const Main = ()=>{
    const [sido, setSido] = useState("");
    const [emergency, setEmergency] = useState([]);
    const [currentPosition, setCurrentPosition] = useState(null);

    const API_BASE_URL = "https://apis.data.go.kr/B552657/ErmctInfoInqireService";

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

    // 주소 정리
    const extractMainAddress = (address) => {
        const parts = address.split(/[\(\),]/);
        return parts[0]?.trim() || "주소 정보 없음";
    };
    
    // 현재 위치
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({ latitude, longitude });
    
                try {
                    const response = await axios.get("https://apis.openapi.sk.com/tmap/geo/reversegeocoding", {
                        params: {
                            version: 1,
                            lat: latitude,
                            lon: longitude,
                            appKey: process.env.REACT_APP_TMAP_APP_KEY,
                        },
                    });
    
                    const sido = response.data?.addressInfo.city_do || "";
                    setSido(sido);
    
                } catch (error) {
                    console.log("Reverse Geocoding 실패:", error);
                }
            }
        )
    }, []);

    // 응급실 api
    useEffect(() => {
        if(!sido) return;
        const getEmergency = async () => {
            try {
                const [response1, response2] = await axios.all([
                    // 응급실 실시간 가용병상정보 조회
                    axios.get(`${API_BASE_URL}/getEmrrmRltmUsefulSckbdInfoInqire`, { 
                        params: {
                            serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                            pageNo: 1,
                            numOfRows: 100,
                            STAGE1: sido,
                        } 
                    }),
                    // 기관 정보 
                    axios.get(`${API_BASE_URL}/getEgytListInfoInqire`, { 
                        params: {
                            serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                            pageNo: 1,
                            numOfRows: 100,
                            Q0: sido,
                        }
                    }),
                ]);
    
                const realTime = response1.data?.response?.body?.items?.item;
                const organList = response2.data?.response?.body?.items?.item;
                
                const realTimeArray = Array.isArray(realTime) ? realTime : realTime ? [realTime] : [];
                const organListArray = Array.isArray(organList) ? organList : organList ? [organList] : [];
    
                // 데이터 병합
                const realData = organListArray.map((organItem) => {
                    const realItem = realTimeArray.find((real) => real.hpid === organItem.hpid);
                    return {...organItem, ...realItem};
                });

                // 필터링
                const filteredData = realData.filter((item) => item.dutyEmclsName !== "응급실운영신고기관")

                // 거리 계산
                const enrichedData = filteredData.map((item) => {
                    const distance = calculateDistance(
                        currentPosition.latitude,
                        currentPosition.longitude,
                        item.wgs84Lat,
                        item.wgs84Lon
                    );
                    return { ...item, distance };
                });

                // 거리순 정렬 후 최대 4개
                const sortedData = enrichedData.sort((a, b) => a.distance - b.distance).slice(0, 4);
    
                setEmergency(sortedData);

            } catch (error) {
                console.error("api 요청 실패한 이유: ", error);
            }
    
        };
        getEmergency();
    }, [sido]);

    return (
        <div id="main">
            <section>
                {/* 메인화면(응급실 안내) */}
                <div className="main">
                    <div className="inner">
                        <p className="text">
                            위급한 순간,<br className="mobile" /> 가까운 응급실 정보를<br/>
                            실시간으로 제공합니다.
                        </p>
                        <div>
                            <ul className="flex">
                                {emergency.length > 0 ? (
                                    emergency.map((item, index) => (
                                    <li className="block" key={index}>
                                        <p>{item.dutyName || "병원 이름 없음"}</p>
                                        <div className="info flex">
                                            <div>
                                                <p>현재 위치에서 <b>{item.distance.toFixed(2)}km</b></p>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <th><img src={images['main_icon_place.png']} alt=""/></th>
                                                            <td>{extractMainAddress(item.dutyAddr)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th><img src={images['main_icon_tel.png']} alt=""/></th>
                                                            <td>{item.dutyTel3 || "번호 정보 없음"}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <p>{index + 1}</p>
                                        </div>
                                        <div className="bed">
                                            <p>(가용 병상 수 / 기준 병상 수)</p>
                                            <ul className="flex color">
                                                <li className="red">
                                                    일반 <div><span>{item.hvec || "-"}</span> / {item.hvs01 || "-"}</div>
                                                </li>
                                                <li className="yello">
                                                    소아 <div><span>{item.hv28 || "-"}</span> / {item.hvs02 || "-"}</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    ))
                                ) : (
                                    <p className="Communicating-data">현재 위치 기반 응급실 데이터를 불러오는 중입니다...</p>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 검색창 */}
                <div className="con1">
                    <div className="inner">
                        <div className="flex">
                            <img src={images['main_con1_1.png']} alt=""/>
                            <div>
                                    어디서 찾아야 할지 모르시겠나요?
                                <p><span>병원명/약국명/의약품명</span>을 찾아보세요.</p>
                            </div>
                        </div>
                        <div>
                            <form name="searchForm" id="searchForm" action="/plan/list">
                                <input type="search" id="keyword" name="keyword" placeholder="예 ) 대학교병원, 내과, 골든타임약국, 타이레놀 "/>
                                <Link to="#" id="search-btn" className="btn">
                                    <img src={images['search29_w.png']} alt=""/>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>

                {/* 메뉴 아이콘 버튼 */}
                <div className="con2">
                    <ul className="flex inner">
                        <li>
                            <Link to="/emergency">
                                <div><img src={images['main_con2_button1.png']} alt=""/></div>
                                <p>실시간응급실</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/hospital">
                                <div><img src={images['main_con2_button2.png']} alt=""/></div>
                                <p>병원 조회</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/pharmacy">
                                <div><img src={images['main_con2_button3.png']} alt=""/></div>
                                <p>약국 조회</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/check-up">
                                <div><img src={images['main_con2_button4.png']} alt=""/></div>
                                <p>건강검진기관</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/medicine">
                                <div><img src={images['main_con2_button5.png']} alt=""/></div>
                                <p>의약품정보</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/first-aid/faq">
                                <div><img src={images['main_con2_button6.png']} alt=""/></div>
                                <p>FAQ</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/first-aid/solution">
                                <div><img src={images['main_con2_button7.png']} alt=""/></div>
                                <p>대처방법</p>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* 상황별 대처 방법 */}
                <div className="con3">
                    <div className="inner">
                        <div className="main-title">
                            <img src={images['main_title_point.png']} alt=""/>
                            <h2>상황별 대처 방법</h2>
                            <h3>다양한 응급상황 대처방법을 미리 확인해주세요.</h3>
                        </div>
                        
                        <ul className="slider flex">
                            <li>
                                <Link to="#">
                                    <img src={images['temp1.jpg']} alt=""/>
                                    <h4>질병관리청 아프지마TV</h4>
                                    <p>[심폐소생술] 올바른 심폐소생술과 제세동기 사용법</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <img src={images['temp2.jpg']} alt=""/>
                                    <h4>질병관리청 아프지마TV</h4>
                                    <p>[심폐소생술] 올바른 심폐소생술과 제세동기 사용법</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <img src={images['temp3.jpg']} alt=""/>
                                    <h4>질병관리청 아프지마TV</h4>
                                    <p>[심폐소생술] 올바른 심폐소생술과 제세동기 사용법</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <img src={images['temp3.jpg']} alt=""/>
                                    <h4>질병관리청 아프지마TV</h4>
                                    <p>[심폐소생술] 올바른 심폐소생술과 제세동기 사용법</p>
                                </Link>
                            </li>
                        </ul>

                        {/* <div className="slide_btn">
                            <a className="prev-btn"><img src={images['main_con3_prev.png']} alt="이전버튼"/></a>
                            <a className="next-btn"><img src={images['main_con3_next.png']} alt="다음버튼"/></a>
                        </div> */}

                    </div>
                </div>

                {/* 위치 및 정보 검색 */}
                <div className="con4">
                    <div className="inner">
                        <div className="main-title">
                            <img src={images['main_title_point.png']} alt=""/>
                            <h2>위치 및 정보 검색</h2>
                            <h3>다양한 의료기관의 정보를 만나보세요.</h3>
                        </div>
                        <div className="box">
                            <div className="box1">
                                <Link to="/hospital">
                                    <div className="text">
                                        <span>병원 조회 </span>HOSPITAL
                                        <p>
                                            병원의 주소, 진료시간, 진료과목 등<br/>
                                            다양한 정보를 확인할 수 있습니다.
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            <div className="box2">
                                <Link to="/pharmacy">
                                    <div className="text">
                                        <span>약국 조회 </span>PHARMACY
                                        <p>
                                            약국의 주소, 운영시간 등<br/>
                                            다양한 정보를 확인할 수 있습니다.
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            <div className="box3">
                                <Link to="/check-up">
                                    <div className="text">
                                        <span>건강검진기관</span>
                                        <p>
                                            건강검진기관의 검진과목 등<br/>
                                            다양한 정보를 확인할 수 있습니다.
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            <div className="box4">
                                <Link to="/medicine">
                                    <div className="text">
                                        <span>의약품 정보</span>
                                        <p>
                                            의약품의 생김새, 성분 등<br/>
                                            다양한 정보를 확인할 수 있습니다.
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>          
        </div>
    );
}
export default Main;