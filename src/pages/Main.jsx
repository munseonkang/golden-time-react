import { useEffect, useRef, useState } from "react";
import { images } from '../utils/images';
import { Link } from "react-router-dom";

const Main = ()=>{
    return (
        <div id="main">
            <section>
                {/* 메인화면(응급실 안내) */}
                <div className="main">
                    <div className="inner">
                        <p className="text">
                            위급한 순간,<br className="mobile" /> 가까운 응급실 정보를<br/>
                            실시간으로 제공합니다.
                        </p>
                        <div>
                            <ul className="flex">
                                <li className="block">
                                    <p>강남세브란스병원 응급진료센터</p>
                                    <div className="info flex">
                                        <div>
                                            <p>현재 위치에서 <b>1.4km</b></p>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th><img src={images['main_icon_place.png']} alt=""/></th>
                                                        <td>서울 강남구 언주로 211</td>
                                                    </tr>
                                                    <tr>
                                                        <th><img src={images['main_icon_tel.png']} alt=""/></th>
                                                        <td>02-2019-3333</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <p>1</p>
                                    </div>
                                    <div className="bed">
                                        <p>(가용 병상 수 / 기준 병상 수)</p>
                                        <ul className="flex color">
                                            <li className="red">
                                                일반 <div><span>-7</span> / 15</div>
                                            </li>
                                            <li className="yello">
                                                소아 <div><span>1</span> / 2</div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="block">
                                    <p>강남세브란스병원 응급진료센터</p>
                                    <div className="info flex">
                                        <div>
                                            <p>현재 위치에서 <b>5.2km</b></p>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th><img src={images['main_icon_place.png']} alt=""/></th>
                                                        <td>서울 강남구 언주로 211</td>
                                                    </tr>
                                                    <tr>
                                                        <th><img src={images['main_icon_tel.png']} alt=""/></th>
                                                        <td>02-2019-3333</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <p>2</p>
                                    </div>
                                    <div className="bed">
                                        <p>(가용 병상 수 / 기준 병상 수)</p>
                                        <ul className="flex color">
                                            <li className="green">
                                                일반 <div><span>2</span> / 15</div>
                                            </li> 
                                            <li className="yello">
                                                소아 <div><span>1</span> / 2</div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="block">
                                    <p>강남세브란스병원 응급진료센터</p>
                                    <div className="info flex">
                                        <div>
                                            <p>현재 위치에서 <b>12.6km</b></p>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th><img src={images['main_icon_place.png']} alt=""/></th>
                                                        <td>서울 강남구 언주로 211</td>
                                                    </tr>
                                                    <tr>
                                                        <th><img src={images['main_icon_tel.png']} alt=""/></th>
                                                        <td>02-2019-3333</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <p>3</p>
                                    </div>
                                    <div className="bed">
                                        <p>(가용 병상 수 / 기준 병상 수)</p>
                                        <ul className="flex color">
                                            <li className="red">
                                                일반 <div><span>-7</span> / 15</div>
                                            </li>
                                            <li className="green">
                                                소아 <div><span>0</span> / 2</div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="block">
                                    <p>강남세브란스병원 응급진료센터</p>
                                    <div className="info flex">
                                        <div>
                                            <p>현재 위치에서 <b>12.6km</b></p>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th><img src={images['main_icon_place.png']} alt=""/></th>
                                                        <td>서울 강남구 언주로 211</td>
                                                    </tr>
                                                    <tr>
                                                        <th><img src={images['main_icon_tel.png']} alt=""/></th>
                                                        <td>02-2019-3333</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <p>4</p>
                                    </div>
                                    <div className="bed">
                                        <p>(가용 병상 수 / 기준 병상 수)</p>
                                        <ul className="flex color">
                                            <li className="red">
                                                일반 <div><span>-7</span> / 15</div>
                                            </li>
                                            <li className="green">
                                                소아 <div><span>0</span> / 2</div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 검색창 */}
                <div className="con1">
                    <div className="inner">
                        <div className="flex">
                            <img src={images['main_con1_1.png']} alt=""/>
                            <div>
                                    어디서 찾아야 할지 모르시겠나요?
                                <p><span>병원명/약국명/의약품명</span>을 찾아보세요.</p>
                            </div>
                        </div>
                        <div>
                            <form name="searchForm" id="searchForm" action="/plan/list">
                                <input type="search" id="keyword" name="keyword" placeholder="예 ) 대학교병원, 내과, 골든타임약국, 타이레놀 "/>
                                <Link to="#" id="search-btn" className="btn">
                                    <img src={images['search29_w.png']} alt=""/>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>

                {/* 메뉴 아이콘 버튼 */}
                <div className="con2">
                    <ul className="flex inner">
                        <li>
                            <Link to="/emergency">
                                <div><img src={images['main_con2_button1.png']} alt=""/></div>
                                <p>실시간응급실</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/hospital">
                                <div><img src={images['main_con2_button1.png']} alt=""/></div>
                                <p>병원 조회</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/pharmacy">
                                <div><img src={images['main_con2_button1.png']} alt=""/></div>
                                <p>약국 조회</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/check-up">
                                <div><img src={images['main_con2_button1.png']} alt=""/></div>
                                <p>건강검진기관</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/medicine">
                                <div><img src={images['main_con2_button1.png']} alt=""/></div>
                                <p>의약품정보</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/first-aid/faq">
                                <div><img src={images['main_con2_button1.png']} alt=""/></div>
                                <p>FAQ</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/first-aid/solution">
                                <div><img src={images['main_con2_button1.png']} alt=""/></div>
                                <p>대처방법</p>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* 상황별 대처 방법 */}
                <div className="con3">
                    <div className="inner">
                        <div className="main-title">
                            <img src={images['main_title_point.png']} alt=""/>
                            <h2>상황별 대처 방법</h2>
                            <h3>다양한 응급상황 대처방법을 미리 확인해주세요.</h3>
                        </div>
                        
                        <ul className="slider flex">
                            <li>
                                <Link to="#">
                                    <img src={images['temp1.jpg']} alt=""/>
                                    <h4>질병관리청 아프지마TV</h4>
                                    <p>[심폐소생술] 올바른 심폐소생술과 제세동기 사용법</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <img src={images['temp2.jpg']} alt=""/>
                                    <h4>질병관리청 아프지마TV</h4>
                                    <p>[심폐소생술] 올바른 심폐소생술과 제세동기 사용법</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <img src={images['temp3.jpg']} alt=""/>
                                    <h4>질병관리청 아프지마TV</h4>
                                    <p>[심폐소생술] 올바른 심폐소생술과 제세동기 사용법</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <img src={images['temp3.jpg']} alt=""/>
                                    <h4>질병관리청 아프지마TV</h4>
                                    <p>[심폐소생술] 올바른 심폐소생술과 제세동기 사용법</p>
                                </Link>
                            </li>
                        </ul>

                        {/* <div className="slide_btn">
                            <a className="prev-btn"><img src={images['main_con3_prev.png']} alt="이전버튼"/></a>
                            <a className="next-btn"><img src={images['main_con3_next.png']} alt="다음버튼"/></a>
                        </div> */}

                    </div>
                </div>

                {/* 위치 및 정보 검색 */}
                <div className="con4">
                    <div className="inner">
                        <div className="main-title">
                            <img src={images['main_title_point.png']} alt=""/>
                            <h2>위치 및 정보 검색</h2>
                            <h3>다양한 의료기관의 정보를 만나보세요.</h3>
                        </div>
                        <div className="box">
                            <div className="box1">
                                <Link to="/hospital">
                                    <div className="text">
                                        <span>병원 조회 </span>HOSPITAL
                                        <p>
                                            병원의 주소, 진료시간, 진료과목 등<br/>
                                            다양한 정보를 확인할 수 있습니다.
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            <div className="box2">
                                <Link to="/pharmacy">
                                    <div className="text">
                                        <span>약국 조회 </span>PHARMACY
                                        <p>
                                            약국의 주소, 운영시간 등<br/>
                                            다양한 정보를 확인할 수 있습니다.
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            <div className="box3">
                                <Link to="/check-up">
                                    <div className="text">
                                        <span>건강검진기관</span>
                                        <p>
                                            건강검진기관의 주소, 운영시간 등<br/>
                                            다양한 정보를 확인할 수 있습니다.
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            <div className="box4">
                                <Link to="/medicine">
                                    <div className="text">
                                        <span>의약품 정보</span>
                                        <p>
                                            의약품의 생김새, 성분 등<br/>
                                            다양한 정보를 확인할 수 있습니다.
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>          
        </div>
    );
}
export default Main;