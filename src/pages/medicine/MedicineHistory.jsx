import { useEffect, useRef, useState } from "react"
import { images } from '../../utils/images';

const MedicineHistory = ({ onSearch }) => {
    const [query, setQuery] = useState(""); // 검색어
    const [searchHistory, setSearchHistory] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); //dom 참조

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (e) => {
            if(dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    // 최신 검색어 추가, 7개 제한
    const handleSearch = () => {
        if(query.trim() === "") {
            alert("검색어를 입력하세요!");
            return;
        }
        
        setSearchHistory((prevHistory) => {
            const updatedHistory = [query, ...prevHistory.filter(term => term !== query)];
            return updatedHistory.slice(0, 7);
        });

        onSearch(query);
        setQuery("");
        setIsDropdownOpen(false);
    };

    // 드롭다운 열림/닫힘 토글
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <div className="dsearch-bar">
            <div className="input-container" ref={dropdownRef}>
                <img className="search-logo" src={images['logo20.png']} alt="goldtime logo" />
                <input 
                    type="text" 
                    placeholder="제품명 검색"
                    name="" id=""
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                    onClick={toggleDropdown}
                />
                <button className="ddropdown-button" onClick={toggleDropdown}>
                    <img src={images['dropdown17.png']} alt="열기" />
                </button>
                <button className="dsearch-button" onClick={handleSearch}>
                    <img src={images['search20.png']} alt="검색" />
                </button>

                {isDropdownOpen && searchHistory.length > 0 && (
                    <div className="dresult-items">
                        {searchHistory.map((item, index) => (
                            <div key={index}
                                className="dresult-item" 
                                onClick={() => {
                                    setQuery(item);
                                    handleSearch();
                                    setIsDropdownOpen(false);
                                }}>
                                <img src={images['search16.png']} alt="관련검색어" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default MedicineHistory;