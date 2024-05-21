let mongoose=require('mongoose')
let dotenv=require('dotenv')
dotenv.config({path:'../.env'})
 
async function connection()
{
      try{
        
             // await mongoose.connect(`${process.env.MONGO_SERVER}/mern_emp`)
             await mongoose.connect('mongodb://127.0.0.1:27017/mern_emp')
             console.log('db is connecting successfully')
              //console.log(` Database connected at:${process.env.MONGO_SERVER}/mern_emp`)
      } 
      catch(err)
      {
          throw err
      }
}
//this is for exporting
module.exports=connection