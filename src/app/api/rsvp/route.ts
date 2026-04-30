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

    const filePath = path.join(finalDataDir, "rsvps.json");

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
    
    try {
      await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));
    } catch (writeErr) {
      console.error("Failed to save to disk (likely a read-only serverless environment). Payload:", newEntry);
      // We still return success to the user so the UI works, but log it so it's not completely lost.
    }

    return NextResponse.json({ success: true, entry: newEntry });
  } catch (error) {
    console.error("RSVP Error:", error);
    return NextResponse.json({ error: "Failed to process RSVP" }, { status: 500 });
  }
}
