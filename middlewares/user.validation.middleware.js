const { user } = require('../models/user');

function checkBodyWithOutId(data) {
  return !data.id;
}

function checkAllfields(model, data) {
  for (let property in data) {
    if (!model.hasOwnProperty(property)) return false;
  }
  return true;
}

function checkOfExcessiveProperties(model, data) {
  return (
    JSON.stringify(Object.keys(model).sort()) ===
    JSON.stringify(Object.keys(data).sort())
  );
}

function checkFormatData(data) {
  if (checkEmail(data.email)) {
    throw { msg: 'Invalid email', status: 400 };
  }
  if (checkPhoneNumber(data.phoneNumber)) {
    throw { msg: 'Invalid phone number', status: 400 };
  }
  if (checkPassword(data.password)) {
    throw { msg: 'Invalid password', status: 400 };
  }
}

function checkEmail(email) {
  let regExp = /^[\w.+\-]+@g(oogle)?mail\.com$/g;
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
  const userData = req.data;

  if (checkBodyWithOutId(userData)) {
    throw { msg: 'Request must be without id', status: 400 };
  }
  if (checkAllfields(user, userData)) {
    throw { msg: 'Request has not required fields', status: 400 };
  }
  if (checkOfExcessiveProperties(user, userData)) {
    throw { msg: 'Request has unnecessary fields', status: 400 };
  }
  checkFormatData(userData);
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  try {
    const id = req.params.id;
    const userData = req.data;

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
