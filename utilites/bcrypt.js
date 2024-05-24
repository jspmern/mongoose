let bcrypt=require('bcrypt')
let salt=10
let encryptHandler = async(password)=>{
     return  bcrypt.hash(password,salt)
}
let passwordCompareHandler=async(password,hashPassword)=>{
      return   bcrypt.compare(password,hashPassword)
}
module.exports={encryptHandler,passwordCompareHandler}