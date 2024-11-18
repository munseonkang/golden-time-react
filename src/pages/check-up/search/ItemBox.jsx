import { useEffect, useRef, useState } from 'react';
import { images } from '../../../utils/images';
import Input from './Input';
import InputBox from './InputBox';

const ItemBox = ({subject})=>{
    const [searchTerm, setSearchTerm] = useState(0);

    const [isVisible, setIsVisible] = useState(false);

    const inputBoxRef = useRef(null);

    const showSelectBox = () => {
        setIsVisible(true);
    }
    const hideSelectBox = (e) => {
        if(inputBoxRef.current && !inputBoxRef.current.contains(e.target)) {
            setIsVisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', hideSelectBox);
    }, [])

    switch(subject) {
        case "region":
            return (
                <div className="item-box">
                    <div>
                        <label className="b17mc" htmlFor="region">지역 선택</label>
                        <div className="gps-box">
                            <img src={images['gps13.png']} alt="현재 위치를 검색 지역으로 선택합니다."/>
                            <span className="r12b">현재 위치</span>
                        </div>
                    </div>
                    <InputBox img="arrow_below14_g.png" type="button" id="region" placeholder="지역을 선택해 주세요." value="서울특별시 > 서초구" readOnly/>
                    <div className={`select-box ${isVisible ? '' : 'hidden'}`}>
                        <section>
                            <ul className="scroll-y">
                                <li className="r17dp">서울특별시
                                    <div>
                                        <img src={images['check14_p.png']} alt="" />
                                    </div>
                                </li>
                                <li className="r17g">부산광역시</li>
                                <li className="r17g">인천광역시</li>
                            </ul>
                            <span></span>
                            <ul className="scroll-y">
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
                </div>
            );
        case "time":
            return (
                <div className="item-box">
                    <label className="b17mc" htmlFor="time">방문 예정 시간</label>
                    <InputBox img="time15_g.png" type="button" id="time" placeholder="방문 예정 시간을 선택해 주세요." value="평일 > 12:00" readOnly/>
                    <div className={`select-box ${isVisible ? '' : 'hidden'}`}>
                        <section>
                            <ul className="scroll-y">
                                <li className="r17dp">평일
                                    <div>
                                        <img src={images['check14_p.png']} alt="" />
                                    </div>
                                </li>
                                <li className="r17g">주말</li>
                                <li className="r17g">공휴일</li>
                            </ul>
                            <span></span>
                            <ul className="scroll-y">
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
                </div>
            );
        case "specialty":
            return (
                <div className="item-box">
                    <label className="b17mc" htmlFor="specialty">진료과 구분</label>
                    <div className="input-box" ref={inputBoxRef} onClick={showSelectBox}>
                        <Input type="button" id="specialty" placeholder="운영 진료과목을 선택해주세요." value="정신건강의학과" readOnly/>
                        <div className="icon-box">
                            <img src={images['arrow_below14_g.png']} alt="" />
                        </div>
                    </div>
                    <div className={`select-box ${isVisible ? '' : 'hidden'}`}>
                        <section>
                            <ul className="scroll-y">
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
                </div>
            );
        case "center":
            return (
                <div className="item-box">
                    <label className="b17mc" htmlFor="center">검진기관명</label>
                    <div className="input-box">
                        <Input type="text" id="center" placeholder="검진기관명을 검색해 주세요."/>
                        <div className="icon-box">
                            <img src={images['search16_g.png']} alt="" />
                        </div>
                    </div>
                </div>
            );
        case "regular":
            return (
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
            );
        case "cancer":
            return (
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
            );
    }
}
export default ItemBox;