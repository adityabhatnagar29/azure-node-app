const studentdata = require("../model/StudentData");

//get student result
const result_get = (req,res)=>{
    try{
        res.render("student_login");
    }catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


const post_result = async (req,res)=>{
    try{
    const { rollNumber, dob } = req.body;
    const data = await studentdata.findOne({ rollNumber, dob });

    if(data){
        if(data.marks >= 35){
            res.render('result_Page', { studentresult: data, message: 'Congratulation! You have passed the exam.' });
        }else{
            res.render('result_Page', { studentresult: data, message: 'Better luck next time. All The Best.' });
        }

    }else{
        res.render('student_login', { message: "Invalid Roll Number or Date of Birth, Please try again." });
    }
}catch(err){
    console.error(err);
    res.status(500).send("Internal Server Error");
}

};

module.exports={
    result_get,
    post_result
}