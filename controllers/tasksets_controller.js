const knex = require("knex")(require("../knexfile"));

// TESTED: WORKS
const getTaskSetsByUserID = (req, res) => {
  knex("tasksets")
    .where({ user_id: req.params.userID })
    .then((result) => {
      if (result.length === 0) {
        return res
          .status(404)
          .send(`No tasksets for user with ID ${req.params.userID}.`);
      } else {
        return res.status(200).json(result);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(`Error retrieving tasksets: ${err}`);
    });
};

// TESTED: WORKS
const postToTaskSets = (req, res) => {
  if (!req.body.user_id || !req.body.label) {
    return res
      .status(400)
      .send(
        "Please provide required information (user_id, label) in the request."
      );
  }

  knex("tasksets")
    .returning("id")
    .insert(req.body)
    .then((addedTaskSetIDs) => {
      return knex("tasksets").where({ id: addedTaskSetIDs[0] });
    })
    .then((addedTaskSet) => {
      return res.status(201).json(addedTaskSet);
    })
    .catch((error) => {
      return res.status(500).json({
        error: error,
        message: "Unable to create new taskset.",
      });
    });
};

// TESTED: WORKS
const putTaskSetByID = async (req, res) => {
  let updateObject = {};
  for (let elem of ["user_id", "label"]) {
    if (req.body[elem]) {
      updateObject[elem] = req.body[elem];
    }
  }
  if (Object.keys(updateObject).length === 0) {
    return res
      .status(400)
      .send(
        "Please provide at least one valid change (user_id, label) in the request."
      );
  }

  await knex("tasksets")
    .where({ id: req.params.taskSetID })
    .update(updateObject)
    .catch(() => res.status(500).json({ message: "Unable to update taskset." }));

  await knex("tasksets")
    .where({ id: req.params.taskSetID })
    .select()
    .then((updatedTaskSet) => {
        return res.status(201).json(updatedTaskSet);
    })
    .catch(() =>
      res.status(500).json({ message: "Unable to send updated taskset." })
    );
};

// TESTED: WORKS
const deleteTaskSetByID = (req, res) => {
    knex("tasksets")
    .where({ id: req.params.taskSetID })
    .del()
    .then((result) => {
      console.log(result);
      if (result === 0) {
        return res.status(400).json({
          message: `Taskset to be deleted with ID ${req.params.taskSetID} not found.`,
        });
      } else {
        return res.status(204).send();
      }
    })
    .catch(() => {
      return res.status(500).json({
        message: `Unable to delete taskset with ID ${req.params.taskSetID}`,
      });
    });
};

module.exports = {
  getTaskSetsByUserID,
  postToTaskSets,
  putTaskSetByID,
  deleteTaskSetByID,
};
