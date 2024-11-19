import { useEffect, useRef, useState } from "react";
import { images } from '../../utils/images';

const Hospital = ()=>{

    // @@ 탭메뉴 @@
    // 기본적으로 'tab1'을 활성화
    const [activeTab, setActiveTab] = useState('tab1'); 

    // 탭 클릭 시 activeTab 상태 변경
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    // @@ 리뷰모달창 @@
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleOpenDetail = () => {
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
    };


    // @@ 리뷰모달창 @@
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };



    return (
        <>
            <div id="hospital">
                {/* ★★★작업위치-시작★★★ */}
                <div className="flex top">
                    {/* 왼쪽 정보 */}
                    <div className="info">
                        <div className="search">
                            <form name="searchForm" id="searchForm" action="/plan/list">
                                <div className="flex">
                                    <select name="keywordA" id="keywordA">
                                        <option value="all" selected>시/도 선택</option>
                                        <option value="a">서울특별시</option>
                                        <option value="b">경기도</option>
                                        <option value="c">부산광역시</option>
                                    </select>
                                    <select name="keywordB" id="keywordB">
                                        <option value="all" selected>군/구 선택</option>
                                        <option value="a">강남구</option>
                                        <option value="b">강동구</option>
                                        <option value="c">강북구</option>
                                    </select>
                                </div>
                                <div className="flex">
                                    <input type="search" id="keyword" name="keyword" placeholder="병원종류, 병원명 검색" />
                                    <a id="search-btn" className="btn">
                                        <img src={images['search20_w.png']} alt=""/>
                                    </a>
                                </div>
                            </form>
                        </div>
                        <div className="list">
                            <div className="flex">
                                <p>총 23건</p> 
                                <ul className="sorting flex">
                                    <li><a href="#">거리순</a></li>
                                    <li><a href="#">평점순</a></li>
                                    <li><a href="#">방문자순</a></li>
                                </ul>
                            </div>
                            <ul className="scroll">
                                <li onClick={handleOpenDetail}>
                                    <div className="name">
                                        라움성형외과의원
                                        <span> 성형외과</span>
                                        <a href="#"><img src={images['star20_off.png']} alt=""/></a>
                                    </div>
                                    <span>서울 강남구 압구정로 228 대웅빌딩 301호</span>
                                    <div className="open"><p className="green">진료중</p>00:00 ~ 24:00</div>
                                    <div className="grade flex">
                                        <span>3.2</span>
                                        <div className="img">
                                            <img src={images['grade3.png']} alt=""/>
                                        </div>
                                        리뷰 19건
                                    </div>
                                </li>
                                <li onClick={handleOpenDetail}>
                                    <div className="name">
                                        라움성형외과의원
                                        <span> 성형외과</span>
                                        <a href="#"><img src={images['star20_off.png']} alt=""/></a>
                                    </div>
                                    <span>서울 강남구 압구정로 228 대웅빌딩 301호</span>
                                    <div className="open"><p className="green">진료중</p>00:00 ~ 24:00</div>
                                    <div className="grade flex">
                                        <span>3.2</span>
                                        <div className="img">
                                            <img src={images['grade3.png']} alt=""/>
                                        </div>
                                        리뷰 19건
                                    </div>
                                </li>
                                <li onClick={handleOpenDetail}>
                                    <div className="name">
                                        라움성형외과의원
                                        <span> 성형외과</span>
                                        <a href="#"><img src={images['star20_off.png']} alt=""/></a>
                                    </div>
                                    <span>서울 강남구 압구정로 228 대웅빌딩 301호</span>
                                    <div className="open"><p className="green">진료중</p>00:00 ~ 24:00</div>
                                    <div className="grade flex">
                                        <span>3.2</span>
                                        <div className="img">
                                            <img src={images['grade3.png']} alt=""/>
                                        </div>
                                        리뷰 19건
                                    </div>
                                </li>
                                <li onClick={handleOpenDetail}>
                                    <div className="name">
                                        라움성형외과의원
                                        <span> 성형외과</span>
                                        <a href="#"><img src={images['star20_off.png']} alt=""/></a>
                                    </div>
                                    <span>서울 강남구 압구정로 228 대웅빌딩 301호</span>
                                    <div className="open"><p className="green">진료중</p>00:00 ~ 24:00</div>
                                    <div className="grade flex">
                                        <span>3.2</span>
                                        <div className="img">
                                            <img src={images['grade3.png']} alt=""/>
                                        </div>
                                        리뷰 19건
                                    </div>
                                </li>
                                <li onClick={handleOpenDetail}>
                                    <div className="name">
                                        라움성형외과의원
                                        <span> 성형외과</span>
                                        <a href="#"><img src={images['star20_off.png']} alt=""/></a>
                                    </div>
                                    <span>서울 강남구 압구정로 228 대웅빌딩 301호</span>
                                    <div className="open"><p className="green">진료중</p>00:00 ~ 24:00</div>
                                    <div className="grade flex">
                                        <span>3.2</span>
                                        <div className="img">
                                            <img src={images['grade3.png']} alt=""/>
                                        </div>
                                        리뷰 19건
                                    </div>
                                </li>
                                <li onClick={handleOpenDetail}>
                                    <div className="name">
                                        라움성형외과의원
                                        <span> 성형외과</span>
                                        <a href="#"><img src={images['star20_off.png']} alt=""/></a>
                                    </div>
                                    <span>서울 강남구 압구정로 228 대웅빌딩 301호</span>
                                    <div className="open"><p className="green">진료중</p>00:00 ~ 24:00</div>
                                    <div className="grade flex">
                                        <span>3.2</span>
                                        <div className="img">
                                            <img src={images['grade3.png']} alt=""/>
                                        </div>
                                        리뷰 19건
                                    </div>
                                </li>
                                <li onClick={handleOpenDetail}>
                                    <div className="name">
                                        라움성형외과의원
                                        <span> 성형외과</span>
                                        <a href="#"><img src={images['star20_off.png']} alt=""/></a>
                                    </div>
                                    <span>서울 강남구 압구정로 228 대웅빌딩 301호</span>
                                    <div className="open"><p className="green">진료중</p>00:00 ~ 24:00</div>
                                    <div className="grade flex">
                                        <span>3.2</span>
                                        <div className="img">
                                            <img src={images['grade3.png']} alt=""/>
                                        </div>
                                        리뷰 19건
                                    </div>
                                </li>
                                <li onClick={handleOpenDetail}>
                                    <div className="name">
                                        라움성형외과의원
                                        <span> 성형외과</span>
                                        <a href="#"><img src={images['star20_off.png']} alt=""/></a>
                                    </div>
                                    <span>서울 강남구 압구정로 228 대웅빌딩 301호</span>
                                    <div className="open"><p className="green">진료중</p>00:00 ~ 24:00</div>
                                    <div className="grade flex">
                                        <span>3.2</span>
                                        <div className="img">
                                            <img src={images['grade3.png']} alt=""/>
                                        </div>
                                        리뷰 19건
                                    </div>
                                </li>
                                <li onClick={handleOpenDetail}>
                                    <div className="name">
                                        라움성형외과의원
                                        <span> 성형외과</span>
                                        <a href="#"><img src={images['star20_off.png']} alt=""/></a>
                                    </div>
                                    <span>서울 강남구 압구정로 228 대웅빌딩 301호</span>
                                    <div className="open"><p className="green">진료중</p>00:00 ~ 24:00</div>
                                    <div className="grade flex">
                                        <span>3.2</span>
                                        <div className="img">
                                            <img src={images['grade3.png']} alt=""/>
                                        </div>
                                        리뷰 19건
                                    </div>
                                </li>
                                <li onClick={handleOpenDetail}>
                                    <div className="name">
                                        라움성형외과의원
                                        <span> 성형외과</span>
                                        <a href="#"><img src={images['star20_off.png']} alt=""/></a>
                                    </div>
                                    <span>서울 강남구 압구정로 228 대웅빌딩 301호</span>
                                    <div className="open"><p className="green">진료중</p>00:00 ~ 24:00</div>
                                    <div className="grade flex">
                                        <span>3.2</span>
                                        <div className="img">
                                            <img src={images['grade3.png']} alt=""/>
                                        </div>
                                        리뷰 19건
                                    </div>
                                </li>
                                <li onClick={handleOpenDetail}>
                                    <div className="name">
                                        라움성형외과의원
                                        <span> 성형외과</span>
                                        <a href="#"><img src={images['star20_off.png']} alt=""/></a>
                                    </div>
                                    <span>서울 강남구 압구정로 228 대웅빌딩 301호</span>
                                    <div className="open"><p className="green">진료중</p>00:00 ~ 24:00</div>
                                    <div className="grade flex">
                                        <span>3.2</span>
                                        <div className="img">
                                            <img src={images['grade3.png']} alt=""/>
                                        </div>
                                        리뷰 19건
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {isDetailOpen && (
                        <div className="detail">
                            <div className="scroll">
                                <p>병원상세<span><img src={images['close16.png']} alt="" onClick={handleCloseDetail} /></span></p>
                                <div className="data">
                                    <p>라움성형외과의원<a href="#"><img src={images['star25_off.png']} alt=""/></a></p>
                                    <span>성형외과</span>
                                    <div className="open"><p className="green">진료중</p> 09:00 ~ 19:00</div>
                                    <table>
                                        <tr>
                                            <th><img src={images['detail_icon_place.png']} alt=""/></th>
                                            <td>(01234) 서울 강남구 압구정로 228 대웅빌딩 301호 주소가 두줄일 경우도 있지요오오</td>
                                        </tr>
                                        <tr>
                                            <th><img src={images['detail_icon_tel.png']} alt=""/></th>
                                            <td>02-582-1577</td>
                                        </tr>
                                        <tr className="emergency">
                                            <th><img src={images['detail_icon_emergency.png']} alt=""/></th>
                                            <td>응급실 운영</td>
                                        </tr>
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
                                                    <td>09:00 - 19:00</td>
                                                </tr>
                                                <tr>
                                                    <th>화요일</th>
                                                    <td>09:00 - 19:00</td>
                                                </tr>
                                                <tr>
                                                    <th>수요일</th>
                                                    <td>09:00 - 19:00</td>
                                                </tr>
                                                <tr>
                                                    <th>목요일</th>
                                                    <td>09:00 - 19:00</td>
                                                </tr>
                                                <tr>
                                                    <th>금요일</th>
                                                    <td>09:00 - 19:00</td>
                                                </tr>
                                                <tr>
                                                    <th>토요일</th>
                                                    <td>09:00 - 19:00</td>
                                                </tr>
                                                <tr>
                                                    <th>일요일</th>
                                                    <td>09:00 - 19:00</td>
                                                </tr>
                                                <tr className="holiday">
                                                    <th>공휴일</th>
                                                    <td>09:00 - 19:00</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className="subject">
                                            <h4>진료과목</h4>
                                            <ul>
                                                <li>가정의학과</li>
                                                <li>내과</li>
                                                <li>마취통증의학과</li>
                                                <li>병리과</li>
                                                <li>보건(의료원)소</li>
                                                <li>비뇨기과</li>
                                                <li>산부인과</li>
                                                <li>성형외과</li>
                                                <li>소아청년과</li>
                                                <li>신경과</li>
                                                <li>가정의학과</li>
                                                <li>내과</li>
                                                <li>마취통증의학과</li>
                                                <li>병리과</li>
                                                <li>보건(의료원)소</li>
                                                <li>비뇨기과</li>
                                                <li>산부인과</li>
                                                <li>성형외과</li>
                                                <li>소아청년과</li>
                                                <li>신경과</li>
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
                                            <a href="#" onClick={handleOpenModal}>리뷰작성</a>
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
                    </div>

                    {/* 오른쪽 지도 */}
                    <div className="map">
                        
                    </div>
                </div>

                {/* 리뷰 모달창 */}
                {isModalOpen && (
                    <div className="review-modal">
                        <div className="box">
                            <form name="reviewForm" id="reviewForm" action="">
                                <p>라움성형외과의원</p>
                                <div className="flex">
                                    <div className="flex">
                                        <div className="img">
                                            <img src={images['default_image.jpg']} alt=""/>
                                        </div>
                                        <p>애플이</p>
                                    </div>
                                    <div className="grade">
                                        <img src={images['grade29_on.png']} alt=""/>
                                        <img src={images['grade29_on.png']} alt=""/>
                                        <img src={images['grade29_on.png']} alt=""/>
                                        <img src={images['grade29_off.png']} alt=""/>
                                        <img src={images['grade29_off.png']} alt=""/>
                                    </div>
                                </div>
                                <textarea name="" id="" rows="4" placeholder="이곳에 다녀온 경험을 자세히 공유해 주세요."></textarea>
                                <div className="btn flex">
                                    <a id="cancel-btn" className="cancel-btn" onClick={handleCloseModal}>취소</a>
                                    <a id="review-btn" className="review-btn">게시</a>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* ★★★작업위치-끝★★★ */}
            </div>
        </>
    );
}
export default Hospital;