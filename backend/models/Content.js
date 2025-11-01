import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['ppt', 'quiz'],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
contentSchema.index({ subject: 1, order: 1 });

const Content = mongoose.model('Content', contentSchema);

export default Content;