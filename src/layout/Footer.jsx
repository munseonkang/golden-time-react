import { useLocation } from 'react-router-dom';


const Footer = () => {
    // 현재 경로 변수
    const location = useLocation(); 

    // Footer가 렌더링될 경로 설정
    const footerPaths = [
      '/',
      '/medicine', 
      '/first-aid/faq', 
      '/first-aid/solution', 
      '/first-aid/principle', 
      '/member/join', 
      '/member/login', 
      '/member/mypage'
    ];

    // 경로가 footerPaths에 포함된 경우 렌더링
    if (footerPaths.includes(location.pathname)) {
        return (
            <div id="footer">
                <div class="inner">
                    <h1>
                        <a href="/"><img src={require('../assets/images/logo_w.png')} alt=""/></a>
                    </h1>
                    <ul class="flex">
                        <li><a href="#">개인정보취급방침</a></li>
                        <li><a href="#">이메일무단수집거부</a></li>
                        <li><a href="#">법적고지</a></li>
                    </ul>
                    Copyright &copy; GoldenTime. All Rights Reserved.
                </div>
            </div>
        )
    }

    return <></>;
}
export default Footer;