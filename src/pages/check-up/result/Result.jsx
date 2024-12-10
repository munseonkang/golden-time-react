import { useEffect, useState } from "react";
import Detail from "./Detail";
import { getCenterWorkInfo } from "../../../apis/api/nhisAPI";
import { getCenterDistance } from "../../../apis/services/geolocation";

const Result = ({item, addResultRef}) => {
    const [isDetail, setIsDetail] = useState(false);
    const [workInfo, setWorkInfo] = useState(null);
    const [distance, setDistance] = useState();

    const getDetail = () => {
        setIsDetail(isDetail?false:true);
    }

    async function getWorkInfo(hmcNo) {
        try{
            const response = await getCenterWorkInfo(hmcNo);
            // console.log(JSON.stringify(response.data.response.body.item));
            setWorkInfo({...(response.data.response.body.item)});
        }
        catch(error) {
            console.log(error);
        }
    }

    const getWorkDayAndTime=()=>{
        const dayIdx = new Date().getDay();
        const dayArr = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        if(dayIdx%6>0) return (workInfo?.wkdayMcareFrTm)?`${dayArr[dayIdx]} ${getTime(workInfo?.wkdayMcareFrTm, workInfo?.wkdayMcareToTm)}`:"-";
        else if(dayIdx===6) return (workInfo?.satMcareFrTm)?`${dayArr[dayIdx]} ${getTime(workInfo?.satMcareFrTm, workInfo?.satMcareToTm)}`:"-";
        else return (workInfo?.dumMcareFrTm)?`${dayArr[dayIdx]} ${getTime(workInfo?.dumMcareFrTm, workInfo?.dumMcareToTm)}`:"-";
    }

    function getTime(from, to) {
        if(from!==undefined&&to!==undefined) {
            const fromStr = from.toString();
            const toStr = to.toString();
            return `${Number(fromStr.substring(0, 2))}:${fromStr.substring(2)} ~ ${Number(toStr.substring(0, 2))}:${toStr.substring(2)}`;
        }
        return "";
    }

    useEffect(()=>{
        getWorkInfo(item?.hmcNo);
        getCenterDistance(item?.cyVl, item?.cxVl, setDistance)
    },[]);
    
    return (
        <>
            <tr className="item" ref={addResultRef}>
                <td className="r16mc">{item?.hmcNm}</td>
                <td className="r16b">{item?.ykindnm}</td>
                {/* <td className="r16b">정형외과 외 13과목</td> */}
                <td>
                    <ul>
                        {
                            (item?.grenChrgTypeCd>0)?<li className="b13dp">일반</li>:""
                        }
                        {
                            (item?.mchkChrgTypeCd>0)?<li className="b13dp">구강</li>:""
                        }
                        {
                            (item?.ichkChrgTypeCd>0)?<li className="b13dp">영유아</li>:""
                        }
                        {/* <li className="b13dp">학생</li>
                        <li className="b13dp">학교 밖 청소년s/li>
                        <li className="b13dp">장애친화 검진기관</li> */}
                        {
                            (item?.stmcaExmdChrgTypeCd>0)?<li className="b13dp">위암</li>:""
                        }
                        {
                            (item?.ccExmdChrgTypeCd>0)?<li className="b13dp">대장암</li>:""
                        }
                        {
                            (item?.cvxcaExmdChrgTypeCd>0)?<li className="b13dp">자궁경부암</li>:""
                        }
                        {
                            (item?.bcExmdChrgTypeCd>0)?<li className="b13dp">유방암</li>:""
                        }
                        {
                            (item?.lvcaExmdChrgTypeCd>0)?<li className="b13dp">간암</li>:""
                        }
                        {/* <li className="b13dp">폐암</li> */}
                    </ul>
                </td>
                <td className="r16b">{getWorkDayAndTime()}</td>
                <td className="r16b">{`${distance}km`}</td>
                <td>
                    <input className="hidden" type="checkbox" />
                    <label className="toggle-btn b14dg" onClick={getDetail}>상세보기</label>
                </td>
            </tr>
            {(isDetail && (<Detail hmcNo={item?.hmcNo} lat={item?.cyVl} lon={item?.cxVl} ykindnm={item?.ykindnm} workInfo={workInfo}/>))}
        </>
    )
}
export default Result;