import { useState } from "react";
import { Classification } from "../../../../constants/constants";
import { images } from "../../../../utils/images";
import { addLike, removeLike } from "../../../../apis/services/goldentimeService";


export const setLikeDetail = (cls)=>{
    switch(cls) {
        case Classification.HOSPITAL:
            return "lbgc-h";
        case Classification.PHARMACY:
            return "lbgc-p";
        case Classification.CENTER:
            return "lbgc-c";
    }
}

export const setLikeIcon = (cls, size)=>{
    switch(cls) {
        case Classification.HOSPITAL:
            if(size===28) return `icon_hospital28.png`;
            if(size===21) return `icon_hospital21.png`;
        case Classification.PHARMACY:
            if(size===28) return `icon_pharmacy28.png`;
            if(size===21) return `icon_pharmacy21.png`;
        case Classification.CENTER:
            if(size===28) return `icon_center28.png`;
            if(size===21) return `icon_center21.png`;
    }
}

const Like = ({like})=>{
    const [isLike, setIsLike] = useState(true);

    const setLikeButton = ()=>{
        return (isLike)?'liked15.png':'unliked15.png';
    }

    const likeHandler = (likeId, cls, dutyId)=>{
        const memberId = sessionStorage.getItem("loginMember");
        isLike?removeLike(memberId, likeId, setIsLike):addLike(memberId, likeId, {classification: cls, dutyId: dutyId}, setIsLike);
    }



    return (
        <tr>
            <td>
                <button onClick={()=>{likeHandler(like.likeId, like.classification, like.duty.dutyId)}}>
                    <img src={images[`${setLikeButton()}`]} alt=""/>
                </button>
            </td>
            <td className="r163a7">{like.duty.dutyName}</td>
            <td className="r163a7">
                <img src={images[`${setLikeIcon(like.classification, 21)}`]} alt=""/>
                {like.duty.dutyDiv}
            </td>
            <td className="r163a7">{like.duty.dutyTel}</td>
            <td>
                <button className={`b14w ${setLikeDetail(like.classification)}`}>자세히 보기</button>
            </td>
        </tr>
    );
}
export default Like;