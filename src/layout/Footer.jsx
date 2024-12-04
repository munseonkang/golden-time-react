import { useLocation, Link } from "react-router-dom";


const Footer = () => {
    // 현재 경로 변수
    const location = useLocation(); 

    // Footer가 렌더링될 경로 설정
    const footerPaths = [
      '/',
      '/check-up', 
      '/medicine', 
      '/first-aid/faq', 
      '/first-aid/solution', 
      '/first-aid/principle',  
      '/member/mypage'
    ];

    // 경로가 footerPaths에 포함된 경우 렌더링
    if (footerPaths.includes(location.pathname)) {
        return (
            <div id="footer">
                <div className="inner">
                    <h1>
                        <Link to="/"><img src={require('../assets/images/logo_w.png')} alt=""/></Link>
                    </h1>
                    <ul className="flex">
                        <li><Link to="#">개인정보취급방침</Link></li>
                        <li><Link to="#">이메일무단수집거부</Link></li>
                        <li><Link to="#">법적고지</Link></li>
                    </ul>
                    Copyright &copy; GoldenTime. All Rights Reserved.
                </div>
            </div>
        )
    }

    return <></>;
}
export default Footer;