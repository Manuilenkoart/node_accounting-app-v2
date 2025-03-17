const checkIsValidSchema = require('../utils/checkIsValidSchema');

let USERS = [];
let USERS_ID = 0;

const UserSchema = {
  name: 'string',
};

const create = (req, res) => {
  const { name } = req.body;

  USERS_ID++;

  const newRecord = {
    id: USERS_ID,
    name,
  };

  USERS.push(newRecord);

  res.send(newRecord);
};

const getAll = (req, res) => {
  res.send(USERS);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: 'Required parameter is not passed' });
  }

  const record = USERS.find((u) => u.id === +id);

  if (!record) {
    return res
      .status(404)
      .send({ error: `Record with id: ${id} doesn't exist` });
  }

  res.send(record);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: 'Required parameter is not passed' });
  }

  USERS = USERS.filter((u) => u.id !== +id);

  res.status(204).send();
};

const patch = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: 'Required parameter is not passed' });
  }

  const { name } = req.body;

  if (!checkIsValidSchema(UserSchema, { name })) {
    return res.status(422).send({ error: 'Invalid type schema' });
  }

  const index = USERS.findIndex((u) => u.id === +id);

  if (index < 0) {
    return res
      .status(404)
      .send({ error: `Record with id: ${id} doesn't exist` });
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
