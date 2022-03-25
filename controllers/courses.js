const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");

//create course (admin)
exports.createCourse = async ({ title, description }) => {
    try {
        const [{ id: courseId }] = await knex("courses")
        .insert([{ title, description }])
        .returning("id");
        return { courseId };
    } catch (error) {
        throw new ControllerException("COURSE_WAS_CREATED", "Course was created")
  }
}

//edit course
exports.editCourse = async ({ courseId, title, description}) => {
    const [record] = await knex("courses")
        .select("id", "title", "description")
        .where({ id: courseId });

    if (!record) {
        throw new ControllerException("COURSE_NOT_FOUND", "Course has not been found")       
    }

    const patch = {};
    if (title !== undefined) patch.name = title;
    if (description !== undefined) patch.description = description; 

    await knex("courses").update(patch).where({ id: courseId });
    return {};
};

//delete course (admin)
exports.deleteCourse = async ({ courseId }) => {
    const [record] = await knex("courses")
        .select("id")
        .where({ id: courseId })

    if (!record) {
        throw new ControllerException("COURSE_NOT_FOUND", "Course has not been found")
    } else {
        await knex("courses").where({ id: courseId }).del()
    }

    return {}
}

//start course (user) TODO:
exports.startCourse = async ({ courseId, userId }) => {
    // при начале курса, он переходит в "Мои курсы" для конкретного пользов

    const [recordUser] = await knex("users")
        .select("id")
        .where({ id: userId })

    if (!recordUser) {
        throw new ControllerException("USER_NOT_FOUND", "User not found"); 
    }

    const [recordCourse] = await knex("courses")
        .select("id")
        .where({ id: courseId })
    
    if (!recordCourse) {
        throw new ControllerException("COURSE_NOT_FOUND", "Course is not found");         
    }

    const [{ id_user: userId, id_course: courseId }] = await knex("user_courses")
        .insert([{ 
            id_course, 
            id_user,
            status: "start", 
            selected: true 
        }]) 
    return {}
}

//hide course - скрыть (user) TODO:
exports.hideCourse = async ({ courseId, userId }) => {
    // при скрытии курса, он исчезает из Моих
    // но достижения (прйденные уроки) не пропадут
    // проверка существования курса
    try {
        await knex("user_courses")
            .where({ 
                id_users: userId,
                id_course: courseId,
                selected:true
            })
            .update({ 
                selected: false,
            })
     
        return {} 
    } catch (error) {
            throw new ControllerException("COURSE_ALREADY_UNSELECTED", "Course was already unselected"); 
     }
}

// end course (user) TODO:
exports.endCourse = async ({ courseId, userId }) => {

    const [recordUserCourse] = await knex("user_courses")
        .where({
            id_users: userId,
            id_course: courseId,
            status: "start"
        })
        .update({
            status: "end"
        })

    if (!recordUserCourse) {
        throw new ControllerException("USER_COURSE_NOT_FOUND", "User_Course not found");
    }

}


// find course by id (admin) TODO:
exports.getCourseById = async ({ courseId }) => {
    const [record] = await knex("courses")
        .select("*")
        .where({ id: courseId });
    
    if (!record) {
        throw new ControllerException("COURSE_NOT_FOUND", "Course has not been found")
    }
  
    return record;
  };

  // find course by title TODO:
exports.getCourseById = async ({ title }) => {
    const [record] = await knex("courses")
        .select("*")
        .where({ title: title });
    
    if (!record) {
        throw new ControllerException("COURSE_NOT_FOUND", "Course has not been found")
    }
  
    return record;
};

//get all course
// limit TODO:
exports.getAllCourse = async () => {
    try {
       const [record] = await("courses")
        .select("*")
    
        return record 
    } catch (error) {
        throw new ControllerException("COURSES_NOT_FOUND", "Courses have not been found")
    }
    
};

// get all my courses (user) TODO:
exports.getMyCourses = async({ userId }) => {
    await knex("user_courses")
        .select(
            "id_user",
            "id_course as myCourseId"
        )
        .where({ 
            id_user: userId,
            selected: true
         })

    if ("id" = myCourseId) {
        conts [record] = await knex("courses")
            .select("*")
    } else {
        throw new ControllerException("COURSES_NOT_FOUND", "Courses have not been found")
    }
    return record
};

// add course in my courses not start (user) TODO:
exports.addMyCourse = async ({ userId, courseId }) => {
    const [user] = await knex("users")
        .select("id")
        .where({id: userId})

    if (!user) {
        throw new ControllerException("USER_NOT_FOUND", "User has not beed founded")
    }   

    const [course] = await knex("courses")
        .select("id")
        .where({id: courseId})

    if (!course) {
        throw new ControllerException("COURSE_NOT_FOUND", "Course has not beed founded")
    }

    const [record] = await knex("user_courses")
        .select(
            "id_course",
            "id_user",
            "status",
            "selected"
        )
        .where({
            id_user: userId,
            id_course: courseId
        })

    if (record) { 
        if (selected == true) {
            throw new ControllerException("COURSE_ALREADY_SELECTED", "Course was already selected")
        }
        // update - selected:true
        await knex("user_courses")
            .select("id_course","id_user", "status", "selected")
            .where({
                 id_course: courseId,
                 id_user: userId
            })
            const patch = {};
        if (selected == false) patch.selected = true;
        await knex("courses").update(patch).where({ id: courseId });
        
    } else {
        const [{ id_user: userId, id_course: courseId }] = await knex("user_courses")
            .insert([{ 
                id_course, 
                id_user,
                status: "nothing",
                selected: true 
            }]) 
    }

    return {}
}