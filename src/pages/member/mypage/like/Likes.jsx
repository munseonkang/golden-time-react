import { useEffect, useRef, useState } from 'react';
import { getMemberLikes } from '../../../../apis/services/goldentimeService';
import { images } from '../../../../utils/images';
import { Classification } from '../../../../constants/constants';
import Pagination from '../../../check-up/result/Pagination';
import Like from './Like';

const Likes = () => {
    const NUMOFROWS = 8;
    const { TOTAL, HOSPITAL, PHARMACY, CENTER } = Classification;

    const [likeList, setLikeList] = useState({});
    const [classification, setClassification] = useState(TOTAL);

    const classificationsRef = useRef([]);
    const addClassificationsRef = (e)=>{
        if(e && !classificationsRef.current.includes(e)) {
            classificationsRef.current.push(e);
        }
    }

    useEffect(()=>{
        getMemberLikes({memberId: sessionStorage.getItem("loginMember"),
            classification: classification, pageNo: 1, numOfRows:NUMOFROWS}, setLikeList);
    },[classification])

    const classificationHandler = (e)=>{
        classificationsRef.current.map((el)=>{
            if(el.innerText===e.target.value || (el.innerText==="전체"&&e.target.value===TOTAL)) {
                el.classList.add("b153a7", "checked");
                el.classList.remove("b156aa");
            } else {
                el.classList.add("b156aa");
                el.classList.remove("b153a7", "checked");
            }
        })

        setClassification(e.target.value);
    }

    return (
        <article className="likes">
            <div>
                <img src={images['nav_like_clicked20.png']} alt=""/>
                <h3>즐겨찾기 관리</h3>
            </div>
            <section>
                <div>
                    <label className="b153a7 checked" htmlFor="likes_total" ref={addClassificationsRef}>
                        전체
                        <input className="hidden" type="radio" id="likes_total" name="likes_cls" value={TOTAL} defaultChecked onChange={(e)=>{classificationHandler(e)}}/>
                    </label>
                    <label className="b156aa" htmlFor="likes_hospital" ref={addClassificationsRef}>
                        {HOSPITAL}
                        <input className="hidden" type="radio" id="likes_hospital" name="likes_cls" value={HOSPITAL} onChange={(e)=>{classificationHandler(e)}}/>
                    </label>
                    <label className="b156aa" htmlFor="likes_pharmacy" ref={addClassificationsRef}>
                        {PHARMACY}
                        <input className="hidden" type="radio" id="likes_pharmacy" name="likes_cls" value={PHARMACY} onChange={(e)=>{classificationHandler(e)}}/>
                    </label>
                    {/* <label className="b156aa" htmlFor="likes_check_up" ref={addClassificationsRef}>
                        {CENTER}
                        <input className="hidden" type="radio" id="likes_check_up" name="likes_cls" value={CENTER} onChange={(e)=>{classificationHandler(e)}}/>
                    </label> */}
                </div>
                <span></span>
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
                            likeList?.items?.map((like)=>{
                                return (
                                    <Like like={like} key={like.likeId}/>
                                )
                            })
                        }
                        <tr></tr>
                    </tbody>
                </table>
            </section>
            {(likeList && (<Pagination datas={likeList} paging={(pageNo)=>{
                getMemberLikes({memberId: sessionStorage.getItem("loginMember"), classification: classification, pageNo: pageNo, numOfRows:8
                }, setLikeList)}}/>))}
        </article>
    )
}
export default Likes;