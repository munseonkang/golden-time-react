import { useContext, useEffect, useRef, useState } from 'react';
import { images } from '../../../utils/images';
import { getMemberInfo, modifyMember, removeMember } from '../../../apis/services/goldentimeService';
import { useNavigate } from 'react-router-dom';
import { mainContext } from '../../../App';
import ProfileImage from './ProfileImage';

const MemberInfo = (props) => {
    const { changeContent } = props;
    const {setLoginMember} = useContext(mainContext);

    const [inputs, setInputs] = useState({memberId:"", nickname:"", password:"", passwordCheck:"", email:"", phoneNumber:"", systemName:""});
    const {memberId, nickname, password, passwordCheck, email, phoneNumber, systemName} = inputs;

    const inputsRef = useRef([]);
    const initInfoRef = useRef({});
    const descriptionsRef = useRef([]);
    const uploadImageRef = useRef(null);
    const deleteImageRef = useRef(null);

    const navigate = useNavigate();

    const addInputsRef = (e)=>{
        if(e && !inputsRef.current.includes(e)) {
            inputsRef.current.push(e);
        }
    }
    const addDescriptionsRef = (e)=>{
        if(e && !descriptionsRef.current.includes(e)) {
            descriptionsRef.current.push(e);
        }
    }

    const checkPassword = (password)=>{
        return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,20}$/.test(password);
    }
    const checkPhoneNumber = (phoneNumber)=>{
        return /^[0-9]{11}$/.test(phoneNumber);
    }

    const changeInputs = (e)=>{
        const {name, value} = e.target;
        setInputs({...inputs, [name]:value});

        if(!value) {
            e.target.classList.add('empty-border');
        }
        else {
            e.target.classList.remove('empty-border');
        }
        if(name==="password") {
            if(checkPassword(value)) {
                e.target.classList.remove('empty-border');
                descriptionsRef.current[0].classList.remove('empty-text');
            } else {
                e.target.classList.add('empty-border');
                descriptionsRef.current[0].classList.add('empty-text');
            }
        }
        if(name==="passwordCheck") {
            descriptionsRef.current[1].classList.remove('empty-text');
            descriptionsRef.current[1].classList.add('hidden');
        }
        if(name==="phoneNumber") {
            if(checkPhoneNumber(value)) {
                e.target.classList.remove('empty-border');
                descriptionsRef.current[2].classList.remove('empty-text');
            } else {
                e.target.classList.add('empty-border');
                descriptionsRef.current[2].classList.add('empty-text');
            }
        }
    }

    const submit = ()=>{
        if(!password) {
            inputsRef.current[1].classList.add('empty-border');
            descriptionsRef.current[0].classList.add('empty-text');
        }
        if(password!==passwordCheck) {
            inputsRef.current[2].classList.add('empty-border');
            descriptionsRef.current[1].classList.add('empty-text');
            descriptionsRef.current[1].classList.remove('hidden');
        }
        if(!checkPhoneNumber(phoneNumber))
        if(!email) inputsRef.current[3].focus();
        if(password!==passwordCheck) inputsRef.current[2].focus();
        if(!checkPassword(password)) inputsRef.current[1].focus();
        if(!nickname) inputsRef.current[0].focus();
        if(!nickname || !checkPassword(password) || password!==passwordCheck || !email || !checkPhoneNumber(phoneNumber)) {
                return;
        }
        else{
            const formData = new FormData();
            if(uploadImageRef.current!==null) formData.append("file", uploadImageRef.current);
            if(deleteImageRef.current!==null) formData.append("deleteFile", deleteImageRef.current);
            formData.append("nickname", inputs.nickname);
            formData.append("password", inputs.password);
            formData.append("email", inputs.email);
            formData.append("phoneNumber", inputs.phoneNumber);
            modifyMember({memberId: sessionStorage.getItem("loginMember"), formData: formData}, changeContent);
        }
    }
    
    const initInfo = ()=>{
        setInputs({...initInfoRef.current});
        uploadImageRef.current = null;
        deleteImageRef.current = null;
        descriptionsRef.current.map((el)=>{
            el.classList.remove('empty-text');
        })
        descriptionsRef.current[1].classList.add('hidden');
        inputsRef.current.map((el)=>{
            el.classList.remove('empty-border');
        })
    }

    const selectImage = (e)=>{
        const fileTag = e.target;
        const file = fileTag.files[0];

        if(file) {
            uploadImageRef.current = file;
            if(!deleteImageRef.current) deleteImageRef.current = initInfoRef.current.systemName;
            const reader = new FileReader();
            reader.onload = (e)=>{
                setInputs({...inputs, systemName: e.target.result})
            }
            reader.readAsDataURL(file);
        }
    }

    const uploadImage = ()=>{
        document.getElementById("profileImage").click();
    }

    const removeImage = ()=>{
        uploadImageRef.current = null;
        if(deleteImageRef.current!==null) deleteImageRef.current = initInfoRef.current.systemName;
        setInputs({...inputs, systemName: ''})
    }

    useEffect(()=>{
        getMemberInfo(sessionStorage.getItem("loginMember"), setInputs, initInfoRef);
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
                            <ProfileImage systemName={systemName} />
                            <input type="file" name="profileImage" id="profileImage" style={{display: 'none'}}
                                onChange={(e)=>{ selectImage(e) }}/>
                            <div>
                                <button className="b15w" onClick={uploadImage}>이미지 변경</button>
                                <button className="b15ce1" onClick={removeImage}>이미지 삭제</button>
                            </div>
                        </div>
                    </li>
                    <li>
                        <label className="b166aa"><strong>아이디</strong></label>
                        <input className="r156aa" type="text" value={memberId} readOnly/>
                    </li>
                    <li>
                        <label className="b166aa" htmlFor="nickname"><strong>닉네임 *</strong></label>
                        <input className="r15b" id="nickname" name="nickname" ref={addInputsRef} type="text" value={nickname} onChange={(e)=>{changeInputs(e)}}/>
                    </li>
                    <li>
                        <div>
                            <label className="b166aa" htmlFor="password"><strong>비밀번호 *</strong></label>
                            <span className="r126aa" ref={addDescriptionsRef}>영문,숫자,특수문자를 모두 조합하여 8~20자이내로 입력해주세요.</span>
                        </div>
                        <input className="r15b" id="password" name="password" ref={addInputsRef} type="password" value={password} onChange={(e)=>{changeInputs(e)}}/>
                    </li>
                    <li>
                        <div>
                            <label className="b166aa" htmlFor="passwordCheck"><strong>비밀번호 확인 *</strong></label>
                            <span className="r12fc7 hidden" ref={addDescriptionsRef}>동일한 비밀번호를 작성해주세요.</span>
                        </div>
                        <input className="r15b" id="passwordCheck" name="passwordCheck" ref={addInputsRef} type="password" value={passwordCheck} onChange={(e)=>{changeInputs(e)}}/>
                    </li>
                    <li>
                        <label className="b166aa" htmlFor="email"><strong>이메일 *</strong></label>
                        <input className="r15b" id="email" name="email" ref={addInputsRef} type="email" value={email} onChange={(e)=>{changeInputs(e)}}/>
                    </li>
                    <li>
                        <div>
                            <label className="b166aa" htmlFor="phoneNumber"><strong>전화번호 *</strong></label>
                            <span className="r126aa" ref={addDescriptionsRef}>( - ) 없이 입력해주세요.</span>
                        </div>
                        <input className="r15b" id="phoneNumber" name="phoneNumber" ref={addInputsRef} type="tel" value={phoneNumber} onChange={(e)=>{changeInputs(e)}}/>
                    </li>
                </ul>
                <div>
                    <button className="b15ce1" onClick={()=>{removeMember(sessionStorage.getItem("loginMember"), setLoginMember, navigate)}}>회원 탈퇴</button>
                    <div>
                        <button className="b15w" onClick={initInfo}>초기화</button>
                        <button className="b15w" onClick={submit}>회원정보 변경</button>
                    </div>
                </div>
            </section>
        </article>
    )
}
export default MemberInfo;