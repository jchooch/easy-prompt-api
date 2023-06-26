const knex = require("knex")(require("../knexfile"));

// TESTED: WORKS
const getTasksByUserID = (req, res) => {
  knex("tasks")
    .where({ user_id: req.params.userID })
    .then((result) => {
      if (result.length === 0) {
        return res
          .status(404)
          .send(`No tasks for user with ID ${req.params.userID}.`);
      } else {
        return res.status(200).json(result);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(`Error retrieving tasks: ${err}`);
    });
};

// TESTED: WORKS
const postToTasks = (req, res) => {
  if (!req.body.user_id || !req.body.taskset_id || !req.body.content) {
    return res
      .status(400)
      .send(
        "Please provide required information (user_id, taskset_id, content) in the request."
      );
  }

  knex("tasks")
    .returning("id")
    .insert(req.body)
    .then((addedTaskID) => {
      return knex("tasks").where({ id: addedTaskID[0] });
    })
    .then((addedTask) => {
      return res.status(201).json(addedTask);
    })
    .catch((error) => {
      return res.status(500).json({
        error: error,
        message: "Unable to create new task",
      });
    });
};

// TESTED: WORKS
const putTaskByID = async (req, res) => {
  let updateObject = {};
  for (let elem of ["taskset_id", "content"]) {
    if (req.body[elem]) {
      updateObject[elem] = req.body[elem];
    }
  }
  if (Object.keys(updateObject).length === 0) {
    return res
      .status(400)
      .send(
        "Please provide at least one valid change (taskset_id, content) in the request."
      );
  }

  await knex("tasks")
    .where({ id: req.params.taskID })
    .update(updateObject)
    .catch(() => res.status(500).json({ message: "Unable to update task." }));

  await knex("tasks")
    .where({ id: req.params.taskID })
    .select()
    .then((updatedTask) => {
      return res.status(201).json(updatedTask);
    })
    .catch(() => res.status(500).json({ message: "Unable to send updated task." }));
};

// TESTED: WORKS
const deleteTaskByID = (req, res) => {
  knex("tasks")
    .where({ id: req.params.taskID })
    .del()
    .then((result) => {
      console.log(result);
      if (result === 0) {
        return res.status(400).json({
          message: `Task to be deleted with ID ${req.params.taskID} not found.`,
        });
      } else {
        return res.status(204).send();
      }
    })
    .catch(() => {
      return res.status(500).json({
        message: `Unable to delete task with ID ${req.params.taskID}`,
      });
    });
};

module.exports = {
  getTasksByUserID,
  postToTasks,
  putTaskByID,
  deleteTaskByID,
};
