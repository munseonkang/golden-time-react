import { useContext, useEffect, useState } from 'react';
import { images } from '../../../utils/images';
import { CheckUpContext } from '../CheckUp';
import { search } from '../../../apis/services/nhisService';

const Pagination = () => {
    const {results, setResults, searchTerms} = useContext(CheckUpContext);
    const {pageNo, totalCount, numOfRows} = results;

    const pagingWidth = 5;
    
    const [pageMaker, setPageMaker] = useState({
                                        currentPage: pageNo,
                                        startPage: (pageNo+4)/5,
                                        endPage: (pageNo<(pagingWidth+1))?pagingWidth:totalCount/numOfRows,
                                        lastPage: Math.ceil(totalCount/numOfRows),
                                        total: totalCount,
                                        prev: false,
                                        next: (pagingWidth<(totalCount/numOfRows)?true:false)
                                    });
    const {currentPage, startPage, endPage, lastPage, total, prev, next} = pageMaker;

    useEffect(()=>{
        if(pageNo===1) {
            setPageMaker({
                currentPage: pageNo,
                startPage: (pageNo+4)/5,
                endPage: (pageNo<(pagingWidth+1))?pagingWidth:totalCount/numOfRows,
                lastPage: Math.ceil(totalCount/numOfRows),
                total: totalCount,
                prev: false,
                next: (pagingWidth<(totalCount/numOfRows)?true:false)
            })
        }
        else {
            setPageMaker({
                currentPage: pageNo,
                startPage: Math.floor((pageNo+4)/5),
                endPage: (pageNo<(pagingWidth+1))?pagingWidth:totalCount/numOfRows,
                lastPage: Math.ceil(totalCount/numOfRows),
                total: totalCount,
                prev: ((pageNo+4)/5)>1,
                next: pagingWidth<(totalCount/numOfRows)
            })
        }
    }, [results])

    // useEffect(()=>{
    //     setPageMaker({
    //         ...pageMaker,
    //         startPage: (currentPage+4)/5,
    //         endPage: (endPage<lastPage)?((currentPage-1)/5+1)*5:lastPage,
    //         prev: currentPage>pagingWidth,
    //         next: lastPage/pagingWidth*pagingWidth+1>currentPage
    //     })
    // },[currentPage])

    function paging(pageNo) {
        search({...searchTerms.current, pageNo: pageNo}, setResults);
    }

    function setPagination() {
        const result = [];
        for(let i=startPage; i<endPage+1; i++) {
            if(i===currentPage) {
                result.push(
                    <li key={`current-${i}`}>
                        <button className="current-page r15w">{i}</button>
                    </li>
                );
            }
            else {
                result.push(
                    <li key={`page-${i}`}>
                        <button className="clickable r15mc" onClick={()=>{paging(i)}}>{i}</button>
                    </li>
                );
            }
        }
        if(startPage>1) {
            result.unshift(
                <li key="ellipsis-start">
                    <button className="r15mc">...</button>
                </li>
            );
            result.unshift(
                <li key="start">
                    <button className="clickable r15mc" onClick={()=>{paging(1)}}>1</button>
                </li>
            );
        }
        if(endPage<lastPage) {
            result.push(
                <li key="ellipsis-last">
                    <button className="r15mc">...</button>
                </li>
            );
            result.push(
                <li key="last">
                    <button className="clickable r15mc" onClick={()=>{paging(lastPage)}}>{lastPage}</button>
                </li>
            );
        }
        return result;
    }

    return (
        <div className="pagination-box">
            <ul>
                {(prev ? (
                    <li key="prev">
                        <button className="clickable clickable-background"><img src={images['arrow_left6.png']} alt="" /></button>
                    </li>
                ):(
                    <li key="prev">
                        <button className=""><img src={images['arrow_left6.png']} alt="" /></button>
                    </li>
                ))}
                { setPagination() }
                {/* <li>
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
                </li> */}
                {(next ? (
                    <li key="next">
                        <button className="clickable clickable-background"><img src={images['arrow_right6.png']} alt="" /></button>
                    </li>
                ):(
                    <li key="next">
                        <button className=""><img src={images['arrow_left6.png']} alt="" /></button>
                    </li>
                ))} 
            </ul>
        </div>
    )
}
export default Pagination;