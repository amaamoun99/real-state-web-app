const mongoose = require('mongoose');

const propertiesSchema = new mongoose.Schema({
    Status: {
        type: String,
       // required: [true, 'A property must have a status'],
    },
    Reference: {
        type: Number,
       // unique: true, // Ensure each property has a unique reference number
    },
    Title: {
        type: String,
       // required: [true, 'A property must have a title'],
    },
    Bedrooms: {
        type: Number,
     //   required: [true, 'A property must have a number of bedrooms'],
    },
    Map_Location: {
        type: String,
      ////  required: [true, 'A property must have a map location'],
    },
    Compound: {
        type: String,
     //   required: [true, 'A property must belong to a compound'],
    },
    Property_Type: {
        type: String,
     //  required: [true, 'A property must have a type'],
    },
    Price: {
        type: Number,
     //   required: [true, 'A property must have a price'],
    },
    Downpayment: {
        type: Number,
        default: null, // Default to null if not provided
    },
    Remaining: {
        type: Number,
        default: null, // Default to null if not provided
    },
    Purpose: {
        type: String,
      //  required: [true, 'A property must have a purpose (e.g., Sale, Rent)'],
    },
    Bathrooms: {
        type: Number,
      //  required: [true, 'A property must have a number of bathrooms'],
    },
    Size: {
        type: Number,
      //  required: [true, 'A property must have a size'],
    },
    Floors: {
        type: String, // Changed to String to match "1st" in the Excel file
       // required: [true, 'A property must have a floor number'],
    },
    Maids_Room: {
        type: Boolean,
        default: false, // Default to false if not provided
    },
    ACs: {
        type: String,
        default: false, // Default to false if not provided
    },
    Furnished: {
        type: String,
        default: false, // Default to false if not provided
    },
    Finishing: {
        type: String, // Changed to String to match "Semi Finishing" in the Excel file
       // required: [true, 'A property must have a finishing type'],
    },
    Unit_Description: {
        type: String,
        //required: [true, 'A property must have a description'],
    },
    coverPhoto: {
        type: String,
        default: "default.jpg", // Default cover photo
    },
    images: {
        type: [String], // Array of image URLs
        default: [], // Default to an empty array
    },
    createdAt: {
        type: Date,
        default: Date.now(), // Automatically set to the current date
        select: false, // Hide this field from query results by default
    },
});

const Property = mongoose.model('Property', propertiesSchema); // Model's variable name and name should start with a capital letter

module.exports = Property;