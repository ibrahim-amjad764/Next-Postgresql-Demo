import { NextResponse } from "next/server";
import { AppDataSource } from "../../../src/lib/typeorm";
import { User } from "../../../src/entities/User";

/**
 * This function connects to the database.
 * It checks first so it does not connect again if already connected.
 */
async function initDB() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Database initialized ✅");
    }
  } catch (err: any) {
    console.error("Database connection failed:", err.message || err);
    throw err;
  }
}

export async function GET() {
  try {
    await initDB();

    const userRepo = AppDataSource.getRepository(User);

    const users = await userRepo.find({ order: { id: "ASC" } });

    return NextResponse.json(users);
  } catch (err: any) {
    console.error("GET /api/user failed:", err.message || err);

    return NextResponse.json(
      { error: "Fetch failed", details: err.message || err },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await initDB();

    const body = await req.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const userRepo = AppDataSource.getRepository(User);//get user table

    const newUser = userRepo.create({
      name: body.name,
      email: body.email,
      active: true,
    });

    const savedUser = await userRepo.save(newUser);

    return NextResponse.json(savedUser, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/user failed:", err.message || err);

    return NextResponse.json(
      { error: "Create failed", details: err.message || err },
      { status: 500 }
    );
  }
}
