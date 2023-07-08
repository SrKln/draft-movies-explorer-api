const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  updateProfUser,
} = require('../controllers/users');

const {
  userInfoValidator,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', userInfoValidator, updateProfUser);
module.exports = router;
