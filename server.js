require("dotenv").config();
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

const usersRoutes = require("./routes/users_routes");
app.use("/users", usersRoutes);

const promptsRoutes = require("./routes/prompts_routes");
app.use("/prompts", promptsRoutes);

const promptSeqsRoutes = require("./routes/promptseqs_routes");
app.use("/promptseqs", promptSeqsRoutes);

const tasksRoutes = require("./routes/tasks_routes");
app.use("/tasks", tasksRoutes);

const taskSetsRoutes = require("./routes/tasksets_routes");
app.use("/tasksets", taskSetsRoutes);

const evalsRoutes = require("./routes/evals_routes");
app.use("/evals", evalsRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} `);
});
