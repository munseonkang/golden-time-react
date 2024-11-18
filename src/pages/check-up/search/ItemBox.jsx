import { useEffect, useState } from 'react';
import { images } from '../../../utils/images';

export default function ItemBox({id, inputBox, selectBox}) {

    // const [region, setRegion] = useState("서울특별시 > 강남구");
    // const [time, setTime] = useState("평일 > 09:00");
    // const [specialty, setSpecialty] = useState("정형외과");
    // const [center, setCenter] = useState("KH정형외과");
    const [selected, setSelected] = useState("");

    let label;
    let select;

    const changeInput = (e)=>{
        setSelected(e.target.value);
    }

    useEffect(()=>{
        switch(id) {
            case "region":
                setSelected("서울특별시 > 강남구");
                break;
            case "time":
                setSelected("평일 > 09:00");
                break;
            case "specialty":
                setSelected("정형외과");
                break;
        }
    })

    switch(id) {
        case "region":
            {
                label = (
                    <div>
                        <label className="b17mc" htmlFor="region">지역 선택</label>
                        <div className="gps-box">
                            <img src={images['gps13.png']} alt="현재 위치를 검색 지역으로 선택합니다." />
                            <span className="r12b">현재 위치</span>
                        </div>
                    </div>
                );
                select = (
                    <div className="select-box hidden">
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
                );
            }
            break;
        case "time":
            {
                label = (
                    <label className="b17mc" htmlFor="time">방문 예정 시간</label>
                );
                select = (
                    <div className="select-box hidden">
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
                );  
            }
            break;
        case "specialty":
            {
                label = (
                    <label className="b17mc" htmlFor="specialty">진료과 구분</label>
                );
                select = (
                    <div className="select-box hidden">
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
                );  
            }
            break;
        case "center":
            {
                label = (
                    <label className="b17mc" htmlFor="center">검진기관명</label>
                );
            }
            break;
    }

    return (
        <div className="item-box">
            { label }
            <div className="input-box">
                <input className="r17b" type={inputBox.type} id={id} placeholder={inputBox.placeholder} onChange={(e)=>{changeInput(e)}} value={selected} readOnly={inputBox.readOnly} />
                <div className="icon-box">
                    <img src={images[`${inputBox.image}`]} alt="" />
                </div>
            </div>
            { select }
        </div>
    )
}