const multer = require("multer");
const picUpload = multer({
    limits: 2000000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/users');
        },
        filename: (req, file, cb) => {
            cb(null, `${req.body.userid}-${req.body.title}-${Math.trunc(Math.random() * 100).$file.mimetype.split("/")[1]}`);
        }
    })
})

module.export = picUpload;