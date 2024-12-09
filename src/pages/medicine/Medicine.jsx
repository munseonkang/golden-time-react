import React, {useEffect, useState} from 'react';
import '../../assets/style/pharmacy.css';
import { images } from '../../utils/images';
import Pagination from '../../components/Pagination';
import axios from 'axios';
import MedicineHistory from './MedicineHistory';
import MedicineDetailSearch from './MedicineDetailSearch';

const Medicine = () => {
    const [filteredData, setFilteredData] = useState([]); //필터링 데이터
    const [expand, setExpand] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const medicinesPerPage = 10;
    const totalPages = Math.ceil(filteredData.length / medicinesPerPage);
    const startIndex = (currentPage -1) * medicinesPerPage;
    const endIndex = startIndex + medicinesPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const API_BASE_URL = "https://apis.data.go.kr/1471000";

    useEffect(() => {
        console.log("filteredData", filteredData);
        setExpand(null); //아코디언 초기화
    }, [filteredData]);

    // 의약품 api
    const getMedicines = async (query = '', company = '') => {

        try {
            const [response1, response2] = await axios.all([
                // 의약품 낱알식별 정보
                axios.get(`${API_BASE_URL}/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01`, {
                    params: {
                        item_name: query,
                        entp_name: company,
                        serviceKey: process.env.REACT_APP_DATA_SERVICE_KEY,
                        pageNo: 1,
                        numOfRows: 50,
                        type: "json",
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

            // 두 api 에서 공통데이터 확인 콘솔
            // console.log("medi1 데이터:", medi1);
            // console.log("medi2 데이터:", medi2);

            // // 공통 속성 확인
            // const commonItems = medi1.filter(medi1Item =>
            //     medi2.some(medi2Item => String(medi1Item.ITEM_SEQ) === String(medi2Item.itemSeq))
            // );
            // console.log("공통 데이터:", commonItems);
            return medicineData;

        } catch (error) {
            console.error("api 요청 실패한 이유: ", error);
        }
    };

    // 검색어 저장
    const handleSearch = async (query) => {
        if(query.trim() === "") {
            alert("검색어를 입력하세요!");
            return;
        }
        const medicineData = await getMedicines(query);
        setFilteredData(medicineData);
    };

    // 상세 검색
    const handleDetailSearch = async (formValues) => {
        const { query, company, ingredient, effect, type, form } = formValues;
        const medicineData = await getMedicines(query, company);

        // 상세조건 필터링
        const filtered = medicineData.filter((item) => {
            const matchesIngredient = !ingredient || item.ITEM_NAME?.includes(ingredient);
            const matchesEffect = !effect || item.efcyQesitm?.includes(effect);
            const matchesType = type === '전체' || item.ETC_OTC_NAME === type;
            const matchesForm = form === '전체' || item.FORM_CODE_NAME?.includes(form);
            
            return matchesIngredient && matchesEffect && matchesType && matchesForm;
        });

        setFilteredData(filtered);
    };

    // 아코디언
    const toggle = (index) => {
        setExpand(expand === index ? null : index);
    };

    return (
        <div id="medicine" className="medicine-container" >
            <div className="dsearch">
                <h2>의약품 검색</h2>
                <MedicineHistory onSearch={handleSearch} />
            </div>

            <MedicineDetailSearch onSearch={handleDetailSearch}/>
            
            <div className="dresult">
                <div className="result-header">
                    <h3>검색결과 리스트</h3>
                    <span className="reault-count">총 {filteredData.length}개</span>
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
                                // ITEM_NAME 기준으로 분리 - (첫번째 괄호와 마지막 괄호 기준)
                                const parts = item.ITEM_NAME ? item.ITEM_NAME.split(/\((.*?)\)/) : [];
                                const name = parts[0]?.trim() || "";
                                const ingredient = parts.length > 2 ? parts.slice(1, -1).join(" ").trim() : ""; // 첫 번째 괄호와 마지막 괄호 사이의 내용을 모두 합침

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