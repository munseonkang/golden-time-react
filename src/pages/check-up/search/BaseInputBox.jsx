export default function InputBox({subject, placeholder, value, img}) {
    return (
        <div className="input-box">
            <ButtonInput id={subject} placeholder={placeholder}
            value={value}/>
            <div className="icon-box">
                <img src={images[`${img}`]} alt="" />
            </div>
        </div>
    );
}