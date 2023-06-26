const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks_controller");

// "/tasks"

router
  .route("/")
  .post(tasksController.postToTasks);

router  
  .route("/:userID")
  .get(tasksController.getTasksByUserID);

router
  .route("/:taskID")
  .put(tasksController.putTaskByID)
  .delete(tasksController.deleteTaskByID);

module.exports = router;