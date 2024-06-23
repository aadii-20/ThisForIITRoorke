import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const contactInformationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    googleScholarLink: String,
    orcidLink: String,
    linkedLink: String,
    clickForMore: String
}, { _id: false });

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    enrolledCourse: {
        type: String,
        enum: ["B.Tech", "M.Tech", "PhD"],
        required: true
    },
    specialisation: {
        type: String,
        required: true
    },
    enrollmentYear: {
        type: Number,
        required: true
    },
    areaOfInterest: {
        type: String,
        required: true
    },
    currentStatus: String,
    urlToImage: String,
    overview: String,
    researches: String,
    contactInformation: contactInformationSchema
});

const student = mongoose.model('student', studentSchema);

export default student;
