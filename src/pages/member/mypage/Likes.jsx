import { images } from '../../../utils/images';

const Likes = () => {
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
                        <input className="hidden" type="radio" id="likes_total" name="likes_cls" value="전체" defaultChecked/>
                    </label>
                    <label className="b156aa" htmlFor="likes_hospital">
                        병원
                        <input className="hidden" type="radio" id="likes_hospital" name="likes_cls" value="병원"/>
                    </label>
                    <label className="b156aa" htmlFor="likes_pharmacy">
                        약국
                        <input className="hidden" type="radio" id="likes_pharmacy" name="likes_cls" value="약국"/>
                    </label>
                    <label className="b156aa" htmlFor="likes_check_up">
                        검진기관
                        <input className="hidden" type="radio" id="likes_check_up" name="likes_cls" value="검진기관"/>
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
                        <tr>
                            <td>
                                <img src={images['liked15.png']} alt=""/>
                            </td>
                            <td className="r163a7">test기관명</td>
                            <td className="r163a7">
                                <img src="" alt=""/>
                                test기관구분
                            </td>
                            <td className="r163a7">test전화번호</td>
                            <td>
                                <button className="b14w">자세히 보기</button>
                            </td>
                        </tr>
                        <tr></tr>
                    </tbody>
                </table>
            </section>
        </article>
    )
}
export default Likes;