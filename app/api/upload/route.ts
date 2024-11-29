import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');
  const tripId = formData.get('tripId') as string;
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const fileName = file.name;
  const fileType = file.type;

  // Generate a unique filename
  const uniqueFileName = `${Date.now()}_${fileName}`;

  // Define the path and ensure the directory exists
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Save the file to the public folder
  const filePath = path.join(uploadsDir, uniqueFileName);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Write the file to disk
  fs.writeFileSync(filePath, buffer);

  // Save the file metadata to the database
  const savedFile = await prisma.file.create({
    data: {
      originalName: fileName,
      mimeType: fileType,
      path: `/uploads/${uniqueFileName}`,
      tripId,
    },
  });

  return NextResponse.json({ success: true, fileId: savedFile.id });
}
