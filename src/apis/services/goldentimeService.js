import { Title } from "../../constants/constants";
import { deleteLike, deleteMember, deleteReview, getLikes, getLikesWithClassification, getLikesWithLimit, getMember, getProfile, getReviews, getReviewsWithClassification, getReviewsWithConditions, getReviewsWithMonth, getReviewsWithMonths, registAgainLike, registLike, updateMember, updateReview } from "../api/goldentimeAPI";


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
export async function modifyMember(param, changeContent) {
    try{
        const {memberId, formData} = param;
        const response = await updateMember(memberId, formData);
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
export async function getMemberLikes(params, callback) {
    try{
        const {memberId, limit, classification} = params;
        let response;
        if(limit) {
            response = await getLikesWithLimit(memberId, limit);
        }
        else if(classification) {
            response = await getLikesWithClassification(memberId, params);
        }
        else {
            response = await getLikes(memberId, params);
        }
        console.log("즐겨찾기 정보", response);
        callback(response.data.data);
    }
    catch(error) {
        console.log(error);
    }
}
export async function addLike(memberId, likeId, params, callback) {
    try{
        let response;
        if(likeId) {
            response = await registAgainLike(memberId, likeId, params);
        }
        else {
            response = await registLike(memberId, params);
        }
        if(response.data.data==="success") {
            callback(true);
        }
    }
    catch(error) {
        console.log(error);
    }
}
export async function removeLike(memberId, likeId, callback) {
    try{
        const response = await deleteLike(memberId, likeId);
        if(response.data.data==="success") {
            callback(false);
        }
    }
    catch(error) {
        console.log(error);
    }
}
export async function getMemberReviews(params, callback) {
    try{
        const {memberId, month, classification, pageNo} = params;
        let response;
        if(month&&classification) {
            response = await getReviewsWithConditions(memberId, params);
        }
        else if(month&&pageNo) {
            response = await getReviewsWithMonths(memberId, params);
        }
        else if(month) {
            response = await getReviewsWithMonth(memberId, month);
        }
        else if(classification) {
            response = await getReviewsWithClassification(memberId, params);
        }
        else {
            response = await getReviews(memberId, params);
        }
        console.log("리뷰 정보", response);
        callback(response.data.data);
    }
    catch(error) {
        console.log(error);
    }
}
export async function modifyReview(params, condition, NUMOFROWS,callback) {
    try{
        const {memberId, review} = params;
        const response = await updateReview(memberId, review.reviewId, review);
        if(response.data.data==="success") {
            getMemberReviews({memberId: memberId, month: Number(condition.month), classification: condition.classification, pageNo: 1, numOfRows: NUMOFROWS}, callback)
        }
    }
    catch(error) {
        console.log(error);
    }
}
export async function removeReview(params, condition, NUMOFROWS,callback) {
    try{
        const {memberId, reviewId} = params;
        const response = await deleteReview(memberId, reviewId);
        if(response.data.data==="success") {
            getMemberReviews({memberId: memberId, month: Number(condition.month), classification: condition.classification, pageNo: 1, numOfRows: NUMOFROWS}, callback)
        }
    }
    catch(error) {
        console.log(error);
    }
}
