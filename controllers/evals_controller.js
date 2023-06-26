const knex = require("knex")(require("../knexfile"));

// TESTED: WORKS
const getEvalsByUserID = (req, res) => {
  knex("evals")
    .where({ user_id: req.params.userID })
    .then((result) => {
      if (result.length === 0) {
        return res
          .status(404)
          .send(`No evals for user with ID ${req.params.userID}.`);
      } else {
        return res.status(200).json(result);
      }
    })
    .catch((err) => {
      return res.status(500).send(`Error retrieving evals: ${err}`);
    });
};

// TESTED: WORKS
const postToEvals = (req, res) => {
  if (!req.body.user_id || !req.body.taskset_id || !req.body.promptseq_id) {
    return res
      .status(400)
      .send(
        "Please provide required information (user_id, taskset_id, promptseq_id) in the request."
      );
  }

  knex("evals")
    .returning("id")
    .insert(req.body)
    .then((addedEvalIDs) => {
      return knex("evals").where({ id: addedEvalIDs[0] });
    })
    .then((addedEval) => {
      return res.status(201).json(addedEval);
    })
    .catch((error) => {
      return res.status(500).json({
        error: error,
        message: "Unable to create new eval.",
      });
    });
};

// TESTED: WORKS
const putEvalByID = async (req, res) => {
  let updateObject = {};
  for (let elem of ["user_id", "taskset_id", "promptseq_id"]) {
    if (req.body[elem]) {
      updateObject[elem] = req.body[elem];
    }
  }
  if (Object.keys(updateObject).length === 0) {
    return res
      .status(400)
      .send(
        "Please provide at least one valid change (user_id, taskset_id, promptseq_id) in the request."
      );
  }

  await knex("evals")
    .where({ id: req.params.evalID })
    .update(updateObject)
    .catch(() =>
      res.status(500).json({ message: "Unable to update eval." })
    );

  await knex("evals")
    .where({ id: req.params.evalID })
    .select()
    .then((updatedEval) => {
      return res.status(201).json(updatedEval);
    })
    .catch(() =>
      res.status(500).json({ message: "Unable to send updated eval." })
    );
};

// TESTED: WORKS
const deleteEvalByID = (req, res) => {
  knex("evals")
    .where({ id: req.params.evalID })
    .del()
    .then((result) => {
      if (result === 0) {
        return res.status(400).json({
          message: `Eval to be deleted with ID ${req.params.evalID} not found.`,
        });
      } else {
        return res.status(204).send();
      }
    })
    .catch(() => {
      return res.status(500).json({
        message: `Unable to delete eval with ID ${req.params.evalID}`,
      });
    });
};

module.exports = {
  getEvalsByUserID,
  postToEvals,
  putEvalByID,
  deleteEvalByID,
};
