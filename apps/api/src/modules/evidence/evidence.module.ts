import { Body, Controller, Get, Injectable, Module, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { createHash } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class CreateEvidenceDto {
  @ApiProperty({ example: 'Phiếu lương tháng 10/2026' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'PAYSLIP' })
  @IsString()
  category!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  storageKey?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  metadataJson?: Record<string, unknown>;
}

@Injectable()
export class EvidenceService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.evidenceItem.findMany({
      where: { userId },
      orderBy: { capturedAt: 'desc' },
    });
  }

  create(userId: string, dto: CreateEvidenceDto) {
    const payload = JSON.stringify({ userId, ...dto, ts: Date.now() });
    const sha256Hash = createHash('sha256').update(payload).digest('hex');
    return this.prisma.evidenceItem.create({
      data: {
        userId,
        title: dto.title,
        category: dto.category,
        storageKey: dto.storageKey,
        sha256Hash,
        metadataJson: (dto.metadataJson ?? {}) as Prisma.InputJsonValue,
      },
    });
  }
}

@ApiTags('evidence (MOD_007)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('evidence')
export class EvidenceController {
  constructor(private readonly evidenceService: EvidenceService) {}

  @Get()
  @ApiOperation({ summary: 'Danh sách bằng chứng trong Evidence Vault' })
  list(@Req() req: { user: { id: string } }) {
    return this.evidenceService.list(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Lưu bằng chứng bất biến kèm SHA-256 hash' })
  create(@Req() req: { user: { id: string } }, @Body() dto: CreateEvidenceDto) {
    return this.evidenceService.create(req.user.id, dto);
  }
}

@Module({
  controllers: [EvidenceController],
  providers: [EvidenceService],
  exports: [EvidenceService],
})
export class EvidenceModule {}
