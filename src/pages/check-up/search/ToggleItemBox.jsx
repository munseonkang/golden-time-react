import { useRef, useState } from "react";

const ToggleItemBox = ()=>{
    const [isHoliday, setIsHoliday] = useState("전체");

    const holidaysRef = useRef([]);
    const addHolidaysRef = (e)=>{
        if(e && !holidaysRef.current.includes(e)) {
            holidaysRef.current.push(e);
        }
    }

    const isHolidayHandler = (e)=>{
        const holidayValue = e.target.value;
        holidaysRef.current.map((el)=>{
            if(el.innerText===holidayValue) {
                el.classList.add("b153a7", "selected");
                el.classList.remove("b156aa");
            } else {
                el.classList.add("b156aa");
                el.classList.remove("b153a7", "selected");
            }
        })
        setIsHoliday(holidayValue);
    }

    return (
        <div className="item-box">
            <label className="b17mc" htmlFor="holiday">공휴일 검진 여부</label>
            <div className="input-box">
                <label className="b153a7 selected" htmlFor="searchterms_allday" ref={addHolidaysRef}>
                    전체
                    <input className="hidden" type="radio" id="searchterms_allday" name="isHoliday" value="전체" defaultChecked onChange={(e)=>{isHolidayHandler(e)}}/>
                </label>
                <label className="b156aa" htmlFor="searchterms_holiday" ref={addHolidaysRef}>
                    공휴일
                    <input className="hidden" type="radio" id="searchterms_holiday" name="isHoliday" value="공휴일" onChange={(e)=>{isHolidayHandler(e)}}/>
                </label>
            </div>
        </div>
    );
}
export default ToggleItemBox;