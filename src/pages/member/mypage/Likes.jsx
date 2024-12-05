import { useEffect, useState } from 'react';
import { getMemberLikes } from '../../../apis/services/goldentimeService';
import { images } from '../../../utils/images';
import { Classification } from '../../../constants/mypage';

export const setLikeDetail = (cls)=>{
    switch(cls) {
        case Classification.HOSPITAL:
            return "lbgc-h";
        case Classification.PHARMACY:
            return "lbgc-p";
        case Classification.CENTER:
            return "lbgc-c";
    }
}

export const setLikeIcon = (cls, size)=>{
    switch(cls) {
        case Classification.HOSPITAL:
            if(size===28) return `icon_hospital28.png`;
            if(size===21) return `icon_hospital21.png`;
        case Classification.PHARMACY:
            if(size===28) return `icon_pharmacy28.png`;
            if(size===21) return `icon_pharmacy21.png`;
        case Classification.CENTER:
            if(size===28) return `icon_center28.png`;
            if(size===21) return `icon_center21.png`;
    }
}

const Likes = () => {
    const { TOTAL, HOSPITAL, PHARMACY, CENTER } = Classification;

    const [likeList, setLikeList] = useState([]);

    useEffect(()=>{
        getMemberLikes({memberId: sessionStorage.getItem("loginMember")}, setLikeList);
    },[])

    const classificationHandler = (e)=>{
        getMemberLikes({memberId: sessionStorage.getItem("loginMember"), classification: e.target.value}, setLikeList);
    }

    return (
        <article className="likes">
            <div>
                <img src={images['nav_like_clicked20.png']} alt=""/>
                <h3>즐겨찾기 관리</h3>
            </div>
            <section>
                <div>
                    <label className="b153a7" htmlFor="likes_total">
                        전체
                        <input className="hidden" type="radio" id="likes_total" name="likes_cls" value={TOTAL} defaultChecked onChange={(e)=>{classificationHandler(e)}}/>
                    </label>
                    <label className="b156aa" htmlFor="likes_hospital">
                        {HOSPITAL}
                        <input className="hidden" type="radio" id="likes_hospital" name="likes_cls" value={HOSPITAL} onChange={(e)=>{classificationHandler(e)}}/>
                    </label>
                    <label className="b156aa" htmlFor="likes_pharmacy">
                        {PHARMACY}
                        <input className="hidden" type="radio" id="likes_pharmacy" name="likes_cls" value={PHARMACY} onChange={(e)=>{classificationHandler(e)}}/>
                    </label>
                    <label className="b156aa" htmlFor="likes_check_up">
                        {CENTER}
                        <input className="hidden" type="radio" id="likes_check_up" name="likes_cls" value={CENTER} onChange={(e)=>{classificationHandler(e)}}/>
                    </label>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <img src={images['like13.png']} alt=""/>
                            </th>
                            <th className="b143a7">기관명</th>
                            <th className="b143a7">구분</th>
                            <th className="b143a7">전화번호</th>
                            <th className="b143a7">위치 확인</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                        {
                            likeList.map((like)=>{
                                return (
                                    <tr key={like.likeId}>
                                        <td>
                                            <button>
                                                <img src={images['liked15.png']} alt=""/>
                                            </button>
                                        </td>
                                        <td className="r163a7">{like.duty.dutyName}</td>
                                        <td className="r163a7">
                                            <img src={images[`${setLikeIcon(like.classification, 21)}`]} alt=""/>
                                            {like.duty.dutyDiv}
                                        </td>
                                        <td className="r163a7">{like.duty.dutyTel}</td>
                                        <td>
                                            <button className={`b14w ${setLikeDetail(like.classification)}`}>자세히 보기</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr></tr>
                    </tbody>
                </table>
            </section>
        </article>
    )
}
export default Likes;