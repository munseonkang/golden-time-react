import { getAddressByPosition } from "../api/tmapAPI";

// HTML5 geolocation api를 이용해 현재 위치를 가져오고,
// reversegeocoding api를 이용해서 법정 주소로 변환
export async function getCurrentPosition(callback) {

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        getCurrentAddress(latitude, longitude, callback);
    }
    
    function error() {
        alert("현재 위치를 검색할 수 없습니다.")
    }

    async function getCurrentAddress(lat, lon, callback) {
        try{
            const response = await getAddressByPosition(lat, lon);
            const city_do = response.data.addressInfo.city_do;
            const gu_gun = response.data.addressInfo.gu_gun;

            callback(city_do, gu_gun);
        }
        catch(error) {
            console.log(error);
        }
    }
    
    if (!navigator.geolocation) {
        alert("현재 브라우저는 위치 정보 제공을 지원하지 않습니다.")
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}