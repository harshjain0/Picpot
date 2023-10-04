import React, { useState, useContext } from "react";
import "./NewLocations.css";
import { LoginContext } from "../../common/components/context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const NewLocations = () => {
    const history=useHistory();
    const login = useContext(LoginContext);
    const [error, setError] = useState(null);
    const [Picture,setPicture]=useState();
    const [newlocations, setNewlocation] = useState({
        title: "",
        desc: "",
        address: "",
    });
    const submitHandler = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            const formdata=new FormData();
            formdata.append("title", newlocations.title );
            formdata.append("desc",newlocations.desc);
            formdata.append('address',newlocations.address );
            formdata.append('pic', Picture )
            formdata.append("userid",login.userID)
            const response = await fetch("http://localhost:5000/api/locations/", {
                method: "POST",
                // header: {
                //     "content-type": "applications/json"
                // },
                // body: JSON.stringify({
                //     title: newlocations.title,
                //     desc: newlocations.desc,
                //     address: newlocations.address,
                //     userid: login.userID
                // })
                body:formdata,
            })
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            history.push("/");
        } catch (err) {
            alert(err.message, () => {
                setError(null);
            })
            setError(err.message);
        }
        console.log("new location page:", newlocations)
    };
    const changeHandler = (event) => {
        const newValue = event.target.value;
        const inputname = event.target.name;

        setNewlocation(previousvalue => {
            if (inputname === "newlocationtitle") {
                return {
                    title: newValue,
                    desc: previousvalue.desc,
                    address: previousvalue.address
                }
            }
            if (inputname === "newlocationdesc") {
                return {
                    title: previousvalue.title,
                    desc: newValue,
                    address: previousvalue.address
                }
            }
            if (inputname === "newlocationaddr") {
                return {
                    title: previousvalue.title,
                    desc: previousvalue.desc,
                    address: newValue
                }
            }

        }
        )
    };
    const getpicHandler=(event)=>{
        let picfile;
        if(event.target.files && event.target.files.length===1){
            picfile=event.target.files[0];
            setPicture(picfile);

        }else{
            alert("Picture not found");
            setError(null);
        }
    }
    return (
        <form className="location-form" onSubmit={submitHandler}>
            <div className="form-control">
                <label>
                    Title
                    <input name="newlocationtitle" type="text" required onChange={changeHandler} />
                </label>
            </div>
            <div className="form-control">
                <label>
                    Description
                    <textarea name="newlocationdesc" rows="3" required onChange={changeHandler} />
                </label>
            </div>
            <div className="form-control">
                <label>
                    Address
                    <input name="newlocationaddr" type="text" required onChange={changeHandler} />
                </label>
            </div>
            <div>
                <label>
                    Upload Picture
                    <input name="newimgfile"
                    type="file"
                    accept="image/jpg,image/png,image/jpeg"
                    required
                    className="inputfile"
                    onChange={getpicHandler}/>
                </label>
            </div>
            <div className="form-control">
                <button>Submit</button>
            </div>

        </form>
    );
};


export default NewLocations;