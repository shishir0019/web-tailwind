// @ts-nocheck
export const VERSION = 'v0.1.1';
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * global configuration
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import { nanoid } from 'nanoid';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * express configuration
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import express, { Request, Response, NextFunction } from 'express';

import helmet from 'helmet';
const app = express();

// Use body parser
app.use(express.json());

// Accept json and limit size
app.use(express.json({ limit: '999kb' }));

// Accept text data
app.use(express.urlencoded({ extended: true }));

// Add helmet for security remove 11 security params
app.use(helmet());

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Database configuration
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const mongoose = require('mongoose');
const DB_CONNECTION = process.env['DB_CONNECTION'];

export async function init() {
  try {
    await mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('Database Connection successfully!');
  } catch (err) {
    console.log(err);
  }
}
init();

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * REST-API configuration
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/**
 * Find all entries
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} Entry
 */
export const findAll = async (req, res, next, Entry) => {
  const { page = 1, pageLimit = 100 } = req.query;
  const find = req.find ? req.find : {};

  try {
    const entries = await Entry.find(find)
      .sort({ createdAt: -1 })
      .limit(pageLimit)
      .skip((page - 1) * pageLimit);

    const max = await Entry.countDocuments(find);

    //If there is no entry return 204 status
    if (entries.length === 0) {
      return res.status(204).json([]);
    }

    // Return all the status and status 200 if everything is ok
    res.status(200).json({ entries, count: max });
  } catch (err) {
    sendMessage(req, res, 500, {
      message: err.message,
      help: err.stack,
      debugLevel: 'error'
    });
  }
};

/**
 * Find entry by id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} Entry
 * @param {*} options
 *              - population
 *
 */
export const findById = async (req, res, next, Entry, options = {}) => {
  const { id } = req.params;
  const find = req.find ? req.find : { _id: id };

  try {
    let entry = undefined;

    if (options) {
      entry = await Entry.findOne(find).populate((options as any).populate);
    } else {
      entry = await Entry.findOne(find);
    }

    if (entry === null || entry === undefined) {
      return res.status(400).json({
        message: 'Resource with id not found.',
        help: 'Check if this resource exist.',
        debugLevel: 'debug'
      });
    } else {
      return res.status(200).json(entry);
    }
  } catch (err) {
    sendMessage(req, res, 500, {
      message: err.message,
      help: err.stack,
      debugLevel: 'error'
    });
  }
};

/**
 * Create new entry
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} Entry
 */
export const create = async (req, res, next, Entry) => {
  try {
    const values = req.body;

    const entry = await Entry.create(values);
    if (entry === null || entry === undefined) {
      return res.status(400).json({
        message: 'Resource with id not found.',
        help: 'Check if this resource exist.',
        debugLevel: 'debug'
      });
    } else {
      res.status(201).json({
        id: entry._id
      });
    }
  } catch (err) {
    sendMessage(req, res, 500, {
      message: err.message,
      help: err.stack,
      debugLevel: 'error'
    });
  }
};

/**
 * Update entry by id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} Entry
 */
export const updateById = async (req, res, next, Entry) => {
  try {
    //Get the id of the entry through request param
    const { id } = req.params;
    const find = req.find ? req.find : { _id: id };
    const values = req.body;

    // Update entry
    const entry = await Entry.findOneAndUpdate(find, values);
    if (entry === null || entry === undefined) {
      return res.status(400).json({
        message: 'Resource with id not found.',
        help: 'Check if this resource exist.',
        debugLevel: 'debug'
      });
    } else {
      res.status(200).json({
        id: entry._id
      });
    }
  } catch (err) {
    sendMessage(req, res, 500, {
      message: err.message,
      help: err.stack,
      debugLevel: 'error'
    });
  }
};

/**
 * Delete entry by id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} Entry
 */
export const deleteById = async (req, res, next, Entry) => {
  try {
    //Get the id of the entry through request param
    const { id } = req.params;
    const find = req.find ? req.find : { _id: id };

    const entry = await Entry.deleteOne(find);
    if (!entry.deletedCount) {
      return res.status(400).json({
        message: 'Resource with id not found or nothing to delete.',
        help: 'Check if this resource exist.',
        debugLevel: 'debug'
      });
    }
    res.status(204).send();
  } catch (err) {
    sendMessage(req, res, 500, {
      message: err.message,
      help: err.stack,
      debugLevel: 'error'
    });
  }
};

/**
 * Delete all entries
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} Entry
 */
export const deleteAll = async (req, res, next, Entry) => {
  const { userId } = req.query || '';
  try {
    const find = req.body;

    const entry = await Entry.deleteMany(find);
    if (!entry.deletedCount) {
      return res.status(400).json({
        message: 'Resource with id not found or nothing to delete.',
        help: 'Check if this resource exist.',
        debugLevel: 'debug'
      });
    }
    res.status(204).send();
  } catch (err) {
    sendMessage(req, res, 500, {
      message: err.message,
      help: err.stack,
      debugLevel: 'error'
    });
  }
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Supporter functions
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
async function sendMessage(req, res, code, options) {
  console.log(options.message);
  try {
    return res.status(code).json({
      message: options.message,
      details: {
        id: options._id || nanoid(),
        debugLevel: options.debugLevel,
        help: options.help,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.log(error);
    // TODO: Catch this error
  }
}
module.exports.sendMessage = sendMessage;

export default app;
