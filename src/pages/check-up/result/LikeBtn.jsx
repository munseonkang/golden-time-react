import { useRef, useState } from "react";
import { images } from "../../../utils/images";
import { addLike, removeLike } from "../../../apis/services/goldentimeService";
import { useNavigate } from "react-router-dom";

const LikeBtn = ({hmcNo, hmcNm, ykindnm, hmcTel, likeId, classification})=>{
    const [isRegist, setIsRegist] = useState(likeId>0);
    const likeIdRef = useRef(likeId);
    
    const navigate = useNavigate();

    const changeHandler = ()=>{
        switch(isRegist) {
            case true:
                return images['star20_on.png'];
            case false:
                return images['star20_off.png'];
        }
    }

    const clickHandler = ()=>{
        if(sessionStorage.getItem("loginMember")===null) navigate('/member/login', {replace: false});
        const memberId = sessionStorage.getItem("loginMember");
        const duty = {dutyId: hmcNo, dutyName: hmcNm, dutyDiv: ykindnm,dutyTel: hmcTel}
        const params = {
            memberId: memberId,
            classification: classification,
            duty: duty
        }
        isRegist?removeLike(memberId, likeIdRef.current, setIsRegist):addLike(memberId, params, setIsRegist, likeIdRef);
    }

    return (
        <img className="likeBtn" src={changeHandler()} onClick={clickHandler} />
    )
}
export default LikeBtn;