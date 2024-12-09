import { siDoCodes, sigunguCodes } from "../../constants/regions";
import { searchHolidaysCenter, searchIntegrated } from "../api/nhisAPI";

export async function search(terms, callback) {
    try{
        const { center, sido, sigungu, isHoliday, type, pageNo } = terms;
        const siDoCd = siDoCodes.get(sido);
        const siGunGuCd = sigunguCodes.get(siDoCd).get(sigungu);
        console.log(terms);
        const hchTypeArr = ["전체", "일반", "구강", "암검진", "일반+암검진", "출장검진", "영유아"];

        let response;
        if(isHoliday==="전체") {
            response = await searchIntegrated({
                hmcNm: center,
                siDoCd: siDoCd,
                siGunGuCd: siGunGuCd,
                pageNo: pageNo,
                hchType: hchTypeArr.indexOf(type),
            });
        } else {
            response = await searchHolidaysCenter({
                hmcNm: center,
                siDoCd: siDoCd,
                siGunGuCd: siGunGuCd,
                pageNo: pageNo,
                hchType: hchTypeArr.indexOf(type),
            });
        }
        console.log(JSON.stringify(response.data));
        callback(response.data.response.body);
    }
    catch(error) {
        console.log(error);
    }
}