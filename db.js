//step 1
let mongoose=require('mongoose')
async function connection()
{
    //this is the local address for every mongodb server after the forward slash(/) you have to provide database name
   await mongoose.connect(`mongodb://127.0.0.1:27017/mongoose`)
}
//it is returing promises
connection().then(()=>{
    console.log('data base connect successfull')
}).catch(err => console.log(err));


//schema
let studentSchema= mongoose.Schema({
    name:String,
    age:Number
   })
//method
studentSchema.methods.printDetails=function printDetails()
{
    console.log(`my name id ${this.name} and age is ${this.age}`)
}

//model (collection name is  student)
let studentModel=mongoose.model('student',studentSchema)
//this is the way you can insert data
async function insertData()
{
let   result=   await  new studentModel({name:'utsav',age:25}).save()
result.printDetails()
console.log(result)
}
insertData()
