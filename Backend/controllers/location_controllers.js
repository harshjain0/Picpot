const MyError = require("../model/error");

const Location = require("../model/location")

let USER_LOCATIONS = [
    {
        id: "loc1",
        title: "Red Fort",
        desc: "The Red Fort or Lal Qila is a historic fort in the Old Delhi neighbourhood of Delhi, India",
        pic: "https://media-cdn.tripadvisor.com/media/photo-s/21/59/70/42/caption.jpg",
        address: "52HC+VFH, Agra Fort, Rakabganj, Agra, Uttar Pradesh 282003",
        userid: "u1"
    },
    {
        id: "loc2",
        title: "Jaigarh Fort",
        desc: "Jaigarh Fort is situated on the promontory called the Cheel ka Teela (Hill of Eagles) of the Aravalli range",
        pic: "https://www.trawell.in/admin/images/upload/151648856Jaipur_Jaigarh_Fort_Main.jpg",
        address: "Devisinghpura, Amer, Jaipur, Rajasthan 302028",
        userid: "u1"
    },
    {
        id: "loc3",
        title: "Red Fort",
        desc: "The Red Fort or Lal Qila is a historic fort in the Old Delhi neighbourhood of Delhi, India",
        pic: "https://media-cdn.tripadvisor.com/media/photo-s/21/59/70/42/caption.jpg",
        address: "52HC+VFH, Agra Fort, Rakabganj, Agra, Uttar Pradesh 282003",
        userid: "u2"
    }
];

exports.getLocationByLocId = async (req, res, next) => {


    const locid = req.params.locid;       //get locid from the url
    let location;
    try {
        location = await Location.fndById(locid);
    } catch (err) {
        return next(new MyError("Cannot find location of this locid", 404));
    }
    // const location = USER_LOCATIONS.find(loc => { return loc.id === locid });
    if (!location) {
        return next(new MyError("Cannot find location of this locid", 404));
    };
    res.status(200).json({ result: "Success", message: location });
};

exports.getLocationByUserId = async (req, res, next) => {

    const uid = req.params.uid; //get uid from the url
    let locations;
    try {
        locations = await Location.find({ userid: uid })
    } catch (err) {
        return next(new MyError('Cannot get location', 500))
    }

    // const locations = USER_LOCATIONS.filter(loc => { return loc.userid === uid })
    if (!locations) {
        return next(new MyError("Cannot find location of this userid", 404));
    }
    res.status(200).json({ result: "Success", message: locations });

};

exports.createNewLocation = async (req, res, next) => {
    const { title, desc, address, userid } = req.body;
    const newlocation = new Location({
        title,
        desc,
        pic:req.file.path,
        address,
        userid
    });
    try {
        await newlocation.save();
    }
    catch (err) {
        return next(new MyError('Database error:cannot add location',+err,500));
    }
    // const newlocation = { title, desc, address, userid };
    // USER_LOCATIONS.push(newlocation);

    res.status(201).json({ result: "success", message: newlocation })
};

exports.deleteLocation = async (req, res, next) => {
    const locid = req.params.locid;       //get locid from the url
    let location;
    try {
        location = await Location.findByIdAndDelete(locid);
    } catch (err) {
        return next(new MyError("Database error:Cannot delete location", 500));
    }

    // USER_LOCATIONS = USER_LOCATIONS.filter((loc) => {
    //     loc.id !== locid
    // });
    res.status(200).json({ result: "success", message: "successfullt deleted" });
};