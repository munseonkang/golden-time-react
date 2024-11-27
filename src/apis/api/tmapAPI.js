import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_TMAP_API_URL,
    params: {
        appKey: process.env.REACT_APP_TMAP_APP_KEY
    }
});

// 공휴일 검진기관 검색
export const getAddressByPosition = (lat, lon) => {
    return instance.get('geo/reversegeocoding', {
        params: {
            version: 1,
            lat: lat,
            lon: lon
        }
    });
}