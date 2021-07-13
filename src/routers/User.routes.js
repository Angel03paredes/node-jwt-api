const {Router} = require('express');
const verifyToken = require('./../verifyToken');
const AuthController = require('../controllers/auth');

const router = Router();

router.post('/signin',AuthController.signin);
router.get('/me',verifyToken,AuthController.me);
router.post('/signup',AuthController.signup);


module.exports = router;