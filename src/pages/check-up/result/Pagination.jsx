import { useEffect, useState } from 'react';
import { images } from '../../../utils/images';
import { search } from '../../../apis/services/nhisService';

const Pagination = (props) => {
    const {datas, paging} = props;
    const {pageNo, totalCount, numOfRows} = datas;

    const pagingWidth = 5;
    
    const [pageMaker, setPageMaker] = useState({
            currentPage: pageNo,
            startPage: Math.floor((pageNo-1)/pagingWidth)*pagingWidth+1,
            endPage: (pageNo<Math.floor(Math.ceil(totalCount/numOfRows)/pagingWidth)*pagingWidth+1)?Math.ceil(pageNo/5)*pagingWidth:Math.ceil(totalCount/numOfRows),
            lastPage: Math.ceil(totalCount/numOfRows),
            total: totalCount,
            prev: false,
            next: pageNo<Math.ceil(totalCount/numOfRows)-(Math.ceil(totalCount/numOfRows)%pagingWidth===0?5:Math.ceil(totalCount/numOfRows)%pagingWidth)+1
        });
    const {currentPage, startPage, endPage, lastPage, total, prev, next} = pageMaker;

    useEffect(()=>{
        if(pageNo===1) {
            setPageMaker({
                currentPage: pageNo,
                startPage: Math.floor((pageNo-1)/pagingWidth)*pagingWidth+1,
                endPage: (pageNo<Math.floor(Math.ceil(totalCount/numOfRows)/pagingWidth)*pagingWidth+1)?Math.ceil(pageNo/5)*pagingWidth:Math.ceil(totalCount/numOfRows),
                lastPage: Math.ceil(totalCount/numOfRows),
                total: totalCount,
                prev: false,
                next: pageNo<Math.ceil(totalCount/numOfRows)-(Math.ceil(totalCount/numOfRows)%pagingWidth===0?5:Math.ceil(totalCount/numOfRows)%pagingWidth)+1
            })
        }
        else {
            setPageMaker({
                currentPage: pageNo,
                startPage: Math.floor((pageNo-1)/pagingWidth)*pagingWidth+1,
                endPage: (pageNo<Math.floor(Math.ceil(totalCount/numOfRows)/pagingWidth)*pagingWidth+1)?Math.ceil(pageNo/5)*pagingWidth:Math.ceil(totalCount/numOfRows),
                lastPage: Math.ceil(totalCount/numOfRows),
                total: totalCount,
                prev: Math.floor((pageNo+4)/5)>1,
                next: pageNo<Math.ceil(totalCount/numOfRows)-(Math.ceil(totalCount/numOfRows)%pagingWidth===0?5:Math.ceil(totalCount/numOfRows)%pagingWidth)+1
            })
        }
    }, [datas])

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
                        <button className="r15mc" onClick={()=>{paging(i)}}>{i}</button>
                    </li>
                );
            }
        }
        if(startPage>1) {
            result.unshift(
                <li key="ellipsis-start">
                    <button className="r15mc non-clickable">...</button>
                </li>
            );
            result.unshift(
                <li key="start">
                    <button className="r15mc" onClick={()=>{paging(1)}}>1</button>
                </li>
            );
        }
        if(endPage<lastPage) {
            result.push(
                <li key="ellipsis-last">
                    <button className="r15mc non-clickable">...</button>
                </li>
            );
            result.push(
                <li key="last">
                    <button className="r15mc" onClick={()=>{paging(lastPage)}}>{lastPage}</button>
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
                        <button className="clickable-background" onClick={()=>{paging(startPage-1)}}><img src={images['arrow_left6.png']} alt="" /></button>
                    </li>
                ):(
                    <li key="prev">
                        <button className="non-clickable"><img src={images['arrow_left6.png']} alt="" /></button>
                    </li>
                ))}
                { setPagination() }
                {(next ? (
                    <li key="next">
                        <button className="clickable-background" onClick={()=>{paging(endPage+1)}}><img src={images['arrow_right6.png']} alt="" /></button>
                    </li>
                ):(
                    <li key="next">
                        <button className="non-clickable"><img src={images['arrow_right6.png']} alt="" /></button>
                    </li>
                ))} 
            </ul>
        </div>
    )
}
export default Pagination;