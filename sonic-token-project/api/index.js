require("dotenv").config();
const express = require("express");
const app = express();
const tokenRoutes = require("./tokenRoutes");
const postRoutes = require("./postRoutes");
const rampRoutes = require("./rampRoutes"); // Add this line

const cors = require("cors");
app.use(cors());

// app.use(cors({
//     origin: "http://localhost:3000" // or your frontend domain
//   }));

app.use(express.json());

// Routes
app.use("/api/token", tokenRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/ramp", rampRoutes); // Add this line


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Sonic API running on http://localhost:${PORT}`);
});
