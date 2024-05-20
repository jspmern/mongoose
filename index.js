let connection = require("./db/conn");
let express = require("express");
let app = express();


//this is my db connection
connection();
let {detail}=require('./model/studentModel')
app.use(express.json())
app.get("/", (req, res) => {
  res.send("hello home page");
});

app.post('/register', async (req, res) => {
  try {
 
    let { name="admin", age=null, add='unknow', phone=null,email='' } = req.body;
     let result =  new detail({name,age,add,phone,email});  
     let data= await result.save()
    if (data) {
      res.send("register successfull");
    } else {
      res.send("somthing wrong");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});
app.listen(8000, () => {
  console.log("server is runing at 8000");
});
