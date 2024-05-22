let express = require("express");
let connection = require("./db/conn");
let app = express();
let { student } = require("./model/studentModel");
let { hobbie } = require("./model/hobbiesModel");
//call the db
connection();

//middlware
app.use(express.json());
//routes
//this is for find all
app.get("/", async (req, res) => {
  try {
    let result = await student.find({});
    if (result) {
      res.send({ message: "successfull", data: result });
    } else {
      res.send({ message: "somthing wrong while fetching data" });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});
//this is for finding data by id using parms
app.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await student.findOne({ _id: id });
    if (data) {
      res.send({ message: "success", data });
    } else {
      res.send({ message: "somthing wrong" });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});
//this is for the update
app.patch("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { name } = req.body;
    let data = await student.findByIdAndUpdate(
      { _id: id },
      { $set: { name: name } },
      { new: true }
    );
    if (data) {
      res.send({ message: "successfull", data });
    } else {
      res.send({ message: "somthing wrong while fetching data" });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});
//this is the route for delete
app.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await student.findOneAndDelete({ _id: id });
    if (data) {
      res.status(200).send({ message: "data deleted" });
    } else {
      res.status(500).send({ message: "Somthing wrong while deleting" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
//this route is related to registration
app.post("/register", async (req, res) => {
  try {
    let { name, email, password, gender, course } = req.body;
    let data = new student({ name, email, password, gender, course });
    let result = await data.save();
    if (result) {
      console.log("test");
      res.status(200).send({ message: "Register successfully" });
    } else {
      res.status(500).send({ message: "Somthing wrong while registration" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
//this is for ref (for adding hobbies)
app.post("/hobbies", async (req, res) => {
  try {
    let { hobbies, user } = req.body;
    let data = new hobbie({ hobbies, user });
    let result = await data.save();
    if (result) {
      res.send({ message: "hobbies is added" });
    } else {
      res.send({ message: "hobbies is not added" });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
});
//this for finding hobbies  with user
app.get('/hobbies',async(req,res)=>{
  try{
      let {hobbies_name}=req.body
      let data=await hobbie.find({}).populate("emps")
      res.send(data)
  }
  catch(error)
  {
     res.send({message:error.message})

  }
})

app.listen(8000, () => {
  console.log("connect at 8000");
});
