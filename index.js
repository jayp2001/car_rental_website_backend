
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// import registerUser from './routes/temp.routes'
require('dotenv').config();
const app = express();

app. use(cors());
app.use(express.json());
const port = process.env.PORT || 3600;
const uri = process.env.MONGOOSE_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
app.use(cors({
    credentials: true, origin: [
      "http://localhost:3000",
      "http://localhost:5000"
    ],
    exposedHeaders: ["set-cookie"],
  }));

  connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
  });
//   const registerUser = require('./routes/temp.routes');
const car = require('./routes/car.routes');
  app.use('/car',car);

  app.listen(port,()=>{
    console.log(`listening through port => ${port}`);
})

