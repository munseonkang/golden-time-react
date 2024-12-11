import { useContext } from 'react';
import { images } from '../../../utils/images';
import Pagination from './Pagination';
import Result from './Result';
import { CheckUpContext } from '../CheckUp';
import { search } from '../../../apis/services/nhisService';

const Results = () => {
    const {results, setResults, searchTerms} = useContext(CheckUpContext);

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
                        (results?.items)?
                        (Array.isArray(results?.items.item)?
                            results?.items.item.map((item)=>{
                                return (
                                    <Result item={item} key={item.hmcNo}/>
                                )
                            }):(
                                <Result item={results?.items.item} key={results?.items.item.hmcNo}/>
                            )
                        ):(
                            <tr>
                                <td colSpan='6'>
                                    <span className="b16dg empty-list">{`검색 결과가 존재하지 않습니다.`}</span>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            {(results?.items && (<Pagination datas={results} paging={(pageNo)=>{search({...searchTerms.current, pageNo: pageNo}, setResults)}} />))}
        </div>
    )
}
export default Results;