import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { images } from '../../utils/images';
import axios from 'axios';
import MailCertification from "../../components/MailCertification";

const Join = () => {
    const navigate = useNavigate();
    
    const [inputs, setInputs] = useState({
        memberId:"", 
        password:"",
        nickname:"",
        phoneNumber:"",
        email:"",
    });

    // MailCertification에서 이메일 받아오기
    const [emailValues, setEmailValues] = useState({
        emailId: '',
        emailDomain: 'naver.com',
    });
    const handleRequestEmail = (values) => {
        setEmailValues(values);
        // emailValues.emailId
        // emailValues.emailDomain
    };
    // 이메일 유효성검사
    const emailIdRef = useRef(null);
    const certificationNumberRef = useRef(null);


    const [passwordRe, setPasswordRe] = useState('');

    const [isMailCheck, setIsMailCheck] = useState(false); // 메일 인증번호 확인

    const idCheckRef = useRef(false); // 아이디 중복확인
    const pwCheckRef = useRef(false); // 비밀번호 확인


    // 아이디 중복확인
    const handleCheckId = async () => {
        const idRegex = /^[a-z0-9]{6,15}$/; // 영문소문자+숫자, 6~15자 이내
        console.log(inputs.memberId);
        if (!idRegex.test(inputs.memberId)) {
            alert('아이디는 영문 소문자와 숫자만 사용하여 6~15자 이내로 입력해주세요.');
            return;
        }
        document.getElementById('memberId').style.borderColor = '#ddd';
        try {
            const response = await axios.get(`/api/member/checkId?memberId=${inputs.memberId}`);
            if (response.data === 'O') {
                alert('사용 가능한 아이디입니다.');
                idCheckRef.current = true;
                document.getElementById('password').focus();
            } else {
                alert('이미 사용 중인 아이디입니다.');
                idCheckRef.current = false;
                document.getElementById('memberId').focus();
            }
        } catch (error) {
            console.error('아이디 중복 확인 실패:', error);
        }
    };


    // 비밀번호 조건 확인
    const handlePwCheck = (e) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/; //영문+숫자+특수문자, 8~20자이내
        if (regex.test(e.target.value)) {
            document.getElementById('pwCheck1').style.opacity = '1';
            pwCheckRef.current = true;
        } else {
            document.getElementById('pwCheck1').style.opacity = '0';
            pwCheckRef.current = false;
        }
    }

    // 비밀번호 동일여부 확인
    const handlePwReCheck = () => {
        if (inputs.password == passwordRe && passwordRe != "" && pwCheckRef.current) {
            document.getElementById('pwCheck2').style.opacity = '1';
        } else {
            document.getElementById('pwCheck2').style.opacity = '0';
        }
    }
    useEffect(() => {
        handlePwReCheck();
    }, [passwordRe, inputs.password]);


    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 아이디 중복확인
        if (!idCheckRef.current) {
            alert('아이디 중복확인을 해주세요.');
            document.getElementById('memberId').style.borderColor = 'red';
            document.getElementById('memberId').focus();
            return;
        }

        // 비밀번호 확인
        if (inputs.password == "" || inputs.password == null) {
            alert('비밀번호를 입력해주세요.');
            document.getElementById('password').style.borderColor = 'red';
            document.getElementById('password').focus();
            return;
        }
        if (!pwCheckRef.current) {
            alert('비밀번호 형식이 올바르지 않습니다.');
            document.getElementById('password').style.borderColor = 'red';
            document.getElementById('password').focus();
            return;
        }
        if (inputs.password !== passwordRe) {
            alert('비밀번호가 일치하지 않습니다.');
            document.getElementById('passwordRe').style.borderColor = 'red';
            document.getElementById('passwordRe').focus();
            return;
        }

        // 메일 확인
        if (emailValues.emailId == "" || emailValues.emailId == null) {
            alert('이메일을 입력해주세요.');
            emailIdRef.current.style.borderColor = 'red';
            emailIdRef.current.focus();
            return;
        }
        if (!isMailCheck) {
            alert('이메일 인증을 완료해주세요.');
            certificationNumberRef.current.style.borderColor = 'red';
            certificationNumberRef.current.focus();
            return;
        }

        // 닉네임 확인
        if (inputs.nickname == "") {
            alert('닉네임을 입력해주세요.');
            document.getElementById('nickname').style.borderColor = 'red';
            document.getElementById('nickname').focus();
            return;
        }
        if (inputs.nickname.length <2) {
            alert('닉네임은 2자 이상 입력해주세요');
            document.getElementById('nickname').style.borderColor = 'red';
            document.getElementById('nickname').focus();
            return;
        }

        // 휴대전화 번호 확인
        const phoneRegex = /^010\d{8}$/; // 010+숫자8자
        if (!phoneRegex.test(inputs.phoneNumber)) {
            alert('휴대전화 번호 형식이 올바르지 않습니다.');
            document.getElementById('phoneNumber').style.borderColor = 'red';
            document.getElementById('phoneNumber').focus();
            return;
        }

        // 전달할 객체(memberDTO)
        const setInputs = {
            ...inputs,
            email:`${emailValues.emailId}@${emailValues.emailDomain}`,
        };

        try {
            const response = await axios.post('/api/member/join', setInputs);

            console.log(response.data);
            if (response.data === 'O') {
                alert('회원가입이 완료되었습니다.');
                navigate('/member/login'); 
            } else {
                alert('회원가입에 실패하였습니다.');
                navigate('/'); 
            }

        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입에 실패하였습니다.');
            navigate('/'); 
        }
    };

    return (
        <>
            <div id="join" className="member">
                <div>
                    <div className="title">회원가입</div>
                    <h5>회원 정보를 입력해 주세요 (* 필수항목)</h5>
                    <form onSubmit={handleSubmit} name="joinForm" id="joinForm">
                        <div className="id">
                            <p>아이디 *</p>
                            <div className="flex">
                                <input
                                    type="text"
                                    name="memberId"
                                    id="memberId"
                                    placeholder="아이디"
                                    value={inputs.memberId}
                                    onInput={(e) => {
                                        setInputs({
                                            ...inputs,
                                            memberId: e.target.value,
                                        });
                                        borderColor(e);
                                    }}
                                />
                                <button type="button" onClick={handleCheckId}>중복확인</button>
                            </div>
                            <span>영문 소문자와 숫자만 사용하여, 6~15자이내로 입력해주세요.</span>
                        </div>
                        
                        <div className="pw">
                            <p>비밀번호 *</p>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="비밀번호"
                                value={inputs.password}
                                onInput={(e) => {
                                    setInputs({
                                        ...inputs,
                                        password: e.target.value,
                                    });
                                    handlePwCheck(e);
                                    handlePwReCheck();
                                    borderColor(e);
                                }}
                            />
                            <img id="pwCheck1" src={images['check17_g.png']} alt=""/>
                            <input
                                type="password"
                                name="passwordRe"
                                id="passwordRe"
                                placeholder="비밀번호 확인"
                                value={passwordRe}
                                onInput={(e) => {
                                    setPasswordRe(e.target.value);
                                    handlePwReCheck();
                                    borderColor(e);
                                }}
                            />
                            <img id="pwCheck2" src={images['check17_g.png']} alt=""/>
                            <span>영문,숫자,특수문자를 모두 조합하여 8~20자이내로 입력해주세요.</span>
                        </div>

                        <div className="email">
                            <p>이메일 *</p>
                            <MailCertification 
                                handleRequestEmail={handleRequestEmail}
                                emailIdRef={emailIdRef}
                                certificationNumberRef={certificationNumberRef}
                                isMailCheck={isMailCheck}
                                setIsMailCheck={setIsMailCheck}
                            />
                        </div>

                        <div className="nick">
                            <p>닉네임 *</p>
                            <input
                                type="text"
                                name="nickname"
                                id="nickname"
                                placeholder="닉네임"
                                value={inputs.nickname}
                                onInput={(e) => {
                                    setInputs({
                                        ...inputs,
                                        nickname: e.target.value,
                                    });
                                    borderColor(e);
                                }}
                            />
                        </div>

                        <div className="phone">
                            <p>휴대전화 *</p>
                            <div>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    placeholder="전화번호( - 없이 입력)"
                                    value={inputs.phoneNumber}
                                    onInput={(e) => {
                                        setInputs({
                                            ...inputs,
                                            phoneNumber: e.target.value,
                                        });
                                        borderColor(e);
                                    }}
                                />
                            </div>
                        </div>

                        <button className="last-btn" type="submit">회원가입</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Join;

// 테두리 색상 초기화
export const borderColor = (e) => {
    e.target.style.borderColor = '#ddd';
}
