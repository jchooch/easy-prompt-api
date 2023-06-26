const e = require("cors");

const knex = require("knex")(require("../knexfile"));

// TESTED: WORKS
const getUserByUsername = (req, res) => {
  console.log(req.params.username);
  knex("users")
    .where({ username: req.params.username })
    .then((result) => {
      if (result.length === 0) {
        res.status(404).send(`No user with username ${req.params.username}.`);
      } else {
        res.status(200).json(result[0]);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Error retrieving user: ${err}`);
    });
};

// TESTED: WORKS
const postToUsers = (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.role) {
    return res
      .status(400)
      .send("Please provide username, password, and role in the request.");
  } else {
    knex("users")
      .where({ username: req.body.username })
      .then((result) => {
        if (result.length > 0) {
          return res.status(200).json({ error: "username_taken" });
        } else {
          knex("users")
            .insert(req.body)
            .then((result) => {
              console.log(result);
              return knex("users").where({ id: result[0] });
            })
            .then((addedUser) => {
              return res.status(201).json(addedUser);
            })
            .catch((error) => {
              return res.status(500).json({ message: error });
            });
        }
      })
      .catch((error) => {
        return res.status(500).json({ message: error });
      });
  }
};

// TESTED?
const putUser = () => {
  console.log("Someone tried to put a user.");
};

// TESTED?
const deleteUser = () => {
  console.log("Someone tried to delete a user.");
};

module.exports = {
  getUserByUsername,
  postToUsers,
  putUser,
  deleteUser,
};
