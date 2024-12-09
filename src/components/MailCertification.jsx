import { useEffect, useRef, useState } from "react";
import { images } from '../utils/images';
import axios from 'axios';
import { borderColor } from "../pages/member/Join"; 

const MailCertification = ({
    handleRequestEmail, //선택
    emailIdRef, //선택
    certificationNumberRef, //선택
    isMailCheck, //필수
    setIsMailCheck //필수
}) => {
    const [emailId, setEmailId] = useState('');
    const [emailDomain, setEmailDomain] = useState('naver.com');

    const [isCustomEmail, setIsCustomEmail] = useState(false); // 이메일 직접입력
    const [isMailCertification, setIsMailCertification] = useState(false); // 인증번호 받기(메일전송)
    const [memberMailNumber, setMemberMailNumber] = useState(''); // 유저가 입력한 인증번호

    // prop(handleRequestEmail)을 받았다면 이메일 전달하기
    const handleSendEmailToParent = () => {
        if (handleRequestEmail) {
            handleRequestEmail({ emailId, emailDomain });
        }
    };



    // 이메일 도메인 선택(직접입력인지 확인)
    const handleEmailDomainChange = (e) => {
        setIsCustomEmail(e.target.value === 'custom');
    };

    // 인증메일 발송
    const handleSendMail = async () => {
        const email = `${emailId}@${emailDomain}`;
        if(emailId == ""){
            alert("이메일을 입력해주세요");
            return;
        }
        try {
            const response = await axios.post('/api/member/sendMailCertificationNumber', null, {
                params: { email: email }
            });
            console.log(response.data);
            setIsMailCertification(true);
            setEmailId(emailId);
            handleSendEmailToParent();
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

    

    return (
        <>
            <div id="MailCertification">
                <div className="email-input">
                    <input
                        type="text"
                        name="emailId"
                        id="emailId"
                        placeholder="이메일"
                        value={emailId}
                        ref={emailIdRef}
                        onInput={(e) => {
                            setEmailId(e.target.value);
                            borderColor(e);
                            handleSendEmailToParent();
                        }}
                        readOnly={isMailCertification}
                    />
                    &nbsp;@&nbsp;
                    <select
                        name="emailDomain"
                        id="emailDomain"
                        value={emailDomain || ''}
                        onInput={(e) => {
                            setEmailDomain(e.target.value);
                            handleEmailDomainChange(e);
                            handleSendEmailToParent();
                        }}
                        disabled={isMailCertification}
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
                            onInput={(e) => setEmailDomain(e.target.value)}
                            readOnly={isMailCheck}
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
                                ref={certificationNumberRef}
                                onInput={(e) => {
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
        </>
    );
};

export default MailCertification;

// // prop(handleRequestEmail) Parent에 입력할 내용
// // MailCertification에서 이메일 받아오기
// const [emailValues, setEmailValues] = useState({
//     emailId: '',
//     emailDomain: 'naver.com',
// });
// const handleRequestEmail = (values) => {
//     setEmailValues(values);
//     // emailValues.emailId
//     // emailValues.emailDomain
// };
// // 이메일 유효성검사
// const emailIdRef = useRef(null);
// const certificationNumberRef = useRef(null);