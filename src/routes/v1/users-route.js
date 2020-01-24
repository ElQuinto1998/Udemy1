const router = require('express').Router();
const userController = require('../../controllers/v1/users-controller');

router.post('/create', userController.createUser);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);
router.get('/get-all', userController.getUsers);
router.post('/login', userController.login);

module.exports = router;
