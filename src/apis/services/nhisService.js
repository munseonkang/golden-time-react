import { siDoCodes, sigunguCodes } from "../../constants/regions";
import { searchIntegrated } from "../api/nhisAPI";

export async function search(terms, callback) {
    try{
        const siDoCd = siDoCodes.get(terms.sido);
        const siGunGuCd = sigunguCodes.get(siDoCd).get(terms.sigungu);
        const response = await searchIntegrated({
            hmcNm: terms.center,
            siDoCd: siDoCd,
            siGunGuCd: siGunGuCd,
            pageNo: terms.pageNo
        });
        console.log(JSON.stringify(response.data));
        callback(response.data.response.body);
    }
    catch(error) {
        console.log(error);
    }
}