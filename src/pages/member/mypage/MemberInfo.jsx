import { useEffect, useRef, useState } from 'react';
import { images } from '../../../utils/images';
import { getMemberInfo } from '../../../apis/services/goldentimeService';

const MemberInfo = () => {
    const [inputs, setInputs] = useState({memberId:"", nickname:"", password:"", passwordCheck:"",  email:"", phoneNumber:""});

    const inputsRef = useRef([]);
    const addInputsRef = (e)=>{
        inputsRef.current.push(e);
    }
    const changeInputs = (e)=>{
        const {name, value} = e.target;
        console.log(e.target);
        setInputs({...inputs, [name]:value});

        if(!value) {
            e.target.classList.add('empty');
        }
        else {
            e.target.classList.remove('empty');
        }
    }

    useEffect(()=>{
        getMemberInfo(sessionStorage.getItem("loginMember"), setInputs);
    }, [])

    return (
        <article className="member-info">
            <div>
                <img src={images['nav_memberInfo_clicked20.png']} alt=""/>
                <h3>내 회원정보</h3>
            </div>
            <section>
                <ul>
                    <li>
                        <label className="b166aa"><strong>회원 이미지</strong></label>
                        <div>
                            <img src={images['profile_image85.png']} alt=""/>
                            <div>
                                <button className="b15w">이미지 변경</button>
                                <button className="b15ce1">이미지 삭제</button>
                            </div>
                        </div>
                    </li>
                    <li>
                        <label className="b166aa"><strong>아이디</strong></label>
                        <input className="r156aa" type="text" value={inputs.memberId} readOnly/>
                    </li>
                    <li>
                        <label className="b166aa"><strong>닉네임</strong></label>
                        <input className="r15b" name="nickname" ref={addInputsRef} type="text" defaultValue={inputs.nickname} onChange={(e)=>{changeInputs(e)}}/>
                    </li>
                    <li>
                        <label className="b166aa"><strong>비밀번호</strong></label>
                        <input className="r15b" name="password" ref={addInputsRef} type="password" onChange={(e)=>{changeInputs(e)}}/>
                    </li>
                    <li>
                        <label className="b166aa"><strong>비밀번호 확인</strong></label>
                        <input className="r15b" name="passwordCheck" ref={addInputsRef} type="password" onChange={(e)=>{changeInputs(e)}}/>
                    </li>
                    <li>
                        <label className="b166aa"><strong>이메일</strong></label>
                        <input className="r15b" name="email" ref={addInputsRef} type="email" defaultValue={inputs.email} onChange={(e)=>{changeInputs(e)}}/>
                    </li>
                    <li>
                        <label className="b166aa"><strong>전화번호</strong></label>
                        <input className="r15b" name="phoneNumber" ref={addInputsRef} type="tel" defaultValue={inputs.phoneNumber} onChange={(e)=>{changeInputs(e)}}/>
                    </li>
                </ul>
                <div>
                    <button className="b15ce1">회원 탈퇴</button>
                    <div>
                        <button className="b15w">초기화</button>
                        <button className="b15w">회원정보 변경</button>
                    </div>
                </div>
            </section>
        </article>
    )
}
export default MemberInfo;