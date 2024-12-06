import { useEffect, useRef, useState } from 'react';
import { images } from '../../../utils/images';
import { getMemberReviews } from '../../../apis/services/goldentimeService';
import { Classification, Month } from '../../../constants/mypage';

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

    const [reviewList, setReviewList] = useState([]);

    const reviewTextRef = useRef([]);
    const addReviewTextRef = (e)=>{
        reviewTextRef.current.push(e);
    }

    useEffect(()=>{
        getMemberReviews({memberId: sessionStorage.getItem("loginMember")}, setReviewList)
    },[])

    useEffect(()=>{
        if(reviewTextRef.current) {
            reviewTextRef.current.map((el)=>{
                el.style.height = 'auto';
                el.style.height = el.scrollHeight + "px";
            })
        }
    },[reviewTextRef])

    const monthHandler = (e)=>{
        getMemberReviews({memberId: sessionStorage.getItem("loginMember"), month:Number(e.target.value)}, setReviewList)
    }

    const classificationHandler = (e)=>{
        getMemberReviews({memberId: sessionStorage.getItem("loginMember"), classification:e.target.value}, setReviewList)
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
                        <label className="b153a7 selected" htmlFor="reviews_date_today">
                            오늘
                            <input className="hidden" type="radio" id="reviews_date_today" name="likes_cls" value={FIRST} defaultChecked onChange={(e)=>{monthHandler(e)}}/>
                        </label>
                        <label className="b156aa" htmlFor="reviews_date_month">
                            1개월
                            <input className="hidden" type="radio" id="reviews_date_month" name="likes_cls" value={SECOND} onChange={(e)=>{monthHandler(e)}}/>
                        </label>
                        <label className="b156aa" htmlFor="reviews_date_three_months">
                            3개월
                            <input className="hidden" type="radio" id="reviews_date_three_months" name="likes_cls" value={THIRD} onChange={(e)=>{monthHandler(e)}}/>
                        </label>
                        <label className="b156aa" htmlFor="reviews_date_sixth_months">
                            6개월
                            <input className="hidden" type="radio" id="reviews_date_sixth_months" name="likes_cls" value={FOURTH} onChange={(e)=>{monthHandler(e)}}/>
                        </label>
                    </div>
                    <div>
                        <label className="b153a7 selected" htmlFor="reviews_total">
                            전체
                            <input className="hidden" type="radio" id="reviews_total" name="likes_cls" value={TOTAL} defaultChecked onChange={(e)=>{classificationHandler(e)}}/>
                        </label>
                        <label className="b156aa" htmlFor="reviews_hospital">
                            {HOSPITAL}
                            <input className="hidden" type="radio" id="reviews_hospital" name="likes_cls" value={HOSPITAL}  onChange={(e)=>{classificationHandler(e)}}/>
                        </label>
                        <label className="b156aa" htmlFor="reviews_pharmacy" >
                            {PHARMACY}
                            <input className="hidden" type="radio" id="reviews_pharmacy" name="likes_cls" value={PHARMACY} onChange={(e)=>{classificationHandler(e)}}/>
                        </label>
                    </div>
                </div>
                <ul>
                    <li>
                        {
                            reviewList.map((review)=>{
                                return (
                                    <article key={review.reviewId}>
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
                                                <button>
                                                    <img src={images['edit8_w.png']} alt=""/>
                                                    <span className="b12w">수정</span>
                                                </button>
                                                <button>
                                                    <img src={images['remove8_w.png']} alt=""/>
                                                    <span className="b12w">삭제</span>
                                                </button>
                                            </div>
                                        </div>
                                        {/* <h4>리뷰 첫번째줄</h4> */}
                                        <textarea className="r14444" ref={addReviewTextRef} defaultValue={review.content} readOnly/>
                                    </article>
                                )
                            })
                        }
                    </li>
                </ul>
            </section>
        </article>
    )
}
export default Reviews;