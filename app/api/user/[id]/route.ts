import { NextResponse } from "next/server";
import { AppDataSource } from "@/src/lib/typeorm";
import { User } from "@/src/entities/User";

async function initDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDB();
    const body = await req.json();

    const repo = AppDataSource.getRepository(User);

     await repo.update(Number(params.id), body);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await initDB();

    const repo = AppDataSource.getRepository(User);
    await repo.delete(Number(params.id)); 

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}


