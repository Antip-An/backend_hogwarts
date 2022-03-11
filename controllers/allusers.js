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
        throw new ControllerException("WRONG_CREDENTIALS", "Wrong credentials");
    }

    return { userId: record.id };
};

// confirm emall (user)
exports.confirmEmail = async ({ userId, confirmationCode }) => {
    const [record] = await knex("users")
    .select(
        "email_is_confirmed as emailIsConfirmed",
        "email_confirmation_code as emailConfirmationCode"
    )
    .where({ id: userId })

    if (
        !record ||
        record.emailConfirmationCode === null ||
        record.emailIsConfirmed ||
        record.emailConfirmationCode !== confirmationCode
      ) {
        throw new ControllerException(
          "FORBIDDEN",
          "Wrong userId or confirmationCode"
        )
      }
    
      await knex("users")
        .update({ email_is_confirmed: true, email_confirmation_code: null })
        .where({ id: userId })
    
      return {}
  
};