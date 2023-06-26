const express = require("express");
const router = express.Router();
const evalsController = require("../controllers/evals_controller");

// "/evals"

router
  .route("/")
  .post(evalsController.postToEvals);

router
  .route("/:userID")
  .get(evalsController.getEvalsByUserID)

router
  .route("/:evalID")
  .put(evalsController.putEvalByID)
  .delete(evalsController.deleteEvalByID)

module.exports = router;