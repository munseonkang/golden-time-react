import { useEffect, useRef, useState } from 'react';
import { images } from '../../../utils/images';
import { getMemberProfile, getMemberReviews, modifyReview, removeReview } from '../../../apis/services/goldentimeService';
import { Classification, Month } from '../../../constants/constants';
import Pagination from '../../check-up/result/Pagination';
import ProfileImage from './ProfileImage';

export const setRatingImage = (rating)=>{
    switch(rating) {
        case 1:
            return "grade1.png";
        case 2:
            return "grade2.png";
        case 3:
            return "grade3.png";
        case 4:
            return "grade4.png";
        case 5:
            return "grade5.png";
    }
}

const Reviews = () => {
    const { TOTAL, HOSPITAL, PHARMACY } = Classification;
    const { FIRST, SECOND, THIRD, FOURTH } = Month;
    const NUMOFROWS = 5;

    const [reviewList, setReviewList] = useState({});
    const [condition, setCondition] = useState({month: FIRST, classification: TOTAL});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [memberInfo, setMemberInfo] = useState(null);

    const monthsRef = useRef([]);
    const addMonthsRef = (e)=>{
        if(e && !monthsRef.current.includes(e)) {
            monthsRef.current.push(e);
        }
    }
    const classificationsRef = useRef([]);
    const addClassificationsRef = (e)=>{
        if(e && !classificationsRef.current.includes(e)) {
            classificationsRef.current.push(e);
        }
    }

    const reviewTextRef = useRef([]);
    const addReviewTextRef = (e)=>{
        if(e && !reviewTextRef.current.includes(e)) {
            reviewTextRef.current.push(e);
        }
    }

    const modifyReviewRef = useRef(null);

    useEffect(()=>{
        getMemberProfile(sessionStorage.getItem("loginMember"), setMemberInfo);
    },[])

    useEffect(()=>{
        getMemberReviews({memberId: sessionStorage.getItem("loginMember"), month: Number(condition.month), classification: condition.classification, pageNo: 1, numOfRows: NUMOFROWS}, setReviewList)
    },[condition])

    useEffect(()=>{
        if(reviewTextRef.current) {
            reviewTextRef.current.map((el)=>{
                el.style.height = 'auto';
                // if(el.scrollHeight > 120) {
                //     el.style.height = el.scrollHeight + "px";
                // }
                // else {
                //     el.style.height = "110px";
                // }
                el.style.height = el.scrollHeight+50+"px";
            })
        }
    },[reviewList])

    const monthHandler = (e)=>{
        const monthValue = e.target.value;
        monthsRef.current.map((el)=>{
            if(el.innerText===`${monthValue}개월` || (el.innerText==="오늘"&&monthValue==="0")) {
                el.classList.add("b153a7", "selected");
                el.classList.remove("b156aa");
            } else {
                el.classList.add("b156aa");
                el.classList.remove("b153a7", "selected");
            }
        })
        setCondition({...condition, month: monthValue});
    }

    const classificationHandler = (e)=>{
        const clsValue = e.target.value;
        classificationsRef.current.map((el)=>{
            if(el.innerText===clsValue || (el.innerText==="전체"&&clsValue==="")) {
                el.classList.add("b153a7", "selected");
                el.classList.remove("b156aa");
            } else {
                el.classList.add("b156aa");
                el.classList.remove("b153a7", "selected");
            }
        })
        setCondition({...condition, classification: clsValue});
    }

    const [rating, setRating] = useState(3);

    // 별 클릭 시 rating을 설정하는 함수
    const handleStarClick = (index) => {
        setRating(index + 1);  // 클릭된 별에 맞게 rating을 설정
    };

    // 별 이미지를 설정하는 함수
    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <img
                key={index}
                src={images[`grade29_${index < rating ? 'on' : 'off'}.png`]} // rating에 따라 'on' 또는 'off' 이미지를 사용
                alt=""
                onClick={() => handleStarClick(index)} // 클릭 시 해당 별의 rating을 설정
            />
        ));
    };

    const handleOpenModal=(review)=>{
        modifyReviewRef.current = review;
        setRating(review.rating);
        setIsModalOpen(true);
    }
    const handleCloseModal=()=>{
        modifyReviewRef.current = null;
        setIsModalOpen(false);
    }

     //리뷰 작성
     const handleModifyReview = () => {
        const review = {
            reviewId: modifyReviewRef.current.reviewId,
            content: document.getElementById('modifiedContent').value,
            rating: rating,
            memberId: modifyReviewRef.current.memberId
        }
        if (!document.getElementById('modifiedContent').value) {
            alert("수정된 내용을 입력해주세요.");
            return;
        }
        modifyReview({memberId: sessionStorage.getItem("loginMember"), review: review}, condition, NUMOFROWS, setReviewList);
        handleCloseModal();
    };

    const handleRemoveReview = (reviewId)=>{
        removeReview({memberId: sessionStorage.getItem("loginMember"), reviewId: reviewId}, condition, NUMOFROWS, setReviewList);
    }

    return (
        <article className="reviews">
            <div>
                <img src={images['nav_review_clicked20.png']} alt=""/>
                <h3>리뷰 관리</h3>
            </div>
            <section>
                <div>
                    <div>
                        <label className="b153a7 selected" htmlFor="reviews_date_today" ref={addMonthsRef}>
                            오늘
                            <input className="hidden" type="radio" id="reviews_date_today" name="likes_cls" value={FIRST} defaultChecked onChange={(e)=>{monthHandler(e)}}/>
                        </label>
                        <label className="b156aa" htmlFor="reviews_date_month" ref={addMonthsRef}>
                            1개월
                            <input className="hidden" type="radio" id="reviews_date_month" name="likes_cls" value={SECOND} onChange={(e)=>{monthHandler(e)}}/>
                        </label>
                        <label className="b156aa" htmlFor="reviews_date_three_months" ref={addMonthsRef}>
                            3개월
                            <input className="hidden" type="radio" id="reviews_date_three_months" name="likes_cls" value={THIRD} onChange={(e)=>{monthHandler(e)}}/>
                        </label>
                        <label className="b156aa" htmlFor="reviews_date_sixth_months" ref={addMonthsRef}>
                            6개월
                            <input className="hidden" type="radio" id="reviews_date_sixth_months" name="likes_cls" value={FOURTH} onChange={(e)=>{monthHandler(e)}}/>
                        </label>
                    </div>
                    <div>
                        <label className="b153a7 selected" htmlFor="reviews_total" ref={addClassificationsRef}>
                            전체
                            <input className="hidden" type="radio" id="reviews_total" name="likes_cls" value={TOTAL} defaultChecked onChange={(e)=>{classificationHandler(e)}}/>
                        </label>
                        <label className="b156aa" htmlFor="reviews_hospital" ref={addClassificationsRef}>
                            {HOSPITAL}
                            <input className="hidden" type="radio" id="reviews_hospital" name="likes_cls" value={HOSPITAL}  onChange={(e)=>{classificationHandler(e)}}/>
                        </label>
                        <label className="b156aa" htmlFor="reviews_pharmacy" ref={addClassificationsRef}>
                            {PHARMACY}
                            <input className="hidden" type="radio" id="reviews_pharmacy" name="likes_cls" value={PHARMACY} onChange={(e)=>{classificationHandler(e)}}/>
                        </label>
                    </div>
                </div>
                <ul>
                    {
                        reviewList.items?.map((review)=>{
                            return (
                                <li key={review.reviewId}>
                                    <article>
                                        <div>
                                            <div>
                                                <div>
                                                    <strong className="b143a7">{review.duty.dutyName}</strong>
                                                    <span className="r13888">{review.duty.dutyDiv}</span>
                                                </div>
                                                <div>
                                                    <img src={images[`${setRatingImage(review.rating)}`]} alt=""/>
                                                    <span className="b146aa">{review.rating}</span>
                                                    <span className="r126aa">{review.updatedAt}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <button onClick={()=>{handleOpenModal(review)}}>
                                                    <img src={images['edit8_w.png']} alt=""/>
                                                    <span className="b12w">수정</span>
                                                </button>
                                                <button onClick={()=>{handleRemoveReview(review.reviewId)}}>
                                                    <img src={images['remove8_w.png']} alt=""/>
                                                    <span className="b12w">삭제</span>
                                                </button>
                                            </div>
                                        </div>
                                        {/* <h4>리뷰 첫번째줄</h4> */}
                                        <textarea className="r14444" ref={addReviewTextRef} value={review.content} readOnly/>
                                    </article>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
            {(reviewList && (<Pagination datas={reviewList} paging={(pageNo)=>{getMemberReviews({memberId: sessionStorage.getItem("loginMember"), month: Number(condition.month), classification: condition.classification, pageNo: pageNo, numOfRows:NUMOFROWS}, setReviewList)}}/>))}
            {isModalOpen && (
                <div className="review-modal">
                    <div className="box">
                        <form name="reviewForm" id="reviewForm" action="">
                            <p>{modifyReviewRef.current.duty.dutyName}</p>
                            <div className="flex">
                                <div className="flex">
                                    <div className="img">
                                        <ProfileImage systemName={memberInfo?.systemName}/>
                                    </div>
                                    <p>{memberInfo?.nickname}</p>
                                </div>
                                <div className="grade">
                                    {renderStars()} {/* 별 이미지 렌더링 */}
                                </div>
                            </div>
                            <textarea name="modifiedContent" id="modifiedContent" rows="4" placeholder="이곳에 다녀온 경험을 자세히 공유해 주세요." defaultValue={modifyReviewRef.current.content}></textarea>
                            <div className="btn flex">
                                <a id="cancel-btn" className="cancel-btn" onClick={handleCloseModal}>취소</a>
                                <a id="review-btn" className="review-btn" onClick={handleModifyReview}>게시</a>
                            </div>
                        </form>
                    </div>
                </div>
            )}   
        </article>
    )
}
export default Reviews;