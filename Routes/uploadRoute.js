const express = require('express');
const router = require("express").Router();
const fileUploadController= require('../Controllers/uploadController');

// router.get('/upload',fileUploadController.fileUploadForm);

router.post('/uploadco',fileUploadController.uploadFile);

module.exports = router;