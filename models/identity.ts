import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { nanoid } from 'nanoid';

import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const AUDIENCE = process.env.BASE_URL;
const ISSUER = process.env.COMPANY;

const identitySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid()
    },

    first_name: {
      type: String,
      required: true
    },

    last_name: {
      type: String,
      default: ''
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('not a valid email');
        }
      }
    },

    phone: {
      type: String,
      default: ''
    },

    password: {
      type: String,
      min: 7,
      trim: true
    },

    external: {
      type: String,
      default: ''
    },

    profile: {
      type: String,
      default: ''
    },

    birthday: {
      type: String,
      default: ''
    },

    about: {
      type: String,
      default: ''
    },

    refreshToken: {
      type: String,
      default: ''
    },

    // Definition of global scope
    // {endpointName}.{command}.{field}
    // {endpointName} => /me or /billings or /identities for admins
    // {comands} => GET, PATCH, POST, DELETE
    // {field} => name
    // {quota} => 1000 => 1000 times this endpoint can be called in per month
    // {frequency} => 500 ms => difference between to requests
    privateScopes: {
      type: Array,
      select: false,
      default: [
        'identities/me.DELETE.*.1000.500',
        'billings.DELETE.*.1000.500',
        'knowledges.GET.*.1000.500',
        'notifications.Patch.hasRead.1000.500',
        'chats.DELETE.*.1000.500',
        'emails.DELETE.*.1000.500'
      ]
    },

    // editor has access just his own resources
    // developer has access to more endpoints
    // admin has access to everything
    role: {
      type: String,
      enum: ['guest', 'hero', 'admin', 'superadmin'],
      default: 'guest'
    },

    auth: {
      status: {
        type: String,
        enum: ['pending', 'confirmed'],
        default: 'confirmed'
      },
      by: {
        type: String,
        enum: ['email', 'code', 'admin'],
        default: 'email'
      },
      code: {
        type: String,
        default: () => nanoid(4)
      }
    },

    affiliate: {
      type: String,
      ref: 'identities'
    },

    teams: [
      {
        isMain: {
          type: Boolean,
          default: false
        },
        team: {
          type: String,
          index: true,
          ref: 'teams'
        },
        createdAt: {
          type: Date
        },
        _id: false
      }
    ],

    importantMessage: {
      type: String,
      default: ''
    },

    social: {
      website: {
        type: String,
        default: ''
      },

      facebook: {
        type: String,
        default: ''
      },

      instagram: {
        type: String,
        default: ''
      },

      twitter: {
        type: String,
        default: ''
      }
    },

    bank: {
      IBAN: {
        type: String,
        default: '',
        min: 22,
        max: 22,
        trim: true,
        select: false
      },

      BIC: {
        type: String,
        min: 11,
        max: 11,
        trim: true,
        default: '',
        select: false
      }
    },

    address: {
      street: {
        type: String,
        default: '',
        trim: true
      },

      no: {
        type: Number,
        default: 0
      },

      code: {
        type: String,
        default: '',
        trim: true
      },

      city: {
        type: String,
        default: ''
      },

      country: {
        type: String,
        default: 'Deutschland',
        trim: true
      }
    },

    __v: { type: Number, select: false }
  },
  { timestamps: true }
);

identitySchema.plugin(mongooseUniqueValidator);
identitySchema.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  }
});

// Generate token
identitySchema.methods.generateAuthToken = async function() {
  const user = this;

  // Build signing object
  const signingObject = buildSigningObject(user);

  const REFRESH_OPTIONS = {
    issuer: ISSUER,
    audience: AUDIENCE,
    subject: (user as any).email,
    expiresIn: '1 days'
  };

  // create refresh_token
  const refreshToken = jwt.sign(
    signingObject,
    process.env.JWT_SECRET_REFRESH,
    REFRESH_OPTIONS
  );

  const accessToken = genAccessToken(user, signingObject);

  (user as any).refreshToken = refreshToken;
  await user.save();
  return accessToken;
};

identitySchema.methods.generateAccessToken = async function() {
  return genAccessToken(this, buildSigningObject(this)); // TODO: Fixing this
};

// login verification
identitySchema.statics.findByCredentials = async function(email, password) {
  const identity = await this.findOne({
    email
  });
  if (!identity) {
    throw new Error('E-Mail- / Passwortkombination nicht korrekt!');
  }
  const isMatch = await bcrypt.compare(password, identity.password);
  if (!isMatch) {
    throw new Error('E-Mail- / Passwortkombination nicht korrekt!');
  }
  return identity;
};

// hashing password before saving to database on changing password or saving new password
identitySchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    (user as any).password = await bcrypt.hash((user as any).password, 8);
  }
  next();
});

// Export contact model
function genAccessToken(user, signingObject) {
  const SIGN_OPTIONS = {
    issuer: ISSUER,
    audience: AUDIENCE,
    subject: user.email,
    expiresIn: '2h'
  };

  // create accessToken
  const accessToken = jwt.sign(
    signingObject,
    process.env.JWT_SECRET_ACCESS,
    SIGN_OPTIONS
  );
  return accessToken;
}

function buildSigningObject(user) {
  return {
    identity: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    teams: user.teams,
    privateScopes: user.privateScopes
  };
}

export default mongoose.model('identities', identitySchema);
