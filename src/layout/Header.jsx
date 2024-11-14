import { useEffect, useRef, useState } from "react";

const Header = () => {
    //검색창 열기
    const searchHiddenRef = useRef(null);
    const openBtnRef = useRef(null);
    const closeBtnRef = useRef(null);

    useEffect(() => {
        const searchHidden = searchHiddenRef.current;
        const openBtn = openBtnRef.current;
        const closeBtn = closeBtnRef.current;

        // 검색창 열기
        const openSearch = () => {
            if (searchHidden) {
                searchHidden.style.display = 'block';
            }
        };

        // 검색창 닫기
        const closeSearch = () => {
            if (searchHidden) {
                searchHidden.style.display = 'none';
            }
        };

        openBtn.addEventListener('click', openSearch);
        closeBtn.addEventListener('click', closeSearch);
    });

    
    return (
        <>
            <h1><a href="/"><img src={require('../assets/images/logo.png')} alt=""/></a></h1>
            <ul class="flex">
                <li>
                    <a href="/emergency">응급실</a>
                </li>
                <li>
                    <a href="/hospital">의료·진료</a>
                    <ul class="submenu">
                        <li><a href="/hospital">병원 조회</a></li>
                        <li><a href="/check-up">건강검진기관 조회</a></li>
                    </ul>
                </li>
                <li>
                    <a href="/pharmacy">약국·의약</a>
                    <ul class="submenu">
                        <li><a href="/pharmacy">약국 조회</a></li>
                        <li><a href="/medicine">의약품 정보 조회</a></li>
                    </ul>
                </li>
                <li>
                    <a href="/first-aid/faq">응급처치</a>
                    <ul class="submenu">
                        <li><a href="/first-aid/faq">FAQ</a></li>
                        <li><a href="/first-aid/solution">상황별 대처방법</a></li>
                        <li><a href="/first-aid/principle">응급상황시 행동원칙</a></li>
                    </ul>
                </li>
            </ul>
            <div ul class="flex">
                <ul class="flex">
                    <li><a href="/member/login">LOGIN</a></li>
                    <li><a href="/member/join">JOIN</a></li>
                </ul>
                <div class="search">
                    <button ref={openBtnRef} id="open-btn">
                        <img src={require('../assets/images/search20_w.png')} alt="Open search"/>
                    </button>
                    {/* 숨겨진 검색창 */}
                    <div ref={searchHiddenRef} id="search-hidden">
                        <form name="searchForm" id="searchForm" action="/plan/list" class="flex">
                            <input type="search" id="keyword" name="keyword" placeholder="검색어를 입력하세요"/>
                            <a id="search_btn" class="btn" onclick="searchBtnHandler()">
                                <img src={require('../assets/images/search16.png')} alt=""/>
                            </a>
                            <button ref={closeBtnRef} type="button" id="close-btn">
                                <img src={require('../assets/images/close20_w.png')} alt="Close search"/>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;