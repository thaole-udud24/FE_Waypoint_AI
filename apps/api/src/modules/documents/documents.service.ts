import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DocumentType, OcrStatus, Prisma } from '@prisma/client';
import { createHash } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { IOcrProvider } from './ocr.provider';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // BR_040: 10 MB

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ocrProvider: IOcrProvider,
  ) {}

  async listByUser(userId: string) {
    return this.prisma.document.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async registerDocument(
    userId: string,
    input: {
      type: DocumentType;
      fileName: string;
      mimeType: string;
      sizeBytes: number;
      contentBase64?: string;
    },
  ) {
    if (input.sizeBytes > MAX_FILE_SIZE_BYTES) {
      throw new BadRequestException('Kích thước tệp vượt quá giới hạn 10 MB (BR_040)');
    }

    const buffer = input.contentBase64 ? Buffer.from(input.contentBase64, 'base64') : Buffer.from(input.fileName);
    const sha256Hash = createHash('sha256').update(buffer).digest('hex');
    const storageKey = `users/${userId}/${Date.now()}-${input.fileName}`;

    const doc = await this.prisma.document.create({
      data: {
        userId,
        type: input.type,
        fileName: input.fileName,
        mimeType: input.mimeType,
        sizeBytes: input.sizeBytes,
        storageKey,
        sha256Hash,
        ocrStatus: OcrStatus.PROCESSING,
      },
    });

    const ocrResult = await this.ocrProvider.extract(buffer, input.mimeType, input.type);
    return this.prisma.document.update({
      where: { id: doc.id },
      data: {
        ocrStatus: OcrStatus.COMPLETED,
        ocrResult: ocrResult as unknown as Prisma.InputJsonValue,
      },
    });
  }

  async getById(userId: string, id: string) {
    const doc = await this.prisma.document.findFirst({ where: { id, userId } });
    if (!doc) {
      throw new NotFoundException('Không tìm thấy tài liệu');
    }
    return doc;
  }
}
