const express = require("express")//install express to use it 
const cors = require("cors")//install cors to use it
const app = express()
const nodemailer = require("nodemailer");//install nodemailer to use it
const mongoose = require("mongoose")//install mongoose to use it

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://sri:123@cluster0.hk41k.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("connected to DB")
}).catch(() => {
    console.log("failed to connect")
})

const credential = mongoose.model("credential", {}, "bulkmail")




app.post("/sendemail", (req, res) => {


    const msg = req.body.msg
    const emaillist = req.body.emaillist

    // fetching the user and pass from db
    credential.find().then((data) => {
        // console.log(data[0].toJSON())
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: data[0].toJSON().user,
                pass: data[0].toJSON().pass,
            },
        });

        new Promise(async (resolve, reject) => {
            try {
                for (var i = 0; i < emaillist.length; i++) {

                    await transporter.sendMail({
                        from: "srinivassampath883@gmail.com",
                        to: emaillist[i],
                        subject: "Message from bulkmail app",
                        text: msg
                    }
                    )

                }
                resolve("success")
            } catch (error) {
                reject("fail")
            }
        }).then(() => { res.send(true) }).catch(() => { res.send(false) })

    }).catch((error) => {
        console.log(error)
    })



})

app.listen(5000, () => {
    console.log("server started")

})



// const express = require("express")//install express to use it
// const cors = require("cors")//install cors to use it
// const nodemailer = require("nodemailer");
// const mongoose = require("mongoose")


// const app = express()

// app.use(cors());
// app.use(express.json());
// //install
// mongoose.connect("mongodb://127.0.0.1:27017/bulkmail").then(function () {
//     console.log("Connected to DB")
// }).catch(function () { console.log("Failed to Connect") })

// app.post("/sendemail", function (req, res) {


//     var msg = req.body.msg
//     var emailList = req.body.emailList

//     const credential = mongoose.model("credential", {}, "passkey")

//     credential.find().then(function (data) {
//         console.log(data)

//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: data[0].toJSON().user,
//                 pass: data[0].toJSON().pass,
//             },
//         });

//         new Promise(async function (resolve, reject) {
//             try {
//                 for (var i = 0; i < emailList.length; i++) {
//                     await transporter.sendMail(
//                         {
//                             from: "shalinivijay1626@gmail.com",
//                             to: emailList[i],
//                             subject: " A Message from bulkmail App",
//                             text: msg
//                         },

//                     )
//                     console.log("Email sent to:" + emailList[i])
//                 }

//                 resolve("Sucesss")
//             }

//             catch (error) {
//                 reject("Failed")
//             }

//         }).then(function () {
//             res.send(true)
//         }).catch(function () {
//             res.send(false)
//         })



//     }).catch(function (error) {
//         console.log(error)
//     })

// })

// app.listen(5000, function () {
//     console.log("Server Started...")
// })