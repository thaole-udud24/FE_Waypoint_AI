import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { DocumentType } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DocumentsService } from './documents.service';

class UploadDocumentDto {
  @ApiProperty({ enum: DocumentType })
  @IsEnum(DocumentType)
  type!: DocumentType;

  @ApiProperty({ example: 'payslip_2026_10.pdf' })
  @IsString()
  fileName!: string;

  @ApiProperty({ example: 'application/pdf' })
  @IsString()
  mimeType!: string;

  @ApiProperty({ example: 204800 })
  @IsInt()
  @Min(1)
  @Max(10 * 1024 * 1024)
  sizeBytes!: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contentBase64?: string;
}

@ApiTags('documents (MOD_002)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  @ApiOperation({ summary: 'Danh sách tài liệu của người dùng' })
  list(@Req() req: { user: { id: string } }) {
    return this.documentsService.listByUser(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Tải lên tài liệu & chạy OCR kép (BR_040)' })
  upload(@Req() req: { user: { id: string } }, @Body() dto: UploadDocumentDto) {
    return this.documentsService.registerDocument(req.user.id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết tài liệu' })
  getOne(@Req() req: { user: { id: string } }, @Param('id') id: string) {
    return this.documentsService.getById(req.user.id, id);
  }
}
