const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");

// change role (admin)
exports.changeRole = async ({ userId, role }) => {
    const [record] = await knex("users")
        .select("id")
        .where({ id: userId });

    if (!record) {
        throw new ControllerException("NOT_FOUND", "User has not been found");
    }
  
    await knex("users").update({ role }).where({ id: userId });
  
    return {};
};

// find user be id (admin)
exports.getUserById = async ({ userId }) => {
    const [record] = await knex("users")
        .select(
            "id",
            "login",
            "email",
            "role",
            "email_is_confirmed as emailIsConfirmed"
        )
        .where({ id: userId });
  
    return record;
  };


// find user be login (admin)
exports.getUserById = async ({ login }) => {
    const [record] = await knex("users")
        .select("*")
        .where({ login: login });
  
    return record;
  };

// get all users (admin) TODO:
exports.getAllUsers = async () => {
    try {
        const [record] = await("users")
        .select()
    
    return record
    } catch (error) {
        throw new ControllerException("USERS_NOT_FOUND", "Search Error");
    }
};


//freeeze user (admin)
exports.deactivateProfile = async ({ userId }) => {
    try {
        const [record] = await knex("users")
            .where({ id: userId })
            .update({ 
                active: false,
                update_at: knex.fn.now() 
            }) 
        
        return {}
    } catch (error) {
        throw new ControllerException("USER_ALREADY_DEACTIVATED", "User was already deactivated"); 
        //TODO: or id - not found?
    }
}

//unfreeeze user (admin)
exports.activateProfile = async ({ userId }) => {
    try {
        await knex("users")
            .where({ id: userId })
            .update({ 
                active: true,
                update_at: knex.fn.now()
        })
    
        return {} 
    } catch (error) {
        throw new ControllerException("USER_ALREADY_ACTIVATED", "User was already activated"); 
        //TODO: or id - not found?
    }
}