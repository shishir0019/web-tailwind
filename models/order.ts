import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { nanoid } from 'nanoid';

const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid()
    },

    name: {
      type: String,
      default: ''
    },

    status: {
      type: String,
      enum: ['not active', 'active'],
      default: 'not active'
    },

    __v: { type: Number, select: false }
  },
  { timestamps: true }
);

orderSchema.plugin(mongooseUniqueValidator);
orderSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  }
});

module.exports = mongoose.model('orders', orderSchema);
