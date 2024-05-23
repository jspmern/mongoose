let { student } = require("../model/studentModel");

//this is for all user
let allEmpController=async (req, res) => {
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
  }
  //this is for specfic user details route
  let userByIdController=async (req, res) => {
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
  }

  //this for update
  let userUpdateController= async (req, res) => {
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
  }
  //this is for delete
  let delteUserController=async (req, res) => {
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
  }
  ///this is for the registration
  let newUserRegisController= async (req, res) => {
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
  }
  module.exports={allEmpController,userByIdController,userUpdateController,delteUserController,newUserRegisController}