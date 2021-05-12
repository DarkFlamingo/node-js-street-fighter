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

function checkFormatData(data) {
  if (!data.firstName) {
    throw { msg: 'Invalid firstName', status: 400 };
  }
  if (!data.lastName) {
    throw { msg: 'Invalid lastName', status: 400 };
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

function checkEmail(email) {
  console.log(email);
  if (email) {
    let regExp = /^[\w.+\-]+@g(oogle)?mail\.com$/;
    return regExp.test(email);
  } else {
    throw { msg: 'Empty email', status: 400 };
  }
}

function checkPhoneNumber(phoneNumber) {
  if (phoneNumber) {
    let regExp = /^\+380[0-9]{7}/i;
    return regExp.test(phoneNumber);
  } else {
    throw { msg: 'Empty phone number', status: 400 };
  }
}

function checkPassword(password) {
  if (password) {
    return !(password.length < 3);
  } else {
    throw { msg: 'Empty password', status: 400 };
  }
}

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation
  const userData = req.body;

  const { id, ...otherProperties } = user;

  try {
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
    const id = req.params.id;
    const userData = req.body;

    if (checkBodyWithOutId(userData)) {
      throw { msg: 'Request must be without id', status: 400 };
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

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
