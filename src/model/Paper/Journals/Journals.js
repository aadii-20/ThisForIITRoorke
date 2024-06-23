import mongoose from 'mongoose';

const { Schema } = mongoose;

const journalSchema = new Schema({

  authors: {
    type: [String],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  PublicationHouse: {
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

const Journal = mongoose.model('Journals', journalSchema);

export default Journal;
