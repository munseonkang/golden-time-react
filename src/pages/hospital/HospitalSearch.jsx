import { useState } from "react";
import { images } from '../../utils/images';
import * as regions from '../../constants/regions';

const HospitalSearch = ({ selectedRegion, onRegionChange, onSearch })=>{
    const { sido, sigungu } = selectedRegion;
    const [keyword, setKeyword] = useState("");

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
        const newSido = e.target.value;
        onRegionChange({ sido: newSido, sigungu: "all" }); // 시/도 변경 시/군/구 초기화
    };

    const handleSigunguChange = (e) => {
        const newSigungu = e.target.value;
        onRegionChange({ ...selectedRegion, sigungu: newSigungu });
    };

    const handleSearchClick = (e) => {
        e.preventDefault();
        onSearch(keyword);
    };

    return (
        <div className="search">
            <form name="searchForm" id="searchForm" onSubmit={handleSearchClick}>
                <div className="flex">
                    <select name="keywordA" id="keywordA" value={sido} onChange={handleSidoChange}>
                        <option value="all">시/도 선택</option>
                        {regions.sido.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    <select
                        name="keywordB"
                        id="keywordB"
                        value={sigungu}
                        onChange={handleSigunguChange}
                        disabled={sido === "all"}
                    >
                        <option value="all">군/구 선택</option>
                        {sido !== "all" &&
                            areaMapping[sido]?.map((area) => (
                                <option key={area} value={area}>{area}</option>
                            ))}
                    </select>
                </div>
                <div className="flex">
                    <input
                        type="search"
                        id="keyword"
                        name="keyword"
                        placeholder="병원종류, 병원명 검색"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button id="search-btn" className="btn" type="submit">
                        <img src={images['search20_w.png']} alt="검색" />
                    </button>
                </div>
            </form>
        </div>
    );
};
export default HospitalSearch;