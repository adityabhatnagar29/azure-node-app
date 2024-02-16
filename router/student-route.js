const express = require('express');
const router = express.Router();
const student = require('../controller/student');

router.get("/resultcheck",student.result_get);

router.post("/resultcheck",student.post_result);

module.exports=router;