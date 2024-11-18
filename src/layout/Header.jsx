import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
    // 현재 경로 변수
    const location = useLocation(); 

    // 헤더 사이즈 조정 관련 변수
    const headerRef = useRef(null);
    
    // 헤더 우측 검색창 관련 변수
    const searchHiddenRef = useRef(null);
    const openBtnRef = useRef(null);
    const closeBtnRef = useRef(null);

    
    //헤더 사이즈 조정
    useEffect(() => {
        const header = headerRef.current;

        if (!header) return;

        const handleScroll = () => {
            if (window.scrollY === 0) {
            header.classList.add('short');
            } else {
            header.classList.remove('short');
            }
        };

        //메인페이지에서만 스크롤 이벤트 적용
        if (location.pathname === '/') {
            window.addEventListener('scroll', handleScroll);
        }

        // 클린업
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [location.pathname]);


    // 헤더 우측 검색창
    useEffect(() => {
        const searchHidden = searchHiddenRef.current;
        const openBtn = openBtnRef.current;
        const closeBtn = closeBtnRef.current;

        const openSearch = () => {
            if (searchHidden) {
                searchHidden.style.display = 'block';
            }
        };

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
            <div ref={headerRef} id="header" className={`flex ${location.pathname == '/' ? 'short' : ''}`}>         
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
            </div>

            {/* 서브헤더 */}
            <SubHeader />
        </>
    )
}

// 서브 헤더 배너
const SubHeader = () => {
    // 현재 경로 변수
    const location = useLocation(); 

    // 헤더배너가 렌더링될 경로 설정
    const subHeaderPaths = [
    '/medicine', 
    '/first-aid/faq', 
    '/first-aid/solution', 
    '/first-aid/principle', 
    '/member/mypage'
    ];

    const [subTitle, setSubTitle] = useState("");
    const [subInfo, setSubInfo] = useState("");

    useEffect(() => {
        if (location.pathname === '/medicine') {
            setSubTitle("의약품 조회");
            setSubInfo("여러 의약품 정보들을 확인하실 수 있습니다.");
        } else if (location.pathname === '/first-aid/faq') {
            setSubTitle("FAQ");
            setSubInfo("자주 찾으시는 질문을 모아두었습니다.");
        } else if (location.pathname === '/first-aid/solution') {
            setSubTitle("상황별 대처방법");
            setSubInfo("동영상으로 상황별 다양한 대처방법을 미리 익혀주세요.");
        } else if (location.pathname === '/first-aid/principle') {
            setSubTitle("응급상황시 행동원칙");
            setSubInfo("응급상황시 행동원칙을 미리 확인해주세요.");
        } else if (location.pathname === '/member/mypage') {
            setSubTitle("마이페이지");
            setSubInfo("회원님의 정보를 확인하실 수 있습니다.");
        } else {
            setSubTitle("");
            setSubInfo("");
        }
    }, [location.pathname]);


    // 경로가 subHeaderPaths에 포함된 경우 렌더링
    if (subHeaderPaths.includes(location.pathname)) {
        return(
            <>
                <div id="subHeader">
                    <div class="inner">
                        <div class="sub-title">{subTitle}</div>
                        <p class="sub-info">{subInfo}</p>
                    </div>
                </div>
            </>
        );
    }
    return null;
}

export default Header;