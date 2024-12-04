import React, { useState } from 'react';
import axios from 'axios';
import { images } from '../../utils/images';

const Join = () => {
    const [inputs, setInputs] = useState({
        memberId:"", 
        password:"",
        nickname:"",
        phoneNumber:"",
        email:"",
    });
    // const {memberId, password, nickname, phoneNumber, email} = inputs;

    const [passwordRe, setPasswordRe] = useState('');
    const [emailId, setEmailId] = useState('');
    const [emailDomain, setEmailDomain] = useState('naver.com');
    const [isCustomEmail, setIsCustomEmail] = useState(false); // 이메일 직접입력
    const [isMailCertification, setIsMailCertification] = useState(false); // 인증번호 받기(메일전송)
    const [certificationNumber, setCertificationNumber] = useState(''); // 이메일 인증번호


    // 아이디 중복확인
    const handleCheckId = async () => {
        try {
            const response = await axios.get(`/api/member/checkId?memberId=${inputs.memberId}`);
            if (response.data === 'O') {
                alert('사용 가능한 아이디입니다.');
            } else {
                alert('이미 사용 중인 아이디입니다.');
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
        } else {
            document.getElementById('pwCheck1').style.opacity = '0';
        }
    }

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
            console.log('인증메일 발송:', response.data);
            setIsMailCertification(true);
        } catch (error) {
            console.error('인증번호 발송 실패:', error);
        }
    };


    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호 확인
        if (inputs.password !== passwordRe) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 전달할 객체
        // const memberData = {
        //     memberId,
        //     password,
        //     nickname,
        //     phoneNumber,
        //     email:`${emailId}@${emailDomain}`,
        // };

        // 전달할 객체
        const setInputs = {
            ...inputs,
            email:`${emailId}@${emailDomain}`,
        };

        try {
            const response = await axios.post('/api/member/join', setInputs);
            console.log('회원가입 성공:', response.data);
        } catch (error) {
            console.error('회원가입 실패:', error);
        }
    };

    return (
        <>
            <div id="join" className="member">
                <div>
                    <div className="title">회원가입</div>
                    <h5>회원 정보를 입력해 주세요</h5>
                    <form onSubmit={handleSubmit} name="joinForm" id="joinForm">
                        <div className="id">
                            <p>아이디</p>
                            <div className="flex">
                                <input
                                    type="text"
                                    name="memberId"
                                    id="memberId"
                                    placeholder="아이디"
                                    value={inputs.memberId}
                                    onChange={(e) =>
                                        setInputs({
                                            ...inputs,
                                            memberId: e.target.value,
                                        })
                                    }
                                />
                                <button type="button" onClick={handleCheckId}>중복확인</button>
                            </div>
                            <span>영문 소문자와 숫자만 사용하여, 6~15자이내로 입력해주세요.</span>
                        </div>
                        
                        <div className="pw">
                            <p>비밀번호</p>
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

                                    if (inputs.password == e.target.value) {
                                        document.getElementById('pwCheck2').style.opacity = '1';
                                    } else {
                                        document.getElementById('pwCheck2').style.opacity = '0';
                                    }
                                }}
                            />
                            <img id="pwCheck2" src={images['check17_g.png']} alt=""/>
                            <span>영문,숫자,특수문자를 모두 조합하여 8~20자이내로 입력해주세요.</span>
                        </div>

                        <div className="nick">
                            <p>닉네임</p>
                            <input
                                type="text"
                                name="nickname"
                                id="nickname"
                                placeholder="닉네임"
                                value={inputs.nickname}
                                onChange={(e) =>
                                    setInputs({
                                        ...inputs,
                                        nickname: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="email">
                            <p>이메일</p>
                            <div className="email-input">
                                <input
                                    type="text"
                                    name="emailId"
                                    id="emailId"
                                    placeholder="이메일"
                                    value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)}
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
                                <div className={`flex check ${isMailCertification ? 'check-on' : 'check-off'}`}>
                                    <input
                                        type="text"
                                        name="certificationNumber"
                                        id="certificationNumber"
                                        placeholder="인증번호 입력"
                                        value={certificationNumber}
                                        onChange={(e) => setCertificationNumber(e.target.value)}
                                    />
                                    <button type="button" className='two'>확인</button>
                                </div>
                            </div>
                        </div>

                        <div className="phone">
                            <p>휴대전화</p>
                            <div>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    placeholder="전화번호( - 없이 입력)"
                                    value={inputs.phoneNumber}
                                    onChange={(e) =>
                                        setInputs({
                                            ...inputs,
                                            phoneNumber: e.target.value,
                                        })
                                    }
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
