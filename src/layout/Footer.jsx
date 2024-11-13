const Footer = () => {
    return (
        <div id="footer">
            <div class="inner">
                <h1>
                    <a href="#"><img src={require('../assets/images/logo_w.png')} alt=""/></a>
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
export default Footer;