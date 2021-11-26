// @ts-nocheck
export const VERSION = 'v0.1.1';
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * verify functions
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import jwt_decode from 'jwt-decode';
import { ActivityController } from './api.utils';
export const verifyProperties = (fields, queries?, options?) => {
  return async function(req: Request, res: Response, next: NextFunction) {
    // TODO: Check payload typ and throw error if not match

    // Check if request payload content-type matches json, because body-parser does not check for content types
    // if (!req.is('json')) {
    //   return res.sendStatus(415); // -> Unsupported media type if request doesn't have JSON body
    // }

    try {
      // Get and validate fields from request's body
      const keys = Object.keys(req.body);

      // Check if already created
      let { values } = req;
      if (!values) {
        values = {
          $set: {}
        };
      } else {
        values.$set = {};
      }
      const invalidProperties = [];

      // Look for invalid properties
      if (keys.length > 0) {
        keys.forEach(key => {
          // Check if invalid property on first level
          const found = fields.find(field => field === key);
          if (found === undefined) {
            invalidProperties.push(key);
          }

          // Iterate through all keys
          for (const subKey in req.body[key]) {
            if (typeof req.body[key] === 'object') {
              const attrParam = '' + key + '.' + subKey;
              values.$set[attrParam] = req.body[key][subKey];
            } else {
              values[key] = req.body[key];
            }
          }
        });
      }

      // Found invalid properties
      if (invalidProperties.length > 0) {
        // Get string for not allowed values
        let notAllowed = 'Property (';
        invalidProperties.forEach(invalid => {
          notAllowed = notAllowed + ' ' + invalid;
        });
        notAllowed = notAllowed + ' ) is not allowed.';

        // Get string for allowed values
        let allowed = 'Allowed Properties are (';
        fields.forEach(field => {
          allowed = allowed + ' ' + field;
        });
        allowed = allowed + ' ).';

        return ActivityController.sendMessage(req, res, 400, {
          message: notAllowed,
          help: allowed,
          debugLevel: 'debug'
        });
      }

      const invalidQueries = [];
      const foundQueries = Object.keys(req.query);
      const { find } = req;
      if (foundQueries.length > 0) {
        foundQueries.forEach(foundQuery => {
          // Global allowed query
          if (
            foundQuery === 'mode' ||
            foundQuery === 'team' ||
            foundQuery === 'teams'
          ) {
            // Do nothing
          } else {
            if (queries) {
              const allowed = queries.find(query => query === foundQuery);
              if (allowed) {
                const filter = {};
                filter[allowed] = req.query[allowed];
                find.$and.push(filter);
              } else {
                invalidQueries.push(foundQuery);
              }
            }
          }
        });

        if (invalidQueries.length > 0) {
          // Get string for not allowed values
          let notAllowed = 'Query (';
          invalidQueries.forEach(invalid => {
            notAllowed = notAllowed + ' ' + invalid;
          });
          notAllowed = notAllowed + ' ) is not allowed.';

          // Get string for allowed values
          let allowed = 'Allowed Query are (';
          queries.forEach(field => {
            allowed = allowed + ' ' + field;
          });
          allowed = allowed + ' ).';

          return ActivityController.sendMessage(req, res, 400, {
            message: notAllowed,
            help: allowed,
            debugLevel: 'debug'
          });
        }
      }

      // Add values an call next
      req.values = values;
      next();
    } catch (error) {
      return ActivityController.sendMessage(req, res, 500, {
        message: error.message,
        help: error.stack,
        debugLevel: 'error'
      });
    }
  };
};

export const verifyQuota = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { claims, team, scope } = req;

    if (scope.quota === '*' || scope.frequency === '*') {
      ActivityController.logMessage(req, {
        message: 'System generated.',
        debugLevel: 'debug'
      });
    } else {
      if (claims && team && scope) {
        const activities = await Activities.find({
          team: team.team,
          requestNumber: {
            $ne: -1
          }
        })
          .sort({ createdAt: -1 })
          .limit(1);

        let requestNumber = 0;

        const now = new Date().getTime();
        const signUp = new Date(team.createdAt).getTime();
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;

        const periods = Math.ceil((now - signUp) / thirtyDays);

        if (activities.length > 0) {
          // Verify quota
          const startPeriod = signUp + (periods - 1) * thirtyDays;
          const endPeriod = signUp + periods * thirtyDays;

          // If new period begins reset
          if (periods > activities[0].periods) {
            requestNumber = 0;
          } else {
            requestNumber = activities[0].requestNumber + 1;
          }

          // Max number of request reached for this month
          if (requestNumber > scope.quota) {
            return ActivityController.sendMessage(req, res, 429, {
              message: 'Rate limit is exceeded for team: ' + team.team,
              help:
                'You more then ' +
                scope.quota +
                ' request in this month. Upgrade to a bigger plan.',
              debugLevel: 'info'
            });
          }

          // Verify frequency
          const lastExecution = new Date(activities[0].createdAt).getTime();
          const frequency = scope.frequency;

          if (now - lastExecution < frequency) {
            return ActivityController.sendMessage(req, res, 429, {
              message: 'Rate limit is exceeded for team: ' + team.team,
              help: 'Retry after ' + frequency + ' ms.',
              debugLevel: 'info'
            });
          }
        }

        ActivityController.logMessage(req, {
          message: 'System generated.',
          requestNumber,
          debugLevel: 'debug',
          periods
        });
      } else {
        return ActivityController.sendMessage(req, res, 401, {
          message: 'Unauthorized',
          help: 'No JWT found.',
          debugLevel: 'debug'
        });
      }
    }
    next();
  } catch (error) {
    return ActivityController.sendMessage(req, res, 500, {
      message: error.message,
      help: error.stack,
      debugLevel: 'error'
    });
  }
};

export const verifyBlackListJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Add support for JWT Blacklist
    // Jwt-blacklist
    // https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/expirejwt.md
    next();
  } catch (error) {
    return ActivityController.sendMessage(req, res, 500, {
      message: error.message,
      help: error.stack,
      debugLevel: 'error'
    });
  }
};

export const limitRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Limit number of Request for a specific IP and User

    next();
  } catch (error) {
    return ActivityController.sendMessage(req, res, 500, {
      message: error.message,
      help: error.stack,
      debugLevel: 'error'
    });
  }
};

export const verifyScopeJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    decodeJWTTokenAndClaims(req, res);

    decodeScope(req, res);

    calculateFindAndTeam(req, res);

    calculateValues(req, res);

    next();
  } catch (error) {
    return ActivityController.sendMessage(req, res, 500, {
      message: error.message,
      help: error.stack,
      debugLevel: 'error'
    });
  }
};

export const verifyScopeKEY = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: encode base64 key
  // TODO: verify valid secret
  // TODO: add claims to request
  // TODO: add scope to request

  next();
};

const METHOD = {
  UNKOWN: 0,
  GET: 1,
  PATCH: 2,
  POST: 3,
  DELETE: 4
};

function decodeJWTTokenAndClaims(req, res) {
  const authHeader = req.header('Authorization');
  const token =
    authHeader !== undefined
      ? req.header('Authorization').replace('Bearer ', '')
      : undefined;

  // Verifying access token
  if (!token) {
    return ActivityController.sendMessage(req, res, 403, {
      message: 'Access forbidden to this resource.',
      help: 'Jwt token in header missing.',
      debugLevel: 'debug'
    });
  }

  // Decode Token
  const claims = jwt_decode(token.replace('Bearer ', ''));
  req.claims = claims;
  return claims;
}

function decodeScope(req, res) {
  // Calculate scope
  const scope = {
    resource: '',
    method: 0,
    fields: '*',
    quota: '*',
    frequency: '*'
  };

  const { claims } = req;

  claims.privateScopes.forEach(claim => {
    const resource = claim.split('.')[0].toLowerCase();
    const method = claim.split('.')[1].toLowerCase();

    if (req.originalUrl.indexOf(resource) >= 0) {
      // found resource
      scope.resource = resource;

      // check if field definition found
      if (claim.split('.')[2]) {
        scope.fields = claim.split('.')[2].toLowerCase();
      }

      // check if field definition found
      if (claim.split('.')[3]) {
        scope.quota = claim.split('.')[3];
      }

      // check if field definition found
      if (claim.split('.')[4]) {
        scope.frequency = claim.split('.')[4];
      }

      // check which method found
      if (method === '*') {
        scope.method = METHOD.DELETE;
      } else if (method === 'delete') {
        scope.method = METHOD.DELETE;
      } else if (method === 'post') {
        scope.method = METHOD.POST;
      } else if (method === 'patch') {
        scope.method = METHOD.PATCH;
      } else if (method === 'get') {
        scope.method = METHOD.GET;
      } else {
        scope.method = METHOD.UNKOWN;
      }
    }
  });

  // Check if unknow operation
  if (scope.method === METHOD.UNKOWN || scope.resource === '') {
    return ActivityController.sendMessage(req, res, 401, {
      message: 'Unknow / not support method.',
      help: 'Check permission and try again.',
      debugLevel: 'debug'
    });
  }

  // Check if valid
  if (
    (req.method.toLowerCase() === 'delete' && scope.method < METHOD.DELETE) ||
    (req.method.toLowerCase() === 'post' && scope.method < METHOD.POST) ||
    (req.method.toLowerCase() === 'patch' && scope.method < METHOD.PATCH) ||
    (req.method.toLowerCase() === 'get' && scope.method < METHOD.GET)
  ) {
    return ActivityController.sendMessage(req, res, 401, {
      message: 'Not allowed to access this resource.',
      help: 'Check permission and try again.',
      debugLevel: 'debug'
    });
  }

  req.scope = scope;
  return scope;
}

function calculateFindAndTeam(req, res) {
  const find = { $and: [{ $or: [] }] };
  let team = {};
  const { claims } = req;
  const { mode } = req.query;

  if (mode === 'admin' && claims.role === 'superadmin') {
    find.$and[0].$or.push({});
  } else {
    // Get values based on teams
    const { teams } = req.query;
    let teamNotFound = true;
    if (teams) {
      teams.split(',').forEach(unverifiedTeam => {
        // Verify if access to team is allowed
        claims.teams.forEach(verifiedTeam => {
          if (verifiedTeam.team === unverifiedTeam) {
            find.$and[0].$or.push({ 'teams.team': verifiedTeam.team });
            team = verifiedTeam;
            teamNotFound = false;
          }
        });
      });
    } else {
      claims.teams.forEach(verifiedTeam => {
        find.$and[0].$or.push({ 'teams.team': verifiedTeam.team });
        team = verifiedTeam;
        teamNotFound = false;
      });
    }

    if (teamNotFound) {
      return ActivityController.sendMessage(req, res, 401, {
        message: 'Not allowed to access this resource.',
        help: 'Check permission and try again.',
        debugLevel: 'debug'
      });
    }
  }

  // Add id of a specific resource if found
  const { id } = req.params;
  if (id) {
    find.$and.push({ _id: id } as any);
  }

  req.team = team;
  req.find = find;
  return find;
}

function calculateValues(req, res) {
  // Check if already created
  let { values } = req;
  const { scope, claims } = req;

  if (!values) {
    values = {};
  }

  // Get team
  const { team } = req.query;
  let teamNotFound = true;

  // New entry created
  if (req.method.toLowerCase() === 'post') {
    values.createdBy = claims.identity;

    // Set team from query
    let mainTeam;
    if (team) {
      // Verify if access to team is allowed
      claims.teams.forEach(verifiedTeam => {
        if (verifiedTeam.team === team) {
          mainTeam = { isMain: true, team };
          teamNotFound = false;
        }
      });
    } else {
      mainTeam = claims.teams.find(team => team.isMain === true);
      teamNotFound = false;
    }

    // This is just
    if (scope.resource === 'identities') {
      values.teams = [mainTeam];
    } else {
      values.teams = mainTeam.team;
    }

    if (teamNotFound) {
      return ActivityController.sendMessage(req, res, 401, {
        message: 'Not allowed to access this resource.',
        help: 'Check permission and try again.',
        debugLevel: 'debug'
      });
    }
  }

  // Entry updated
  if (req.method.toLowerCase() === 'patch') {
    values.updatedBy = claims.identity;

    // TODO: Add specific validation for moving to other teams

    // TODO: Add specific validation for switchting to identities

    // TODO: Are there other specific thing to look after?
  }

  req.values = values;
  return values;
}

function endWithBadResponse(req, message = 'Bad Request') {
  req.context.log.error(message);
  req.context.bindings.response = {
    status: 400,
    body: message
  };
  req.context.done();
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * JWT verify
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import jwt from 'jsonwebtoken';
import Identity from '../models/identity';
export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header('Authorization');

    // Get access token from header
    const token =
      authHeader !== undefined
        ? req.header('Authorization')?.replace('Bearer ', '')
        : undefined;

    // Verifying access token
    if (!token) {
      return ActivityController.sendMessage(req, res, 403, {
        message: 'Access forbidden to this resource.',
        help: 'Login and try again.',
        debugLevel: 'debug'
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_ACCESS);

    const identity = await Identity.findOne({
      _id: decoded.identity
    });

    if (!identity) {
      return ActivityController.sendMessage(req, res, 403, {
        message: 'Access forbidden to this resource.',
        help: 'Login and try again.',
        debugLevel: 'debug'
      });
    }

    (req as any).identity = identity;
    (req as any).token = token;
    next();
  } catch (error) {
    return ActivityController.sendMessage(req, res, 401, {
      message: error.message,
      help: error.stack,
      debugLevel: 'debug'
    });
  }
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Azure upload
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
import multipart from 'parse-multipart';
import { BlobServiceClient } from '@azure/storage-blob';
export const azureUpload = (fileNames, container) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body) {
        const bodyBuffer = Buffer.from(req.body);

        const boundary = multipart.getBoundary(req.headers['content-type']);
        const parts = multipart.Parse(bodyBuffer, boundary);

        const blobServiceClient = BlobServiceClient.fromConnectionString(
          BLOG_STORAGE_CONNECTION
        );

        // Get a reference to a container
        const containerClient = blobServiceClient.getContainerClient(container);

        const blobOptions = {
          blobHTTPHeaders: { blobContentType: parts[0].type }
        };

        const fileUrls: any = [];

        await Promise.all(
          parts.map(async (part, index) => {
            // Create a unique name for the blob
            const blobName = nanoid() + index + '.' + part.type.split('/')[1];

            // Get a block blob client
            const blockBlobClient = containerClient.getBlockBlobClient(
              blobName
            );
            // Upload data to the blob
            const data = part.data;
            await blockBlobClient.upload(data, data.length, blobOptions);

            fileUrls.push({
              [fileNames[index]]: blockBlobClient.url
            });

            return;
          })
        );
        req.fileUrls = fileUrls;
        next();
      } else {
        return endWithBadResponse(req.context, `Request Body is not defined`);
      }
    } catch (error) {
      console.log(error);
      req.context.log.error(err.message);
      // TODO: Catch this error Better

      // TODO: Clean this up
      throw err;
    }
  };
};
