import { useEffect, useRef, useState } from 'react';
import { images } from '../../../utils/images';
import { getMemberInfo, getMemberLikes, getMemberProfile, getMemberReviews } from '../../../apis/services/goldentimeService';
import { setRatingImage } from './Reviews';
import { Title } from '../../../constants/constants';
import { setLikeDetail, setLikeIcon } from './like/Likes';
import ProfileImage from './ProfileImage';

const DashBoard = (props) => {
    const { changeContent } = props;

    const [memberInfo, setMemberInfo] = useState({});
    const [likeList, setLikeList] = useState([]);
    const [reviewList, setReviewList] = useState([]);

    const reviewTextRef = useRef([]);
    const addReviewTextRef = (e)=>{
        reviewTextRef.current.push(e);
    }

    useEffect(()=>{
        getMemberProfile(sessionStorage.getItem("loginMember"), setMemberInfo);
        getMemberLikes({memberId: sessionStorage.getItem("loginMember"), limit: 5}, setLikeList);
        getMemberReviews({memberId: sessionStorage.getItem("loginMember"), month: 1}, setReviewList);
    },[])

    useEffect(()=>{
        if(reviewTextRef.current && reviewTextRef.current.length>0) {
            reviewTextRef.current.map((el)=>{
                el.style.height = el.scrollHeight + "px";
                el.parentElement.style.height = "auto";
            })
        }
    },[reviewList])

    return (
        <article className="dash-board">
            <section>
                <h3>내 프로필</h3>
                <div>
                    <div>
                        <ProfileImage systemName={memberInfo.systemName} />
                        <img src={images['edit_image25.png']} alt=""/>
                    </div>
                    <div>
                        <span className="r1285b">반갑습니다, 좋은 하루 되세요.</span>
                        <span className="b24w">{memberInfo?.nickname}</span>
                        <span className="b21b4d">{memberInfo?.memberId}</span>
                    </div>
                    <div>
                        <div>
                            <span className="b14e3f" onClick={()=>{changeContent(Title.REVIEWS)}}>리뷰</span>
                            <span className="b30e3f" onClick={()=>{changeContent(Title.REVIEWS)}}>{memberInfo.reviewCnt}</span>
                        </div>
                        <div>
                            <span className="b14e3f" onClick={()=>{changeContent(Title.LIKES)}}>즐겨찾기</span>
                            <span className="b30e3f" onClick={()=>{changeContent(Title.LIKES)}}>{memberInfo.likeCnt}</span>
                        </div>
                    </div>
                    <button className="b133a7" onClick={()=>{changeContent(Title.MEMBERINFO)}}>회원정보 수정</button>
                </div>
            </section>
            <section>
                <section>
                    <h3>최근 리뷰</h3>
                    <span className="r14g">최근 한 달간 작성하신 리뷰 목록입니다.</span>
                    <ul>
                        {
                            reviewList?.map((review)=>{
                                return (
                                    <li key={review.reviewId}>
                                        <article className="rbgc-h">
                                            <div>
                                                <div>
                                                    <div className="b173a7">{review.duty.dutyName}</div>
                                                    <div className="r15888">{review.duty.dutyDiv}</div>
                                                </div>
                                                <img src={images[`${setRatingImage(review.rating)}`]} alt=""/>
                                            </div>
                                            <textarea className="r16444" ref={addReviewTextRef} value={review.content} readOnly></textarea>
                                            <span className="r15mc">{review.updatedAt}</span>
                                        </article>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>
                <span></span>
                <section>
                    <h3>최근 즐겨찾기</h3>
                    <span className="r14g">마지막으로 등록하신 5건의 즐겨찾기 목록입니다.</span>
                    <ul>
                        {
                            likeList?.map((like)=>{
                                return (
                                    <li key={like.likeId}>
                                        <div>
                                            <img src={images[`${setLikeIcon(like.classification, 28)}`]} alt=""/>
                                        </div>
                                        <div>
                                            <div>
                                                <span className="r183a7">{like.duty.dutyName}</span>
                                                <span className="r15888">{like.duty.dutyDiv}</span>
                                            </div>
                                            <span className="r15b">{like.duty.dutyTel}</span>
                                        </div>
                                        <button className={`b15w ${setLikeDetail(like.classification)}`}>자세히 보기</button>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <button onClick={()=>{changeContent(Title.LIKES)}}>
                        <img src={images['more17.png']} alt=""/>
                        <span className="b173a7">더보기</span>
                    </button>
                </section>
            </section>
        </article>
    )
}
export default DashBoard;