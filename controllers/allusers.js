const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");

// register (any)
exports.register = async ({ login, email, password }) => {
    // TODO: Hash password
    const [recordLogin] = await knex("users")
      .select("id")
      .where({ login: login})
    if (recordLogin) {
      throw new ControllerException("LOGIN_IN_USE", "Login is already in use");
    }
    
    const [recordEmail] = await knex("users")
      .select("id")
      .where({ email: email})
    if (recordEmail) {
      throw new ControllerException("EMAIL_IN_USE", "Email is already in use");
    }
    
    const [{ id: userId }] = await knex("users")
      .insert([{ login, email, password }]) // password hashing
      .returning("id")
    return { userId }

};

// login (any)
exports.login = async ({ login, password }) => {
    // TODO: Hash password
    const [record] = await knex("users")
        .select("id")
        .where({ login, password });

    if (!record) {
        throw new ControllerException("USER_NOT_FOUND", "User has not been found");
    }

    return { userId: record.id };
};