import React from "react";
import { images } from "../../utils/images";

const EmergencyList = ({results, onClick}) => {
    // detail, list 에서 사용
    const getImage = (value, total, type) => {
        if(!value || !total || total === 0) return null;

        const percentage = (value / total) * 100;

        if(type === "general") {
            if(percentage >= 80) return images['green_circle11.png'];
            if(percentage >= 50) return images['yellow_circle11.png'];
            return images['red_circle11.png'];
        } else if (type === "isolation") {
            if(percentage === 100) return images['green_circle11.png'];
            if(percentage >= 50) return images['yellow_circle11.png'];
            return images['red_circle11.png'];
        }
        return null;
    };
    const formatField = (field1, field2) => {
        return field1 && field2 ? `${field1} / ${field2}` : "N/A";
    };
    const getStyleForText = (text) => {
        return text == "정보없음" ? {color: "gray"} : {};
    };
    const cleanAddressName = (name) => {
        return name.replace(/&#40;/g, "(").replace(/&#41;/g, ")");
    };

    if(!results || results.length === 0) {
        return <div className="list">표시할 데이터가 없습니다.</div>;
    }

    return (
        <>
            {results.map((item, index) => (
                <div className="list" key={`list-${index}`}>
                    <div className="list-item" key={`list-item-${index}`} onClick={() => onClick(item)}>
                        <div className="title">
                            <div className="name r18mc">{item.dutyName}</div>
                            <div className="gray-name r158">{item.dutyEmclsName || "응급실"}</div>
                        </div>
                        <div className="address-box acg9 r15b">
                            <img src={images['main_icon_place.png']} alt="" />
                            <div className="address">{cleanAddressName(item.dutyAddr) || "주소 정보 없음"}</div>
                        </div>
                        <div className="phone-box acg9 r15b">
                            <img src={images['main_icon_tel.png']} alt="" />
                            <div className="phone">{item.dutyTel3 || "전화번호 정보 없음"}</div>
                        </div>
                        {
                            item.hvec && (
                                <div className="sickbed-box acg9 r15b">
                                    <img src={images['sickbed15.png']} alt="" />
                                    <div className="sickbed">병상수</div>
                                    <div className="subsickbed r128">(가용병상수/기준병상수)</div>
                                </div>
                            )
                        }
                    </div>
                    {
                        item.hvec && (
                        <>
                            <table className="s-table">
                                <thead className="r13w">
                                    <tr>
                                        <th>일반</th>
                                        <th>코호트 격리</th>
                                        <th>음압격리</th>
                                        <th>일반격리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {getImage(item.hvec, item.hvs01, "general") && (
                                                <img src={getImage(item.hvec, item.hvs01, "general")} alt="일반" />
                                            )}
                                            {formatField(item.hvec, item.hvs01)} 
                                        </td>
                                        <td>
                                            {getImage(item.hv27, item.hvs59, "general") && (
                                                <img src={getImage(item.hv27, item.hvs59, "general")} alt="코호트 격리" />
                                            )}
                                            {formatField(item.hv27, item.hvs59)} 
                                        </td>
                                        <td>
                                            {getImage(item.hv29, item.hvs03, "isolation") && (
                                                <img src={getImage(item.hv29, item.hvs03, "isolation")} alt="음압격리" />
                                            )}
                                            {formatField(item.hv29, item.hvs03)} 
                                        </td>
                                        <td>
                                            {getImage(item.hv30, item.hvs04, "isolation") && (
                                                <img src={getImage(item.hv30, item.hvs04, "isolation")} alt="일반격리" />
                                            )}
                                            {formatField(item.hv30, item.hvs04)} 
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className='s-table'>
                                <thead className="r13w">
                                    <tr>
                                        <th>외상소생실</th>
                                        <th>소아</th>
                                        <th>소아음압격리</th>
                                        <th>소아일반격리</th>
                                    </tr>
                                </thead>
                                <tbody className="r13b">
                                    <tr>
                                        <td style={getStyleForText("정보없음")}>정보없음</td>
                                        <td>
                                            {getImage(item.hv28, item.hvs02, "general") && (
                                                <img src={getImage(item.hv28, item.hvs02, "general")} alt="소아" />
                                            )}
                                            {formatField(item.hv28, item.hvs02)} 
                                        </td>
                                        <td>
                                            {getImage(item.hv15, item.hvs48, "isolation") && (
                                                <img src={getImage(item.hv15, item.hvs48, "isolation")} alt="소아음압격리" />
                                            )}
                                            {formatField(item.hv15, item.hvs48)} 
                                        </td>
                                        <td>
                                            {getImage(item.hv16, item.hvs49, "isolation") && (
                                                <img src={getImage(item.hv16, item.hvs49, "isolation")} alt="소아일반격리" />
                                            )}
                                            {formatField(item.hv16, item.hvs49)} 
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                        )
                    }
                </div>
            ))}
        </>
    )   
}
export default EmergencyList;