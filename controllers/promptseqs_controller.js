const knex = require("knex")(require("../knexfile"));

// TESTED: WORKS
const getPromptSeqsByUserID = (req, res) => {
  knex("promptseqs")
    .where({ user_id: req.params.userID })
    .then((result) => {
      if (result.length === 0) {
        return res
          .status(404)
          .send(`No promptseqs for user with ID ${req.params.userID}.`);
      } else {
        return res.status(200).json(result);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(`Error retrieving promptseqs: ${err}`);
    });
};

// TESTED: WORKS
const postToPromptSeqs = (req, res) => {
  if (!req.body.user_id || !req.body.label) {
    return res
      .status(400)
      .send(
        "Please provide required information (user_id, label) in the request."
      );
  }

  knex("promptseqs")
    .insert(req.body)
    .then((result) => {
      return knex("promptseqs").where({ id: result[0] });
    })
    .then((addedPromptSeq) => {
      return res.status(201).json(addedPromptSeq);
    })
    .catch(() => {
      return res
        .status(500)
        .json({ message: "Unable to create new promptseq" });
    });
};

// TESTED: WORKS
const putPromptSeqByID = async (req, res) => {
  let updateObject = {};
  for (let elem of ["label"]) {
    if (req.body[elem]) {
      updateObject[elem] = req.body[elem];
    }
  }
  if (Object.keys(updateObject).length === 0) {
    return res
      .status(400)
      .send(
        "Please provide at least one valid change (label) in the request."
      );
  }

  await knex("promptseqs")
    .where({ id: req.params.promptSeqID })
    .update(updateObject)
    .catch(() => res.status(500).json({ message: "Unable to update promptseq." }));

  await knex("promptseqs")
    .where({ id: req.params.promptSeqID })
    .select()
    .then((updatedPromptSeq) => {
      return res.status(201).json(updatedPromptSeq);
    })
    .catch(() => res.status(500).json({ message: "Unable to send updated promptseq." }));
};

// TESTED: WORKS
const deletePromptSeqByID = (req, res) => {
  knex("promptseqs")
    .where({ id: req.params.promptSeqID })
    .del()
    .then((result) => {
      console.log(result);
      if (result === 0) {
        return res.status(400).json({
          message: `Promptseq to be deleted with ID ${req.params.promptSeqID} not found.`,
        });
      } else {
        return res.status(204).send();
      }
    })
    .catch(() => {
      return res.status(500).json({
        message: `Unable to delete promptseq with ID ${req.params.promptSeqID}`,
      });
    });
};

module.exports = {
  getPromptSeqsByUserID,
  postToPromptSeqs,
  putPromptSeqByID,
  deletePromptSeqByID,
};
