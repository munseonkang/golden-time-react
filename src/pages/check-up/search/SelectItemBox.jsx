import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { images } from '../../../utils/images';
import { sido as sidos ,regions } from '../../../constants/regions';
import { specialties } from '../../../constants/specialties';
import { days, times } from '../../../constants/times';
import axios from 'axios';

const SelectItemBox = forwardRef((props, ref) => {
    let item;
    const {id, inputBox, searchTerms} = props;

    const [inputs, setInputs] = useState({ sido:"", sigungu:"", day:"평일", time:"09:00", specialty:"가정의학과", center:"" });
    const {sido, sigungu, day, time, specialty, center} = inputs;
    const [isVisible, setIsVisible] = useState(false);
    
    const selectBoxRef = useRef(null);
    const inputRef = useRef(null);
    
    const clickInputRef = ()=>{
        if(inputRef.current) {
            inputRef.current.focus();
        }
    }

    useImperativeHandle(ref, ()=>({
        reset() {
            getCurrentPosition((city_do, gu_gun)=>{
                setInputs({ sido:city_do, sigungu:gu_gun, day:"평일", time:"09:00", specialty:"가정의학과", center:"" });
                searchTerms.current = { ...searchTerms.current, sido:city_do, sigungu:gu_gun, day:"평일", time:"09:00", specialty:"가정의학과", center:"" };
            });
            setIsVisible(false);
        }
    }));

    const changeSidoSelect = (e)=>{
        const value = e.target.innerText;
        setInputs({...inputs, sido:value});
        searchTerms.current.sido = value;
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
    const changeSpecialtySelect = (e)=>{
        const value = e.target.innerText;
        setInputs({...inputs, specialty:value});
        searchTerms.current.specialty = value;
    }
    const changeInputValue = (e)=>{
        const {id, value} = e.target;
        setInputs({...inputs, [id]:value});
        searchTerms.current.center = value;
    }

    async function getCurrentPosition(callback) {
        let city_do = "";
        let gu_gun = "";

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            getCurrentAddress(latitude, longitude);
        }
      
        function error() {
            alert("현재 위치를 검색할 수 없습니다.")
        }

        async function getCurrentAddress(lat, lon) {
            try{
                const response = await axios.get(`https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=${lat}&lon=${lon}&appKey=${process.env.REACT_APP_SK_OPENAPI_APP_KEY}`);
                city_do = response.data.addressInfo.city_do;
                gu_gun = response.data.addressInfo.gu_gun;

                // setInputs({...inputs, sido:city_do, sigungu:gu_gun});
                    
                // searchTerms.current.sido = city_do;
                // searchTerms.current.sigungu = gu_gun;

                callback(city_do, gu_gun);
            }
            catch(error) {
                console.log(error);
            }
        }
      
        if (!navigator.geolocation) {
          alert("현재 브라우저는 위치 정보 제공을 지원하지 않습니다.")
        } else {
          navigator.geolocation.getCurrentPosition(success, error);
        }
      }

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
    const setSigunguSelect = (
        (sido!=="")?regions.get(sido).map((item)=>{
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
    const setSpecialtySelect = (
        specialties.map((item)=>{
            if(item === specialty) {
                return (
                    <li className="r17dp" key={item} onClick={changeSpecialtySelect}>
                        {item}
                        <div>
                            <img src={images['check14_p.png']} alt="" />
                        </div>
                    </li>
                )
            }
            else {
                return (
                    <li className="r17g" key={item} onClick={changeSpecialtySelect}>{item}</li>
                )
            }
        })
    )

    const toggleSelectBox = () => {
        if(isVisible) {
            selectBoxRef.current.classList.add('hidden');
            setIsVisible(false);
        } else {
            selectBoxRef.current.classList.remove('hidden');
            setIsVisible(true);
        }
    }
    const hideSelectBox = (e) => {
        if(selectBoxRef.current && !selectBoxRef.current.contains(e.target) &&
            inputRef.current && !inputRef.current.contains(e.target)) {
            selectBoxRef.current.classList.add('hidden');
            setIsVisible(false);
        }
    }   
    useEffect(()=>{
        // 검색어 init
        getCurrentPosition((city_do, gu_gun)=>{
            setInputs({...inputs, sido:city_do, sigungu:gu_gun});
            searchTerms.current = {...searchTerms.current, sido:city_do, sigungu:gu_gun};
        });

        // SelectBox 외 이벤트 등록
        document.addEventListener("mousedown", hideSelectBox);

        return ()=>{
            document.removeEventListener("mousedown", hideSelectBox);
        }
    }, [])

    switch(id) {
        case "region":
            item = (
                <>
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
                </>
            );
            break;
        case "time":
            item = (
                <>
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
                </>
            );
            break;
        case "specialty":
            item = (
                <>
                    <label className="b17mc" htmlFor="specialty">진료과 구분</label>
                    <div className="input-box" onClick={toggleSelectBox}>
                        <input className="r17b" type={inputBox.type} id={id} placeholder={inputBox.placeholder} value={specialty} readOnly={inputBox.readOnly}
                        ref={inputRef} />
                        <div className="icon-box">
                            <img src={images[`${inputBox.image}`]} alt="" />
                        </div>
                    </div>
                    <div className="select-box hidden" ref={selectBoxRef}>
                        <section>
                            <ul className="scroll-y">
                                { setSpecialtySelect }
                            </ul>
                        </section>
                    </div>
                </>
            );  
            break;
        case "center":
            item = (
                <>
                    <label className="b17mc" htmlFor="center">검진기관명</label>
                    <div className="input-box" onClick={clickInputRef}>
                        <input className="r17b" type={inputBox.type} id={id} placeholder={inputBox.placeholder} onChange={(e)=>{changeInputValue(e)}} value={center} readOnly={inputBox.readOnly} ref={inputRef} />
                        <div className="icon-box">
                            <img src={images[`${inputBox.image}`]} alt="" />
                        </div>
                    </div>
                </>
            );
            break;
    }

    return (
        <div className="item-box">
            { item }
        </div>
    )
});
export default SelectItemBox;