import { images } from '../../../utils/images';

const Reviews = () => {
    return (
        <article className="reviews">
            <div>
                <img src={images['nav_review_clicked20.png']} alt=""/>
                <h3>리뷰 관리</h3>
            </div>
            <section>
                <div>
                    <div>
                        <label className="b153a7 selected" for="reviews_date_today">
                            오늘
                            <input className="hidden" type="radio" id="reviews_date_today" name="likes_cls" value="오늘" checked/>
                        </label>
                        <label className="b156aa" for="reviews_date_month">
                            1개월
                            <input className="hidden" type="radio" id="reviews_date_month" name="likes_cls" value="1개월"/>
                        </label>
                        <label className="b156aa" for="reviews_date_three_months">
                            3개월
                            <input className="hidden" type="radio" id="reviews_date_three_months" name="likes_cls" value="3개월"/>
                        </label>
                        <label className="b156aa" for="reviews_date_sixth_months">
                            6개월
                            <input className="hidden" type="radio" id="reviews_date_sixth_months" name="likes_cls" value="6개월"/>
                        </label>
                    </div>
                    <div>
                        <label className="b153a7 selected" for="reviews_total">
                            전체
                            <input className="hidden" type="radio" id="reviews_total" name="likes_cls" value="전체" checked/>
                        </label>
                        <label className="b156aa" for="reviews_hospital">
                            병원
                            <input className="hidden" type="radio" id="reviews_hospital" name="likes_cls" value="병원"/>
                        </label>
                        <label className="b156aa" for="reviews_pharmacy">
                            약국
                            <input className="hidden" type="radio" id="reviews_pharmacy" name="likes_cls" value="약국"/>
                        </label>
                    </div>
                </div>
                <ul>
                    <li>
                        <article>
                            <div>
                                <div>
                                    <div>
                                        <strong className="b143a7">기관명</strong>
                                        <span className="r13888">기관구분</span>
                                    </div>
                                    <div>
                                        <img src={images['grade3.png']} alt=""/>
                                        <span className="b146aa">5</span>
                                        <span className="r136aa">작성날짜</span>
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
                            <h4>리뷰 첫번째줄</h4>
                            <textarea className="r14444" name="" id="">리뷰 내용</textarea>
                        </article>
                    </li>
                </ul>
            </section>
        </article>
    )
}
export default Reviews;