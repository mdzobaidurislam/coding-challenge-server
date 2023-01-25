const express = require("express");
const env = require("dotenv");
const connectDb = require("./config/config");
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// routes
const userRoutes = require("./routes/userRoutes");
const sectorRoutes = require("./routes/sectorRoutes");
const taskRoutes = require("./routes/taskRoutes");

// environment variables or you can say constants
env.config();

connectDb();

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
// Root Api start
app.use("/api/", userRoutes);
app.use("/api/", sectorRoutes);
app.use("/api/", taskRoutes);
// Root Api end

app.get("/", (req, res) => {
  res.send("Welcome to express server!");
});

app.post("/data", (req, res) => {
  res.status(200).json({ message: req.body });
});

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});
