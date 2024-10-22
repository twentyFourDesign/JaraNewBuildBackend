const {
  asyncErrorHandler,
  ErrorResponse,
} = require("../middlewares/error/error");
const DaypassOption = require("../models/option.schema"); // Ensure you import the correct model
const { statusCode } = require("../utils/statusCode");

const create = asyncErrorHandler(async (req, res) => {
  const createDaypass = await DaypassOption.create(req.body);
  if (createDaypass) {
    res.status(statusCode.accepted).json(createDaypass);
  } else {
    throw new ErrorResponse("Failed To Create Option", 404);
  }
});

const update = asyncErrorHandler(async (req, res) => {
  const { adultsAlcoholic, adultsNonAlcoholic, nanny, childTotal } = req.body;
  const findOption = await DaypassOption.findById(req.params.id);

  if (!findOption) {
    throw new ErrorResponse("Option not found", 404);
  }

  const updatedBody = {
    adultsAlcoholic: {
      weekDayPrice:
        adultsAlcoholic?.weekDayPrice ||
        findOption.adultsAlcoholic.weekDayPrice,
      weekendPrice:
        adultsAlcoholic?.weekendPrice ||
        findOption.adultsAlcoholic.weekendPrice,
      seasonalPrice:
        adultsAlcoholic?.seasonalPrice ||
        findOption.adultsAlcoholic.seasonalPrice,
    },
    adultsNonAlcoholic: {
      weekDayPrice:
        adultsNonAlcoholic?.weekDayPrice ||
        findOption.adultsNonAlcoholic.weekDayPrice,
      weekendPrice:
        adultsNonAlcoholic?.weekendPrice ||
        findOption.adultsNonAlcoholic.weekendPrice,
      seasonalPrice:
        adultsNonAlcoholic?.seasonalPrice ||
        findOption.adultsNonAlcoholic.seasonalPrice,
    },
    nanny: {
      weekDayPrice: nanny?.weekDayPrice || findOption.nanny.weekDayPrice,
      weekendPrice: nanny?.weekendPrice || findOption.nanny.weekendPrice,
      seasonalPrice: nanny?.seasonalPrice || findOption.nanny.seasonalPrice,
    },
    childTotal: {
      weekDayPrice:
        childTotal?.weekDayPrice || findOption.childTotal.weekDayPrice,
      weekendPrice:
        childTotal?.weekendPrice || findOption.childTotal.weekendPrice,
      seasonalPrice:
        childTotal?.seasonalPrice || findOption.childTotal.seasonalPrice,
    },
  };

  const updatedData = await DaypassOption.findByIdAndUpdate(
    req.params.id,
    updatedBody,
    { new: true }
  );
  if (updatedData) {
    res.status(statusCode.accepted).json(updatedData);
  } else {
    throw new ErrorResponse("Failed To Update Option", 404);
  }
});

const getAll = asyncErrorHandler(async (req, res) => {
  const allDaypass = await DaypassOption.find({});
  if (allDaypass.length > 0) {
    res.status(statusCode.accepted).json(allDaypass);
  } else {
    throw new ErrorResponse("No Options Found", 404);
  }
});

const del = asyncErrorHandler(async (req, res) => {
  const deletedOption = await DaypassOption.findByIdAndDelete(req.params.id);
  if (deletedOption) {
    res.status(statusCode.accepted).json({ msg: "Deleted" });
  } else {
    throw new ErrorResponse("No Option Found", 404);
  }
});

module.exports = { create, getAll, del, update };
