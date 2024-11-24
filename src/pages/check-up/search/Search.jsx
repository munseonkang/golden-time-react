import { useEffect, useRef } from 'react';
import SelectItemBox from './SelectItemBox';
import CheckInputBox from './CheckItemBox';
import { searchHolidaysCenter, searchIntegrated } from '../../../apis/api/nhisAPI';
import { getCurrentPosition } from '../../../apis/services/geolocation';
import { siDoCodes, sigunguCodes } from '../../../constants/regions';

const Search = ({setResults}) => {
    const searchTerms = useRef({ sido:"", sigungu:"", day:"평일", time:"09:00", specialty:"가정의학과", center:"", regular:["전체"], cancer:["전체"]});
    const childRef = useRef([]);

    const reset = () => {
        childRef.current.forEach((child)=>{
            child.reset();
        })
    }
    
    async function search(terms) {
        try{
            const siDoCd = siDoCodes.get(terms.sido);
            const siGunGuCd = sigunguCodes.get(siDoCd).get(terms.sigungu);
            const response = await searchIntegrated({
                hmcNm: terms.center,
                siDoCd: siDoCd,
                siGunGuCd: siGunGuCd,
            });
            console.log(JSON.stringify(response.data.response.body));
            setResults({...(response.data.response.body)});
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="search">
            <div className="container">
                <h2>검진기관 검색</h2>
                <div className="top-box">
                    <SelectItemBox id="region" search={search} searchTerms={searchTerms} ref={(child) => childRef.current[0] = child} inputBox={{type:"button", value:"지역을 선택해 주세요.", readOnly:true, image:"arrow_below14_g.png"}} />
                    <SelectItemBox id="time" searchTerms={searchTerms} ref={(child) => childRef.current[1] = child} inputBox={{type:"button", placeholder:"방문 예정 시간을 선택해 주세요.", readOnly:true, image:'time15_g.png'}} />
                    <SelectItemBox id="specialty" searchTerms={searchTerms} ref={(child) => childRef.current[2] = child} inputBox={{type:"button", placeholder:"운영 진료과목을 선택해주세요.", readOnly:true, image:'arrow_below14_g.png'}} />
                    <SelectItemBox id="center" searchTerms={searchTerms} ref={(child) => childRef.current[3] = child} inputBox={{type:"text", placeholder:"검진기관명을 검색해 주세요.", readOnly:false, image:'search16.png'}} />
                </div>
                <div className="bottom-box">
                    <div>
                        <span className="b17mc">검진 유형</span>
                        <span className="r14g">(선택)</span>
                    </div>
                    <CheckInputBox id="regular" searchTerms={searchTerms} ref={(child) => childRef.current[4] = child}/>
                    <CheckInputBox id="cancer" searchTerms={searchTerms} ref={(child) => childRef.current[5] = child}/>
                </div>
                <div className="btn-box">
                    <button className="r17w" onClick={reset}>초기화</button>
                    <button className="r17w" onClick={()=>{search(searchTerms.current)}}>검  색</button>
                </div>
            </div>
        </div>
    )
}
export default Search;