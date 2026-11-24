import { Body, Controller, Get, Injectable, Module, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CasePackStatus, Role } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';
import { randomBytes } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

class CreateCasePackDto {
  @ApiProperty({ example: 'Hồ sơ đối chiếu lương tháng 10/2026' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Chênh lệch giờ tăng ca ngày thường' })
  @IsString()
  summary!: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  evidenceIds!: string[];
}

@Injectable()
export class CasePackService {
  constructor(private readonly prisma: PrismaService) {}

  listMine(userId: string) {
    return this.prisma.casePack.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  listDeskInbox() {
    return this.prisma.casePack.findMany({
      where: { status: { in: [CasePackStatus.SHARED, CasePackStatus.IN_REVIEW] } },
      orderBy: { updatedAt: 'desc' },
    });
  }

  create(userId: string, dto: CreateCasePackDto) {
    return this.prisma.casePack.create({
      data: { userId, title: dto.title, summary: dto.summary, evidenceIds: dto.evidenceIds },
    });
  }

  async share(userId: string, id: string) {
    const cp = await this.prisma.casePack.findFirst({ where: { id, userId } });
    if (!cp) throw new NotFoundException('Không tìm thấy Case Pack');
    return this.prisma.casePack.update({
      where: { id },
      data: {
        status: CasePackStatus.SHARED,
        shareToken: randomBytes(16).toString('hex'),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });
  }
}

@ApiTags('case-packs (MOD_013)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('case-packs')
export class CasePackController {
  constructor(private readonly casePackService: CasePackService) {}

  @Get()
  @ApiOperation({ summary: 'Danh sách Case Pack của người lao động' })
  listMine(@Req() req: { user: { id: string } }) {
    return this.casePackService.listMine(req.user.id);
  }

  @Get('desk/inbox')
  @Roles(Role.ROLE_SUP, Role.ROLE_ADM)
  @ApiOperation({ summary: 'Hộp thư tiếp nhận Case Pack (ROLE_SUP)' })
  deskInbox() {
    return this.casePackService.listDeskInbox();
  }

  @Post()
  @ApiOperation({ summary: 'Tạo Case Pack từ Evidence Vault' })
  create(@Req() req: { user: { id: string } }, @Body() dto: CreateCasePackDto) {
    return this.casePackService.create(req.user.id, dto);
  }

  @Post(':id/share')
  @ApiOperation({ summary: 'Chia sẻ Case Pack (hiệu lực 30 ngày)' })
  share(@Req() req: { user: { id: string } }, @Param('id') id: string) {
    return this.casePackService.share(req.user.id, id);
  }
}

@Module({
  controllers: [CasePackController],
  providers: [CasePackService],
})
export class CasePackModule {}
