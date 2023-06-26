const express = require("express");
const router = express.Router();
const promptsController = require("../controllers/prompts_controller");

// "/prompts"

router
  .route("/")
  .post(promptsController.postToPrompts);


router
  .route("/:userID")
  .get(promptsController.getPromptsByUserID);

router
  .route("/:promptID")
  .put(promptsController.putPromptByID)
  .delete(promptsController.deletePromptByID);

module.exports = router;