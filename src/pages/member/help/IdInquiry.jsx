import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { images } from '../../../utils/images';
import axios from 'axios';
import MailCertification from "../../../components/MailCertification";
import { borderColor } from "../Join";

const IdInquiry = () => {
    const navigate = useNavigate();
    const [isMailCheck, setIsMailCheck] = useState(false); // 메일 인증번호 확인
    const [findResult, setFindResult] = useState('');

    const [inputs, setInputs] = useState({
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


    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 휴대전화 번호 확인
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
            const response = await axios.post('/api/member/help/IdInquiry', setInputs);
            // console.log("response.data: ", response.data);

            if (response.data !== "X") {
                setFindResult(response.data)
                document.getElementById('findResult').style.display = 'block';
            } else {
                alert('등록된 아이디가 없습니다.');
                setIsMailCheck(false);
            }

        } catch (error) {
            console.error('아이디찾기 실패:', error);
            alert('아이디찾기를 실패하였습니다.');
        }
    };

    return(
        <>
            <div id="idInquiry" className="member">
                <div>
                    <div className="title">아이디 찾기</div>
                    <h5>회원정보에 등록한 이메일로 인증</h5>
                    {/* <p>회원정보에 등록한 이메일과 입력한 이메일이 같아야<br />인증번호를 받을 수 있습니다.</p> */}
                    <form onSubmit={handleSubmit} name="idInquiryForm" id="idInquiryForm">
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
                    
                    {/* 아이디 확인 */}
                    <div id="findResult">
                        <p>아이디는 <b>' {findResult} '</b> 입니다.</p>
                        <Link to="/member/login">로그인 바로가기</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="/member/help/PwInquiry">비밀번호 찾기</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IdInquiry;