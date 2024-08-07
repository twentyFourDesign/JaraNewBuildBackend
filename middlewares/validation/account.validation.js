const joi = require("joi");

const regitserAccountValidation = async (req, res, next) => {
  let validate = joi.object().keys({
    username: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    role: joi.string().required(),
  });
  const { error } = await validate.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ msg: error.message });
  } else {
    next();
  }
};

const loginAccountValidation = async (req, res, next) => {
  let validate = joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
  });
  const { error } = await validate.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ msg: error.message });
  } else {
    next();
  }
};

module.exports = { regitserAccountValidation, loginAccountValidation };
