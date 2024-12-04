import { getMember } from "../api/goldentimeAPI";


export async function getMemberInfo(memberId, callback) {
    try{
        const response = await getMember(memberId);
        callback(response.data.data);
    }
    catch(error) {
        console.log(error);
    }
}