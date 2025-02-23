const xlsx = require("xlsx");
const Property = require("../models/propertiesModel");
const factory = require("./handlerFactory");
const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const fs = require("fs");
const path = require("path");

//////////////////////////////Images Management//////////////////////////////

// Multer configuration for image uploads
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const uploadImage = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Middleware to handle multiple image uploads
exports.uploadPropertyImages = uploadImage.fields([
  { name: "coverPhoto", maxCount: 1 }, // Single file for cover photo
  { name: "images", maxCount: 10 }, // Up to 10 files for additional photos
]);

// Resize and save images
exports.resizePropertyImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  // Resize and save cover photo
  if (req.files["coverPhoto"]) {
    const coverPhoto = req.files["coverPhoto"][0];
    const filename = `property-${Date.now()}-cover.jpeg`;

    await sharp(coverPhoto.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/products/${filename}`);

    req.body.coverPhoto = filename; // Save the filename in the request body
  }

  // Resize and save additional images
  if (req.files["images"]) {
    const images = req.files["images"];
    const imageNames = [];

    // Ensure the directory exists
    const dir = "public/img/properties";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Process each image
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const filename = `property-${Date.now()}-${i}.jpeg`;

      await sharp(image.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/products/${filename}`);

      imageNames.push(filename);
    }

    req.body.images = imageNames; // Save the filenames in the request body
  }

  next();
});

// Delete cover photo
exports.deleteCoverPhoto = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new AppError("No property found with that ID", 404));
  }

  // Check if property has a cover photo
  if (property.coverPhoto) {
    // Delete file from filesystem
    const filePath = path.join(
      "public",
      "img",
      "products",
      property.coverPhoto
    );
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove cover photo reference from property
    property.coverPhoto = undefined;
    await property.save();
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});

// Delete additional photo
exports.deleteImage = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.id);
  const imageName = req.params.imageName;

  if (!property) {
    return next(new AppError("No property found with that ID", 404));
  }

  // Check if image exists in property's images array
  if (!property.images.includes(imageName)) {
    return next(new AppError("Image not found", 404));
  }

  // Delete file from filesystem
  const filePath = path.join("public", "img", "products", imageName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  // Remove image from property's images array
  property.images = property.images.filter((img) => img !== imageName);
  await property.save();

  res.status(200).json({
    status: "success",
    data: null,
  });
});

/////////////////////////////////////////////////////////////////////////////
///////////////////////Excel Upload//////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Upload properties from Excel
exports.uploadPropertiesxlxs = async (req, res) => {
  try {
    const rows = req.body.rows; // Array of rows from the Excel file
    let processed = 0,
      skipped = 0;

    console.log("Rows:", rows);

    // Process each row individually
    for (const row of rows) {
      const {
        Status,
        Reference,
        Title,
        Bedrooms,
        "Map Location": Map_Location,
        Compound,
        "Property Type": Property_Type,
        Price,
        Downpayment,
        Remaining,
        Purpose,
        Bathrooms,
        Size,
        Floors,
        "Maid's Room": Maids_Room,
        ACs,
        Furnished,
        Finishing,
        "Unit Description.": Unit_Description,
      } = row;

      try {
        // Check if a property with the same Reference already exists
        const existing = await Property.findOne({ Reference });

        if (!existing) {
          // Create a new property if it doesn't exist
          await Property.create({
            Status,
            Reference,
            Title,
            Bedrooms,
            Map_Location,
            Compound,
            Property_Type,
            Price,
            Downpayment,
            Remaining,
            Purpose,
            Bathrooms,
            Size,
            Floors,
            Maids_Room: Maids_Room === "Yes",
            ACs: ACs === "Yes",
            Furnished: Furnished === "Yes",
            Finishing,
            Unit_Description,
          });
          processed++; // Increment processed count
        } else {
          skipped++; // Increment skipped count
        }
      } catch (err) {
        console.error(`Error processing row for Reference ${Reference}:`, err);
      }
    }

    // Send success response with processed and skipped counts
    res.status(200).json({
      success: true,
      message: "Data uploaded successfully",
      processed,
      skipped,
    });
  } catch (err) {
    console.error("Error in uploadPropertiesxlxs function:", err);
    res.status(500).json({
      success: false,
      error: "Failed to upload properties",
      details: err.message || err,
    });
  }
};

/////////////////////////////////////////////////////////////////////////////

// Other handlers
exports.getAllProperties = factory.getAll(Property);
exports.getProperty = factory.getOne(Property);
exports.deleteProperty = factory.deleteOne(Property);
exports.createProperty = factory.createOne(Property);
exports.updateProperty = factory.updateOne(Property);
