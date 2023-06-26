const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");

// "/users"

router
  .route("/")
  .post(usersController.postToUsers);

router
  .route("/:username")
  .get(usersController.getUserByUsername);

// router
//   .route("/:userID")
//   .put(usersController.putUser)
//   .delete(usersController.deleteUser);

module.exports = router;