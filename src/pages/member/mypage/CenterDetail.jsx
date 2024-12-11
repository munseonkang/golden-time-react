import axios from "axios";
import { useEffect, useState } from "react";
import { images } from "../../../utils/images";
import { checkOpenStatus, cleanHospitalName, getFormattedTime } from "../../hospital/Hospital";
import { getBasicInfo } from "../../../apis/services/goldentimeService";
import { getCenterWorkInfo } from "../../../apis/api/nhisAPI";


const CenterDetail = ({hmcNo, setIsDetailOpen})=>{
    const [basicInfo, setBasicInfo] = useState(null);
    const [workInfo, setWorkInfo] = useState(null);

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

    function getTime(from, to) {
        if(from!==undefined&&to!==undefined) {
            const fromStr = from.toString();
            const toStr = to.toString();
            return `${fromStr.substring(0, 2)}시 ${fromStr.substring(2)}분 ~ ${toStr.substring(0, 2)}시 ${toStr.substring(2)}분`;
        }
        return "";
    }


    useEffect(()=>{
        getBasicInfo(hmcNo, setBasicInfo);
        getWorkInfo(hmcNo);
    },[]);


    return (
        <>
            {/* 병원 상세정보 표시 */}
            {basicInfo && workInfo && (
                <div className="detail detail-center">
                    <div className="scroll scroll-center">
                        <p>검진기관 상세<span><img src={images['close16.png']} alt="" 
                        onClick={()=>{setIsDetailOpen(false)}}/></span></p>
                        <div className="data">
                            <p>{basicInfo?.gjca01YoyangNm}
                            </p>
                            <span>{
                            // renameClassification(selectedHospital.dutyDivNam, selectedHospital.dutyName)
                            }</span>
                            {/* <div className="open">
                                <p className={checkOpenStatus(selectedHospital).status === "진료중" ? "green" : "red"}>
                                    {checkOpenStatus(selectedHospital).status}
                                </p>
                                {checkOpenStatus(selectedHospital).open && checkOpenStatus(selectedHospital).close ? `${checkOpenStatus(selectedHospital).open} ~ ${checkOpenStatus(selectedHospital).close}` : ""}
                            </div> */}
                            <table>
                                <tbody>
                                    <tr>
                                        <th><img src={images['detail_icon_place.png']} alt=""/></th>
                                        <td>{basicInfo?.gjca01Addr}</td>
                                    </tr>
                                    <tr>
                                        <th><img src={images['detail_icon_tel.png']} alt=""/></th>
                                        <td>{basicInfo?.gjca01TelNo}</td>
                                    </tr>
                                    {/* {selectedHospital.emergency != "응급의료기관 이외" && (
                                        <tr className="emergency">
                                            <th><img src={images['detail_icon_emergency.png']} alt=""/></th>
                                            <td>응급실 운영</td>
                                        </tr>
                                    )} */}
                                </tbody>
                            </table>
                        </div>
                        <div className="tab-container">
                            <div className={`tab-con con1 show`}>
                                <div className="time">
                                    <h4>운영시간</h4>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>평일</th>
                                                <td>{(workInfo?.wkdayMcareFrTm)?getTime(workInfo?.wkdayMcareFrTm, workInfo?.wkdayMcareToTm):"-"}</td>
                                            </tr>
                                            <tr>
                                                <th>토요일</th>
                                                <td>{(workInfo?.satMcareFrTm)?getTime(workInfo?.satMcareFrTm, workInfo?.satMcareToTm):"-"}</td>
                                            </tr>
                                            <tr>
                                                <th>일요일</th>
                                                <td>{(workInfo?.dumMcareFrTm)?getTime(workInfo?.dumMcareFrTm, workInfo?.dumMcareToTm):"-"}</td>
                                            </tr>
                                            <tr>
                                                <th>공휴일</th>
                                                <td>{(workInfo?.hldMcareFrTm)?getTime(workInfo?.hldMcareFrTm, workInfo?.hldMcareToTm):"-"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default CenterDetail;