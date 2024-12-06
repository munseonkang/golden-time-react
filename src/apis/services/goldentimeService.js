import { Title } from "../../constants/mypage";
import { deleteMember, getLikes, getLikesWithClassification, getLikesWithLimit, getMember, getProfile, getReviews, getReviewsWithClassification, getReviewsWithMonth, updateMember } from "../api/goldentimeAPI";


export async function getMemberInfo(memberId, callback, ref) {
    try{
        const response = await getMember(memberId);
        console.log("회원 정보", response.data.data);
        callback({...response.data.data, password:"", passwordCheck:""});
        ref.current = {...response.data.data, password:"", passwordCheck:""};
    }
    catch(error) {
        console.log(error);
    }
}
export async function getMemberProfile(memberId, callback) {
    try{
        const response = await getProfile(memberId);
        console.log("회원 프로필", response.data.data);
        callback(response.data.data);
    }
    catch(error) {
        console.log(error);
    }
}
export async function getMemberLikes(param, callback) {
    try{
        const {memberId, limit, classification, pageNo, numOfRows} = param;
        let response;
        if(limit) {
            response = await getLikesWithLimit(memberId, limit);
            callback(response.data.data);
        }
        // else if(classification) {
        //     response = await getLikesWithClassification(memberId, classification);
        // }
        else {
            response = await getLikes(memberId, param);
            callback(response.data.data);
        }
        console.log("즐겨찾기 정보", response);
    }
    catch(error) {
        console.log(error);
    }
}
export async function getMemberReviews(param, callback) {
    try{
        const {memberId, month, classification} = param;
        let response;
        if(month) {
            response = await getReviewsWithMonth(memberId, month);
        }
        else if(classification) {
            response = await getReviewsWithClassification(memberId, classification);
        }
        else {
            response = await getReviews(memberId);
        }
        console.log("리뷰 정보", response);
        callback(response.data.data);
    }
    catch(error) {
        console.log(error);
    }
}

export async function modifyMember(param, changeContent) {
    try{
        const {memberId, member} = param;
        const response = await updateMember(memberId, member);
        if(response.data.data==="success") changeContent(Title.DASHBOARD);
    }
    catch(error) {
        console.log(error);
    }
}

export async function removeMember(memberId, setLoginMember, navigate) {
    try{
        const response = await deleteMember(memberId);
        if(response.data.data==="success") {
            setLoginMember(null);
            navigate("/", true);
        }
    }
    catch(error) {
        console.log(error);
    }
}