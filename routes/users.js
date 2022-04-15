const express = require("express");
const { wrap } = require("async-middleware");
const { body } = require("express-validator");
const usersController = require("../controllers/users");
const allusersController = require("../controllers/allusers");
const adminController = require("../controllers/admin");
const { sign: signToken } = require("../utils/token");
const auth = require("./middlewares/auth");
const validate = require("./middlewares/validate");

const router = express.Router();

//allusers

router.post(
  "/signup",
  wrap(async (req, res) => {
    const { login, email, password } = req.body;
    const { userId } = await allusersController.register({
      login,
      email,
      password,
    });

    const token = signToken(userId);

    res.send({ success: true, token });
  })
);

router.post(
  "/signin",
  body("email").isString(),
  body("password").isString(),
  validate(),
  wrap(async (req, res) => {
    const { email, password } = req.body;
    const { userId } = await allusersController.login({ email, password });

    const token = signToken(userId);

    res.send({ success: true, token });
  })
);

//users TODO:

// router.post(
//   "/email/confirm/request",
//   auth("user"),
//   wrap(async (req, res) => {
//     await usersController.requestEmailConfirmation({ userId: req.user.id });
//     res.send({ success: true });
//   })
// );

// router.get(
//   "/email/confirm",
//   wrap(async (req, res) => {
//     const { user, code } = req.query;
//     await usersController.requestEmailConfirmation({
//       userId: user,
//       confirmationCode: code,
//     });
//     res.send({ success: true });
//   })
// );

// router.post(
//   "/profile/edit",
//   auth("user"),
//   wrap(async (req, res) => {
//     const { name, email, password } = req.body;
//     await usersController.editProfile({
//       userId: req.user.id,
//       name,
//       email,
//       password,
//     });

//     res.send({ success: true });
//   })
// );

// restore password

//delete profile

//admin TODO:

router.get(
  "/one/:id",
  // auth("admin"),
  wrap(async (req, res) => {
    const { id } = req.params;
    const user = await adminController.getUserById({ userId: id });

    res.send({
      success: true,
      user: { id: user.id, login: user.login, email: user.email },
    });
  })
);

//TODO: не робит
router.get(
  "/one/login",
  //auth("admin"),
  wrap(async (req, res) => {
    const { login } = req.params;
    const user = await adminController.getUserBylogin({ login: login });

    res.send({
      success: true,
      user: { id: user.id, login: user.login, email: user.email },
    });
  })
);

//TODO: не робит
router.get(
  "/getAllUsers",
  //auth("admin"),
  wrap(async (req, res) => {
    const users = await adminController.getAllUsers();

    res.send({ success: true, users });
  })
);

// router.post(
//   "/role/change",
//   auth("admin"),
//   body("userId").isNumeric(),
//   body("role").custom(
//     (value) => ["user", "editor", "admin"].indexOf(value) >= 0
//   ),
//   validate(),
//   wrap(async (req, res) => {
//     const { userId, role } = req.body;
//     await usersController.changeRole({ userId, role });

//     res.send({ success: true });
//   })
// );

//deactivateProfile

//activateProfile

module.exports = router;
