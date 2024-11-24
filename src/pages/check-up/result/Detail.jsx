import { useEffect, useState } from 'react';
import { images } from '../../../utils/images';
import { getCenterBasicInfo, getCenterHolidayInfo, getCenterTransInfo, getCenterWorkInfo } from '../../../apis/api/nhisAPI';

const Detail = ({hmcNo}) => {
    const [basicInfo, setBasicInfo] = useState(null);
    const [holidayInfo, setHolidayInfo] = useState(null);
    const [transInfo, setTransInfo] = useState(null);
    const [workInfo, setWorkInfo] = useState(null);

    async function getBasicInfo() {
        try{
            const response = await getCenterBasicInfo(hmcNo);
            setBasicInfo({...(response.data.response.body.item)});
        }
        catch(error) {
            console.log(error);
        }
    }
    async function getHolidayInfo() {
        try{
            const response = await getCenterHolidayInfo(hmcNo);
            console.log(JSON.stringify(response.data.response));
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

    return (
        <tr>
            <td colSpan="7">
                <div className="detail-box">
                    <div>
                        <div className="map-box">

                        </div>
                        <div className="parking-box">
                            <div>
                                <img src={images['parking11.png']} alt="" />
                                <span className="b16mc">주차 안내</span>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <span className="b16dg">주차장 운영 여부</span>
                                        <span className="r16b">O</span>
                                    </li>
                                    <li>
                                        <span className="b16dg">주차 가능 대수</span>
                                        <span className="r16b">50대</span>
                                    </li>
                                    <li>
                                        <span className="b16dg">비용 부담 여부</span>
                                        <span className="r16b">무료</span>
                                    </li>
                                    <li>
                                        <span className="b16dg">기타</span>
                                        <span className="r16b">주차장은 임대업자의 운영으로 인하여 유료로 하고 있음</span>
                                    </li>
                                </ul>
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
                                                <div><span className="r16b">박달사거리에서 하차</span><span className="r15dg">500m</span></div>
                                                <span className="r15dg">(3, 8, 88, 37-1, 12, 6)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <span className="b16dg">마을버스</span>
                                            <div>
                                                <div><span className="r16b">박달사거리에서 하차</span><span className="r15dg">500m</span></div>
                                                <span className="r15dg">(3, 8, 88, 37-1, 12, 6)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <span className="b16dg">지하철</span>
                                            <div>
                                                <div><span className="r16b">1호선 안양역에서 하차</span><span className="r15dg">500m</span></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="info-box">
                                <strong className="b16mc">운영시간 안내</strong>
                                <ul>
                                    <li>
                                        <span className="b16dg">검진시간</span>
                                        <ul>
                                            <li>
                                                <span className="r16dg">평일</span>
                                                <span className="r16b">09시 00분 ~ 19시 00분</span>
                                            </li>
                                            <li>
                                                <span className="r16dg">토요일</span>
                                                <span className="r16b">09시 00분 ~ 19시 00분</span>
                                            </li>
                                            <li>
                                                <span className="r16dg">일요일</span>
                                                <span className="r16b">09시 00분 ~ 19시 00분</span>
                                            </li>
                                            <li>
                                                <span className="r16dg">공휴일</span>
                                                <span className="r16b">09시 00분 ~ 19시 00분</span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className="b16dg">점심시간</span>
                                        <ul>
                                            <li>
                                                <span className="r16dg">평일</span>
                                                <span className="r16b">13시 00분 ~ 14시 00분</span>
                                            </li>
                                            <li>
                                                <span className="r16dg">주말</span>
                                                <span className="r16b">13시 00분 ~ 14시 00분</span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className="b16dg">접수시간</span>
                                        <ul>
                                            <li>
                                                <span className="r16dg">평일</span>
                                                <span className="r16b">09시 00분 ~ 19시 00분</span>
                                            </li>
                                            <li>
                                                <span className="r16dg">토요일</span>
                                                <span className="r16b">09시 00분 ~ 19시 00분</span>
                                            </li>
                                            <li>
                                                <span className="r16dg">일요일</span>
                                                <span className="r16b">09시 00분 ~ 19시 00분</span>
                                            </li>
                                            <li>
                                                <span className="r16dg">공휴일</span>
                                                <span className="r16b">09시 00분 ~ 19시 00분</span>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}
export default Detail;