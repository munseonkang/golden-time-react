import axios from "axios";

const instance = axios.create({
    baseURL: "/api/"
});

// 세션 정보 확인
export const getSession = () => {
    return instance.get(`member/session`);
}
// 멤버 정보 확인
export const getMember = (memberId) => {
    return instance.get(`member/${memberId}`);
}
// 멤버 프로필 확인
export const getProfile = (memberId) => {
    return instance.get(`member/${memberId}/profile`);
}
// 멤버 정보 수정
export const updateMember = (memberId, member) => {
    return instance.put(`member/${memberId}`, {
        nickname: member.nickname,
        password: member.password,
        email: member.email,
        phoneNumber: member.phoneNumber,
    });
}
// 멤버 정보 삭제
export const deleteMember = (memberId) => {
    return instance.delete(`member/${memberId}`);
}

// 즐겨찾기 조회 - 멤버별
// export const getLikes = (memberId) => {
//     return instance.get(`member/${memberId}/likes`);
// }
// 즐겨찾기 조회 - 멤버별
export const getLikes = (memberId, params) => {
    return instance.get(`member/${memberId}/likes`, {
        params: {
            memberId: params.memberId,
            classification: params.classification,
            pageNo: params.pageNo,
            numOfRows: params.numOfRows,
        }
    });
}
// 즐겨찾기 조회(개수 제한) - 멤버별
export const getLikesWithLimit = (memberId, limit) => {
    return instance.get(`member/${memberId}/likes/limit?limit=${limit}`);
}
// 즐겨찾기 조회(구분 제한) - 멤버별
export const getLikesWithClassification = (memberId, classification) => {
    return instance.get(`member/${memberId}/likes/classification?classification=${classification}`);
}
// 즐겨찾기 삭제
export const removeLike = (memberId, likeId) => {
    return instance.delete(`member/${memberId}/like/${likeId}`);
}

// 리뷰 조회 - 멤버별
export const getReviews = (memberId) => {
    return instance.get(`member/${memberId}/reviews`);
}
// 리뷰 조회(최근 기준 월별 제한) - 멤버별
export const getReviewsWithMonth = (memberId, month) => {
    return instance.get(`member/${memberId}/reviews/month?month=${month}`);
}
// 리뷰 조회(구분 제한) - 멤버별
export const getReviewsWithClassification = (memberId, classification) => {
    return instance.get(`member/${memberId}/reviews/classification?classification=${classification}`);
}
// 리뷰 삭제
export const modifyReview = (memberId, reviewId) => {
    return instance.put(`member/${memberId}/like/${reviewId}`);
}
// 리뷰 삭제
export const removeReview = (memberId, reviewId) => {
    return instance.delete(`member/${memberId}/like/${reviewId}`);
}