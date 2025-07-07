# Backend File Upload Implementation

## Required Backend Changes

### 1. Install Required Dependencies

```bash
cd backend
npm install multer @types/multer
```

### 2. Create Upload Controller

Create `src/upload/upload.controller.ts`:

```typescript
import {
  Controller,
  Post,
  Delete,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { existsSync, mkdirSync, unlinkSync } from "fs";

@Controller("api/upload")
export class UploadController {
  constructor() {
    // Ensure upload directory exists
    const uploadPath = join(process.cwd(), "uploads");
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname + "-" + uniqueSuffix + extname(file.originalname)
          );
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(
            new BadRequestException("Only image files are allowed!"),
            false
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    const baseUrl = process.env.BASE_URL || "http://localhost:3001";
    const fileUrl = `${baseUrl}/uploads/${file.filename}`;

    return {
      url: fileUrl,
      originalName: file.originalname,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  @Delete()
  deleteFile(@Body() body: { url: string }) {
    try {
      const filename = body.url.split("/").pop();
      const filePath = join(process.cwd(), "uploads", filename);

      if (existsSync(filePath)) {
        unlinkSync(filePath);
        return { message: "File deleted successfully" };
      } else {
        throw new BadRequestException("File not found");
      }
    } catch (error) {
      throw new BadRequestException("Failed to delete file");
    }
  }
}
```

### 3. Create Upload Module

Create `src/upload/upload.module.ts`:

```typescript
import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";

@Module({
  controllers: [UploadController],
})
export class UploadModule {}
```

### 4. Update App Module

In `src/app.module.ts`, add:

```typescript
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    // ... other imports
    UploadModule,
  ],
  // ... rest of module
})
```

### 5. Serve Static Files

In `src/main.ts`, add:

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files
  app.useStaticAssets(join(__dirname, "..", "uploads"), {
    prefix: "/uploads/",
  });

  // ... rest of bootstrap
}
```

### 6. Update Environment Variables

Add to `.env`:

```env
BASE_URL=http://localhost:3001
```

### 7. Update Event Service for Images

In `src/events/events.service.ts`, add methods to handle event images:

```typescript
async createEventImage(eventId: string, imageUrl: string) {
  return await this.prisma.eventImage.create({
    data: {
      eventId,
      url: imageUrl,
    },
  });
}

async updateEventImages(eventId: string, imageUrls: string[]) {
  // Delete existing images
  await this.prisma.eventImage.deleteMany({
    where: { eventId },
  });

  // Create new images
  if (imageUrls.length > 0) {
    await this.prisma.eventImage.createMany({
      data: imageUrls.map(url => ({ eventId, url })),
    });
  }
}
```

### 8. Update Events Controller

In `src/events/events.controller.ts`, add image handling:

```typescript
@Post(':id/images')
async addEventImages(
  @Param('id') id: string,
  @Body() body: { imageUrls: string[] },
) {
  return await this.eventsService.updateEventImages(id, body.imageUrls);
}
```

## Directory Structure

After implementation:

```
backend/
├── src/
│   ├── upload/
│   │   ├── upload.controller.ts
│   │   └── upload.module.ts
│   ├── events/
│   │   ├── events.service.ts (updated)
│   │   └── events.controller.ts (updated)
│   ├── app.module.ts (updated)
│   └── main.ts (updated)
├── uploads/ (created automatically)
└── .env (updated)
```

## Frontend Integration

The frontend `useFileUpload` composable will work with these endpoints:

- `POST /api/upload` - Upload single file
- `DELETE /api/upload` - Delete file by URL

## Security Considerations

1. **File Type Validation**: Only allow image files
2. **File Size Limits**: Maximum 5MB per file
3. **File Name Sanitization**: Use unique generated names
4. **Directory Access**: Serve files from dedicated upload directory
5. **CORS**: Configure for your domain

## Production Deployment

For production, consider:

1. **Cloud Storage**: Use AWS S3, Google Cloud Storage, or similar
2. **CDN**: Serve images through a CDN
3. **Image Optimization**: Resize/compress images automatically
4. **Virus Scanning**: Scan uploaded files for malware
5. **Rate Limiting**: Limit upload frequency per user
