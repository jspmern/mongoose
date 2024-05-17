let mongoose=require('mongoose');
//schema
    let studentSchema= mongoose.Schema({
        name:String,
        age:Number
       })
 //model (collection name is  student)
 let studentModel=mongoose.model('student',studentSchema)
 
 async function insertData()
 {
    let   result=   await  new studentModel({name:'utsav',age:25}).save()
    console.log(result)
 }
 insertData()
  

 
 
  