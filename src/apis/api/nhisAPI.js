import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_DATA_NHIS_API_URL,
    params: {
        serviceKey: process.env.REACT_APP_DATA_API_KEY,
        numOfRows: 8
    }
});

// 공휴일 검진기관 검색
export const searchHolidaysCenter = (params) => {
    return instance.get('HmcSearchService/getHolidaysHmcList', params);
}
// 검진기관 통합조건 검색
export const searchIntegrated = (params) => {
    return instance.get('HmcSearchService/getHmcList', params);
}
// 검진기관 기본정보
export const getCenterBasicInfo = (params) => {
    return instance.get('HmcSpecificInfoService/getHmcBasicInfoDetail', params);
}
// 검진기관 교통, 위치, 주차 안내
export const getCenterTransInfo = (params) => {
    return instance.get('HmcSpecificInfoService/getHmcTransInfoDetail', params);
}
// 검진기관 진료, 점심, 접수시간 안내
export const getCenterWorkInfo = (params) => {
    return instance.get('HmcSpecificInfoService/getWorkHourInfoDetail', params);
}
// 공휴일 검진 정보
export const getCenterHolidayInfo = (params) => {
    return instance.get('HmcSpecificInfoService/getHolidaysHchkInfoDetail', params);
}