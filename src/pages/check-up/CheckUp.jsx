import { useEffect, useState } from 'react';
import Results from './result/Results';
import Search from './search/Search';

const CheckUp = ()=>{
    const [results, setResults] = useState(null);

    return (
        <div id="check-up" className="inner">
            <h1>건강검진기관 조회</h1>
            <Search setResults={setResults}/>
            <span className="hr2"></span>
            <Results results={results}/>
        </div>
    );
}
export default CheckUp;