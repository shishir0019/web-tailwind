import app, {
  findAll,
  create,
  findById,
  updateById,
  deleteById,
  deleteAll
} from '../../helpers/api';

const API = '/api/identities';
const Entry = require('../../models/identity');

app.get(API, async (req, res, next) => {
  findAll(req, res, next, Entry);
});

app.post(API, async (req, res, next) => {
  create(req, res, next, Entry);
});

app.get(API + '/:id', async (req, res, next) => {
  findById(req, res, next, Entry);
});

app.patch(API + '/:id', async (req, res, next) => {
  updateById(req, res, next, Entry);
});

app.delete(API + '/:id', async (req, res, next) => {
  deleteById(req, res, next, Entry);
});

app.delete(API, async (req, res, next) => {
  deleteAll(req, res, next, Entry);
});

module.exports = app;
