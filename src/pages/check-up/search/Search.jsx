import { useRef } from 'react';
import { images } from '../../../utils/images';
import ItemBox from './ItemBox';

const Search = () => {
    const searchTerms = useRef({ sido:"", sigungu:"", day:"", time:"", specialty:"", keyword:"", regular:{}, cancer:{}});

    return (
        <div className="search">
            <div className="container">
                <h2>검진기관 검색</h2>
                <div className="top-box">
                    <ItemBox id="region" inputBox={{type:"button", value:"지역을 선택해 주세요.", readOnly:true, image:"arrow_below14_g.png"}} />
                    {/* <div className="item-box">
                        <div>
                            <label className="b17mc" htmlFor="region">지역 선택</label>
                            <div className="gps-box">
                                <img src={images['gps13.png']} alt="현재 위치를 검색 지역으로 선택합니다." />
                                <span className="r12b">현재 위치</span>
                            </div>
                        </div>
                        <div className="input-box">
                            <input className="r17b" type="button" id="region" placeholder="지역을 선택해 주세요." value="서울특별시 > 서초구" readOnly />
                            <div className="icon-box">
                                <img src={images['arrow_below14_g.png']} alt="" />
                            </div>
                        </div>
                        <div className="select-box">
                            <section>
                                <ul>
                                    <li className="r17dp">서울특별시
                                        <div>
                                            <img src={images['check14_p.png']} alt="" />
                                        </div>
                                    </li>
                                    <li className="r17g">부산광역시</li>
                                    <li className="r17g">인천광역시</li>
                                </ul>
                                <span></span>
                                <ul>
                                    <li className="r17dp">강남구
                                        <div>
                                            <img src={images['check14_p.png']} alt="" />
                                        </div>
                                    </li>
                                    <li className="r17g">강서구</li>
                                    <li className="r17g">서초구</li>
                                </ul>
                            </section>
                        </div>
                    </div> */}
                    <ItemBox id="time" inputBox={{type:"button", placeholder:"방문 예정 시간을 선택해 주세요.", readOnly:true, image:'time15_g.png'}} />
                    {/* <div className="item-box">
                        <label className="b17mc" htmlFor="time">방문 예정 시간</label>
                        <div className="input-box">
                            <input className="r17b" type="button" id="time" placeholder="방문 예정 시간을 선택해 주세요." value="평일 > 12:00" readOnly />
                            <div className="icon-box">
                                <img src={images['time15_g.png']} alt="" />
                            </div>
                        </div>
                        <div className="select-box">
                            <section>
                                <ul>
                                    <li className="r17dp">평일
                                        <div>
                                            <img src={images['check14_p.png']} alt="" />
                                        </div>
                                    </li>
                                    <li className="r17g">주말</li>
                                    <li className="r17g">공휴일</li>
                                </ul>
                                <span></span>
                                <ul>
                                    <li className="r17dp">11:00
                                        <div>
                                            <img src={images['check14_p.png']} alt="" />
                                        </div>
                                    </li>
                                    <li className="r17g">12:00</li>
                                    <li className="r17g">13:00</li>
                                </ul>
                            </section>
                        </div>
                    </div> */}
                    <ItemBox id="specialty" inputBox={{type:"button", placeholder:"운영 진료과목을 선택해주세요.", readOnly:true, image:'arrow_below14_g.png'}} />
                    {/* <div className="item-box">
                        <label className="b17mc" htmlFor="specialty">진료과 구분</label>
                        <div className="input-box">
                            <input className="r17b" type="button" id="specialty" placeholder="운영 진료과목을 선택해주세요." value="정신건강의학과" readOnly />
                            <div className="icon-box">
                                <img src={images['arrow_below14_g.png']} alt="" />
                            </div>
                        </div>
                        <div className="select-box">
                            <section>
                                <ul>
                                    <li className="r17dp">정신건강의학과
                                        <div>
                                            <img src={images['check14_p.png']} alt="" />
                                        </div>
                                    </li>
                                    <li className="r17g">신경외과</li>
                                    <li className="r17g">정형외과</li>
                                </ul>
                            </section>
                        </div>
                    </div> */}
                    <ItemBox id="center" inputBox={{type:"text", placeholder:"검진기관명을 검색해 주세요.", readOnly:false, image:'search16.png'}} />
                    {/* <div className="item-box">
                        <label className="b17mc" htmlFor="center">검진기관명</label>
                        <div className="input-box">
                            <input className="r17b" type="text" id="center" placeholder="검진기관명을 검색해 주세요." />
                            <div className="icon-box">
                                <img src={images['search16.png']} alt="" />
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="bottom-box">
                    <div>
                        <span className="b17mc">검진 유형</span>
                        <span className="r14g">(선택)</span>
                    </div>
                    <div className="item-box">
                        <span className="b16mc">일반 검진</span>
                        <div className="check-box">
                            <label className="check-btn checked r17b">
                                <input className="hidden" type="checkbox" />
                                전체
                            </label>
                            <label className="check-btn unchecked r17b">
                                <input className="hidden" type="checkbox" />
                                일반
                            </label>
                            <label className="check-btn unchecked r17b">
                                <input className="hidden" type="checkbox" />
                                구강
                            </label>
                            <label className="check-btn unchecked r17b">
                                <input className="hidden" type="checkbox" />
                                영유아
                            </label>
                            <label className="check-btn unchecked r17b">
                                <input className="hidden" type="checkbox" />
                                학생
                            </label>
                            <label className="check-btn unchecked r17b">
                                <input className="hidden" type="checkbox" />
                                학교 밖 청소년
                            </label>
                            <label className="check-btn unchecked r17b">
                                <input className="hidden" type="checkbox" />
                                장애친화 검진기관
                            </label>
                        </div>
                    </div>
                    <div className="item-box">
                        <span className="b16mc">암 검진</span>
                        <div className="check-box">
                            <label className="check-btn checked r17b">
                                <input className="hidden" type="checkbox" />
                                전체
                            </label>
                            <label className="check-btn unchecked r17b">
                                <input className="hidden" type="checkbox" />
                                위암
                            </label>
                            <label className="check-btn unchecked r17b">
                                <input className="hidden" type="checkbox" />
                                대장암
                            </label>
                            <label className="check-btn unchecked r17b">
                                <input className="hidden" type="checkbox" />
                                자궁경부암
                            </label>
                            <label className="check-btn unchecked r17b">
                                <input className="hidden" type="checkbox" />
                                유방암
                            </label>
                            <label className="check-btn unchecked r17b">
                                <input className="hidden" type="checkbox" />
                                간암
                            </label>
                            <label className="check-btn unchecked r17b">
                                <input className="hidden" type="checkbox" />
                                폐암
                            </label>
                        </div>
                    </div>
                </div>
                <div className="btn-box">
                    <button className="r17w">초기화</button>
                    <button className="r17w">검  색</button>
                </div>
            </div>
        </div>
    )
}
export default Search;