const express = require("express");
const app = express();
const dotenv = require("dotenv");
const colors = require("colors");
const multer = require("multer");
const path = require("path");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users.route");
const postRoute = require("./routes/posts.route");
const categoryRoute = require("./routes/categories.route");

// env config
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;
// app.use("/images", express.static(path.join(__dirname, "/images")));

// connect with mongodb atlas
const connectedDB = require("./db/connect");
connectedDB();

// upload an image

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// middleware
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// listen app
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
