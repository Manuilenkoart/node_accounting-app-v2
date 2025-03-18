const checkIsValidSchema = require('../utils/checkIsValidSchema');

let USERS = [];
let USERS_ID = 1;

const UserSchema = {
  id: 'number',
  name: 'string',
};

const create = (req, res) => {
  const { name } = req.body;

  const newRecord = {
    id: USERS_ID,
    name,
  };

  USERS.push(newRecord);
  USERS_ID++;

  res.send(newRecord);
};

const getAll = (req, res) => {
  res.send(USERS);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const record = USERS.find((u) => u.id === +id);

  if (!record) {
    return res.sendStatus(404);
  }

  res.send(record);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(404);
  }

  const removed = USERS.filter((u) => u.id !== +id);

  if (USERS.length === removed.length) {
    return res.sendStatus(404);
  }

  USERS = removed;

  res.sendStatus(204);
};

const patch = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const { name } = req.body;

  if (!checkIsValidSchema(UserSchema, { name })) {
    return res.sendStatus(400);
  }

  const index = USERS.findIndex((u) => u.id === +id);

  if (index < 0) {
    return res.sendStatus(404);
  }

  const record = USERS[index];
  const newRecord = { ...record, name };

  USERS[index] = newRecord;

  res.send(newRecord);
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  patch,
};
