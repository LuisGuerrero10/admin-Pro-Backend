const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/users");
const { validateFields } = require("../middleware/validate-field");
const { validateJWT } = require("../middleware/validate-jwt");

const router = Router();

router.get("/", validateJWT, getUsers);

router.post(
  "/",
  [
    check("name", "the name is required").not().isEmpty(),
    check("password", "the password is required").not().isEmpty(),
    check("email", "the email is required").isEmail(),
    validateFields,
  ],
  createUser
);

router.put(
  '/:id',
  [
    validateJWT,
    check("name", "the name is required").not().isEmpty(),
    check("email", "the email is required").isEmail(),
    check("role", "the role is required").not().isEmpty(),
    validateFields,
  ],
  updateUser
);

router.delete('/:id', validateJWT ,deleteUser);


module.exports = router;
