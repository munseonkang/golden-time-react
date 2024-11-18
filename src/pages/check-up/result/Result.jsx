import { images } from '../../../utils/images';

const Result = () => {
    return (
        <div className="result">
            <h2>주변 검진기관</h2>
            <div className="resp-msg r14g"><span className="r14mc">8</span>개의 검진기관을 찾았습니다</div>
            <table>
                <thead>
                    <tr>
                        <th className="b16dg">기관명</th>
                        <th className="b16dg">구분</th>
                        <th className="b16dg">진료과목</th>
                        <th className="b16dg">검진유형</th>
                        <th className="b16dg">운영시간</th>
                        <th className="b16dg">거리</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                    <tr className="item">
                        <td className="r16mc">서울제이소아청소년과의원</td>
                        <td className="r16b">종합병원</td>
                        <td className="r16b">정형외과 외 13과목</td>
                        <td>
                            <ul>
                                <li className="b13dp">일반</li>
                                <li className="b13dp">구강</li>
                                <li className="b13dp">영유아</li>
                                <li className="b13dp">학생</li>
                                <li className="b13dp">학교 밖 청소년</li>
                                <li className="b13dp">장애친화 검진기관</li>
                                <li className="b13dp">위암</li>
                                <li className="b13dp">대장암</li>
                                <li className="b13dp">자궁경부암</li>
                                <li className="b13dp">유방암</li>
                                <li className="b13dp">간암</li>
                                <li className="b13dp">폐암</li>
                            </ul>
                        </td>
                        <td className="r16b">목요일 9:00 ~ 19:00</td>
                        <td className="r16b">5km</td>
                        <td>
                            <input className="hidden" type="checkbox" />
                            <label className="toggle-btn b14dg">상세보기</label>
                        </td>
                    </tr>
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
                                        <strong className="b18mc">안양명내과의원</strong>
                                        <ul>
                                            <li>
                                                <span className="b16dg">주소</span>
                                                <span className="r16b">경기도 안양시 만안구 양화로 112 4층 (박달동, 상민빌딩)</span>
                                            </li>
                                            <li>
                                                <span className="b16dg">검진실 전화번호</span>
                                                <span className="r16b">031-455-5272</span>
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
                </tbody>
            </table>
            <div className="pagination-box">
                <ul>
                    <li>
                        <button className=""><img src={images['arrow_left6.png']} alt="" /></button>
                    </li>
                    <li>
                        <button className="current-page r15w">1</button>
                    </li>
                    <li>
                        <button className="r15mc">2</button>
                    </li>
                    <li>
                        <button className="r15mc">3</button>
                    </li>
                    <li>
                        <button className="r15mc">4</button>
                    </li>
                    <li>
                        <button className="r15mc">5</button>
                    </li>
                    <li>
                        <button className="r15mc">...</button>
                    </li>
                    <li>
                        <button className="r15mc">10</button>
                    </li>
                    <li>
                        <button className="clickable"><img src={images['arrow_right6.png']} alt="" /></button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Result;