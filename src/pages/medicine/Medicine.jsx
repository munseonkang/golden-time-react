import React, {useEffect, useState} from 'react';
import '../../assets/style/pharmacy.css';
import { images } from '../../utils/images';
import Pagination from '../../components/Pagination';
import axios from 'axios';

const Medicine = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [query, setQuery] = useState("");
    const [expand, setExpand] = useState("");
    const [suggestion, setSuggestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const medicinesPerPage = 10;
    const totalPages = Math.ceil(filteredData.length / medicinesPerPage);

    const startIndex = (currentPage -1) * medicinesPerPage;
    const endIndex = startIndex + medicinesPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const API_BASE_URL = "https://apis.data.go.kr/1471000";

    // 의약품 api
    const getMedicines = async () => {

        try {
            const [response1, response2] = await axios.all([
                // 의약품 낱알식별 정보
                axios.get(`${API_BASE_URL}/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01`, {
                    params: {
                        serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                        pageNo: 1,
                        numOfRows: 50,
                        type: "json",
                        item_name: query,
                    },
                }),
                // 의약품개요정보(e약은요)
                axios.get(`${API_BASE_URL}/DrbEasyDrugInfoService/getDrbEasyDrugList`, {
                    params: {
                        serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                        pageNo: 1,
                        numOfRows: 50,
                        type: "json"
                    },
                }),
            ]);

            const medi1 = response1.data?.body?.items || [];
            const medi2 = response2.data?.body?.items || [];

            // 데이터 병합
            const medicineData = medi1.map((medi1Item) => {
                const matchedItem = medi2.find((medi2Item) => String(medi1Item.ITEM_SEQ) === String(medi2Item.itemSeq));

                return matchedItem 
                    ? {...matchedItem, ...medi1Item, isMatched: true} 
                    : {...medi1Item, isMatched: false};
            });

            setData(medicineData);
            setFilteredData(medicineData);

        } catch (error) {
            console.error("api 요청 실패한 이유: ", error);
        }
    };

    // 검색어 입력
    const handleInputChange = (e) => {
        const keyword = e.target.value;
        setQuery(keyword);

        // 연관검색어-  입력값을 포함하는 데이터를 필터링
        if(keyword.trim() !== ""){
            const filtered = data.filter((item) => 
            item.ITEM_NAME.toLowerCase().includes(keyword.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    // 검색 버튼 클릭 시
    const handleSearch = () => {
        if(query.trim() === "") {
            alert("검색어를 입력하세요!");
            return;
        }
        getMedicines();
    };

    // 아코디언
    const toggle = (index) => {
        setExpand(expand === index ? null : index);
    }

    return (
        <div id="medicine" className="medicine-container" >

            <div className="dsearch">
                <h2>의약품 검색</h2>
                <div className="dsearch-bar">
                    <div className="input-container">
                        <img className="search-logo" src={images['logo20.png']} alt="goldtime logo" />
                        <input 
                            type="text" 
                            placeholder="제품명 검색"
                            name="" id=""
                            value={query}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if(e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                        />
                        <button className="ddropdown-button">
                            <img src={images['dropdown17.png']} alt="열기" />
                        </button>
                        <button className="dsearch-button" onClick={handleSearch}>
                            <img src={images['search20.png']} alt="검색" />
                        </button>
                    </div>
                    {/* <div className="dresult-items">
                        {filteredData.map((item, index) => (
                            <div key={index} className="dresult-item">
                                <img src={images['search16.png']} alt="관련검색어" />
                                <span>{item.ITEM_NAME}</span>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>

            <div className="ddetail-search">
                <div className="ddetail-title">
                    <h3>의약품 상세검색</h3>
                    <p>
                        상세검색에서 각 항복에 검색어를 입력한 후 검색 버튼을 클릭하면 해당 조건에 맞는 내용이 검색됩니다. 여러 항목을 동시에 검색할 수 있습니다.
                    </p>
                </div>
                <form action="">
                    <div className="dform-row">
                        <label>제품명<br />(한글/영문)</label>
                        <input type="text" name="" id="" />
                        <label>성분명<br />(한글/영문)</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="dform-row">
                        <label>회사명</label>
                        <input type="text" name="" id="" />
                        <label>효능효과</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="dform-row checkbox">
                        <label>구분</label>
                        <div className="check">
                            <input type="checkbox" name="" id="전체" />
                            <label htmlFor="전체">전체</label>
                            <input type="checkbox" name="" id="일반" />
                            <label htmlFor="일반">일반</label>
                            <input type="checkbox" name="" id="전문" />
                            <label htmlFor="전문">전문</label>
                        </div>
                        <label>제형</label>
                        <select name="" id="">
                            <option value="전체">전체</option>
                            <option value="정제">정제</option>
                            <option value="캡슐">캡슐</option>
                            <option value="정제">가글액체</option>
                            <option value="정제">건조시럽</option>
                            <option value="정제">경피흡수제</option>
                        </select>
                    </div>
                    <div className="dbutton-row">
                        <button type="reset" className="dreset-button">초기화</button>
                        <button type="submit" className="dsubmit-button">검색</button>
                    </div>
                </form>
            </div>

            <div className="dresult">
                <div className="result-header">
                    <h3>검색결과 리스트</h3>
                    <span className="reault-count">총 {data.length}개</span>
                </div>
                <table className="dtable">
                    <thead className="r15w">
                        <tr>
                            <th>식별표시</th>
                            <th>제품명</th>
                            <th>성분/함량</th>
                            <th>회사명</th>
                            <th>제형</th>
                            <th>구분</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="r15b">
                        {currentData.length > 0 ? (
                            currentData.map((item, index) => {
                                // ITEM_NAME 기준으로 분리
                                const parts = item.ITEM_NAME.split(/\(|\)/);
                                const name = parts[0] || "";
                                const ingredient = parts[1] || "";

                                return (
                                    <React.Fragment key={index}>
                                        <tr onClick={() => toggle(index)} className="accordion-header">
                                            <td className="img-tag"><img className="pill-image" src={item.ITEM_IMAGE} alt="pill" /></td>
                                            <td>{name}</td>
                                            <td>{ingredient}</td>
                                            <td>{item.ENTP_NAME}</td>
                                            <td>{item.FORM_CODE_NAME}</td>
                                            <td>{item.ETC_OTC_NAME}</td>
                                            <td className="accordion-cell">
                                                <img src={images['dropdown17.png']} alt="열기" />
                                            </td>
                                        </tr>
                                        {expand === index && (
                                            <tr className="accordion-content no-hover">
                                                <td colSpan="7">
                                                    <div className="medicine-details">
                                                        <h4 className="b18mc">제품 기본정보</h4>
                                                        <div className="medicine-item">
                                                            <div className="medicine-left">
                                                                <div className="medicine-info r15b">
                                                                    <p><strong>제품명</strong><span>{name}</span></p>
                                                                    <p><strong>성분/함량</strong><span>{ingredient}</span></p>
                                                                    <p><strong>품목일련번호</strong><span>{item.ITEM_SEQ}</span></p>
                                                                    <p><strong>전문/일반</strong><span>{item.ETC_OTC_NAME}</span></p>
                                                                    <p><strong>제조/수입사</strong><span>{item.ENTP_NAME}</span></p>
                                                                    <p><strong>제형</strong><span>{item.FORM_CODE_NAME}</span></p>
                                                                    <p><strong>의약품 모양</strong><span>{item.DRUG_SHAPE}</span></p>
                                                                </div>
                                                                <div className="medicine-info r15b">
                                                                    <p><strong>제품영문명</strong><span>{item.ITEM_ENG_NAME}</span></p>
                                                                    <p><strong>색깔</strong><span>{item.COLOR_CLASS1}</span></p>
                                                                    <p><strong>품목허가일자</strong><span>{item.ITEM_PERMIT_DATE}</span></p>
                                                                    <p><strong>성상</strong><span>{item.CHART}</span></p>
                                                                    <p><strong>분류번호</strong><span>{item.CLASS_NO}</span></p>
                                                                    <p><strong>분류명</strong><span>{item.CLASS_NAME}</span></p>
                                                                    <p><strong>효능/효과</strong><span>{item.efcyQesitm}</span></p>
                                                                </div>
                                                            </div>
                                                            <div className="medicine-right">
                                                                <img className='pill-detail-image' src={item.ITEM_IMAGE} alt="pill"  />
                                                                <table className="dimension-table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>장축(mm)</th>
                                                                            <th>단축(mm)</th>
                                                                            <th>두께(mm)</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>{item.LENG_LONG}</td>
                                                                            <td>{item.LENG_SHORT}</td>
                                                                            <td>{item.THICK}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan="7"className="no-results r17b">검색된 결과가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />
        </div>
    );
}
export default Medicine;