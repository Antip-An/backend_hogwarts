const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");
const bcrypt = require("bcrypt");

// register (any)
exports.register = async ({ login, email, password }) => {
  const [recordLogin] = await knex("users")
    .select("id")
    .where({ login: login });
  if (recordLogin) {
    throw new ControllerException("LOGIN_IN_USE", "Login is already in use");
  }

  const [recordEmail] = await knex("users")
    .select("id")
    .where({ email: email });
  if (recordEmail) {
    throw new ControllerException("EMAIL_IN_USE", "Email is already in use");
  }

  var hashedPassword = await bcrypt.hash(password, 10);

  const [{ id: userId }] = await knex("users")
    .insert([
      {
        login,
        email,
        password: hashedPassword,
      },
    ])
    .returning("id");
  return { userId };
};

// login (any)
exports.login = async ({ login, password }) => {
  const [record] = await knex("users")
    .select("id", "password as hashedPassword")
    .where({
      login,
    });

  if (!record) {
    throw new ControllerException("USER_NOT_FOUND", "User has not been found");
  }

  // TODO: проверить работу active
  const [active] = await knex("users")
    .select("active")
    .where({
      login,
    });

  if (!active) {
    throw new ControllerException("USER_IS_N0T_ACTIVE)", "User is not active");
  }

  if (bcrypt.compare(password, record.hashedPassword)) {
    // bcrypt compare
    return { userId: record.id };
  }
};
