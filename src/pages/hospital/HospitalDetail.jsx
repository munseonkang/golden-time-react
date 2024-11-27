import { useEffect, useRef, useState } from "react";
import { images } from '../../utils/images';
import HospitalModal from "./HospitalModal";

const HospitalDetail = ({ isDetailOpen, selectedHospital, onClose, getFormattedTime, checkOpenStatus, cleanHospitalName, renameClassification })=>{
    const [activeTab, setActiveTab] = useState('tab1'); // 기본 tab1 활성화
    const [isModalOpen, setIsModalOpen] = useState(false); // 리뷰 모달

    // 탭메뉴
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // 리뷰 모달창
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    
    // console.log(selectedHospital.dutyDivNam, selectedHospital.dutyName);


    return (
        <>
            {/* 병원 상세정보 표시 */}
            {isDetailOpen && selectedHospital && (
                <div className="detail">
                    <div className="scroll">
                        <p>병원상세<span><img src={images['close16.png']} alt="" onClick={onClose} /></span></p>
                        <div className="data">
                            <p>{cleanHospitalName(selectedHospital.dutyName)}<a href="#"><img src={images['star25_off.png']} alt=""/></a></p>
                            <span>{renameClassification(selectedHospital.dutyDivNam, selectedHospital.dutyName)}</span>
                            <div className="open">
                                <p className={checkOpenStatus(selectedHospital).status === "진료중" ? "green" : "red"}>
                                    {checkOpenStatus(selectedHospital).status}
                                </p>
                                {checkOpenStatus(selectedHospital).open && checkOpenStatus(selectedHospital).close ? `${checkOpenStatus(selectedHospital).open} ~ ${checkOpenStatus(selectedHospital).close}` : ""}
                            </div>
                            <table>
                                <tr>
                                    <th><img src={images['detail_icon_place.png']} alt=""/></th>
                                    <td>({`${String(selectedHospital.postCdn1).trim()}${String(selectedHospital.postCdn2).trim()}`}) {selectedHospital.dutyAddr}</td>
                                </tr>
                                <tr>
                                    <th><img src={images['detail_icon_tel.png']} alt=""/></th>
                                    <td>{selectedHospital.dutyTel1}</td>
                                </tr>
                                {selectedHospital.emergency != "응급의료기관 이외" && (
                                    <tr className="emergency">
                                        <th><img src={images['detail_icon_emergency.png']} alt=""/></th>
                                        <td>응급실 운영</td>
                                    </tr>
                                )}
                            </table>
                        </div>
                        <div className="detail-tab flex">
                            <p className={`tab1 ${activeTab === 'tab1' ? 'on' : ''}`} onClick={() => handleTabClick('tab1')}>정보</p>
                            <p className={`tab2 ${activeTab === 'tab2' ? 'on' : ''}`} onClick={() => handleTabClick('tab2')}>리뷰</p>
                        </div>
                        <div className="tab-container">
                            <div className={`tab-con con1 ${activeTab === 'tab1' ? 'show' : 'hide'}`}>
                                <div className="time">
                                    <h4>운영시간</h4>
                                    <table>
                                        <tr>
                                            <th>월요일</th>
                                            <td>{getFormattedTime(selectedHospital.dutyTime1s)} - {getFormattedTime(selectedHospital.dutyTime1c)}</td>
                                        </tr>
                                        <tr>
                                            <th>화요일</th>
                                            <td>{getFormattedTime(selectedHospital.dutyTime2s)} - {getFormattedTime(selectedHospital.dutyTime2c)}</td>
                                        </tr>
                                        <tr>
                                            <th>수요일</th>
                                            <td>{getFormattedTime(selectedHospital.dutyTime3s)} - {getFormattedTime(selectedHospital.dutyTime3c)}</td>
                                        </tr>
                                        <tr>
                                            <th>목요일</th>
                                            <td>{getFormattedTime(selectedHospital.dutyTime4s)} - {getFormattedTime(selectedHospital.dutyTime4c)}</td>
                                        </tr>
                                        <tr>
                                            <th>금요일</th>
                                            <td>{getFormattedTime(selectedHospital.dutyTime5s)} - {getFormattedTime(selectedHospital.dutyTime5c)}</td>
                                        </tr>
                                        <tr>
                                            <th>토요일</th>
                                            <td>{getFormattedTime(selectedHospital.dutyTime6s)} - {getFormattedTime(selectedHospital.dutyTime6c)}</td>
                                        </tr>
                                        <tr>
                                            <th>일요일</th>
                                            <td>{getFormattedTime(selectedHospital.dutyTime7s)} - {getFormattedTime(selectedHospital.dutyTime7c)}</td>
                                        </tr>
                                        <tr className="holiday">
                                            <th>공휴일</th>
                                            <td>{getFormattedTime(selectedHospital.dutyTime8s)} - {getFormattedTime(selectedHospital.dutyTime8c)}</td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="subject">
                                    <h4>진료과목</h4>
                                    <ul>
                                        {selectedHospital.dgidIdName ? (
                                            selectedHospital.dgidIdName.split(',').map((subject, index) => (
                                                <li key={index}>{subject.trim()}</li>
                                            ))
                                        ) : (
                                            <p>진료과목 정보가 없습니다.</p>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className={`tab-con con2 ${activeTab === 'tab2' ? 'show' : 'hide'}`}>
                                <div className="score">
                                    <h4>평점</h4>
                                    <table>
                                        <tr>
                                            <th>5</th>
                                            <td>
                                                <div><p></p></div>
                                            </td>
                                            <td rowspan="5">
                                                <p>3.2</p>
                                                <img src={images['grade3.png']} alt=""/>
                                                <span>리뷰 19개</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>4</th>
                                            <td>
                                                <div><p></p></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>3</th>
                                            <td>
                                                <div><p></p></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>2</th>
                                            <td>
                                                <div><p></p></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <td>
                                                <div><p></p></div>
                                            </td>
                                        </tr>
                                    </table>
                                    <a href="#" onClick={handleOpenModal}> 리뷰작성</a>
                                </div>
                                <div className="review">
                                    <h4>리뷰</h4>
                                    <ul>
                                        <li>
                                            <div className="flex">
                                                <div className="img">
                                                    <img src={images['default_image.jpg']} alt=""/>
                                                </div>
                                                <div>
                                                    애플이
                                                    <p>2024년 11월 12일</p>
                                                </div>
                                            </div>
                                            <img src={images['grade3.png']} alt=""/>
                                            <p>
                                                리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 리뷰 모달 */}
            <HospitalModal 
                isModalOpen={isModalOpen} 
                onCloseModal={handleCloseModal} 
                hpName={cleanHospitalName(selectedHospital.dutyName)} 
            />
        </>
    );
}
export default HospitalDetail;