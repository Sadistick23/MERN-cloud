const Router = require('express')
const router = new Router()
const userController = require('../controllers/user-controller')
const {body} = require('express-validator')
const authMiddleware = require('../middleware/auth-middleware')

router.post('/registration',
    body('email').isEmail(),
    body('password').notEmpty().isLength({min:6, max:16}),
    body('name').notEmpty(),
    body('lastName').notEmpty(),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/avatar', authMiddleware, userController.uploadUserAvatar)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)
router.delete('/avatar', authMiddleware, userController.deleteUserAvatar)

module.exports = router