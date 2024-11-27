import { createContext, useEffect, useRef, useState } from 'react';
import Results from './result/Results';
import Search from './search/Search';

export const CheckUpContext = createContext();

export default function CheckUp() {
    const [results, setResults] = useState(null);
    const searchTerms = useRef({ sido:"", sigungu:"", day:"평일", time:"09:00", center:"", regular:["전체"], cancer:["전체"]});

    return (
        <CheckUpContext.Provider value={{results, setResults, searchTerms}}>
            <div id="check-up" className="inner">
                <h1>건강검진기관 조회</h1>
                <Search />
                <span className="hr2"></span>
                <Results />
            </div>
        </CheckUpContext.Provider>
    );
}