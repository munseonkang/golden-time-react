import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from 'axios';
import { mainContext } from "../App";

const Header = () => {
    const {loginMember, setLoginMember} = useContext(mainContext);
    const [mobileMenuBtnOn, setMobileMenuBtnOn] = useState(false);
    const [mobileMenuOn, setMobileMenuOn] = useState(false);

    // 현재 경로 변수
    const location = useLocation(); 

    // 헤더 사이즈 조정 관련 변수
    const headerRef = useRef(null);
    
    // 헤더 우측 검색창 관련 변수
    const searchHiddenRef = useRef(null);   
    const openBtnRef = useRef(null);
    const closeBtnRef = useRef(null);


    // 로그아웃 처리
    const handleLogout = async () => {
        try {
            const response = await axios.get('/api/member/logout');
            console.log("로그아웃 성공:", response.data);
            setLoginMember(null);
        } catch (error) {
            console.error("로그아웃 오류:", error);
        }
    };


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

    // 모바일 우측메뉴
    const handleMenuToggle = () => {
        setMobileMenuOn(!mobileMenuOn); // 메뉴 상태 토글
        setMobileMenuBtnOn(!mobileMenuBtnOn); // 버튼 상태 토글
    };

    
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
                <h1><Link to="/"><img src={require('../assets/images/logo.png')} alt=""/></Link></h1>
                <ul className="flex">
                    <li>
                        <Link to="/emergency">응급실</Link>
                    </li>
                    <li>
                        <Link to="/hospital">의료·진료</Link>
                        <ul className="submenu">
                            <li><Link to="/hospital">병원 조회</Link></li>
                            <li><Link to="/check-up">건강검진기관 조회</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/pharmacy">약국·의약</Link>
                        <ul className="submenu">
                            <li><Link to="/pharmacy">약국 조회</Link></li>
                            <li><Link to="/medicine">의약품 정보 조회</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/first-aid/faq">응급처치</Link>
                        <ul className="submenu">
                            <li><Link to="/first-aid/faq">FAQ</Link></li>
                            <li><Link to="/first-aid/solution">상황별 대처방법</Link></li>
                            <li><Link to="/first-aid/principle">응급상황시 행동원칙</Link></li>
                        </ul>
                    </li>
                </ul>
                <div className="flex">
                    <ul className="flex">
                        {loginMember ? (
                            <>
                                <li><Link to="/member/mypage">MYPAGE</Link></li>
                                <li><Link to="/" onClick={handleLogout}>LOGOUT</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/member/login">LOGIN</Link></li>
                                <li><Link to="/member/join">JOIN</Link></li>
                            </>
                        )}
                    </ul>
                    {/* PC용 검색버튼 */}
                    <div className="search">
                        <div id="open-btn">
                            <button ref={openBtnRef}>
                                <img src={require('../assets/images/search20_w.png')} alt="Open search"/>
                            </button>
                        </div>
                        {/* 숨겨진 검색창 */}
                        <div ref={searchHiddenRef} id="search-hidden">
                            <form name="searchForm" id="searchForm" action="/plan/list" className="flex">
                                <input type="search" id="keyword" name="keyword" placeholder="검색어를 입력하세요"/>
                                <a id="search_btn" className="btn">
                                    <img src={require('../assets/images/search16.png')} alt=""/>
                                </a>
                                <button ref={closeBtnRef} type="button" id="close-btn">
                                    <img src={require('../assets/images/close20_w.png')} alt="Close search"/>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* 반응형용 메뉴버튼 */}
                    <div className="mobile-menu">
                        <div id="mobile-menu-btn">
                            <button 
                                className={`burger ${mobileMenuBtnOn ? "on" : ""}`}
                                onClick={handleMenuToggle}
                            >
                                <span></span>
                            </button>
                        </div>
                        
                        <div className={`right-box ${mobileMenuOn ? "on" : ""}`}>
                            <div className="greenBox">
                                <ul className="flex login">
                                    {loginMember ? (
                                        <>
                                            <li><Link to="/member/mypage" onClick={handleMenuToggle}>MYPAGE</Link></li>
                                            <li><Link to="/" onClick={() => {
                                                handleLogout();
                                                handleMenuToggle();
                                            }} >LOGOUT</Link></li>
                                        </>
                                    ) : (
                                        <>
                                            <li><Link to="/member/login" onClick={handleMenuToggle}>LOGIN</Link></li>
                                            <li><Link to="/member/join" onClick={handleMenuToggle}>JOIN</Link></li>
                                        </>
                                    )}
                                </ul>
                                <ul className="menu">
                                    <li>
                                        <Link to="/emergency" onClick={handleMenuToggle}>응급실</Link>
                                    </li>
                                    <li>
                                        <Link to="/hospital" onClick={handleMenuToggle}>의료·진료</Link>
                                        <ul className="submenu2">
                                            <li><Link to="/hospital" onClick={handleMenuToggle}>병원 조회</Link></li>
                                            <li><Link to="/check-up" onClick={handleMenuToggle}>건강검진기관 조회</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to="/pharmacy" onClick={handleMenuToggle}>약국·의약</Link>
                                        <ul className="submenu2">
                                            <li><Link to="/pharmacy" onClick={handleMenuToggle}>약국 조회</Link></li>
                                            <li><Link to="/medicine" onClick={handleMenuToggle}>의약품 정보 조회</Link></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to="/first-aid/faq" onClick={handleMenuToggle}>응급처치</Link>
                                        <ul className="submenu2">
                                            <li><Link to="/first-aid/faq" onClick={handleMenuToggle}>FAQ</Link></li>
                                            <li><Link to="/first-aid/solution" onClick={handleMenuToggle}>상황별 대처방법</Link></li>
                                            <li><Link to="/first-aid/principle" onClick={handleMenuToggle}>응급상황시 행동원칙</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
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
    '/check-up', 
    '/medicine', 
    '/first-aid/faq', 
    '/first-aid/solution', 
    '/first-aid/principle', 
    '/member/mypage'
    ];

    const [subTitle, setSubTitle] = useState("");
    const [subInfo, setSubInfo] = useState("");

    useEffect(() => {
        if (location.pathname === '/check-up') {
            setSubTitle("건강검진기관 조회");
            setSubInfo("건강검진기관 정보를 확인하실 수 있습니다.");
        } else if (location.pathname === '/medicine') {
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
                    <div className="inner">
                        <div className="sub-title">{subTitle}</div>
                        <p className="sub-info">{subInfo}</p>
                    </div>
                </div>
            </>
        );
    }
    return null;
}

export default Header;