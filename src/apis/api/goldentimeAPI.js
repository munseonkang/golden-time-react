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
// 멤버 정보 수정
export const modifyMember = (memberId, member) => {
    return instance.put(`member/${memberId}`, member);
}
// 멤버 정보 삭제
export const removeMember = (memberId) => {
    return instance.delete(`member/${memberId}`);
}