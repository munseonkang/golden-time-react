import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { CheckUpContext } from '../CheckUp';

const CheckInputBox = forwardRef((props, ref) => {
    const regularChecks = ["전체", "일반", "구강", "영유아", "학생", "학교 밖 청소년", "장애친화 검진기관"];
    const cancerChecks = ["전체", "위암", "대장암", "자궁경부암", "유방암", "간암", "폐암"];

    const {searchTerms} = useContext(CheckUpContext);
    const {id} = props;

    const [checked, setChecked] = useState(["전체"]);

    // Search.jsx에서 참조할 reset 기능
    useImperativeHandle(ref, ()=>({
        reset() {
            setChecked(["전체"]);
        }
    }));

    // 체크 시 상태 변화
    const check = (item) => {
        if(!(checked.length===1 && checked[0]==='전체') && item!=="전체") {
            setChecked([...checked, item]);
        }
        else {
            setChecked([item]);
        }
    }
    // 체크 해제 시 상태 변화
    const uncheck = (item) => {
        if(checked.length!==1 && checked[0]!=='전체' && item!=="전체") {
            const result = checked.filter((value)=>{
                if(item !== value) return value;
            })
            setChecked(result);
        }
    }

    useEffect(()=>{
        if(id === "regular") {
            searchTerms.current.regular = checked;
        }
        if(id === "cancer") {
            searchTerms.current.cancer = checked;
        }
    }, [checked]);

    return (
        <div className="item-box">
            <span className="b16mc">{id==="regular"?"일반 검진":"암 검진"}</span>
            <div className="check-box">
                {
                    (id==="regular"?regularChecks:cancerChecks).map((item)=>{
                        if(checked.includes(item)) {
                            return (
                                <label className="check-btn checked r17b" key={item} onMouseDown={()=>{uncheck(item)}}>
                                    <input className="hidden" type="checkbox" />
                                    {item}
                                </label>
                            )
                        } else {
                            return (
                                <label className="check-btn unchecked r17b" key={item} onMouseDown={()=>{check(item)}}>
                                    <input className="hidden" type="checkbox" />
                                    {item}
                                </label>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
});
export default CheckInputBox;