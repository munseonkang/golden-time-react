import { useEffect, useState } from 'react';
import { images } from '../../../utils/images';
import { getMemberInfo } from '../../../apis/services/goldentimeService';

const DashBoard = () => {
    const [memberInfo, setMemberInfo] = useState({memberId:"", nickname:""});
    const [reviewList, setReviewList] = useState()

    useEffect(()=>{
        getMemberInfo(sessionStorage.getItem("loginMember"), setMemberInfo)
    },[])

    return (
        <article className="dash-board">
            <section>
                <h3>내 계정</h3>
                <div>
                    <div>
                        <img src={images['profile_image80.png']} alt=""/>
                        <img src={images['edit_image25.png']} alt=""/>
                    </div>
                    <div>
                        <span className="r1285b">반갑습니다, 좋은 하루 되세요.</span>
                        <span className="b24w">{memberInfo.nickname}</span>
                        <span className="b21b4d">{memberInfo.memberId}</span>
                    </div>
                    <div>
                        <div>
                            <span className="b14e3f">리뷰</span>
                            <span className="b30e3f">3</span>
                        </div>
                        <div>
                            <span className="b14e3f">즐겨찾기</span>
                            <span className="b30e3f">8</span>
                        </div>
                    </div>
                    <button className="b133a7 clickable">회원정보 수정</button>
                </div>
            </section>
            <section>
                <section>
                    <h3>최근 리뷰</h3>
                    <span className="r14g">최근 한 달간 작성하신 리뷰 목록입니다.</span>
                    <ul>
                        <li>
                            <article className="rbgc-h">
                                <div>
                                    <div>
                                        <div className="b173a7">기관명</div>
                                        <div className="r15888">기관구분</div>
                                    </div>
                                    <img src={images['grade3.png']} alt=""/>
                                </div>
                                <textarea className="r16444" name="" id="" value="리뷰내용" readOnly></textarea>
                                <span className="r15mc">날짜</span>
                            </article>
                        </li>
                    </ul>
                </section>
                <span></span>
                <section>
                    <h3>최근 즐겨찾기</h3>
                    <span className="r14g">마지막으로 등록하신 5건의 즐겨찾기 목록입니다.</span>
                    <ul>
                        <li>
                            <div>
                                <img src="" alt=""/>
                            </div>
                            <div>
                                <div>
                                    <span className="r183a7">기관명</span>
                                    <span className="r15888">기관구분</span>
                                </div>
                                <span className="r15b">기관 전화번호</span>
                            </div>
                            <button className="b15w clickable btnbgc-h">자세히 보기</button>
                        </li>
                    </ul>
                    <button>
                        <img src={images['more17.png']} alt=""/>
                        <span className="b173a7">더보기</span>
                    </button>
                </section>
            </section>
        </article>
    )
}
export default DashBoard;