const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' })

const adminController = require('../app/controllers/admin/adminController')

router.get('/login',adminController.getLogin);

router.post('/login',adminController.postLogin);

router.route('/products')
      .get(adminController.authentication,adminController.getProducts);

router.route('/profile')
      .get(adminController.profile);

router.route('/uploadfile')
      .post(upload.single('myFile'),adminController.uploadfile);

router.get('/',adminController.index);

router.get('/logout',adminController.logout);

module.exports = router;
