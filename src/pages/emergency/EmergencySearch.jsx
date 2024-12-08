import { images } from "../../utils/images";
import {sido, regionMap} from "../../constants/regions";
import { useEffect, useState } from "react";
import axios from "axios";

const EmergencySearch = ({ onSearch }) => {
    const [selectedSido, setSelectedSido] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [keyword, setKeyword] = useState("");
    const [regions, setRegions] = useState([]);

    // 초기 렌더링 시 현재 위치 가져오기
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    // Reverse Geocoding 요청
                    const response = await axios.get("https://apis.openapi.sk.com/tmap/geo/reversegeocoding", {
                        params: {
                            version: 1,
                            lat: latitude,
                            lon: longitude,
                            appKey: process.env.REACT_APP_TMAP_APP_KEY,
                        },
                    });

                    const address = response.data?.addressInfo;
                    const sido = address?.city_do || "";
                    const region = address?.gu_gun || "";

                    setSelectedSido(sido);
                    setSelectedRegion(region);

                    // 자동으로 응급실 목록 검색
                    onSearch({
                        region: {sido, sigungu: region},
                        keyword,
                    });
                } catch (error) {
                    console.log("Reverse Geocoding 실패:", error);
                }
            }
        );
    }, []);

    // 시도 변경시 시군구 업데이트
    useEffect(() => {
        if(selectedSido) {
            setRegions(regionMap.get(selectedSido) || []);
        }
    }, [selectedSido]);

    // 시군구, 키워드 자동검색 - 상위로 전달
    useEffect(() => {
        if (selectedRegion) {
            onSearch({
                region: { sido: selectedSido, sigungu: selectedRegion },
                keyword: keyword || null,
            });
        }
    }, [selectedSido, selectedRegion, keyword]);

     // 키워드 버튼검색 - 상위로 전달
     const handleSearchClick = async () => {
        if (!selectedRegion && keyword) {
            await onSearch({
                region: { sido: "", sigungu: "" }, 
                keyword: keyword || null, // 키워드 없으면 전국검색
            });
        }
        setKeyword("");
    };   

    return (
        <div className="search-boxes">
            <div className="select-boxs r15b">
                <select 
                    name="sido" 
                    id="sido" 
                    value={selectedSido} 
                    onChange={(e) => {
                        setSelectedSido(e.target.value);
                        setSelectedRegion(""); //sido 변경시 selectredRegion 초기화
                        setKeyword(""); //sido 변경시 keyword 초기화
                        }}
                >
                    <option value="">시/도 선택</option>
                    {sido.map((sidoName, index) => (
                        <option key={index} value={sidoName}>{sidoName}</option>
                    ))}
                </select>
                <select 
                    name="region" 
                    id="region" 
                    value={selectedRegion} 
                    onChange={(e) => setSelectedRegion(e.target.value)}
                >
                    <option value="">시/구/군 선택</option>
                    {regions.map((regionName, index) => (
                        <option key={index} value={regionName}>{regionName}</option>
                    ))}
                </select>
            </div>
            <div className="search-box">
                <input className="input r15b" 
                    type="text" 
                    placeholder="응급실종류, 응급실명 검색" 
                    name="emergencyName" 
                    id="emergencyName" 
                    value={keyword} 
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="search-button" 
                    onClick={handleSearchClick}
                >
                    <img src={images['search19_w.png']} alt="검색" />
                </button>
            </div>
        </div>
    )
};
export default EmergencySearch;