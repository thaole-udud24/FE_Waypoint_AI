import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { GeminiOcrProvider, IOcrProvider } from './ocr.provider';

@Module({
  controllers: [DocumentsController],
  providers: [
    DocumentsService,
    { provide: IOcrProvider, useClass: GeminiOcrProvider },
  ],
  exports: [DocumentsService],
})
export class DocumentsModule {}
