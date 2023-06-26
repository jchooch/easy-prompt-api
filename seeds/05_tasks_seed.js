/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("tasks").del();
  await knex("tasks").insert([
    {
      id: 1,
      user_id: 1,
      taskset_id: 1,
      content: "Write a short, joyful poem about being outside in the open air in the morning."
    },
    {
      id: 2,
      user_id: 1,
      taskset_id: 1,
      content: "Write a short, melancholy poem about the fundamental and unavoidable isolation of human life."
    },
    {
      id: 3,
      user_id: 1,
      taskset_id: 1,
      content: "Write a short, quirky poem about the curious uniqueness of each and every dog's personality."
    },
    {
      id: 4,
      user_id: 1,
      taskset_id: 2,
      content: "Write a Javascript function which takes an array of strings and constructs the longest possible palindrome from their letters, or returns an empty string if no palindrome can be constructed or if the input is not an array or is an empty array."
    },
    {
      id: 5,
      user_id: 1,
      taskset_id: 2,
      content: "Without using any libraries, write a Python function which takes a number and returns true if it is prime, false otherwise."
    },
    {
      id: 6,
      user_id: 1,
      taskset_id: 2,
      content:
        "Write me an annotated Java function which counts the number of unique elements in an array.",
    },
    {
      id: 7,
      user_id: 1,
      taskset_id: 3,
      content:
        "Write a fun, entertaining speech."
    },
  ]);
};
