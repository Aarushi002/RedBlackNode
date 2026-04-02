import mongoose from 'mongoose'

const careerApplicationSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, trim: true, maxlength: 40 },
    applicantName: { type: String, required: true, trim: true, maxlength: 120 },
    applicantEmail: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    answers: { type: mongoose.Schema.Types.Mixed, default: {} },
    resumeFileName: { type: String, default: '' },
  },
  { timestamps: true }
)

export const CareerApplication =
  mongoose.models.CareerApplication || mongoose.model('CareerApplication', careerApplicationSchema)
