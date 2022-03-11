const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");

// request email confirmation (user)
exports.requestEmailConfirmation = async ({ userId }) => {
    // TODO: Generate confirmation code
    const confirmationCode = "0000";
    const [record] = await knex("users")
        .select("email_is_confirmed as emailIsConfirmed")
        .where({ id: userId })

    if (!record) {
        throw new ControllerException("NOT_FOUND", "User has not been found")
    } 

    if (record.emailIsConfirmed) {
        throw new ControllerException(
          "ALREADY_CONFIRMED",
          "User has already confirmed their email"
        );
    }

    // Write to db
    await knex("users")
        .where("id", userId)
        .update({email_confirmation_code: confirmationCode}) 
    
    //TODO: Send email
    return {}
};

// edit profile (user)
exports.editProfile = async ({ userId, login, email, password }) => {
    const [record] = await knex("users")
        .select("id", "name", "email", "password")
        .where({ id: userId })

    if (!record) {
        throw new ControllerException("NOT_FOUND", "User has not been found")
    }

    const patch = {}
    if (login) patch.login = login
    if (email) {
        patch.email = email
        patch.email_is_confirmed = false
        // TODO: Generate confirmation code
        patch.email_confirmation_code = "0000"
    }
    // TODO: Hash password
    if (password) patch.password = password

    await knex("users").update(patch).where({ 
        id: userId,
        updated_at: knex.fn.now()
    })

    return {}
};

// delete profile (user)
exports.deleteProfile = async({ userId }) => {
    const [record] = await knex("users")
        .where({ id: userId }).del()

    return record
};