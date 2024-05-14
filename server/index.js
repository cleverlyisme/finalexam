const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { connectDB } = require("./configs/db");
const { errorHandler } = require("./middlewares/error.middleware");
const routes = require("./routes/index");
const environments = require("./utils/environments");

const { PORT } = environments;

dotenv.config();

connectDB();

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`ToEdu app listening on port ${PORT}`);
});
