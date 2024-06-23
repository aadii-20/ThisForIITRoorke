import mongoose from 'mongoose';

// Define the schema
const projectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: [true, 'Project title is required'],
    description: 'must be a string and is required'
  },
  typeOfProject: {
    type: String,
    required: [true, 'Type of project is required'],
    description: 'must be a string and is required'
  },
  roleInProject: {
    type: String,
    enum: ['PI', 'Co-PI'],
    required: [true, 'Role in project is required'],
    description: 'must be a string and is required with the enum value only'
  },
  sponsors: {
    type: String,
    required: [true, 'Sponsors are required'],
    description: 'must be a string and is required'
  },
  collaboration: {
    type: String,
    required: [true, 'Collaboration is required'],
    description: 'must be a string and is required'
  },
  total_grant_inr: {
    type: String,
    description: 'must be a string'
  },
  total_grant_usd: {
    type: String,
    description: 'must be a string'
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    description: 'must be a string and is required'
  },
  additionalInfo: {
    type: String,
    description: 'must be a string'
  }
}, {
  additionalProperties: true // This will allow additional properties in the document
});

// Create a model
const Project = mongoose.model('Project', projectSchema);

// Export the model
export default Project;
