const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");

// change role (admin)
exports.changeRole = async ({ userId, role }) => {
    const [record] = await knex("users")
        .select("id")
        .where({ id: userId });

    if (!record) {
        throw new ControllerException("USER_NOT_FOUND", "User has not been found");
    }
  
    await knex("users")
        .update({ 
            role: role,
            updated_at: knex.fn.now()
        })
        .where({ id: userId });
  
    return {};
};

// find user be id (admin)
exports.getUserById = async ({ userId }) => {
    const [record] = await knex("users")
        .select(
            "id",
            "login",
            "email",
            "role"
        )
        .where({ id: userId });

    if (!record) {
        throw new ControllerException("USER_NOT_FOUND", "User has not been found");
    }

    return record;
  };


// find user bY login (admin)
exports.getUserBylogin = async ({ login }) => {
    const [record] = await knex("users")
        .select(
            "id",
            "login",
            "email",
            "role"
        )
        .where({ login: login });

    if (!record) {
        throw new ControllerException("USER_NOT_FOUND", "User has not been found");
    }
  
    return record;
  };

// get all users (admin) 
exports.getAllUsers = async () => {
    try {
        const [record] = await("users")
        .select("*") //TODO:
    
    return record

    } catch (error) {
        throw new ControllerException("INTERNAL_SERVER_ERROR", "Internal server error");
    }
};


//freeeze user (admin)
exports.deactivateProfile = async ({ userId }) => {
    try {
        await knex("users")
            .where({ id: userId })
            .update({ 
                active: false,
                update_at: knex.fn.now() 
            }) 
        
        return {}
    } catch (error) {
        throw new ControllerException("USER_NOT_FOUND", "User has not been found")
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
        throw new ControllerException("USER_NOT_FOUND", "User has not been found") 
    }
}