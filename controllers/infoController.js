const student = require("../models/studentInfoModel")


const studentInfo =async(req, res)=>{
    const {fname,roll,clas} = await req.body
    if(!fname||!roll||!clas){
        res.status(404).json({
            message:"all field required"
        })
    }

    const existStudent = await student.findOne({roll})
    if(existStudent){
        res.json({
            message:"student already exist"
        })
    }
    const newStudent = await student.create({
        fname,
        roll,
        clas
    })
    res.status(201).json({
        message:"new student creation done",
        newStudent
    })
}



const teacherInfo = (req, res)=>{
    res.send("teacher info data")
}

module.exports = {teacherInfo, studentInfo}