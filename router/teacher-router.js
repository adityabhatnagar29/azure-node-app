const express = require("express");
const router = express.Router();
const teacher = require("../controller/teacher");

router.get('/login',teacher.teacher_get_login);
router.post('/login',teacher.teacher_post_login);
router.get('/logout',teacher.teacher_logout);
router.get('/allstudents',teacher.all_students);
router.get('/student', teacher.addrecord);
router.post('/add', teacher.student_post);
router.get('/delete/:id',teacher.deleteData);
router.get('/edit/:id',teacher.get_edit_student);
router.post('/editstudent', teacher.post_edit_student);


module.exports=router;