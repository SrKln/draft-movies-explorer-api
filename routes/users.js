const router = require('express').Router();
const {
  getCurrentUser,
  updateProfUser,
} = require('../controllers/users');

const {
  userInfoValidator,
} = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', userInfoValidator, updateProfUser);
module.exports = router;
