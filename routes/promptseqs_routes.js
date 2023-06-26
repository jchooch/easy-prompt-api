const express = require("express");
const router = express.Router();
const promptSeqsController = require("../controllers/promptseqs_controller");

// "/promptseqs"

router
  .route("/")
  .post(promptSeqsController.postToPromptSeqs);

router
  .route("/:userID")
  .get(promptSeqsController.getPromptSeqsByUserID);

router
  .route("/:promptSeqID")
  .put(promptSeqsController.putPromptSeqByID)
  .delete(promptSeqsController.deletePromptSeqByID);

module.exports = router;
