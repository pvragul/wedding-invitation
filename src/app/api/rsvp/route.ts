import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Save to local file for prototyping
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "rsvps.json");
    
    // Create data dir if not exists
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir);
    }

    let existingData = [];
    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      existingData = JSON.parse(fileData);
    } catch {
      // file doesn't exist or is empty
    }

    const newEntry = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...body,
    };

    existingData.push(newEntry);
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));

    return NextResponse.json({ success: true, entry: newEntry });
  } catch (error) {
    console.error("RSVP Error:", error);
    return NextResponse.json({ error: "Failed to process RSVP" }, { status: 500 });
  }
}
