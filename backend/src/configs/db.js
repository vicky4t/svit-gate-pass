import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "production"
      ? ["query", "error", "warn"]
      : ["error"],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("db connect successfully");
  } catch (error) {
    console.log(`db not connected ${error}`);
    Process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
  process.exit(1);
};

export { prisma, connectDB, disconnectDB };
