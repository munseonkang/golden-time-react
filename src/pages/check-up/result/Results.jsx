import { images } from '../../../utils/images';
import Result from './Result';

const Results = ({results}) => {

    return (
        <div className="result">
            <h2>주변 검진기관</h2>
            <div className="resp-msg r14g"><span className="r14mc">{results?.totalCount}</span>개의 검진기관을 찾았습니다</div>
            <table>
                <thead>
                    <tr>
                        <th className="b16dg">기관명</th>
                        <th className="b16dg">구분</th>
                        {/* <th className="b16dg">진료과목</th> */}
                        <th className="b16dg">검진유형</th>
                        <th className="b16dg">운영시간</th>
                        <th className="b16dg">거리</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                    {
                        results?.items.item.map((item)=>{
                            return (
                                <Result item={item} key={item.hmcNo}/>
                            )
                        })
                    }
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
export default Results;