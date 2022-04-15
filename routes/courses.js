const express = require("express");
const { wrap } = require("async-middleware");
const { body } = require("express-validator");
const courseController = require("../controllers/courses");
const auth = require("./middlewares/auth");
const validate = require("./middlewares/validate");

const router = express.Router();

router.post(
  "/createCourse",
  //auth("admin"),
  wrap(async (req, res) => {
    const { title, description } = req.body;
    const { courseId } = await courseController.createCourse({
      title,
      description,
    });

    res.send({ success: true, courseId });
  })
);

// find course by id (admin)

//edit course (admin)

//delete course (admin)

// find course by title (user)

//get all course (user)

//start course (user)

//hide course - скрыть (user)

// end course (user)

// add course in my courses - is not start (user)

// get all my courses (user)

module.exports = router;