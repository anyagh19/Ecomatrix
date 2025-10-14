// models/job.model.ts
import { Schema, Document, Connection } from "mongoose";
import { connectJobDb } from "@/db/dbConfig";

export interface IJob extends Document {
  _id: string;
    jobCode: string
  clientName: string;
  siteAddress: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    jobCode: {
        type: String ,
        required: true
    },
    clientName: { type: String, required: true },
    siteAddress: { type: String },
    status: { type: String, enum: ["Pending", "Active"], },
  },
  { timestamps: true }
);

let JobModel: ReturnType<Connection["model"]> | null = null;

export const getJobModel = async () => {
  const jobsDb = await connectJobDb();
  if (!JobModel) {
    JobModel = jobsDb.models.Job || jobsDb.model<IJob>("Job", jobSchema);
  }
  return JobModel;
};
