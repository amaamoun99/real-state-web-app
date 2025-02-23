const express = require('express');
const propertyController = require('../controllers/propertiesController');
const multer = require('multer');
const router = express.Router();

// Multer configuration for Excel files
const excelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save Excel files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `excel-${Date.now()}.${file.originalname.split('.').pop()}`);
  },
});

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || // .xlsx
    file.mimetype === 'application/vnd.ms-excel' // .xls
  ) {
    cb(null, true);
  } else {
    cb(new Error('Not an Excel file! Please upload only Excel files.'), false);
  }
};

const uploadExcel = multer({
  storage: excelStorage,
  fileFilter: excelFilter,
});

// Routes
router
  .route('/')
  .post(
    propertyController.uploadPropertyImages, // Handle file uploads
    propertyController.resizePropertyImages, // Resize and save images
    propertyController.createProperty // Create property
  )
  .get(propertyController.getAllProperties);

router
  .route('/:id')
  .get(propertyController.getProperty)
  .patch(
    propertyController.uploadPropertyImages, // Handle file uploads
    propertyController.resizePropertyImages, // Resize and save images
    propertyController.updateProperty // Update property
  )
  .delete(propertyController.deleteProperty);

router.route('/upload').post(uploadExcel.single('file'), propertyController.uploadPropertiesxlxs);

router.delete('/:id/coverPhoto', propertyController.deleteCoverPhoto);
router.delete('/:id/image/:imageName', propertyController.deleteImage);

module.exports = router;