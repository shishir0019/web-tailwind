// @ts-nocheck
export const VERSION = 'v0.1.1';
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * E-Mail template
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import { nanoid } from 'nanoid';
import nodemailer from 'nodemailer';
import fs from 'fs';
export const sendEmail = (file, email) => {
  // init transporter
  var transporter = nodemailer.createTransport({
    host: process.env['EMAIL_CONNECTION'].split('@@/@@')[0],
    port: process.env['EMAIL_CONNECTION'].split('@@/@@')[1],
    secure: true,
    auth: {
      user: process.env['EMAIL_CONNECTION'].split('@@/@@')[2],
      pass: process.env['EMAIL_CONNECTION'].split('@@/@@')[3]
    }
  });

  // read file
  fs.readFile(file, 'utf8', async function(err, html) {
    if (err) throw err;

    // send email
    await transporter.sendMail(
      {
        from: process.env['EMAIL_CONNECTION'].split('@@/@@')[4],
        to: email,
        subject,
        text: 'Bitte HTML aktivieren.',
        html
      },
      async (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        transporter.close();
      }
    );
  });
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * SMS template
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// TODO: Build SMS Service

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Activity Endpoint
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// TODO: Build Activity Endpoint
export class ActivityController {
  /**
   * Send message back to request
   * @param {*} req
   * @param {*} res
   * @param {*} code
   * @param {*} options
   *
   */
  static async sendMessage(req, res, code, options) {
    try {
      options = {
        message: options.message,
        _id: options.id || nanoid(),
        debugLevel: options.debugLevel || 'info',
        createdAt: new Date().toISOString(),
        help: options.help || null,
        resource: options.resource || null,
        details: options.details || null
      };
      // ActivityController.logMessage(req, options);
      return res.status(code).json({
        message: options.message,
        details: {
          id: options._id,
          debugLevel: options.debugLevel,
          timestamp: options.createdAt,
          help: options.help,
          resource: options.resource,
          docuUrl: `${process.env.BASE_URL}/${options.resource}/docs`,
          promotionUrl: `${process.env.BASE_URL}/${options.resource}/promotion`
        }
      });
    } catch (error) {
      console.log(error);
      // TODO: Catch this error
    }
  }

  /**
   * Log a message to activity collection
   * @param {*} req
   * @param {*} options
   *
   */
  static async logMessage(req, options) {
    try {
      options = {
        message: options.message,
        _id: options._id || nanoid(),
        debugLevel: options.debugLevel || 'info',
        createdAt: new Date().toISOString(),
        help: options.help || null,
        resource: options.resource || null,
        details: options.details || null,
        createdBy: req.claims !== undefined ? req.claims.identity : null,
        team: req.team === undefined ? null : req.team.team,
        requestNumber: options.requestNumber || -1,
        periods: options.periods || -1
      };

      // Override request details with custom details
      if (options.details === null) {
        options.details = {
          method: req.method,
          url: req.originalUrl,
          body: req.body
        };
      }

      // Remove password if contains in body
      if (req.body.password !== undefined) {
        options.details.body.password = 'passwordRemovedBySystem';
      }

      Activities.model.create(options);
    } catch (error) {
      Activities.model.create({
        message: error.message,
        help: error.stack,
        details: {
          method: req.method,
          url: req.originalUrl,
          body: req.body
        },
        debugLevel: 'error'
      } as any);
    }
  }
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Webhook Endpoint
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// TODO: Build Webhook Endpoint

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Subscription Endpoint
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// TODO: Build Subscription Endpoint
