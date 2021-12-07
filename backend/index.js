const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const cors = require("cors")
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

dotenv.config();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());

mongoose
.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => 
    console.log("MongoDB Connected")
)
.catch(err => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

app.listen(8800, () => {
    console.log("backend server is running!");
});