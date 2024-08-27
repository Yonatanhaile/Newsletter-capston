const express = require("express");
const bodyParser = require("body-parser");
const request = require("request"); 
const https = require("https");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/Sign-Up.html");
})

app.post("/", function (req, res) {
    const firstName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.email;

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/e959d043df";
    const options = {
        method: "POST",
        auth: "Rihana:" + process.env.API_KEYs
    }
    console.log(process.env.API_KEYs)
    
    const requestt = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } 
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    requestt.write(jsonData);
    requestt.end();








})

app.post("/failure", function(req, res){
    res.redirect("/")
})



app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
    
})
