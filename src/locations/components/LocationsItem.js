import React from "react";
import "./LocationsItem.css"
const Locationsitems=(props)=>{
    return(
        <li className="locationitem">
            <div className="locationitem-content">
                <div className="locationitem-pic">
                    <img src={`http://localhost:5000/uploads/users/${props.pic}`} alt={props.title}/>
                </div>
                <div className="locationitem-infor">
                    <h2>{props.title}</h2>
                    <h3>{props.desc}</h3>
                    <h3>{props.address}</h3> 
               </div>
            </div>
        </li>
    )

}

export default Locationsitems;