const express = require("express");
const route= require("./router/student-route");
const teacherRoute=require("./router/teacher-router");
const bodyParse = require("body-parser");
const cookieParser = require("cookie-parser");
const student=require("./model/StudentData")

const app = express();
 app.use(bodyParse.urlencoded({ extended: true }));
 app.use(cookieParser());

//HomePage
app.get('/', async (req, res) => {

    let flag='false';
    if(req.cookies.admin=='true'){
      flag='true';
      const students=await student.find({});
      res.render('all_student',{loggedin:flag, sts:students});
    }
    else{
      res.render('home',{loggedin:flag});
    }
  })

//mongoDb Connection
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://adityabhatnagar:ivHRpf4MqMskIWSd@cluster0.6bh5q1s.mongodb.net/?retryWrites=true&w=majority").then(() =>
 console.log('Connected to database'))
.catch((err) => { console.error(err); });

//view engine
app.set('view engine', 'ejs');

app.use('/views/images', express.static('./views/images'));


//student router
app.use("/result",route);
//teacher router
app.use('/teacher',teacherRoute);



//server creation
app.listen(8080, () =>{
    console.log("Server running")
});
