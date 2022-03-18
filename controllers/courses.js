const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");

//create course (admin)
exports.register = async ({ title, description }) => {
    try {
        const [{ id: courseId }] = await knex("courses")
        .insert([{ title, description }])
        .returning("id");
        return { courseId };
    } catch (error) {
        throw new ControllerException("COURSE_WAS_CREATED", "Course was created")
  }
}

//edit course TODO:
exports.editCourse = async ({ courseId, title, description,  certificate}) => {
    const [record] = await knex("courses")
        .select("id", "title", "description", "certificate")
        .where({ id: courseId });

    if (!record) {
        throw new ControllerException("COURSE_NOT_FOUND", "Course has not been found")       
    }

    const patch = {};
    if (title !== undefined) patch.name = title;
    if (description !== undefined) patch.description = description; 
    if (certificate !== undefined) patch.certificate = certificate;

    await knex("courses").update(patch).where({ id: courseId });
    return {};
};

//delete course (admin) TODO:
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
            start: true, 
            end: false, 
            selected: true 
        }]) 
    return {}
}

//hide course - скрыть (user) TODO:
exports.hideCourse = async ({ courseId, userId }) => {
    // при скрытии курса, он исчезает из Моих
    // но достижения (прйденные уроки) не пропадут
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

//end (user) and get certificate TODO:
// exports.endCourse = async ({ courseId, userId }) => {
//     // курс пропадает из моих курсов
//     // СДЕЛАТЬ ОТДЕЛЬНО END И certificate
//     const [recordUserCourse] = await knex("user_courses")
//         .where({
//             id_users: userId,
//             id_course: courseId,
//             start:true
//         })
//         .update({
//             start:false,
//             end: true
//         })
    
//     if (!recordUserCourse) {
//         throw new ControllerException("USER_COURSE_NOT_FOUND", "User_Course not found");
//     }

//     const [recordCourse] = await knex("courses")
//         .select("sertificate")
//         .where({ id: courseId })

//     if (!recordCourse) {
//         throw new ControllerException("COURSE_NOT_FOUND", "Course not found");
//     }
    
//     return recordCourse
// }

// find course by id TODO:
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

//get all course TODO:
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

// add course in my courses (user) TODO: ?????????????????????????????????????????????????
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
            "start",
            "end",
            "selected"
        )
        .where({
            id_user: userId,
            id_course: courseId
        })
    //  поменять start & end на подобее ролей admin/user??? TODO: --------------------------------------------------
    if (record) { 
        if (start == true && end == false || start == false && end == true) {
            if (selected == true) {
                throw new ControllerException("COURSE_ALREADY_SELECTED", "Course was already selected")
            }
            // update - selected:true
            const [record1] = await knex("user_courses")
                .select("id_course","id_user", "start", "end", "selected")
                .where({
                    id_course: courseId,
                    id_user: userId
                })
                const patch = {};
            if (selected == false) patch.selected = true;
            await knex("courses").update(patch).where({ id: courseId });
        } else {
            throw new ControllerException("SERVER_ERROR", "")
        }
    } else {
        // insert
        const [{ id_user: userId, id_course: courseId }] = await knex("user_courses")
            .insert([{ 
                id_course, 
                id_user,
                start: false, 
                end: false, 
                selected: true 
            }]) 
    }

    return {}
}