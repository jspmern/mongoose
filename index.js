let express = require("express");
let connection = require("./config/conn");
let {user_route}=require('./Route/userRoute')
let{hobbies_route} = require('./Route/hobbiesRoute')
let app = express();
//call the db
connection();
//middlware
app.use(express.json());
    //routes
app.use(user_route)
app.use('/api/v1',hobbies_route)


app.listen(8000, () => {
  console.log("connect at 8000");
});
