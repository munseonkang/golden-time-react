import { useState } from "react";
import Detail from "./Detail";

const Result = ({item, addResultRef}) => {
    const [isDetail, setIsDetail] = useState(false);

    const getDetail = () => {
        setIsDetail(isDetail?false:true);
    }
    
    return (
        <>
            <tr className="item" ref={addResultRef}>
                <td className="r16mc">{item?.hmcNm}</td>
                <td className="r16b">{item?.ykindnm}</td>
                {/* <td className="r16b">정형외과 외 13과목</td> */}
                <td>
                    <ul>
                        {
                            (item?.grenChrgTypeCd==1)?<li className="b13dp">일반</li>:""
                        }
                        {
                            (item?.mchkChrgTypeCd==1)?<li className="b13dp">구강</li>:""
                        }
                        {
                            (item?.ichkChrgTypeCd==1)?<li className="b13dp">영유아</li>:""
                        }
                        {/* <li className="b13dp">학생</li>
                        <li className="b13dp">학교 밖 청소년s/li>
                        <li className="b13dp">장애친화 검진기관</li> */}
                        {
                            (item?.stmcaExmdChrgTypeCd==1)?<li className="b13dp">위암</li>:""
                        }
                        {
                            (item?.ccExmdChrgTypeCd==1)?<li className="b13dp">대장암</li>:""
                        }
                        {
                            (item?.cvxcaExmdChrgTypeCd==1)?<li className="b13dp">자궁경부암</li>:""
                        }
                        {
                            (item?.bcExmdChrgTypeCd==1)?<li className="b13dp">유방암</li>:""
                        }
                        {
                            (item?.lvcaExmdChrgTypeCd==1)?<li className="b13dp">간암</li>:""
                        }
                        {/* <li className="b13dp">폐암</li> */}
                    </ul>
                </td>
                <td className="r16b">목요일 9:00 ~ 19:00</td>
                <td className="r16b">5km</td>
                <td>
                    <input className="hidden" type="checkbox" />
                    <label className="toggle-btn b14dg" onClick={getDetail}>상세보기</label>
                </td>
            </tr>
            {(isDetail && (<Detail hmcNo={item?.hmcNo} lat={item?.cyVl} lon={item?.cxVl}/>))}
        </>
    )
}
export default Result;