/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("tasksets").del();
  await knex("tasksets").insert([
    { id: 1, user_id: 1, label: "Poetry-writing" },
    { id: 2, user_id: 1, label: "Coding" },
    { id: 3, user_id: 1, label: "Fun speech" },
    // { id: 3, user_id: 1, label: "Arithmetic"},
    // { id: 4, user_id: 1, label: "History" }
  ]);
};
