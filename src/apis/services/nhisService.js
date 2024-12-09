import { siDoCodes, sigunguCodes } from "../../constants/regions";
import { searchIntegrated } from "../api/nhisAPI";

export async function search(terms, callback) {
    try{
        const { center, sido, sigungu, type, pageNo } = terms;
        const siDoCd = siDoCodes.get(sido);
        const siGunGuCd = sigunguCodes.get(siDoCd).get(sigungu);
        console.log(terms);
        let hchType;
        if(type==="전체") hchType=0;
        else if(type==="일반") hchType=1;
        else if(type==="구강") hchType=2;
        else if(type==="영유아") hchType=6;
        else if(type==="암검진") hchType=3;
        else if(type==="일반+암검진") hchType=4;
        else if(type==="출장검진") hchType=5;
        const response = await searchIntegrated({
            hmcNm: center,
            siDoCd: siDoCd,
            siGunGuCd: siGunGuCd,
            pageNo: pageNo,
            hchType: hchType,
        });
        console.log(JSON.stringify(response.data));
        callback(response.data.response.body);
    }
    catch(error) {
        console.log(error);
    }
}