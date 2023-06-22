const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
app.use(express.json());
app.use(cors());

// Routers
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const visitsRouter = require("./routes/Visits");
app.use("/visits", visitsRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
