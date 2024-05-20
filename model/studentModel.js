let mongoose = require("mongoose");
let empSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type:String,
    require:true,
    unique:true
  },
  age: Number,
  add: {
    ca: String,
    pa: String,
  },
  phone: String,
  
});

let detail = mongoose.model("detail", empSchema);
module.exports = { detail };
