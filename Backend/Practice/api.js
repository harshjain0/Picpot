const express = require('express');
const axios = require("axios");

const app = express();
app.use(express.urlencoded({ extended: true }))

// axios({
//     method: "get",
//     url: "https://type.fit/api/quotes"
// }).then((response) => {
//     console.log(response.data[Math.trunc(Math.random()*16)]);
// }, (error => {
//     console.log(error);
// })
// )

app.post("/", (req, res) => {

    const tempURL = "https://v6.exchangerate-api.com/v6/9c9058891baba33d7ec4b639/pair";
    const amount = Number(req.body.input1);
    const currCode1 = req.body.convert_from;
    const currCode2 = req.body.convert_to;
    const finalURL = `${tempURL}/${currCode1}/${currCode2}`;
    console.log(finalURL);

    axios({
        method: "get",
        url: finalURL
    }).then((response) => {
        const result = response.data.conversion_rate * amount;
        res.send(amount + " in " + currCode1 + " to " + currCode2 + " = " + result)
    }, (error => {
        console.log(error);
    })
    )
})



app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/api.html`)
})

app.listen(5000, () => {
    console.log("server running at 5000");
})