import Result from './result/Result';
import Search from './search/Search';

const CheckUp = ()=>{
    

    return (
        <div id="check-up" className="inner">
            <h1>건강검진기관 조회</h1>
            <Search />
            <span className="hr2"></span>
            <Result />
        </div>
    );
}
export default CheckUp;