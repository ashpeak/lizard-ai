require("dotenv").config();

const express = require("express");
const cors = require("cors");
const create = require("./routes/createVideo.v1");
const image = require("./routes/uploadImage");
const userAuth = require("./routes/user");
const media = require("./routes/media");
const project = require("./routes/project");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable cors
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors({ origin: '*' }));

//api routes
app.use("/v1", create);
app.use("/image", image);
app.use("/user", userAuth);
app.use("/media", media);
app.use("/project", project);

app.get("/", (req, res) => {
    res.send("Hello World");
});


// start the server listening for requests
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
});