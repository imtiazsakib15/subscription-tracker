import { ISubscription } from './../interface/subscription.interface';
import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema<ISubscription>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minLength: [2, 'Name must be at least 2 characters long'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    currency: {
      type: String,
      enum: ['BDT', 'USD', 'EUR'],
      default: 'BDT',
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
      required: [true, 'Frequency is required'],
    },
    category: {
      type: String,
      enum: ['sports', 'entertainment', 'news', 'education', 'health', 'other'],
      required: [true, 'Category is required'],
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required'],
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active',
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
      validator: {
        validate: function (value: Date) {
          return value <= new Date();
        },
        message: 'Start date cannot be in the future',
      },
    },
    renewalDate: {
      type: Date,
      required: [true, 'Renewal date is required'],
      validator: {
        validate: function (value: Date) {
          return value > this.startDate;
        },
        message: 'Renewal date must be after start date',
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const Subscription = mongoose.model<ISubscription>(
  'Subscription',
  subscriptionSchema,
  'subscriptions',
);

export default Subscription;
