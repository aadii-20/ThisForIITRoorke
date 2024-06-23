import mongoose from 'mongoose';

const { Schema } = mongoose;

const conferenceSchema = new Schema({
  authors: {
    type: [String],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  journal: {
    type: String,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  pages: {
    type: String,
    required: true
  },
  num_pages: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  DOI: {
    type: String,
    required: true
  },
  IF: {
    type: Number,
    required: true
  },
  SJR: {
    type: String,
    required: true
  }
});

const Conference = mongoose.model('Conference', conferenceSchema);

export default Conference;
