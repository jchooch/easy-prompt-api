/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("evals").del();
  await knex("evals").insert([
    { 
      id: 1, 
      user_id: 1, 
      taskset_id: 1, 
      promptseq_id: 1,
      judge_num: 0,
      judge_score: 0
    },
    { 
      id: 2, 
      user_id: 1, 
      taskset_id: 1, 
      promptseq_id:  2,
      judge_num: 0,
      judge_score: 0
    },
    { 
      id: 3, 
      user_id: 1, 
      taskset_id: 2, 
      promptseq_id: 3,
      judge_num: 0,
      judge_score: 0
    },
    {
      id: 4, 
      user_id: 1, 
      taskset_id: 2, 
      promptseq_id: 4,
      judge_num: 0,
      judge_score: 0
    },
  ]);
};
