const User = require('../models/userModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addPropertyToUser = catchAsync(async (req, res, next) => {
  const { propertyId } = req.body;
  const userId = req.params.id;

  const user = await User.findById(userId); 

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  user.properties.push(propertyId);
  await user.save();

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
// Other handlers
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);