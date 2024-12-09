import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CheckUpContext } from "../CheckUp";

const ToggleItemBox = forwardRef((props, ref)=>{
    const {searchTerms} = useContext(CheckUpContext);

    const [isHoliday, setIsHoliday] = useState("전체");

    const holidaysRef = useRef([]);
    const addHolidaysRef = (e)=>{
        if(e && !holidaysRef.current.includes(e)) {
            holidaysRef.current.push(e);
        }
    }

    // Search.jsx에서 참조할 reset 기능
    useImperativeHandle(ref, ()=>({
        reset() {
            searchTerms.current = { ...searchTerms.current, isHoliday:"전체" };
            setIsHoliday("전체");
        }
    }));

    const toggleHandler = ()=>{
        if(isHoliday==="전체") {
            searchTerms.current = { ...searchTerms.current, isHoliday:"공휴일" };
            setIsHoliday("공휴일");
        }
        else {
            searchTerms.current = { ...searchTerms.current, isHoliday:"전체" };
            setIsHoliday("전체");
        }
    }

    useEffect(()=>{
        holidaysRef.current.map((el)=>{
            if(el.innerText===isHoliday) {
                el.classList.add("r17b", "selected");
                el.classList.remove("r17888");
            } else {
                el.classList.add("r17888");
                el.classList.remove("r17b", "selected");
            }
        })
    }, [isHoliday])

    return (
        <div className="item-box">
            <label className="b17mc" htmlFor="holiday">공휴일 검진 여부</label>
            <div className="input-box" onClick={toggleHandler}>
                <label className="r17b selected" htmlFor="searchterms_allday" ref={addHolidaysRef}>
                    전체
                    <input className="hidden" type="radio" id="searchterms_allday" name="isHoliday" value="전체"/>
                </label>
                <label className="r17888" htmlFor="searchterms_holiday" ref={addHolidaysRef}>
                    공휴일
                    <input className="hidden" type="radio" id="searchterms_holiday" name="isHoliday" value="공휴일"/>
                </label>
            </div>
        </div>
    );
})
export default ToggleItemBox;