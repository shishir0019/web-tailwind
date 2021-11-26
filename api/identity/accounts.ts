// @ts-nocheck
// General imports
import { Request, Response, NextFunction } from 'express';
import app, { sendMessage } from '../../helpers/api';
import { verifyJWT, verifyProperties } from '../../helpers/api.verify';
import { nanoid } from 'nanoid';

// Endpoitn specific imports
const API = '/api/accounts';
import Identity from '../../models/identity';
import Team from '../../models/team';

// Functions specific imports
import jwt from 'jsonwebtoken';

app.post(
  `${API}/login`,
  verifyProperties(['email', 'password']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get verified values from request body
      const { values } = req as any;

      // Finding if identity exists in database or not,if identity exists return identity data.
      const identity = await Identity.findByCredentials(
        values.email,
        values.password
      );

      // Generating identity based on currently logged in identity
      const token = await identity.generateAuthToken();

      res.status(200).json({
        accessToken: token,
        userData: identity
      });
    } catch (error) {
      sendMessage(req, res, 500, {
        message: error.message,
        help: error.stack,
        debugLevel: 'error'
      });
    }
  }
);

app.post(
  `${API}/register`,
  verifyProperties(['first_name', 'last_name', 'email', 'password']),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get verified values from request body
      const { values } = req as any;

      // Check if email exists
      const emailExists = await Identity.findOne({
        email: values.email
      });

      if (emailExists) {
        return sendMessage(req, res, 400, {
          message:
            'Die E-Mail Adresse ' + values.email + ' ist bereits in Benutzung.',
          help: 'Versuche es mit einer anderen E-Mail.',
          debugLevel: 'error'
        });
      }

      // Create new team
      const teamID = nanoid();
      const newTeam = await Team.create({
        _id: teamID,
        name: values.firstName + ' Team'
      });

      // Create new identity => create needed to run mongoose hooks
      values.teams = [
        { isMain: true, team: teamID, createdAt: newTeam.createdAt }
      ];
      const identity = await Identity.create(values);

      // Generate auth token for user
      const token = await identity.generateAuthToken();

      // TODO: Send registration E-Mail

      // Send response
      res.status(201).json({
        accessToken: token,
        userData: identity
      });
    } catch (error) {
      sendMessage(req, res, 500, {
        message: error.message,
        help: error.stack,
        debugLevel: 'error'
      });
    }
  }
);

app.post(
  `${API}/refresh_token`,
  verifyJWT,
  verifyProperties([]),
  async (req: Request, res: Response, next: NextFunction) => {
    const { identity } = req;

    if (!identity) {
      return sendMessage(req, res, 401, {
        message: 'Unauthorized',
        help: 'Login first.',
        debugLevel: 'debug'
      });
    }

    // Retrieve the refresh token from the identity model in database matching the token send by identity
    const refrToken = identity.refreshToken;

    try {
      // Verify the refresh token
      await jwt.verify(refrToken, process.env.JWT_SECRET_REFRESH);

      // Generate New accessToken
      const accessToken = await identity.generateAccessToken();

      res.status(201).json({
        accessToken: accessToken
      });
    } catch (error) {
      return sendMessage(req, res, 500, {
        message: error.message,
        help: error.stack,
        debugLevel: 'error'
      });
    }
  }
);

const change_password = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { identity } = req;

  if (!identity) {
    return sendMessage(req, res, 401, {
      message: 'Unauthorized',
      help: 'Login first.',
      debugLevel: 'debug'
    });
  }

  try {
    // Get verified values from request body
    const { values } = req as any;

    identity.password = values.password;

    await identity.save();

    res.json({
      message: 'Password Changed Successfully'
    });
  } catch (error) {
    return sendMessage(req, res, 500, {
      message: error.message,
      help: error.stack,
      debugLevel: 'error'
    });
  }
};

app.post(
  `${API}/change_password`,
  verifyProperties(['password']),
  async (req, res, next) => {
    const { id, code } = req.query;
    if (id && code) {
      const identity = await Identity.findOne({ _id: id });
      if (identity && identity.auth.code === code) {
        req.identity = identity;
        change_password(req, res, next);
      } else {
        return sendMessage(req, res, 401, {
          message: 'Unauthorized',
          help: 'User not found.',
          debugLevel: 'debug'
        });
      }
    } else {
      verifyJWT(req, res, () => {
        change_password(req, res, next);
      });
    }
  }
);

app.post(
  `${API}/reset_password`,
  verifyProperties(['email']),
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    try {
      // Find identity
      const identity = await Identity.findOne({ email: email });

      if (!identity) {
        return sendMessage(req, res, 401, {
          message: 'Unauthorized',
          help: 'User not found.',
          debugLevel: 'debug'
        });
      }

      // Create new auth Code
      identity.auth.code = nanoid(6);
      await identity.save();

      // TODO: Send link to set a new password

      res.json({
        message: 'Password reset triggered successfully'
      });
    } catch (error) {
      return sendMessage(req, res, 500, {
        message: error.message,
        help: error.stack,
        debugLevel: 'error'
      });
    }
  }
);

app.get(
  `${API}/logout`,
  verifyJWT,
  verifyProperties([]),
  async (req: Request, res: Response, next: NextFunction) => {
    const { identity } = req;

    if (!identity) {
      return sendMessage(req, res, 401, {
        message: 'Unauthorized',
        help: 'Login first.',
        debugLevel: 'debug'
      });
    }

    try {
      identity.tokens = [];

      await identity.save();
      res.status(200).json({
        message: 'Logged Out Successfully!',
        message_de: 'Logout erfolgreich!'
      });
    } catch (error) {
      return sendMessage(req, res, 500, {
        message: error.message,
        help: error.stack,
        debugLevel: 'error'
      });
    }
  }
);

app.get(
  `${API}/confirm`,
  verifyProperties([]),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, code } = req.query;

    // Find identity
    const identity = await Identity.findOne({ _id: id });
    if (identity && code) {
      if (identity.auth.code === code) {
        if (identity.auth.status !== 'confirmed') {
          identity.auth.status = 'confirmed';
          await identity.save();
          res.status(200).json({
            message: 'User confirmed!',
            message_de: 'Benutzer erfolgreich bestätigt.'
          });
        } else {
          res.status(401).json({
            message: 'User already confirmed!',
            message_de: 'Benutzer bereits erfolgreich bestätigt.'
          });
        }

        // TODO: Send Greeting E-Mail
      } else {
        return sendMessage(req, res, 401, {
          message: 'Unauthorized',
          help: 'Code not found.',
          debugLevel: 'debug'
        });
      }
    } else {
      return sendMessage(req, res, 401, {
        message: 'Unauthorized',
        help: 'Identity not found.',
        debugLevel: 'debug'
      });
    }
  }
);

export default app;
