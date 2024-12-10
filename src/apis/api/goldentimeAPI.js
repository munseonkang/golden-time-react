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
export const updateMember = (memberId, formData) => {
    return instance.put(`member/${memberId}`,formData);
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
export const getLikesWithClassification = (memberId, params) => {
    return instance.get(`member/${memberId}/likes/classification`, {
        params: {
            memberId: params.memberId,
            classification: params.classification,
            pageNo: params.pageNo,
            numOfRows: params.numOfRows,
        }
    });
}
export const getLikeId = (memberId, dutyId)=>{
    return instance.get(`member/${memberId}/like`, {
        params: {
            dutyId: dutyId
        }
    })
}
export const registLike = (memberId, params)=>{
    return instance.post(`member/${memberId}/like`, {
        memberId: memberId,
        classification: params.classification,
        duty: params.duty,
    });
}
export const registAgainLike = (memberId, likeId, params)=>{
    return instance.post(`member/${memberId}/like/${likeId}`, {
        likeId: likeId,
        classification: params.classification,
        memberId: memberId,
        dutyId: params.dutyId,
    });
}
// 즐겨찾기 삭제
export const deleteLike = (memberId, likeId) => {
    return instance.delete(`member/${memberId}/like/${likeId}`);
}

// 리뷰 조회 - 멤버별
export const getReviews = (memberId, params) => {
    return instance.get(`member/${memberId}/reviews`, {
        params: {
            pageNo: params.pageNo,
            numOfRows: params.numOfRows,
        }
    });
}
// 리뷰 조회(최근 기준 월별 제한) - 멤버별
export const getReviewsWithMonth = (memberId, month) => {
    return instance.get(`member/${memberId}/reviews/month?month=${month}`);
}
export const getReviewsWithMonths = (memberId, params) => {
    return instance.get(`member/${memberId}/reviews/months`, {
        params: {
            month: params.month,
            pageNo: params.pageNo,
            numOfRows: params.numOfRows,
        }
    });
}
export const getReviewsWithClassification = (memberId, params) => {
    return instance.get(`member/${memberId}/reviews/classification`, {
        params: {
            classification: params.classification,
            pageNo: params.pageNo,
            numOfRows: params.numOfRows,
        }
    });
}
// 리뷰 조회(구분 제한) - 멤버별
export const getReviewsWithConditions = (memberId, params) => {
    return instance.get(`member/${memberId}/reviews/conditions`, {
        params: {
            month: params.month,
            classification: params.classification,
            pageNo: params.pageNo,
            numOfRows: params.numOfRows,
        }
    });
}
// 리뷰 수정
export const updateReview = (memberId, reviewId, review) => {
    return instance.put(`member/${memberId}/review/${reviewId}`, review);
}
// 리뷰 삭제
export const deleteReview = (memberId, reviewId) => {
    return instance.delete(`member/${memberId}/review/${reviewId}`);
}