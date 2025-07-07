import { Injectable, BadRequestException } from '@nestjs/common';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private readonly uploadPath = join(process.cwd(), 'uploads');
  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ];
  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB

  constructor() {
    // Ensure upload directory exists
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File, type = 'general') {
    // Validate file type
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${this.allowedMimeTypes.join(', ')}`,
      );
    }

    // Validate file size
    if (file.size > this.maxFileSize) {
      throw new BadRequestException(
        `File too large. Maximum size: ${this.maxFileSize / 1024 / 1024}MB`,
      );
    }

    // Generate unique filename
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = join(this.uploadPath, fileName);

    // Save file
    const fs = require('fs').promises;
    await fs.writeFile(filePath, file.buffer);

    // Return the file URL
    const fileUrl = `/uploads/${fileName}`;

    return {
      url: fileUrl,
      filename: fileName,
      originalName: file.originalname,
      size: file.size,
      type: file.mimetype,
    };
  }
}
