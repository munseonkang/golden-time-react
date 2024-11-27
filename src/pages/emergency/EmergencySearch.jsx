import { images } from "../../utils/images";
import {sido, regionMap} from "../../constants/regions";
import { useState } from "react";

const EmergencySearch = ({onSearch}) => {
    const [selectedSido, setSido] = useState("");
    const [regions, setRegions] = useState([]);
    const [region, setRegion] = useState("");
    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
        if(!selectedSido || !region) {
            alert("지역을 선택해주세요.");
            return;
        }
        onSearch({selectedSido, region, keyword: keyword || null});
    }

    return (
        <div className="search-boxes">
            <div className="select-boxs r15b">
                <select 
                    name="sido" 
                    id="sido" 
                    value={selectedSido} 
                    onChange={(e) => {
                        setSido(e.target.value);
                        setRegions(regionMap.get(e.target.value) || []);
                        }}>
                    <option value="">시/도 선택</option>
                    {
                        sido.map((sidoName, index) => (
                            <option key={index} value={sidoName}>{sidoName}</option>
                        ))
                    }
                </select>
                <select 
                    name="region" 
                    id="region" 
                    value={region} 
                    onChange={(e) => {
                        setRegion(e.target.value)
                        }}>
                    <option value="">시/구/군 선택</option>
                    {
                        regions.map((region, index) => (
                            <option key={index} value={region}>{region}</option>
                        ))
                    }
                </select>
            </div>
            <div className="search-box">
                <input className="input r15b" 
                    type="text" 
                    placeholder="응급실종류, 응급실명 검색" 
                    name="emergencyName" 
                    id="emergencyName" 
                    value={keyword} 
                    onChange={(e) => {
                        setKeyword(e.target.value)
                    }}
                />
                <button className="search-button" onClick={handleSearch}>
                    <img src={images['search19_w.png']} alt="검색" />
                </button>
            </div>
        </div>
    )
};
export default EmergencySearch;