let { student } = require("../model/studentModel");
let bcrypt = require("bcrypt");
const { encryptHandler, passwordCompareHandler } = require("../utilites/bcrypt");

//this is for all user
let allEmpController = async (req, res) => {
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
};
//this is for specfic user details route
let userByIdController = async (req, res) => {
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
};

//this for update
let userUpdateController = async (req, res) => {
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
};
//this is for delete
let delteUserController = async (req, res) => {
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
};
///this is for the registration
let newUserRegisController = async (req, res) => {
  try {
    let { name, email, password, gender, course } = req.body;

    if (!name || !email || !password || !gender || !course) {
      return res.status(401).send({ message: "All field are required*" });
    } else {
      let hashPassword = password && await encryptHandler(password)
       
      //before storing in db you must have to salt your password
      let data = new student({
        name,
        email,
        password: hashPassword,
        gender,
        course,
      });
      let result = await data.save();
      if (result) {
        console.log("test");
        res.status(200).send({ message: "Register successfully" });
      } else {
        res.status(500).send({ message: "Somthing wrong while registration" });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//this is for the login user
let userLoginController = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(402).send({ message: "All field are required *" });
  } else {
    let findData = await student.findOne({ email: email });
    if (findData) {
      let result = await passwordCompareHandler(password,findData.password)
      if (result) {
        res.status(200).send({message:`Mr./Mrs.${findData.name?findData.name:"Guest"} is login successfully`})
      } else {
        return res
          .status(402)
          .send({ message: "Either password or email is wrong !" });
      }
    } else {
      return res
        .status(402)
        .send({ message: "Either password or email is wrong !" });
    }
  }
};
module.exports = {
  allEmpController,
  userByIdController,
  userUpdateController,
  delteUserController,
  newUserRegisController,
  userLoginController,
};
