const studentdata = require("../model/StudentData");

//get login page of teacher

const teacher_get_login = (req,res)=>{
    try {
        res.render('teacher_login');
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

// login functionality
const teacher_post_login = async (req,res) => {
    const { username, password } = req.body;
    try {
        if (username == "teacher123@gmail.com" && password == "pass@123") { 
            res.cookie('admin','true');
            const data = await studentdata.find();
            res.render('all_student', { students: data,success_message:"Login Successfully!" });
        }
        else {
            res.render('teacher_login', { message: "Invalid username or password, Please try again." })
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

//Logout Functionality 

const teacher_logout = async (req,res) => {
     try {
         if(req.cookies.admin=='true'){
            res.clearCookie('admin');
            res.render('home');
          }
          else{
            res.redirect('back');
          }
      }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
};


// get all students
const all_students = async (req, res) => {
    try {
         if (req.cookies.admin == 'true') {
            const allStudents = await studentdata.find();
            res.render('all_student', { students: allStudents,edit:'false'});
        }
        else {
           res.render('home');
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const addrecord =  (req,res) => {
    try
    {
    if(req.cookies.admin == 'true')
    {
        res.render('add_record',{edit:'false'})
    }
    else{
        res.redirect('back');
    }
  }
  catch(error)
  {
    console.log(error)
    res.redirect('back');
  }
}
const student_post = async (req, res) => {
    const { name, rollNumber, dob, marks } = req.body;
    try {
        const st = await studentdata.findOne({ rollNumber });
        if (st) {
            return res.render('add_record', { message: "Roll Number is already present",edit:'false'  });
        }
        await studentdata.create(req.body);
        const newstudent=await studentdata.find({});
        return res.redirect('/teacher/allstudents');
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');

    }
};

//delete student

const deleteData = async (req, res) => {
    try {
         if (req.cookies.admin == 'true') {
             await studentdata.findByIdAndDelete(req.params.id)
            res.redirect('/teacher/allstudents');
        }
        else {
            res.render('home');
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
};

//update student details
const get_edit_student = async (req,res)=>{
  
    try {
      const {id} = req.params;  
      const st=await studentdata.findById(id);
      res.render('add_record',{edit:'true', st});
    } 
    catch (error) {
      console.log(error);
      res.send(error);
    }    
  }

const post_edit_student =  async(req,res)=>{
    const{rollNumber} = req.body
   try {
     const id=req.body.Id;
     const std = await studentdata.findById(id);
     const std_rollno = await studentdata.findOne({ rollNumber,_id: {$ne: std } });
     if(std_rollno)
     {
      return  res.render('add_record',{edit:'true',message : 'Roll Number is already exist',st:std});
     }
     
     delete (req.body.Id);
     const st = await studentdata.findByIdAndUpdate(id,req.body);
     
     if(!st){
       res.send('Data not found with this id')
       return;
     }
     const students=await studentdata.find({});
        
       res.redirect('/teacher/allstudents');
 
     
   } catch (error) {
     console.log(error);    
   }
 }    




module.exports = {
    teacher_get_login,
    teacher_post_login,
    teacher_logout,
    all_students,
    addrecord,
    student_post,
    deleteData,
    get_edit_student,
    post_edit_student

}