let express = require("express");
let connection = require("./db/conn");
let app = express();
let { student } = require("./model/studentModel");
//call the db
connection();

//middlware
app.use(express.json());
//routes
app.get("/", (req, res) => {
  res.send({ message: "hello in my world" });
});
//this route is related to registration
app.post("/register", async (req, res) => {
  try {
    let { name, email, password,gender,course } = req.body;
    let data = new student({ name, email, password,gender,course });
    let result = await data.save();
    if (result) {
      res.status(200).send({ message: "Register successfully" });
    } else {
      res.status(500).send({ message: "Somthing wrong while registration" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen(8000, () => {
  console.log("connect at 8000");
});
