const Header = () => {
    // 헤더 검색창
    const searchHidden = document.getElementById('search-hidden');
    const openBtn = document.getElementById('open-btn');
    const closeBtn = document.getElementById('close-btn');

    function openSearch() {
        searchHidden.style.display = 'block';
    }
    function closeSearch() {
        searchHidden.style.display = 'none';
    }

    openBtn.addEventListener('click', openSearch);
    closeBtn.addEventListener('click', closeSearch);

    
    return (
        <div id="header" class="short flex">
            <h1><a href="#"><img src={require('../assets/images/logo.png')} alt=""/></a></h1>
            <ul class="flex">
                <li>
                    <a href="#">응급실</a>
                </li>
                <li>
                    <a href="#">의료·진료</a>
                    <ul class="submenu">
                        <li><a href="#">병원 조회</a></li>
                        <li><a href="#">건강검진기관 조회</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">약국·의약</a>
                    <ul class="submenu">
                        <li><a href="#">약국 조회</a></li>
                        <li><a href="#">의약품 정보 조회</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">응급처치</a>
                    <ul class="submenu">
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">상황별 대처방법</a></li>
                        <li><a href="#">응급상황시 행동원칙</a></li>
                    </ul>
                </li>
            </ul>
            <div ul class="flex">
                <ul class="flex">
                    <li><a href="#">LOGIN</a></li>
                    <li><a href="#">JOIN</a></li>
                </ul>
                <div class="search">
                    <button id="open-btn">
                        <img src={require('../assets/images/search20_w.png')} alt="Open search"/>
                    </button>
                    {/* 숨겨진 검색창 */}
                    <div id="search-hidden">
                        <form name="searchForm" id="searchForm" action="/plan/list" class="flex">
                            <input type="search" id="keyword" name="keyword" placeholder="검색어를 입력하세요"/>
                            <a id="search_btn" class="btn" onclick="searchBtnHandler()">
                                <img src={require('../assets/images/search16.png')} alt=""/>
                            </a>
                            <button type="button" id="close-btn">
                                <img src={require('../assets/images/close20_w.png')} alt="Close search"/>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header;