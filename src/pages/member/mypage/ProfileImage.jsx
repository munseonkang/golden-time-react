import { images } from "../../../utils/images";

const ProfileImage = ({systemName})=>{
    const getProfileImage = ()=>{
        let cls = systemName?.split(":").shift();
        if(cls==="data") {
            return systemName;
        }
        let ext = systemName?.split(".").pop();
        let isImage = ext == 'jpeg' || ext == 'jpg' || ext == 'png' || ext == 'gif' || ext =='webp';
        return isImage ? `/api/member/${sessionStorage.getItem("loginMember")}/profile-image/${systemName}`:images['profile_image80.png'];
    }

    return (
        <img src={`${getProfileImage()}`} alt=""/>
    )
}
export default ProfileImage;