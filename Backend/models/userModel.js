const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "agent", "admin", "superadmin"],
    default: "user",
  },
  // properties: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Property",
  //     default: [],
  //   },
  // ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// userSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "properties",
//     select: "Title Price",
//   });
//   next();
// });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});



// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
