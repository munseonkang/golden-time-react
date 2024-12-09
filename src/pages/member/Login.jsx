import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { mainContext } from "../../App";

const Login = ()=> {
    const {setLoginMember} = useContext(mainContext);
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        memberId:"", 
        password:"",
    });

    // 쿠키에서 아이디 가져오기
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

    useEffect(() => {
        const joinId = getCookie("joinId");
        if (joinId) {
            setInputs({
                ...inputs,
                memberId: joinId,
            });
            document.getElementById('password').focus();
        }
    }, []);

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const {memberId, password} = inputs;

        // 아이디 확인
        if (memberId == "") {
            alert('아이디를 입력해주세요');
            document.getElementById('memberId').style.borderColor = 'red';
            document.getElementById('memberId').focus();
            return;
        }

        // 비밀번호 확인
        if (password == "") {
            alert('비밀번호를 입력해주세요');
            document.getElementById('password').style.borderColor = 'red';
            document.getElementById('password').focus();
            return;
        }

        
        try {
            const response = await axios.post('/api/member/login', inputs);
            if (response.data === 'O') {
                console.log('로그인이 완료되었습니다.');
                setLoginMember(inputs.memberId);
                navigate('/'); 
            } else {
                alert('아이디 또는 비밀번호를 확인해주세요.');
                navigate('/member/login'); 
            }
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('로그인에 실패하였습니다.');
            navigate('/member/login'); 
        }
    };

    return (
        <>
            <div id="login" className="member">
                <div>
                    <div className="title">로그인</div>
                    <form onSubmit={handleSubmit} name="loginForm" id="loginForm">
                        <p>아이디</p>
                        <input 
                            type="text" 
                            name="memberId" 
                            id="memberId" 
                            placeholder="아이디를 입력해주세요"
                            value={inputs.memberId}
                            onInput={(e) => 
                                setInputs({
                                    ...inputs,
                                    memberId: e.target.value,
                                })
                            }
                        />
                        <p>비밀번호</p>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            placeholder="비밀번호를 입력해주세요"
                            value={inputs.password}
                            onInput={(e) => 
                                setInputs({
                                    ...inputs,
                                    password: e.target.value,
                                })
                            }
                        />
                        <div className="f-right">
                            <Link to="/member/help/IdInquiry">아이디 찾기</Link>
                            <Link to="/member/help/PwInquiry">비밀번호 찾기</Link>
                        </div>
                        <button 
                            className="navy-box last-btn"
                            type="submit"
                        >로그인</button>
                    </form>
                    <p><Link to="/member/join">골든타임 회원가입</Link></p>
                </div>
            </div>
        </>
    );
}
export default Login;