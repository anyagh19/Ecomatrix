import { connectJobDb } from "@/db/dbConfig";
import { getJobModel } from "@/models/job.model";
import { NextRequest, NextResponse } from "next/server";

/**
 * Generates job code in format: job/<FY>/<sequence>
 */
const generateJobCode = async () => {
    const Job = await getJobModel();

    const now = new Date();
    const fyStartYear = now.getFullYear();
    const fyEndYear = fyStartYear + 1;

    // FY in format "25-26"
    const fyCode = `${fyStartYear.toString().slice(-2)}-${fyEndYear.toString().slice(-2)}`;

    // Count jobs in this FY
    const jobsThisFY = await Job.find({
        createdAt: {
            $gte: new Date(`${fyStartYear}-04-01`),
            $lt: new Date(`${fyEndYear}-04-01`),
        },
    });

    const sequenceNumber = jobsThisFY.length + 1;

    return `job/${fyCode}/${sequenceNumber}`;
};

export async function POST(request: NextRequest) {
    await connectJobDb();

    try {
        const body = await request.json();
        const { clientName, siteAddress , status } = body;

        if (!clientName || !siteAddress) {
            return NextResponse.json({ message: "Enter all required values" }, { status: 400 });
        }

        const Job = await getJobModel();

        const jobCode = await generateJobCode(); // ✅ generate code automatically

        const createdJob = await Job.create({
            jobCode,
            clientName,
            siteAddress,
            status
        });

        console.log('job', createdJob)
        if (!createdJob) {
            return NextResponse.json({ message: "Job not created" }, { status: 500 });
        }

        return NextResponse.json({ message: "Job created successfully", data: createdJob }, { status: 200 });
    } catch (error) {
        console.error("Job creation error:", error);
        return NextResponse.json({ message: "Error in job creation" }, { status: 500 });
    }
}
