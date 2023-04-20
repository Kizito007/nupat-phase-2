const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

const { userRoute } = require("./routes/userRoutes.js");

app.use("/api/users", userRoute);

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});
