import mongoose from "mongoose";
const jobSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    companyLogo: {
        type: String,
        required: true,
    },
    minPrice: {
        type: Number,
        required: true,
    },
    maxPrice: {
        type: Number,
        required: true,
    },
    salaryType: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true,
    },
    postingDate: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        required: true,
    },
    employmentType: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,

    },
    skills: {
        type: [],
        required: true,

    },
    postedBy: {
        type: String,
        required: true,

    },
},
{
    timestamps: true,
})

export const Job = mongoose.model('Cat',jobSchema)