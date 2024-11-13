import { useEffect, useRef, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { images } from '../utils/images';

const Main = ()=>{
    const headerRef = useRef(null);

    useEffect(() => {
        //헤더 사이즈 조정
        const header = headerRef.current;
    
        if (header) {
            const handleScroll = () => {
                if (window.scrollY === 0) {
                header.classList.add('short');
                } else {
                header.classList.remove('short');
                }
            };

            window.addEventListener('scroll', handleScroll);
        }
    });

    return (
        <div id="main">
            <div ref={headerRef} id="header" class="short flex">
                <Header></Header>
            </div>

            <section>
                {/* 메인화면(응급실 안내) */}
                <div class="main">
                    <div class="inner">
                        <p class="text">
                            위급한 순간,<br class="mobile" /> 가까운 응급실 정보를<br/>
                            실시간으로 제공합니다.
                        </p>
                        <div>
                            <ul class="flex">
                                <li class="block">
                                    <p>강남세브란스병원 응급진료센터</p>
                                    <div class="info flex">
                                        <div>
                                            <p>현재 위치에서 <b>1.4km</b></p>
                                            <table>
                                                <tr>
                                                    <th><img src={images['main_icon_place.png']} alt=""/></th>
                                                    <td>서울 강남구 언주로 211</td>
                                                </tr>
                                                <tr>
                                                    <th><img src={images['main_icon_tel.png']} alt=""/></th>
                                                    <td>02-2019-3333</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <p>1</p>
                                    </div>
                                    <div class="bed">
                                        <p>(가용 병상 수 / 기준 병상 수)</p>
                                        <ul class="flex color">
                                            <li class="red">
                                                일반 <div><span>-7</span> / 15</div>
                                            </li>
                                            <li class="yello">
                                                소아 <div><span>1</span> / 2</div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="block">
                                    <p>강남세브란스병원 응급진료센터</p>
                                    <div class="info flex">
                                        <div>
                                            <p>현재 위치에서 <b>5.2km</b></p>
                                            <table>
                                                <tr>
                                                    <th><img src={images['main_icon_place.png']} alt=""/></th>
                                                    <td>서울 강남구 언주로 211</td>
                                                </tr>
                                                <tr>
                                                    <th><img src={images['main_icon_tel.png']} alt=""/></th>
                                                    <td>02-2019-3333</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <p>2</p>
                                    </div>
                                    <div class="bed">
                                        <p>(가용 병상 수 / 기준 병상 수)</p>
                                        <ul class="flex color">
                                            <li class="green">
                                                일반 <div><span>2</span> / 15</div>
                                            </li> 
                                            <li class="yello">
                                                소아 <div><span>1</span> / 2</div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="block">
                                    <p>강남세브란스병원 응급진료센터</p>
                                    <div class="info flex">
                                        <div>
                                            <p>현재 위치에서 <b>12.6km</b></p>
                                            <table>
                                                <tr>
                                                    <th><img src={images['main_icon_place.png']} alt=""/></th>
                                                    <td>서울 강남구 언주로 211</td>
                                                </tr>
                                                <tr>
                                                    <th><img src={images['main_icon_tel.png']} alt=""/></th>
                                                    <td>02-2019-3333</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <p>3</p>
                                    </div>
                                    <div class="bed">
                                        <p>(가용 병상 수 / 기준 병상 수)</p>
                                        <ul class="flex color">
                                            <li class="red">
                                                일반 <div><span>-7</span> / 15</div>
                                            </li>
                                            <li class="green">
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
                <div class="con1">
                    <div class="inner">
                        <div class="flex">
                            <img src={images['main_con1_1.png']} alt=""/>
                            <div>
                                    어디서 찾아야 할지 모르시겠나요?
                                <p><span>병원명/약국명/의약품명</span>을 찾아보세요.</p>
                            </div>
                        </div>
                        <div>
                            <form name="searchForm" id="searchForm" action="/plan/list">
                                <input type="search" id="keyword" name="keyword" placeholder="예 ) 대학교병원, 내과, 골든타임약국, 타이레놀 "/>
                                <a href="#" id="search-btn" class="btn">
                                    <img src={images['search29_w.png']} alt=""/>
                                </a>
                            </form>
                        </div>
                    </div>
                </div>

                {/* 메뉴 아이콘 버튼 */}
                <div class="con2">
                    <ul class="flex inner">
                        <li>
                            <a href="#">
                                <div><img src={images['main_con2_button1.png']} alt=""/></div>
                                <p>실시간응급실</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div><img src={images['main_con2_button1.png']} alt=""/></div>
                                <p>병원 조회</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div><img src={images['main_con2_button1.png']} alt=""/></div>
                                <p>약국 조회</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div><img src={images['main_con2_button1.png']} alt=""/></div>
                                <p>건강검진기관</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div><img src={images['main_con2_button1.png']} alt=""/></div>
                                <p>의약품정보</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div><img src={images['main_con2_button1.png']} alt=""/></div>
                                <p>FAQ</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div><img src={images['main_con2_button1.png']} alt=""/></div>
                                <p>대처방법</p>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* 상황별 대처 방법 */}
                <div class="con3">
                    <div class="inner">
                        <div class="main-title">
                            <img src={images['main_title_point.png']} alt=""/>
                            <h2>상황별 대처 방법</h2>
                            <h3>다양한 응급상황 대처방법을 미리 확인해주세요.</h3>
                        </div>
                        
                        <ul class="slider flex">
                            <li>
                                <a href="#">
                                    <img src={images['temp1.jpg']} alt=""/>
                                    <h4>질병관리청 아프지마TV</h4>
                                    <p>[심폐소생술] 올바른 심폐소생술과 제세동기 사용법</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src={images['temp2.jpg']} alt=""/>
                                    <h4>질병관리청 아프지마TV</h4>
                                    <p>[심폐소생술] 올바른 심폐소생술과 제세동기 사용법</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src={images['temp3.jpg']} alt=""/>
                                    <h4>질병관리청 아프지마TV</h4>
                                    <p>[심폐소생술] 올바른 심폐소생술과 제세동기 사용법</p>
                                </a>
                            </li>
                            
                        </ul>

                        <div class="slide_btn">
                            <a class="prev-btn"><img src={images['main_con3_prev.png']} alt="이전버튼"/></a>
                            <a class="next-btn"><img src={images['main_con3_next.png']} alt="다음버튼"/></a>
                        </div>

                    </div>
                </div>

                {/* 위치 및 정보 검색 */}
                <div class="con4">
                    <div class="inner">
                        <div class="main-title">
                            <img src={images['main_title_point.png']} alt=""/>
                            <h2>위치 및 정보 검색</h2>
                            <h3>다양한 의료기관의 정보를 만나보세요.</h3>
                        </div>
                        <div class="box">
                            <div class="box1">
                                <a href="#">
                                    <div class="text">
                                        <span>병원 조회 </span>HOSPITAL
                                        <p>
                                            병원의 주소, 진료시간, 진료과목 등<br/>
                                            다양한 정보를 확인할 수 있습니다.
                                        </p>
                                    </div>
                                </a>
                            </div>
                            <div class="box2">
                                <a href="#">
                                    <div class="text">
                                        <span>약국 조회 </span>PHARMACY
                                        <p>
                                            약국의 주소, 운영시간 등<br/>
                                            다양한 정보를 확인할 수 있습니다.
                                        </p>
                                    </div>
                                </a>
                            </div>
                            <div class="box3">
                                <a href="#">
                                    <div class="text">
                                        <span>건강검진기관</span>
                                        <p>
                                            건강검진기관의 주소, 운영시간 등<br/>
                                            다양한 정보를 확인할 수 있습니다.
                                        </p>
                                    </div>
                                </a>
                            </div>
                            <div class="box4">
                                <a href="#">
                                    <div class="text">
                                        <span>의약품 정보</span>
                                        <p>
                                            의약품의 생김새, 성분 등<br/>
                                            다양한 정보를 확인할 수 있습니다.
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer></Footer>
            
        </div>
    );
}
export default Main;