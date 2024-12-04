import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { images } from '../../utils/images';
import axios from 'axios';

const Join = () => {
    const navigate = useNavigate();
    
    const [inputs, setInputs] = useState({
        memberId:"", 
        password:"",
        nickname:"",
        phoneNumber:"",
        email:"",
    });

    const [passwordRe, setPasswordRe] = useState('');
    const [emailId, setEmailId] = useState('');
    const [emailDomain, setEmailDomain] = useState('naver.com');
    const [isCustomEmail, setIsCustomEmail] = useState(false); // 이메일 직접입력
    const [isMailCertification, setIsMailCertification] = useState(false); // 인증번호 받기(메일전송)
    const [isMailCheck, setIsMailCheck] = useState(false); // 메일 인증번호 확인
    const [memberMailNumber, setMemberMailNumber] = useState(''); // 유저가 입력한 인증번호
    
    const idCheckRef = useRef(false); // 아이디 중복확인
    const pwCheckRef = useRef(false); // 비밀번호 확인


    // 테두리 색상 초기화
    const borderColor = (e) => {
        e.target.style.borderColor = '#ddd';
    }

    // 아이디 중복확인
    const handleCheckId = async () => {
        const idRegex = /^[a-z0-9]{6,15}$/; // 영문소문자+숫자, 6~15자 이내
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


    // 이메일 도메인 선택
    const handleEmailDomainChange = (e) => {
        if (e.target.value === 'custom') {
            setIsCustomEmail(true);
            setEmailDomain(e.target.value);
            // setCustomEmail('');
        } else {
            setIsCustomEmail(false);
            setEmailDomain(e.target.value);
        }
    };


    // 인증메일 발송
    const handleSendMail = async () => {
        const email = `${emailId}@${emailDomain}`;
        try {
            const response = await axios.post('/api/member/sendMailCertificationNumber', null, {
                params: { email: email }
            });
            console.log(response.data);
            setIsMailCertification(true);
        } catch (error) {
            console.error('인증번호 발송 실패:', error);
        }
    };

    
    // 인증메일 확인
    const CertificationNumberCheck = async () => {
        const certiRegex = /^\d{6}$/; // 숫자6자
        if (!certiRegex.test(memberMailNumber)) {
            alert('인증번호 형식이 올바르지 않습니다.');
            return;
        }
        try {
            const response = await axios.post('/api/member/certificationNumberCheck', null, {
                params: { memberMailNumber: memberMailNumber }
            });
            console.log(response.data);

            if (response.data === 'O') {
                setIsMailCheck(true);
                document.getElementById('mailCheck').style.opacity = '1';
                document.getElementById('certificationNumber').style.backgroundColor = '#eee';
                document.getElementById('certificationNumber').style.color = '#aaa';
            } else {
                alert('인증번호가 올바르지 않습니다.');
                setIsMailCheck(false);
                setMemberMailNumber('');
                document.getElementById('certificationNumber').style.borderColor = 'red';
                document.getElementById('certificationNumber').focus();
                return;
            }
        } catch (error) {
            console.error('인증번호 확인 실패:', error);
        }
    }



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

        // 메일 확인
        if (emailId == "") {
            alert('이메일을 입력해주세요.');
            document.getElementById('emailId').style.borderColor = 'red';
            document.getElementById('emailId').focus();
            return;
        }
        if (!isMailCheck) {
            alert('이메일 인증을 완료해주세요.');
            document.getElementById('certificationNumber').style.borderColor = 'red';
            document.getElementById('certificationNumber').focus();
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
            email:`${emailId}@${emailDomain}`,
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
                                    onChange={(e) => {
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
                                onChange={(e) => {
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
                                onChange={(e) => {
                                    setPasswordRe(e.target.value);
                                    handlePwReCheck();
                                    borderColor(e);
                                }}
                            />
                            <img id="pwCheck2" src={images['check17_g.png']} alt=""/>
                            <span>영문,숫자,특수문자를 모두 조합하여 8~20자이내로 입력해주세요.</span>
                        </div>

                        <div className="nick">
                            <p>닉네임 *</p>
                            <input
                                type="text"
                                name="nickname"
                                id="nickname"
                                placeholder="닉네임"
                                value={inputs.nickname}
                                onChange={(e) => {
                                    setInputs({
                                        ...inputs,
                                        nickname: e.target.value,
                                    });
                                    borderColor(e);
                                }}
                            />
                        </div>

                        <div className="email">
                            <p>이메일 *</p>
                            <div className="email-input">
                                <input
                                    type="text"
                                    name="emailId"
                                    id="emailId"
                                    placeholder="이메일"
                                    value={emailId}
                                    onChange={(e) => {
                                        setEmailId(e.target.value);
                                        borderColor(e);
                                    }}
                                />
                                &nbsp;@&nbsp;
                                <select
                                    name="emailDomain"
                                    id="emailDomain"
                                    value={emailDomain || ''}
                                    onChange={handleEmailDomainChange}
                                >
                                    <option value="naver.com">naver.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="custom">직접 입력</option>
                                </select>

                                {/* 이메일 도메인 직접 입력 */}
                                {isCustomEmail && (
                                    <input
                                        className="custom-email"
                                        name="customEmail"
                                        id="customEmail"
                                        type="text"
                                        placeholder="직접 입력"
                                        value={emailDomain === 'custom' ? '' : emailDomain}
                                        onChange={(e) => setEmailDomain(e.target.value)}
                                    />
                                )}
                            </div>
                            <div className="certification">
                                <button type="button" className="one" onClick={handleSendMail}>인증번호 받기</button>
                                <div className={`check ${isMailCertification ? 'check-on' : 'check-off'}`}>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            name="certificationNumber"
                                            id="certificationNumber"
                                            placeholder="인증번호 입력"
                                            value={memberMailNumber}
                                            onChange={(e) => {
                                                setMemberMailNumber(e.target.value);
                                                borderColor(e);
                                            }}
                                            readOnly={isMailCheck}
                                        />
                                        <button type="button" className='two' onClick={CertificationNumberCheck}>확인</button>
                                    </div>
                                    <img id="mailCheck" src={images['check17_g.png']} alt=""/>
                                </div>
                            </div>
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
                                    onChange={(e) => {
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
