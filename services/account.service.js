const { accountModel } = require("../models");
const { statusCode } = require("../utils/statusCode");
const {
  ErrorResponse,
  asyncErrorHandler,
} = require("../middlewares/error/error");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { createToken } = require("../middlewares/authentication/jwt");
const { sendEmail } = require("../config/mail.config");
const nodeCache = require("../utils/cache");

const registerAccount = asyncErrorHandler(async (req, res) => {
  let { username, email, password, role } = req.body;
  let findAdmin = await accountModel.findOne({ email });
  if (findAdmin) {
    throw new ErrorResponse("User Already Exits", 400);
  } else {
    let hashPassword = await bcrypt.hash(password, 10);
    let registerAdmin = await accountModel.create({
      username,
      email,
      role,
      password: hashPassword,
    });
    let { _id, createdAt, updatedAt, ...adminInfo } = registerAdmin._doc;
    let generateToken = await createToken(adminInfo);
    res.status(200).json({ error: false, token: generateToken });
  }
});

const loginAccount = asyncErrorHandler(async (req, res) => {
  let findAdmin = await accountModel.findOne({
    email: req.body.email,
    role: { $in: ["admin", "superAdmin"] },
  });
  if (!findAdmin) {
    throw new ErrorResponse("User Not Found", 404);
  } else {
    let comparePassword = await bcrypt.compare(
      req.body.password,
      findAdmin.password
    );
    if (!comparePassword) {
      throw new ErrorResponse("Invalid Credentials", statusCode.notAcceptable);
    } else {
      let {
        password,
        createdAt,
        updatedAt,
        expiredIn,
        otp,
        verified,
        ...adminInfo
      } = findAdmin._doc;
      let generateToken = await createToken(adminInfo);
      res.status(200).json({ error: false, token: generateToken, adminInfo });
    }
  }
});

const getSingelAccount = asyncErrorHandler(async (req, res) => {
  let userDeatils = await accountModel.findById(req.params.id);
  if (!userDeatils) {
    throw new ErrorResponse("Invalid Id", statusCode.notFound);
  } else {
    res.status(200).json(userDeatils);
  }
});

const getUserByRole = asyncErrorHandler(async (req, res) => {
  let userDeatils = await accountModel.find({ role: req.params.role });
  if (!userDeatils) {
    throw new ErrorResponse("Invalid User Role", statusCode.notFound);
  } else {
    res.status(200).json(userDeatils);
  }
});

const updateAccount = asyncErrorHandler(async (req, res) => {});

const deleteAccount = asyncErrorHandler(async (req, res) => {
  let deleteAccount = await accountModel.findByIdAndDelete(req.params.id);
  if (!deleteAccount) {
    throw new ErrorResponse("Invalid Id", statusCode.notFound);
  } else {
    res.status(200).json({ msg: "Account Deleted" });
  }
});

const requestPasswordReset = asyncErrorHandler(async (req, res) => {
  const { email } = req.body;
  const user = await accountModel.findOne({ email });
  if (!user) {
    throw new ErrorResponse("User not found", statusCode.notFound);
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpiry = resetTokenExpiry;
  await user.save();

  const resetUrl = `https://booking.jarabeachresort.com/new/admin/jara/reset-password/${resetToken}`;

  try {
    sendEmail(user.email, "Password Reset Request", "resetPassword", {
      resetUrl,
      email: user.email,
    });
    res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();
    throw new ErrorResponse(
      "Email could not be sent",
      statusCode.internalServerError
    );
  }
});

const resetPassword = asyncErrorHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await accountModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ErrorResponse("Invalid or expired token", statusCode.badRequest);
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;
  await user.save();

  res.status(200).json({ success: true, message: "Password reset successful" });
});
module.exports = {
  registerAccount,
  loginAccount,
  getSingelAccount,
  getUserByRole,
  deleteAccount,
  updateAccount,
  requestPasswordReset,
  resetPassword,
};
