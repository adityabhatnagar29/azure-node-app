
const mongoose = require("mongoose")
 
const student_schema = new mongoose.Schema({
    name: String,
    rollNumber: Number,
    dob:String,
    marks:Number,
});
 
const students = mongoose.model("students",student_schema);
 
module.exports= students;