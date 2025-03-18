const checkIsValidSchema = require('../utils/checkIsValidSchema');

let EXPENSE = [];
let EXPENSE_ID = 1;

const ExpenseSchema = {
  id: 'number',
  userId: 'number',
  spentAt: 'string',
  title: 'string',
  amount: 'number',
  category: 'string',
  note: 'string',
};

const create = (req, res) => {
  const newRecord = {
    id: EXPENSE_ID,
    ...req.body,
  };

  if (!checkIsValidSchema(ExpenseSchema, newRecord)) {
    return res.sendStatus(400);
  }

  // const hasUser = USERS.some((u) => u.id === newRecord.userId);

  // eslint-disable-next-line no-console
  // console.log({ USERS, hasUser, newRecord });

  // if (!hasUser) {
  //   return res.sendStatus(404);
  // }

  EXPENSE.push(newRecord);
  EXPENSE_ID++;

  res.status(201).send(newRecord);
};

const getAll = (req, res) => {
  res.send(EXPENSE);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const record = EXPENSE.find((u) => u.id === +id);

  if (!record) {
    return res
      .sendStatus(404)
      .send({ error: `Record with id: ${id} doesn't exist` });
  }

  res.send(record);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  EXPENSE = EXPENSE.filter((u) => u.id !== +id);

  res.sendStatus(204);
};

const patch = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const { name } = req.body;

  if (!checkIsValidSchema(ExpenseSchema, { name })) {
    return res.status(422).send({ error: 'Invalid type schema' });
  }

  const index = EXPENSE.findIndex((u) => u.id === +id);

  if (index < 0) {
    return res.sendStatus(404);
  }

  const record = EXPENSE[index];
  const newRecord = { ...record, name };

  EXPENSE[index] = newRecord;

  res.send(newRecord);
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  patch,
};
