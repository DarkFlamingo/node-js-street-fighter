const { user } = require('../models/user');

function checkBodyWithOutId(data) {
  return data.id;
}

function checkOfExcessiveProperties(model, data) {
  for (let property in data) {
    if (!model.hasOwnProperty(property)) return false;
  }
  return true;
}

function checkAllfields(model, data) {
  return (
    JSON.stringify(Object.keys(model).sort()) !==
    JSON.stringify(Object.keys(data).sort())
  );
}

function checkHasMoreOneProperties(model, data) {
  for (let property in model) {
    if (data.hasOwnProperty(property)) return true;
  }
  return false;
}

function checkFormatData(data) {
  if (!data.firstName) {
    throw { msg: 'Empty firstName', status: 400 };
  }
  if (!data.lastName) {
    throw { msg: 'Empty lastName', status: 400 };
  }
  if (!data.email) {
    throw { msg: 'Empty email', status: 400 };
  }
  if (!data.phoneNumber) {
    throw { msg: 'Empty phone number', status: 400 };
  }
  if (!data.password) {
    throw { msg: 'Empty password', status: 400 };
  }
  if (!checkEmail(data.email)) {
    throw { msg: 'Invalid email', status: 400 };
  }
  if (!checkPhoneNumber(data.phoneNumber)) {
    throw { msg: 'Invalid phone number', status: 400 };
  }
  if (!checkPassword(data.password)) {
    throw { msg: 'Invalid password', status: 400 };
  }
}

function checkFormatDataForUpdate(data) {
  if (data.email) {
    if (!checkEmail(data.email)) {
      throw { msg: 'Invalid email', status: 400 };
    }
  }
  if (data.phoneNumber) {
    if (!checkPhoneNumber(data.phoneNumber)) {
      throw { msg: 'Invalid phone number', status: 400 };
    }
  }
  if (data.password) {
    if (!checkPassword(data.password)) {
      throw { msg: 'Invalid password', status: 400 };
    }
  }
}

function checkEmail(email) {
  let regExp = /^[\w.+\-]+@g(oogle)?mail\.com$/;
  return regExp.test(email);
}

function checkPhoneNumber(phoneNumber) {
  let regExp = /^\+380[0-9]{7}/i;
  return regExp.test(phoneNumber);
}

function checkPassword(password) {
  return !(password.length < 3);
}

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation
  try {
    const userData = req.body;
    const { id, ...otherProperties } = user;

    if (checkBodyWithOutId(userData)) {
      throw { msg: 'Request must be without id', status: 400 };
    }
    if (!checkOfExcessiveProperties(otherProperties, userData)) {
      throw { msg: 'Request has unnecessary fields', status: 400 };
    }
    if (checkAllfields(otherProperties, userData)) {
      throw { msg: 'Request has not required fields', status: 400 };
    }
    checkFormatData(userData);

    next();
  } catch (err) {
    res.status(err.status).json({
      error: true,
      msg: err.msg,
    });
  }
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  try {
    const paramId = req.params.id;
    const userData = req.body;
    const { id, ...otherProperties } = user;

    if (!paramId) {
      throw { msg: 'There is no id in request', status: 400 };
    }
    if (checkBodyWithOutId(userData)) {
      throw { msg: 'Request must be without id', status: 400 };
    }
    if (!checkOfExcessiveProperties(otherProperties, userData)) {
      throw { msg: 'Request has unnecessary fields', status: 400 };
    }
    if (!checkHasMoreOneProperties(otherProperties, userData)) {
      throw { msg: 'Request has not necessary fields', status: 400 };
    }

    checkFormatDataForUpdate(userData);

    next();
  } catch (err) {
    res.status(err.status).json({
      error: true,
      msg: err.msg,
    });
  }
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
