import { images } from "../../../utils/images";

const MemberImage = ({memberId})=>{

    return (
        <img src={`/api/member/${memberId}/member-image`} alt=""/>
    )
}
export default MemberImage;