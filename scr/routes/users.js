const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProgress } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getProfile);
router.put('/progress', auth, updateProgress);

module.exports = router;
