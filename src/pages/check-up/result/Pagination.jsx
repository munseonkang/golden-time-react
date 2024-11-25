import { useEffect, useState } from 'react';
import { images } from '../../../utils/images';

const Pagination = ({results}) => {

    const {pageNo, totalCount, numOfRows} = results;

    const pagingWidth = 5;
    
    const [pageMaker, setPageMaker] = useState({
                                    currentPage: 1,
                                    startPage: 1,
                                    endPage: (pageNo<pagingWidth)?pageNo:pagingWidth,
                                    lastPage: totalCount/numOfRows,
                                    total: totalCount,
                                    prev: false,
                                    next: (pagingWidth<(totalCount/numOfRows)?true:false)
                                    });
    const {currentPage, startPage, endPage, lastPage, total, prev, next} = pageMaker;

    useEffect(()=>{
        setPageMaker({
            currentPage: 1,
            startPage: 1,
            endPage: (pageNo<pagingWidth)?pageNo:pagingWidth,
            lastPage: totalCount/numOfRows,
            total: totalCount,
            prev: false,
            next: (pagingWidth<(totalCount/numOfRows)?true:false)
            })
    }, [results])

    useEffect(()=>{
        setPageMaker({
            ...pageMaker,
            startPage: (currentPage+4)/5,
            endPage: (endPage<lastPage)?((current-1)/5+1)*5:lastPage,
            prev: currentPage>pagingWidth,
            next: lastPage/pagingWidth*pagingWidth+1>currentPage
            })
    },[pageMaker])

    return (
        <div className="pagination-box">
            <ul>
                {(prev && (
                    <li>
                        <button className=""><img src={images['arrow_left6.png']} alt="" /></button>
                    </li>
                ))}
                {
                    for(let i=startPage; i<endPage+1; i++) {
                        if()
                        (

                        )
                    }
                }
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
                {(next && (
                    <li>
                        <button className="clickable"><img src={images['arrow_right6.png']} alt="" /></button>
                    </li>
                ))} 
            </ul>
        </div>
    )
}
export default Pagination;