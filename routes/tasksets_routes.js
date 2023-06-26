const express = require("express");
const router = express.Router();
const taskSetsController = require("../controllers/tasksets_controller");

// "/tasksets"

router
  .route("/")
  .post(taskSetsController.postToTaskSets);

router
  .route("/:userID")
  .get(taskSetsController.getTaskSetsByUserID)

router
  .route("/:taskSetID")
  .put(taskSetsController.putTaskSetByID)
  .delete(taskSetsController.deleteTaskSetByID);

module.exports = router;