exports.seed = async function(knex) {
  // await knex('user_course').del()
  // await knex('user_progress').del()
  // await knex('user_lessons').del()
  // await knex('user_tests').del()
  // await knex('options').del()
  await knex('progress').del()
  await knex('tasks').del()
  await knex('tests').del()
  await knex('lessons').del()
  // await knex('users').del()
  await knex('courses').del()

  // await knex('users').insert([
  //   {
  //     id: 1,
  //     login: "Admin",
  //     email: "an.an17.5.16@yandex.ru",
  //     email_is_confirmed: true,
  //     password:12345,
  //     role:"admin"
  //   }
  // ]);

  await knex('courses').insert([
    {
      id: 1,
      title: "Зельеварение",
      description: "<div><p>Зельеварение — учебная дисциплина, изучающая различные зелья, настои, сыворотки и другие жидкие магические субстанции. Зельеварение изучает также свойства этих жидкостей, способы их приготовлений и различные особенности входящих в них ингредиентов.</p></div>"
    }
  ]);

  // await knex('user_course').insert([
  //   {
  //     id_course: 1,
  //     id_user: 1,
  //     status: nothing,
  //     selected: false
  //   }
  // ]);

  await knex('lessons').insert([
    {
      id: 1,
      title: "Зелье для излечения фурункулов",
      description: "<div><p>Зелье для излечения фурункулов и прыщей — зелье, излечивающее фурункулы. Элементарное зелье, которое изучается на первом курсе по Зельеварению в школе Хогвартс. Варя зелье, следует убрать с огня котел, прежде чем добавить иглы дикобраза.</div></p>",
      lesson: "<div>lesson</div>",
      id_course: 1
    }
  ]);

  // await knex('user_lessons').insert([
  //  {
  //  id_lesson: 1,
  //  id_user: 1,
  //  status: start
  //  }
  //]);

  await knex('tests').insert([
    {
      id: 1,
      title: "Зелье для излечения фурункулов и прыщей",
      description: "Сложность зелья - элементарное",
      id_lessons: 1
    }
  ]);

  // await knex('user_tests').insert([

  await knex('progress').insert([
    {
      id: 1,
      title: "Начало положено!",
      description: "Вы прошли первый урок по Зельеварению",
      id_test: 1
    }
  ]);

  // await knex('user_progress').insert([
  //   {
  //     id_user: 1,
  //     id_progress: 1
  //   }
  // ]);

  await knex('tasks').insert([
    {
      id: 1,
      question: "Входят ли в состав залья змеиные зубы. Ответьте Да или Нет.",
      mark: 10,
      type_test: "text",
      right_answer: 'Да',
      id_test: 1
    }
  ]);

  // await knex('options').insert([
  //   {
  //     id: 1,
  //     question: "Входят ли в состав залья змеиные зубы.",
  //     answer: 'Нет',
  //     right_answer: false,
  //     id_tasks: 1
  //   }
  // ]);

};

