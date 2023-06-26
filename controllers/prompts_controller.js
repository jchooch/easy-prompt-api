const knex = require("knex")(require("../knexfile"));

// TESTED: WORKS.
const getPromptsByUserID = (req, res) => {
  knex("prompts")
    .where({ user_id: req.params.userID })
    .then((result) => {
      if (result.length === 0) {
        return res
          .status(404)
          .send(`No prompts for user with ID ${req.params.userID}.`);
      } else {
        return res.status(200).json(result);
      }
    })
    .catch((err) => {
      return res.status(500).send(`Error retrieving prompts: ${err}`);
    });
};

// TESTED: WORKS.
const postToPrompts = (req, res) => {
  if (
    !req.body.user_id ||
    !req.body.content ||
    !req.body.label ||
    !req.body.order
  ) {
    return res
      .status(400)
      .send(
        "Please provide required information (user_id, content, label, order) in the request"
      );
  }

  knex("prompts")
    .insert(req.body)
    .then((result) => {
      return knex("prompts").where({ id: result[0] });
    })
    .then((addedPrompt) => {
      return res.status(201).json(addedPrompt);
    })
    .catch(() => {
      return res.status(500).json({ message: "Unable to create new prompt" });
    });
};

// TESTED: WORKS
const putPromptByID = async (req, res) => {
  let updateObject = {};
  for (let elem of ["promptseq_id", "content", "label", "order"]) {
    if (req.body[elem]) {
      updateObject[elem] = req.body[elem];
    }
  }
  if (Object.keys(updateObject).length === 0) {
    return res
      .status(400)
      .send(
        "Please provide at least one valid change (promptseq_id, content, label, order) in the request."
      );
  }

  await knex("prompts")
    .where({ id: req.params.promptID })
    .update(updateObject)
    .catch(() => res.status(500).json({ message: "Unable to update prompt." }));

  await knex("prompts")
    .where({ id: req.params.promptID })
    .select()
    .then((updatedPrompt) => {
      return res.status(201).json(updatedPrompt);
    })
    .catch(() => res.status(500).json({ message: "Unable to update prompt." }));
};

// TESTED: WORKS
const deletePromptByID = (req, res) => {
  knex("prompts")
    .where({ id: req.params.promptID })
    .del()
    .then((result) => {
      if (result === 0) {
        return res.status(400).json({
          message: `Prompt to be deleted with ID ${req.params.promptID} not found.`,
        });
      } else {
        return res
          .status(204)
          .send({ message: `Prompt with ID ${req.params.promptID} deleted.` });
      }
    })
    .catch(() => {
      return res.status(500).send({
        message: `Unable to delete prompt with ID ${req.params.promptID}`,
      });
    });
};

module.exports = {
  getPromptsByUserID,
  postToPrompts,
  putPromptByID,
  deletePromptByID,
};
