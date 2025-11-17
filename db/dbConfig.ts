import mongoose, { Connection } from "mongoose";

let authConnection: Connection | null = null;
let inventoryConnection: Connection | null = null;
let jobConnection: Connection | null = null;
let outsideProcessingConnection : Connection | null = null;


export async function connectAuthDb(): Promise<Connection> {
  if (authConnection) return authConnection;

  authConnection = await mongoose.createConnection(process.env.MONGODB_AUTH_URL!);
  authConnection.on("connected", () => console.log("✅ Connected to Auth DB"));
  authConnection.on("error", (err) => console.error("❌ Auth DB connection error:", err));

  return authConnection;
}

export async function connectInventoryDb(): Promise<Connection> {
  if (inventoryConnection) return inventoryConnection;

  inventoryConnection = await mongoose.createConnection(process.env.MONGODB_INVENTORY_URL!);
  inventoryConnection.on("connected", () => console.log("✅ Connected to Inventory DB"));
  inventoryConnection.on("error", (err) => console.error("❌ Inventory DB connection error:", err));

  return inventoryConnection;
}

export async function connectJobDb(): Promise<Connection> {
  if (jobConnection) return jobConnection;

  jobConnection = await mongoose.createConnection(process.env.MONGODB_JOB_URL!);
  jobConnection.on("connected", () => console.log("✅ Connected to Inventory DB"));
  jobConnection.on("error", (err) => console.error("❌ Inventory DB connection error:", err));

  return jobConnection;
}

export async function connectOutsideProcessingDb(): Promise<Connection> {
  if (outsideProcessingConnection) return outsideProcessingConnection;

  outsideProcessingConnection = await mongoose.createConnection(process.env.MONGODB_OUTSIDEPROCESSING_URL!);
  outsideProcessingConnection.on("connected", () => console.log("✅ Connected to Inventory DB"));
  outsideProcessingConnection.on("error", (err) => console.error("❌ Inventory DB connection error:", err));

  return outsideProcessingConnection;
}
