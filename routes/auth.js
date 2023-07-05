const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator')
const { validateFields } = require('../middleware/validate-field');

const router = Router();

router.post('/',

    [
        check("email", "the email is required").isEmail(),
        check("password", "the password is required and must be at least 6 characters").not().isEmpty().isLength({ min:6 }),
        validateFields,
    ],
    login

)



module.exports = router;