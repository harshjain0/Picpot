import React from "react";
import "./Usersitems.css"
import { Link } from "react-router-dom";

const Usersitems = (props) => {
    return (
        <li className="useritem">
            <div className="useritem-content">
                <Link to ={`${props.id}/locations`}>
                <div className="useritem-pic">
                    <img src={props.pic} alt={props.name} />
                </div>
                <div className="useritem-infor">
                    <h2>{props.name}</h2>
                    <h3>{props.locationcount}
                        {props.locationcount === 1 ?" Location" : " Locations"}</h3>
                </div>
                </Link>
            </div>
        </li>
    )
}

export default Usersitems;