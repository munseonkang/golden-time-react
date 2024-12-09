import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { images } from '../../../utils/images';
import axios from 'axios';
import MailCertification from "../../../components/MailCertification";
import { borderColor } from "../Join";

const PwInquiry = () => {
    const navigate = useNavigate();
    const [isMailCheck, setIsMailCheck] = useState(false); // 메일 인증번호 확인
    const [passwordRe, setPasswordRe] = useState('');
    const [inputs, setInputs] = useState({
        memberId:"",
        password:"",
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
    // 비밀번호 유효성검사
    const pwCheckRef = useRef(false);


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

        // 아이디 확인
        if (inputs.memberId == "") {
            alert('아이디를 입력해주세요');
            document.getElementById('memberId').style.borderColor = 'red';
            document.getElementById('memberId').focus();
            return;
        }
        // 휴대전화 번호 확인
        if (inputs.phoneNumber == "") {
            alert('전화번호를 입력해주세요');
            document.getElementById('phoneNumber').style.borderColor = 'red';
            document.getElementById('phoneNumber').focus();
            return;
        }
        const phoneRegex = /^010\d{8}$/; // 010+숫자8자
        if (!phoneRegex.test(inputs.phoneNumber)) {
            alert('휴대전화 번호 형식이 올바르지 않습니다.');
            document.getElementById('phoneNumber').style.borderColor = 'red';
            document.getElementById('phoneNumber').focus();
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


        // 전달할 객체(memberDTO)
        const setInputs = {
            ...inputs,
            email:`${emailValues.emailId}@${emailValues.emailDomain}`,
        };

        try {
            const response = await axios.post('/api/member/help/PwInquiry', setInputs);
            // console.log("response.data: ", response.data);

            if (response.data === "O") {
                document.getElementById('findResult').style.display = 'block';
            } else {
                alert(response.data);
            }

        } catch (error) {
            console.error('비밀번호찾기 실패:', error);
            alert('비밀번호찾기를 실패하였습니다.');
        }
    };


    // Submit - 비밀번호 재설정
    const handlePwSubmit = async (e) => {
        e.preventDefault();

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


        // 전달할 객체(memberDTO)
        const setInputs = {
            ...inputs,
            email:`${emailValues.emailId}@${emailValues.emailDomain}`,
        };

        try {
            const response = await axios.post('/api/member/help/PwResetting', setInputs);
            console.log("response.data: ", response.data);

            if (response.data === 'O') {
                alert('새 비밀번호가 등록되었습니다.');
                navigate('/member/login'); 
            } else {
                alert('비밀번호 변경을 실패하였습니다.');
            }

        } catch (error) {
            console.error('비밀번호변경 실패:', error);
            alert('비밀번호 변경을 실패하였습니다.');
        }
    };

    return(
        <>
            <div id="PwInquiry" className="member">
                <div>
                    <div className="title">비밀번호 찾기</div>
                    <h5>회원정보에 등록한 아이디와 이메일로 인증</h5>
                    {/* <p>회원정보에 등록한 이메일과 입력한 이메일이 같아야<br />인증번호를 받을 수 있습니다.</p> */}
                    <form onSubmit={handleSubmit} name="pwInquiryForm" id="pwInquiryForm">
                        <div className="id">
                            <p>아이디</p>
                            <div>
                                <input 
                                    type="text" 
                                    name="memberId" 
                                    id="memberId" 
                                    placeholder="아이디를 입력해주세요"
                                    value={inputs.memberId}
                                    readOnly={isMailCheck}
                                    onInput={(e) => 
                                        setInputs({
                                            ...inputs,
                                            memberId: e.target.value,
                                        })
                                    }
                                />
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
                                    readOnly={isMailCheck}
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
                        <div className="email">
                            <p>이메일</p>
                            <MailCertification 
                                handleRequestEmail={handleRequestEmail}
                                emailIdRef={emailIdRef}
                                certificationNumberRef={certificationNumberRef}
                                isMailCheck={isMailCheck}
                                setIsMailCheck={setIsMailCheck}
                            />
                        </div>

                        <button className="last-btn" type="submit">확인</button>
                    </form>
                    
                    {/* 비밀번호 재등록 */}
                    <div id="findResult">
                        <h5>회원정보 확인이 완료되었습니다.</h5>
                        <form onSubmit={handlePwSubmit} name="pwInquiryForm" id="pwInquiryForm">
                            <div className="pw">
                                <p>비밀번호를 재설정해주세요.</p>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="새 비밀번호"
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
                                    placeholder="새 비밀번호 확인"
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
                            <button className="last-btn" type="submit">확인</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PwInquiry;