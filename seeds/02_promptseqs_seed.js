/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("promptseqs").del();
  await knex("promptseqs").insert([
    {
      id: 1,
      user_id: 1,
      label: "Great Poets",
    },
    {
      id: 2,
      user_id: 1,
      label: "Johnson on Poetry",
    },
    {
      id: 3,
      user_id: 1,
      label: "Clean Code",
    },
    {
      id: 4,
      user_id: 1,
      label: "Code Lifecycle",
    },
    {
      id: 5,
      user_id: 1,
      label: "Fun"
    }
  ]);
};
