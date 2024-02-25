import { connect, connection } from "mongoose";

const dbURI = process.env.MONGODB_URI as string;

export async function initializeDB() {
  if (connection.readyState === 0) {
    await connect(dbURI, {
      dbName: "product-feedback",
    });
  }
}
