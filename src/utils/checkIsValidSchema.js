const checkIsValidSchema = (Ischema, Ifields) => {
  return Object.entries(Ifields).every(([key, value]) => {
    if (!Ischema[key]) {
      return false;
    }

    // eslint-disable-next-line valid-typeof
    return Ischema[key] === typeof value;
  });
};

module.exports = checkIsValidSchema;
