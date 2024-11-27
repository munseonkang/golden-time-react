import { useEffect, useState } from 'react';
import { images } from '../../../utils/images';
import { getCenterBasicInfo, getCenterHolidayInfo, getCenterTransInfo, getCenterWorkInfo } from '../../../apis/api/nhisAPI';

const Detail = ({hmcNo, lat, lon}) => {
    const [basicInfo, setBasicInfo] = useState(null);
    const [holidayInfo, setHolidayInfo] = useState(null);
    const [transInfo, setTransInfo] = useState(null);
    const [workInfo, setWorkInfo] = useState(null);

    async function getBasicInfo() {
        try{
            const response = await getCenterBasicInfo(hmcNo);
            setBasicInfo({...(response.data.response.body.item)});
            console.log(JSON.stringify(response.data.response));
        }
        catch(error) {
            console.log(error);
        }
    }
    async function getHolidayInfo() {
        try{
            const response = await getCenterHolidayInfo(hmcNo);
            // console.log(JSON.stringify(response.data.response));
            setHolidayInfo({...(response.data.response.body.item)});
        }
        catch(error) {
            console.log(error);
        }
    }
    async function getTransInfo() {
        try{
            const response = await getCenterTransInfo(hmcNo);
            // console.log(JSON.stringify(response.data.response.body.item));
            setTransInfo({...(response.data.response.body.item)});
        }
        catch(error) {
            console.log(error);
        }
    }
    async function getWorkInfo() {
        try{
            const response = await getCenterWorkInfo(hmcNo);
            // console.log(JSON.stringify(response.data.response.body.item));
            setWorkInfo({...(response.data.response.body.item)});
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getBasicInfo();
        getHolidayInfo();
        getTransInfo();
        getWorkInfo();
    },[]);

    function getTime(from, to) {
        console.log(from, to);
        if(from!==undefined&&to!==undefined) {
            const fromStr = from.toString();
            const toStr = to.toString();
            return `${fromStr.substring(0, 2)}시 ${fromStr.substring(2)}분 ~ ${toStr.substring(0, 2)}시 ${toStr.substring(2)}분`;
        }
        return "";
    }

    function initTmap(){
        var map = new window.Tmapv2.Map(`map_div${hmcNo}`, { // 지도가 생성될 div
            center : new window.Tmapv2.LatLng(lat, lon),
            width : "468px", // 지도의 넓이
            height : "373px", // 지도의 높이
            zoom : 16,
            draggable : false,
            draggableSys  : false,
            pinchZoom  : false,
            scrollwheel  : false,
            zoomControl  : false,
            measureControl  : false,
        });
        var marker = new window.Tmapv2.Marker({
			position: new window.Tmapv2.LatLng(lat, lon), //Marker의 중심좌표 설정.
			map: map //Marker가 표시될 Map 설정..
		});
	} 

    useEffect(()=>{
        if(document.getElementById(`map_div${hmcNo}`)) {
            initTmap();
        }
    },[basicInfo])

    return  (
        <tr>
            <td colSpan="7">
            { (basicInfo)?(
                <div className="detail-box">
                    <div>
                        <div className="map-box" id={`map_div${hmcNo}`}>

                        </div>
                        <div className="parking-box">
                            <div>
                                <img src={images['parking11.png']} alt="" />
                                <span className="b16mc">주차 안내</span>
                            </div>
                            <div>
                                {(workInfo?.pkgInfoInYn==1)?(
                                    <ul>
                                        <li>
                                            <span className="b16dg">주차장 운영 여부</span>
                                            <span className="r16b">{(workInfo?.pkglotRunYn==1)?"예":"아니오"}</span>
                                        </li>
                                        <li>
                                            <span className="b16dg">주차 가능 대수</span>
                                            <span className="r16b">{(workInfo?.pkgPsblCnt!==undefined)?`${workInfo?.pkgPsblCnt}대`:"-"}</span>
                                        </li>
                                        <li>
                                            <span className="b16dg">비용 부담 여부</span>
                                            <span className="r16b">{(workInfo?.pkgPsblCnt!==undefined)?((workInfo?.pkgCostBrdnYn)?"무료":"유료"):"-"}</span>
                                        </li>
                                        <li>
                                            <span className="b16dg">기타</span>
                                            <span className="r16b">{(workInfo?.pkgEtcComt!==undefined)?workInfo?.pkgEtcComt:"-"}</span>
                                        </li>
                                    </ul>
                                ):(
                                    <span className="b16dg">주차 정보가 존재하지 않습니다.</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="info-box">
                            <strong className="b18mc">{basicInfo?.gjca01YoyangNm}</strong>
                            <ul>
                                <li>
                                    <span className="b16dg">주소</span>
                                    <span className="r16b">{basicInfo?.gjca01Addr}</span>
                                </li>
                                <li>
                                    <span className="b16dg">검진실 전화번호</span>
                                    <span className="r16b">{basicInfo?.gjca01TelNo}</span>
                                </li>
                                <li>
                                    <span className="b16dg">진료과목</span>
                                    <span className="r16b">내과, 결핵과</span>
                                </li>
                                <li>
                                    <span className="b16dg">구분</span>
                                    <span className="r16b">의원</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div>
                                <div className="info-box">
                                    <strong className="b16mc">공휴일 검진 항목</strong>
                                    <ul>
                                        <li>
                                            <span className="b16dg">공휴일</span>
                                            <div>
                                                <span className="r16b">일반, 구강, 영유아, 학생</span>
                                                <span className="r16b">대장암, 간암, 자궁경부암, 위암, 유방암</span>
                                            </div>
                                        </li>
                                        <li>
                                            <span className="b16dg">일휴일</span>
                                            <div>
                                                <span className="r16b">일반, 구강, 영유아, 학생</span>
                                                <span className="r16b">대장암, 간암, 자궁경부암, 위암, 유방암</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="info-box">
                                    <strong className="b16mc">교통편 안내</strong>
                                    <ul>
                                        <li>
                                            <span className="b16dg">시내버스</span>
                                            <div>
                                                <div><span className="r16b">{(transInfo?.inctBusGoffJijumNm)?`${transInfo?.inctBusGoffJijumNm}에서 하차`:"-"}</span><span className="r15dg">{(transInfo?.inctBusYoyangDstc)?`${transInfo?.inctBusYoyangDstc}m`:""}</span></div>
                                                <span className="r15dg">{(transInfo?.inctBusRouteInfo)?`(${transInfo?.inctBusRouteInfo})`:""}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <span className="b16dg">마을버스</span>
                                            <div>
                                                <div><span className="r16b">{(transInfo?.vllgBusGoffJijumNm)?`${transInfo?.vllgBusGoffJijumNm}에서 하차`:"-"}</span><span className="r15dg">{(transInfo?.vllgBusYoyangDstc)?`${transInfo?.vllgBusYoyangDstc}m`:""}</span></div>
                                                <span className="r15dg">{(transInfo?.vllgBusRouteInfo)?`(${transInfo?.vllgBusRouteInfo})`:""}</span>
                                            </div>
                                        </li>
                                        <li>
                                            <span className="b16dg">지하철</span>
                                            <div>
                                                <div><span className="r16b">{(transInfo?.sbwyRouteInfo)?`${transInfo?.sbwyRouteInfo} ${transInfo?.sbwyGoffJijumNm} ${transInfo?.sbwyYoyangDrt}에서 `:"-"}</span><span className="r15dg">{(transInfo?.sbwyYoyangDstc)?`${transInfo?.sbwyYoyangDstc}m`:""}</span></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="info-box">
                                <strong className="b16mc">운영시간 안내 {(workInfo?.mcrtmGuidUrlExs==1)?(<a href={workInfo?.mcrtmGuidUrl} className="r14dp" target="_blank"> 진료시간 안내</a>):<></>}</strong>
                                <ul>
                                    <li>
                                        <span className="b16dg">검진시간{(workInfo?.wkdaySusmdtWkdEtc)?(<span className="r15dp">({workInfo?.wkdaySusmdtWkdEtc}) 휴진</span>):""}</span>
                                        <ul>
                                            {/* {(workInfo?.wkdayDtSusmdtYn==0 && workInfo?.wkdayMcareFrTm && workInfo?.wkdayMcareToTm)?( */}
                                                <li>
                                                    <span className="r16dg">평일</span>
                                                    <span className="r16b">{(workInfo?.wkdayMcareFrTm)?getTime(workInfo?.wkdayMcareFrTm, workInfo?.wkdayMcareToTm):"-"}</span>
                                                </li>
                                            {/* ):(<></>)} */}
                                            {/* {(workInfo?.satAllSusmdtYn==0 && workInfo?.satMcareFrTm && workInfo?.satMcareToTm)?( */}
                                                <li>
                                                    <span className="r16dg">토요일</span>
                                                    <span className="r16b">{(workInfo?.satMcareFrTm)?getTime(workInfo?.satMcareFrTm, workInfo?.satMcareToTm):"-"}</span>
                                                </li>
                                            {/* ):(<></>)}
                                            {(workInfo?.dumAllSusmdtYn==0 && workInfo?.dumMcareFrTm && workInfo?.dumMcareToTm)?( */}
                                                <li>
                                                    <span className="r16dg">일요일</span>
                                                    <span className="r16b">{(workInfo?.dumMcareFrTm)?getTime(workInfo?.dumMcareFrTm, workInfo?.dumMcareToTm):"-"}</span>
                                                </li>
                                            {/* ):(<></>)} */}
                                            {/* {(workInfo?.hldAllSusmdtYn==0 && workInfo?.hldMcareFrTm && workInfo?.hldMcareToTm)?( */}
                                                <li>
                                                    <span className="r16dg">공휴일</span>
                                                    <span className="r16b">{(workInfo?.hldMcareFrTm)?getTime(workInfo?.hldMcareFrTm, workInfo?.hldMcareToTm):"-"}</span>
                                                </li>
                                            {/* ):(<></>)} */}
                                        </ul>
                                    </li>
                                    {/* {(workInfo?.luntmInfoInYn==1 && workInfo?.wkdayLunchFrTm && workInfo?.wkdayLunchToTm)?( */}
                                        <li>
                                            <span className="b16dg">점심시간{(workInfo?.luntmMcareYn==1)?(<span className="r15dp">진료 가능</span>):""}</span>
                                            <ul>
                                                <li>
                                                    <span className="r16dg">평일</span>
                                                    <span className="r16b">{(workInfo?.wkdayLunchFrTm)?getTime(workInfo?.wkdayLunchFrTm, workInfo?.wkdayLunchToTm):"-"}</span>
                                                </li>
                                                <li>
                                                    <span className="r16dg">토요일</span>
                                                    <span className="r16b">{(workInfo?.satLunchFrTm)?getTime(workInfo?.satLunchFrTm, workInfo?.satLunchToTm):"-"}</span>
                                                </li>
                                            </ul>
                                        </li>
                                    {/* ):(<></>)} */}
                                    <li>
                                        <span className="b16dg">접수시간</span>
                                        <ul>
                                            {/* {(workInfo?.wkdayDtSusmdtYn==0 && workInfo?.wkdayRecvFrTm && workInfo?.wkdayRecvToTm)?( */}
                                                <li>
                                                    <span className="r16dg">평일</span>
                                                    <span className="r16b">{(workInfo?.wkdayRecvFrTm)?getTime(workInfo?.wkdayRecvFrTm, workInfo?.wkdayRecvToTm):"-"}</span>
                                                </li>
                                            {/* ):(<></>)}
                                            {(workInfo?.satAllSusmdtYn==0 && workInfo?.satRecvFrTm && workInfo?.satRecvToTm)?( */}
                                                <li>
                                                    <span className="r16dg">토요일</span>
                                                    <span className="r16b">{(workInfo?.satRecvFrTm)?getTime(workInfo?.satRecvFrTm, workInfo?.satRecvToTm):"-"}</span>
                                                </li>
                                            {/* ):(<></>)}
                                            {(workInfo?.dumAllSusmdtYn==0 && workInfo?.dumRecvFrTm && workInfo?.dumRecvToTm)?( */}
                                                <li>
                                                    <span className="r16dg">일요일</span>
                                                    <span className="r16b">{(workInfo?.dumRecvFrTm)?getTime(workInfo?.dumRecvFrTm, workInfo?.dumRecvToTm):"-"}</span>
                                                </li>
                                            {/* ):(<></>)}
                                            {(workInfo?.hldAllSusmdtYn==0 && workInfo?.hldRecvFrTm && workInfo?.hldRecvToTm)?( */}
                                                <li>
                                                    <span className="r16dg">공휴일</span>
                                                    <span className="r16b">{(workInfo?.hldRecvFrTm)?getTime(workInfo?.hldRecvFrTm, workInfo?.hldRecvToTm):"-"}</span>
                                                </li>
                                            {/* ):(<></>)} */}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ):(<>
                <span className="r16dg">잠시 후 다시 시도해주세요.</span>
            </>)}
            </td>
        </tr>
    )    
}
export default Detail;