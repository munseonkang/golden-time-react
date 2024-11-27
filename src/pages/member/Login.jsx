import Header from "../../layout/Header";

const Login = ()=>{
    return (
        <>
            <div id="login" className="member">
                <div>
                    <div className="title">로그인</div>
                    <form action="" method="post" name="loginForm" id="loginForm">
                        <p>아이디</p>
                        <input type="text" name="userId" id="userId" placeholder="아이디를 입력해주세요"/>
                        <p>비밀번호</p>
                        <input type="password" name="userPw" id="userPw" placeholder="비밀번호를 입력해주세요"/>
                        <div className="f-right">
                            <a href="#">아이디 찾기</a>
                            <a href="#">비밀번호 찾기</a>
                        </div>
                        <button className="navy-box last-btn">로그인</button>
                    </form>
                    <p><a href="/member/join">골든타임 회원가입</a></p>
                </div>
            </div>
        </>
    );
}
export default Login;