import Header from "../../layout/Header";

const Join = ()=>{
    return (
        <>
            <div id="join" className="member">
                <div>
                    <div className="title">회원가입</div>
                    <h5>회원 정보를 입력해 주세요</h5>
                    <form action="" method="post" name="joinForm" id="joinForm">
                        <div className="id">
                            <p>아이디</p>
                            <div className="flex">
                                <input type="text" name="userId" id="userId" placeholder="아이디"/>
                                <button>중복확인</button>
                            </div>
                            <span>영문 소문자와 숫자만 사용하여, 6~15자이내로 입력해주세요.</span>
                        </div>
                        
                        <div className="pw">
                            <p>비밀번호</p>
                            <input type="password" name="userPw" id="userPw" placeholder="비밀번호"/>
                            <input type="password" name="userPwRe" id="userPwRe" placeholder="비밀번호 확인"/>
                            <span>영문,숫자,특수문자를 모두 조합하여 8~20자이내로 입력해주세요.</span>
                        </div>

                        <div className="nick">
                        <p>닉네임</p>
                        <input type="password" name="userNick" id="userNick" placeholder="닉네임"/>
                        </div>

                        <div className="phone">
                            <p>휴대전화</p>
                            <div className="flex">
                                <input type="text" name="userPhone" id="userPhone" placeholder="전화번호( - 없이 입력)"/>
                                <button>인증번호 받기</button>
                            </div>
                            <div className="flex">
                                <input type="text" name="userPhoneCheck" id="userPhoneCheck" placeholder="인증번호 입력"/>
                                <button>확인</button>
                            </div>
                        </div>

                        <button className="last-btn">회원가입</button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Join;