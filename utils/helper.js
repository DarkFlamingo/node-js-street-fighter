module.exports = {
  checkBodyWithOutId(data) {
    return data.id;
  },

  checkOfExcessiveProperties(model, data) {
    for (let property in data) {
      if (!model.hasOwnProperty(property)) return false;
    }
    return true;
  },

  checkAllfields(model, data) {
    return (
      JSON.stringify(Object.keys(model).sort()) !==
      JSON.stringify(Object.keys(data).sort())
    );
  },

  checkAllfieldsWithOutOne(model, data, field) {
    const modelArrayKeys = Object.keys(model);
    const dataArrayKeys = Object.keys(data);
    modelArrayKeys.splice(1, modelArrayKeys.indexOf(field));
    dataArrayKeys.splice(1, dataArrayKeys.indexOf(field));
    return (
      JSON.stringify(modelArrayKeys.sort()) !==
      JSON.stringify(dataArrayKeys.sort())
    );
  },

  checkHasMoreOneProperties(model, data) {
    for (let property in model) {
      if (data.hasOwnProperty(property)) return true;
    }
    return false;
  },
};
