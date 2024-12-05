import { getLikes, getLikesWithClassification, getLikesWithLimit, getMember, getReviews, getReviewsWithClassification, getReviewsWithMonth } from "../api/goldentimeAPI";


export async function getMemberInfo(memberId, callback) {
    try{
        const response = await getMember(memberId);
        console.log("회원 정보", response.data.data);
        callback(response.data.data);
    }
    catch(error) {
        console.log(error);
    }
}
export async function getMemberLikes(param, callback) {
    try{
        const {memberId, limit, classification} = param;
        let response;
        if(limit) {
            response = await getLikesWithLimit(memberId, limit);
        }
        else if(classification) {
            response = await getLikesWithClassification(memberId, classification);
        }
        else {
            response = await getLikes(memberId);
        }
        console.log("즐겨찾기 정보", response);
        callback(response.data.data);
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