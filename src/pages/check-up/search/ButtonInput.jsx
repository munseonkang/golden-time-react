import BaseInput from "./BaseInput";

export default function ButtonInput({id, placeholder, value}) {
    return <BaseInput className="r17b" type='button' id={id} placeholder={placeholder} value={value} readOnly/>
}