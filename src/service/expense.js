const checkIsValidSchema = require('../utils/checkIsValidSchema');
const compareDates = require('../utils/compareDates');

const ExpenseSchema = {
  id: 'number',
  userId: 'number',
  spentAt: 'string',
  title: 'string',
  amount: 'number',
  category: 'string',
  note: 'string',
};

let EXPENSE = [];
let EXPENSE_ID = 1;

const getAll = ({ userId, categories, from, to }) => {
  let result = [...EXPENSE];

  if (userId) {
    result = result.filter((e) => e.userId === +userId);
  }

  if (categories) {
    result = result.filter((e) => categories === e.category);
  }

  if (from) {
    result = result.filter((e) => compareDates('from', from, e.spentAt));
  }

  if (to) {
    result = result.filter((e) => compareDates('to', to, e.spentAt));
  }

  return result;
};

const getById = (id) => {
  return EXPENSE.find((item) => item.id === id);
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: EXPENSE_ID,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  if (!checkIsValidSchema(ExpenseSchema, expense)) {
    return null;
  }

  EXPENSE.push(expense);

  EXPENSE_ID++;

  return expense;
};

const remove = (id) => {
  EXPENSE = EXPENSE.filter((expense) => expense.id !== id);
};

const update = (id, dataToUpdate) => {
  const expense = getById(id);

  Object.assign(expense, dataToUpdate);

  return expense;
};

const clear = () => {
  EXPENSE = [];
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  clear,
};
