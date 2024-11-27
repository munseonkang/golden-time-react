import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { images } from '../../../utils/images';
import { sido as sidos, regionMap } from '../../../constants/regions';
import { specialties } from '../../../constants/specialties';
import { days, times } from '../../../constants/times';
import { getCurrentPosition } from '../../../apis/services/geolocation';
import { CheckUpContext } from '../CheckUp';
import { search } from '../../../apis/services/nhisService';

const SelectItemBox = forwardRef((props, ref) => {
    const {setResults, searchTerms} = useContext(CheckUpContext);
    const {id, inputBox} = props;

    const [inputs, setInputs] = useState({ sido:"", sigungu:"", day:"평일", time:"09:00", center:"" });
    const {sido, sigungu, day, time, center} = inputs;
    const [isVisible, setIsVisible] = useState(false);
    
    const selectBoxRef = useRef(null);
    const inputRef = useRef(null);
    
    const clickInputRef = ()=>{
        if(inputRef.current) {
            inputRef.current.focus();
        }
    }

    // Search.jsx에서 참조할 reset 기능
    useImperativeHandle(ref, ()=>({
        reset() {
            getCurrentPosition((city_do, gu_gun)=>{
                setInputs({ sido:city_do, sigungu:gu_gun, day:"평일", time:"09:00", center:"" });
                searchTerms.current = { ...searchTerms.current, sido:city_do, sigungu:gu_gun, day:"평일", time:"09:00", center:"" };
            });
            setIsVisible(false);
        }
    }));

    // select시 상태, ref 변화
    const changeSidoSelect = (e)=>{
        const value = e.target.innerText;
        const result = regionMap.get(value)[0];
        setInputs({...inputs, sido:value, sigungu:result});
        searchTerms.current.sido = value;
        searchTerms.current.sigungu = result;
    }
    const changeSigunguSelect = (e)=>{
        const value = e.target.innerText;
        setInputs({...inputs, sigungu:value});
        searchTerms.current.sigungu = value;
    }
    const changeDaySelect = (e)=>{
        const value = e.target.innerText;
        setInputs({...inputs, day:value});
        searchTerms.current.day = value;
    }
    const changeTimeSelect = (e)=>{
        const value = e.target.innerText;
        setInputs({...inputs, time:value});
        searchTerms.current.time = value;
    }
    // const changeSpecialtySelect = (e)=>{
    //     const value = e.target.innerText;
    //     setInputs({...inputs, specialty:value});
    //     searchTerms.current.specialty = value;
    // }
    const changeInputValue = (e)=>{
        const {id, value} = e.target;
        setInputs({...inputs, [id]:value});
        searchTerms.current.center = value;
    }

    

    // 주소(시도) 목록 초기화
    const setSidoSelect = (
        sidos.map((item)=>{
            if(item === sido) {
                return (
                    <li className="r17dp" key={item} onClick={changeSidoSelect}>
                        {item}
                        <div>
                            <img src={images['check14_p.png']} alt="" />
                        </div>
                    </li>
                )
            }
            else {
                return (
                    <li className="r17g" key={item} onClick={changeSidoSelect}>{item}</li>
                )
            }
        })
    )
    // 주소(시군구) 목록 초기화
    const setSigunguSelect = (
        (sido!=="")?regionMap.get(sido).map((item)=>{
            if(item === sigungu) {
                return (
                    <li className="r17dp" key={item} onClick={changeSigunguSelect}>
                        {item}
                        <div>
                            <img src={images['check14_p.png']} alt="" />
                        </div>
                    </li>
                )
            }
            else {
                return (
                    <li className="r17g" key={item} onClick={changeSigunguSelect}>{item}</li>
                )
            }
        }):[]
    )
    // 평일/주말/공휴일 목록 초기화
    const setDaySelect = (
        days.map((item)=>{
            if(item === day) {
                return (
                    <li className="r17dp" key={item} onClick={changeDaySelect}>
                        {item}
                        <div>
                            <img src={images['check14_p.png']} alt="" />
                        </div>
                    </li>
                )
            }
            else {
                return (
                    <li className="r17g" key={item} onClick={changeDaySelect}>{item}</li>
                )
            }
        })
    )
    // 시간 목록 초기화
    const setTimeSelect = (
        times.map((item)=>{
            if(item === time) {
                return (
                    <li className="r17dp" key={item} onClick={changeTimeSelect}>
                        {item}
                        <div>
                            <img src={images['check14_p.png']} alt="" />
                        </div>
                    </li>
                )
            }
            else {
                return (
                    <li className="r17g" key={item} onClick={changeTimeSelect}>{item}</li>
                )
            }
        })
    )
    // 진료과목 목록 초기화
    // const setSpecialtySelect = (
    //     specialties.map((item)=>{
    //         if(item === specialty) {
    //             return (
    //                 <li className="r17dp" key={item} onClick={changeSpecialtySelect}>
    //                     {item}
    //                     <div>
    //                         <img src={images['check14_p.png']} alt="" />
    //                     </div>
    //                 </li>
    //             )
    //         }
    //         else {
    //             return (
    //                 <li className="r17g" key={item} onClick={changeSpecialtySelect}>{item}</li>
    //             )
    //         }
    //     })
    // )

    // select 토글
    const toggleSelectBox = () => {
        if(isVisible) {
            selectBoxRef.current.classList.add('hidden');
            setIsVisible(false);
        } else {
            selectBoxRef.current.classList.remove('hidden');
            setIsVisible(true);
        }
    }
    // select 숨기기
    const hideSelectBox = (e) => {
        if(selectBoxRef.current && !selectBoxRef.current.contains(e.target) &&
            inputRef.current && !inputRef.current.contains(e.target)) {
            selectBoxRef.current.classList.add('hidden');
            setIsVisible(false);
        }
    }
    
    useEffect(()=>{
        // 검색어 init
        if(id==="region") {
            getCurrentPosition((city_do, gu_gun)=>{
                setInputs({...inputs, sido:city_do, sigungu:gu_gun});
                searchTerms.current = {...searchTerms.current, sido:city_do, sigungu:gu_gun};
                search({sido: city_do, sigungu: gu_gun}, setResults);
            });
        }
        // SelectBox 외 이벤트 등록
        document.addEventListener("mousedown", hideSelectBox);

        return ()=>{
            document.removeEventListener("mousedown", hideSelectBox);
        }
    }, [])

    // 각 박스 렌더링
    switch(id) {
        case "region":
            return (
                <div className="item-box">
                    <div>
                        <label className="b17mc" htmlFor="region">지역 선택</label>
                        <div className="gps-box" onClick={()=>{
                            getCurrentPosition((city_do, gu_gun)=>{
                                setInputs({...inputs, sido:city_do, sigungu:gu_gun});
                                searchTerms.current = {...searchTerms.current, sido:city_do, sigungu:gu_gun};
                            })
                        }}>
                            <img src={images['gps13.png']} alt="현재 위치를 검색 지역으로 선택합니다." />
                            <span className="r12b">현재 위치</span>
                        </div>
                    </div>
                    <div className="input-box" onClick={toggleSelectBox}>
                        <input className="r17b" type={inputBox.type} id={id} placeholder={inputBox.placeholder} value={(sido!=="")?`${sido}  >  ${sigungu}`:""} readOnly={inputBox.readOnly} 
                        ref={inputRef} />
                        <div className="icon-box">
                            <img src={images[`${inputBox.image}`]} alt="" />
                        </div>
                    </div>
                    <div className="select-box hidden" ref={selectBoxRef}>
                        <section>
                            <ul className="scroll-y">
                                { setSidoSelect }
                                {/* <li className="r17dp">서울특별시
                                    <div>
                                        <img src={images['check14_p.png']} alt="" />
                                    </div>
                                </li>
                                <li className="r17g">부산광역시</li>
                                <li className="r17g">인천광역시</li> */}
                            </ul>
                            <span></span>
                            <ul className="scroll-y">
                                { setSigunguSelect }
                            </ul>
                        </section>
                    </div>
                </div>
            );
        case "time":
            return (
                <div className="item-box">
                    <label className="b17mc" htmlFor="time">방문 예정 시간</label>
                    <div className="input-box" onClick={toggleSelectBox}>
                        <input className="r17b" type={inputBox.type} id={id} placeholder={inputBox.placeholder} value={`${day}  >  ${time}`} readOnly={inputBox.readOnly} 
                        ref={inputRef} />
                        <div className="icon-box">
                            <img src={images[`${inputBox.image}`]} alt="" />
                        </div>
                    </div>
                    <div className="select-box hidden" ref={selectBoxRef}>
                        <section>
                            <ul className="scroll-y">
                                { setDaySelect }
                            </ul>
                            <span></span>
                            <ul className="scroll-y">
                                { setTimeSelect }
                            </ul>
                        </section>
                    </div>
                </div>
            );
        // case "specialty":
        //     return (
        //         <div className="item-box">
        //             <label className="b17mc" htmlFor="specialty">진료과 구분</label>
        //             <div className="input-box" onClick={toggleSelectBox}>
        //                 <input className="r17b" type={inputBox.type} id={id} placeholder={inputBox.placeholder} value={specialty} readOnly={inputBox.readOnly}
        //                 ref={inputRef} />
        //                 <div className="icon-box">
        //                     <img src={images[`${inputBox.image}`]} alt="" />
        //                 </div>
        //             </div>
        //             <div className="select-box hidden" ref={selectBoxRef}>
        //                 <section>
        //                     <ul className="scroll-y">
        //                         { setSpecialtySelect }
        //                     </ul>
        //                 </section>
        //             </div>
        //         </div>
        //     );  
        case "center":
            return (
                <div className="item-box">
                    <label className="b17mc" htmlFor="center">검진기관명</label>
                    <div className="input-box" onClick={clickInputRef}>
                        <input className="r17b" type={inputBox.type} id={id} placeholder={inputBox.placeholder} onChange={(e)=>{changeInputValue(e)}} value={center} readOnly={inputBox.readOnly} ref={inputRef} />
                        <div className="icon-box">
                            <img src={images[`${inputBox.image}`]} alt="" />
                        </div>
                    </div>
                </div>
            );
    };
});
export default SelectItemBox;