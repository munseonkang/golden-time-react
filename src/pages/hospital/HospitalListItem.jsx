import { useEffect, useRef, useState } from "react";
import { images } from '../../utils/images';
import { checkOpenStatus, cleanHospitalName } from "./Hospital";

const HospitalListItem = ({ 
    hospital, 
    index,
    handleOpenDetail,
    renameClassification,
    favoriteStar,
    favorites,
    setIsFavorite
}) => {
    // 오픈 유/무
    const { status, open, close } = checkOpenStatus(hospital);

    return (
        <li key={index} onClick={() => handleOpenDetail(hospital, index)}>
            <div className="name">
                {cleanHospitalName(hospital.dutyName)}
                <span> {renameClassification(hospital.dutyDivNam, hospital.dutyName)}</span>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation(); 
                        favoriteStar(hospital, index);
                        
                    }}
                >
                    <img
                        src={images[favorites[index] ? 'star20_on.png' : 'star20_off.png']}
                    />
                </a>
            </div>
            <span>{hospital.dutyAddr}</span>
            <div className="open"><p className={status === "진료중" ? "green" : "red"}>{status}</p>{open && close ? `${open} ~ ${close}` : ""}</div>
            <div className="grade flex">
                <span>3.2</span>
                <div className="img" >
                    <img src={images['grade3.png']} alt=""/>
                </div>
                리뷰 19건
            </div>
        </li>
    );
};
export default HospitalListItem;