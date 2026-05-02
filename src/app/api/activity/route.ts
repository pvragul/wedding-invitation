import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Save to local file for prototyping
    const dataDir = path.join(process.cwd(), "data");
    
    // Create data dir if not exists (fallback to /tmp for Vercel/Serverless)
    let finalDataDir = dataDir;
    try {
      await fs.access(dataDir);
    } catch {
      try {
        await fs.mkdir(dataDir, { recursive: true });
      } catch (err) {
        console.warn("Could not create data dir in cwd. Falling back to /tmp.");
        finalDataDir = path.join("/tmp", "wedding-data");
        try {
          await fs.mkdir(finalDataDir, { recursive: true });
        } catch (e) {
          // ignore
        }
      }
    }

    const filePath = path.join(finalDataDir, "activity.json");

    let existingData = [];
    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      existingData = JSON.parse(fileData);
    } catch {
      // file doesn't exist or is empty
    }

    const newEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...body,
    };

    existingData.push(newEntry);
    
    try {
      await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));
    } catch (writeErr) {
      console.error("Failed to save to disk. Payload:", newEntry);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Activity tracking error:", error);
    return NextResponse.json({ error: "Failed to track activity" }, { status: 500 });
  }
}
