const { fighter } = require('../models/fighter');
const {
  checkBodyWithOutId,
  checkOfExcessiveProperties,
  checkAllfieldsWithOutOne,
  checkHasMoreOneProperties,
} = require('../utils/helper');

function checkFormatData(data) {
  if (!data.name) {
    throw { msg: 'Empty name', status: 400 };
  }
  if (!data.health) {
    data.health = "100";
  }
  if (!data.power) {
    throw { msg: 'Empty power', status: 400 };
  }
  if (!data.defense) {
    throw { msg: 'Empty defense', status: 400 };
  }
  checkHealth(data.health);
  checkPower(data.power);
  checkDefense(data.defense);
}

function checkFormatDataForUpdate(data) {
  if (data.name === '') {
    throw { msg: 'Empty name', status: 400 };
  }
  if (data.health === '') {
    throw { msg: 'Empty health', status: 400 };
  }
  if (data.power === '') {
    throw { msg: 'Empty power', status: 400 };
  }
  if (data.defense === '') {
    throw { msg: 'Empty defense', status: 400 };
  }
  if (data.health) {
    checkHealth(data.health);
  }
  if (data.power) {
    checkPower(data.power);
  }
  if (data.defense) {
    checkDefense(data.deefnse);
  }
}

function isNumber(value) {
  let regExp = /^[0-9]+$/g;
  return regExp.test(value);
}

function checkHealth(health) {
  if (!isNumber(health)) {
    throw { msg: 'Health is not a number', status: 400 };
  } else {
    const value = parseInt(health);
    if (!(value > 80 && value < 120)) {
      throw { msg: 'Health is not in range (80, 120)', status: 400 };
    }
  }
}

function checkPower(power) {
  if (!isNumber(power)) {
    throw { msg: 'Power is not a number', status: 400 };
  } else {
    const value = parseInt(power);
    if (!(value > 1 && value < 100)) {
      throw { msg: 'Power is not in range (1, 100)', status: 400 };
    }
  }
}

function checkDefense(defense) {
  if (!isNumber(defense)) {
    throw { msg: 'Defense is not a number', status: 400 };
  } else {
    const value = parseInt(defense);
    if (!(value > 1 && value < 10)) {
      throw { msg: 'Defense is not in range (1, 10)', status: 400 };
    }
  }
}

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during creation
  try {
    const fighterData = req.body;
    const { id, ...otherProperties } = fighter;

    if (checkBodyWithOutId(fighterData)) {
      throw { msg: 'Request must be without id', status: 400 };
    }
    if (!checkOfExcessiveProperties(otherProperties, fighterData)) {
      throw { msg: 'Request has unnecessary fields', status: 400 };
    }
    if (checkAllfieldsWithOutOne(otherProperties, fighterData, 'health')) {
      throw { msg: 'Request has not required fields', status: 400 };
    }

    checkFormatData(fighterData);

    next();
  } catch (err) {
    res.status(err.status).json({
      error: true,
      message: err.msg,
    });
  }
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during update
  try {
    const paramId = req.params.id;
    const fighterData = req.body;
    const { id, otherProperties } = fighter;

    if (!paramId) {
      throw { msg: 'There is no id in request', status: 400 };
    }
    if (checkBodyWithOutId(fighterData)) {
      throw { msg: 'Request must be without id', status: 400 };
    }
    if (!checkOfExcessiveProperties(otherProperties, fighterData)) {
      throw { msg: 'Request has unnecessary fields', status: 400 };
    }
    if (!checkHasMoreOneProperties(otherProperties, fighterData)) {
      throw { msg: 'Request has not necessary fields', status: 400 };
    }

    checkFormatDataForUpdate(fighterData);

    next();
  } catch (err) {
    res.status(err.status).json({
      error: true,
      message: err.msg,
    });
  }
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
