import { createContext, useEffect, useRef, useState } from 'react';
import Results from './result/Results';
import Search from './search/Search';
import { getCurrentDegree } from '../../apis/services/geolocation';

export const CheckUpContext = createContext();

export default function CheckUp() {
    const [results, setResults] = useState(null);
    const searchTerms = useRef({ sido:"", sigungu:"", isHoliday:"전체", time:"09:00", center:"", type:"전체"});
    const currentPositionRef = useRef({});

    useEffect(()=>{
        getCurrentDegree(currentPositionRef);
    },[])

    return (
        <CheckUpContext.Provider value={{results, setResults, searchTerms, currentPositionRef}}>
            <div id="check-up" className="inner">
                <h1>건강검진기관 조회</h1>
                <Search />
                <span className="hr2"></span>
                <Results />
            </div>
        </CheckUpContext.Provider>
    );
}