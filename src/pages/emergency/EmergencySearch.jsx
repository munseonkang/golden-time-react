import { images } from "../../utils/images";
import {sido, regionMap} from "../../constants/regions";
import { useEffect, useState } from "react";

const EmergencySearch = ({ onSearch }) => {
    const [selectedSido, setSelectedSido] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [keyword, setKeyword] = useState("");
    const [regions, setRegions] = useState([]);

    // 지역 업데이트
    useEffect(() => {
        if(selectedSido) {
            setRegions(regionMap.get(selectedSido) || []);
        }
    }, [selectedSido]);

    // api 호출
    useEffect(() => {
        if (selectedRegion) {
            onSearch({
                region: { sido: selectedSido, sigungu: selectedRegion },
                keyword,
            });
        }
    }, [selectedSido, selectedRegion, keyword]);

    // 상위로 전달
    const handleSearch = () => {
        onSearch({
            region: { sido: selectedSido, sigungu: selectedRegion }, 
            keyword: keyword || null
        });
    };

    // 시구군 선택 시 api 호출
    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value)
        
        // 즉시 api 호출
        onSearch({
            region: { sido: selectedSido, sigungu: selectedRegion }, 
            keyword: keyword || null
        });
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
                        }}>
                    <option value="">시/도 선택</option>
                    {sido.map((sidoName, index) => (
                        <option key={index} value={sidoName}>{sidoName}</option>
                    ))}
                </select>
                <select 
                    name="region" 
                    id="region" 
                    value={selectedRegion} 
                    onChange={handleRegionChange}>
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
                    onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            e.preventDefault();
                            handleSearch();
                        }
                    }}
                />
                <button className="search-button" 
                    onClick={handleSearch}>
                    <img src={images['search19_w.png']} alt="검색" />
                </button>
            </div>
        </div>
    )
};
export default EmergencySearch;