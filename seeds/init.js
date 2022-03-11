exports.seed = async function(knex) {
  await knex('users').del()
  await knex('courses').del()
  await knex('user_course').del()
  await knex('lessons').del()
  await knex('progress').del()
  await knex('user_progress').del()
  await knex('tests').del()
  await knex('tasks').del()
  await knex('options').del()

  // await knex('users').insert([
  //   {
  //     id: 1,
  //     login: "Admin",
  //     email: "an.an17.5.16@yandex.ru",
  //     email_is_confirmed: true,
  //     password:12345,
  //     role:"admin",
  //     active: true
  //   }
  // ]);

  // await knex('courses').insert([
  //   {
  //     title: "Зельеварение",
  //     d: "<div>Hello</div><p>I'm <b>tired</b>...</p>",
  //     description: "Зельеварение — учебная дисциплина, изучающая различные зелья, настои, сыворотки и другие жидкие магические субстанции. Зельеварение изучает также свойства этих жидкостей, способы их приготовлений и различные особенности входящих в них ингредиентов."
  //   }
  // ]);

  // await knex('user_course').insert([
  //   {
  //     id_course: 1,
  //     id_user: 1
  //   }
  // ]);

  // await knex('lessons').insert([
  //   {
  //     title: "Зелье для излечения фурункулов",
  //     description: "Зелье для излечения фурункулов и прыщей — зелье, излечивающее фурункулы. Элементарное зелье, которое изучается на первом курсе по Зельеварению в школе Хогвартс. Варя зелье, следует убрать с огня котел, прежде чем добавить иглы дикобраза.",
  //     id_course: 1
  //   }
  // ]);

  // await knex('progress').insert([
  //   {
  //     title: "Начало положено!",
  //     description: "Вы прошли первый урок по Зельеварению",
  //     id_lessons: 1
  //   }
  // ]);

  // await knex('user_progress').insert([
  //   {
  //     id_user: 1,
  //     id_progress: 1
  //   }
  // ]);

  // await knex('tests').insert([
  //   {
  //     title: "Зелье для излечения фурункулов и прыщей",
  //     description: "Сложность зелья - элементарное",
  //     id_lessons: 1
  //   }
  // ]);

  // await knex('tasks').insert([
  //   {
  //     question: "Входят ли в состав залья змеиные зубы. Ответьте Да или Нет.",
  //     mark: 10,
  //     right_answer: 'Да',
  //     type_test: "text",
  //     id_test: 1
  //   }
  // ]);

  // await knex('options').insert([
  //   {
  //     question: "Входят ли в состав залья змеиные зубы.",
  //     answer: 'Нет',
  //     right_answer: false,
  //     id_tasks: 1
  //   }
  // ]);

};

