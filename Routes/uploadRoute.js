const express = require('express');
const router = require("express").Router();
const fileUploadController= require('../Controllers/uploadController');

router.get('/upload',fileUploadController.fileUploadForm);

router.post('/upload',fileUploadController.uploadFile);

module.exports = router;