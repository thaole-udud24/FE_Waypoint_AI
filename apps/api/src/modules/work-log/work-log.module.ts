import { Body, Controller, Get, Injectable, Module, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class UpsertWorkLogDto {
  @ApiProperty({ example: '2026-10-15T00:00:00.000Z' })
  @IsDateString()
  workDate!: string;

  @ApiProperty({ example: 8 })
  @IsNumber()
  @Min(0)
  regularHours!: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(0)
  overtimeHours!: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  @Min(0)
  nightHours!: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  @Min(0)
  holidayHours!: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  note?: string;
}

@Injectable()
export class WorkLogService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string, month?: string) {
    const where: { userId: string; workDate?: { gte: Date; lt: Date } } = { userId };
    if (month) {
      const start = new Date(`${month}-01T00:00:00.000Z`);
      const end = new Date(start);
      end.setUTCMonth(end.getUTCMonth() + 1);
      where.workDate = { gte: start, lt: end };
    }
    return this.prisma.workLog.findMany({ where, orderBy: { workDate: 'asc' } });
  }

  async upsert(userId: string, dto: UpsertWorkLogDto) {
    const workDate = new Date(dto.workDate);
    return this.prisma.workLog.upsert({
      where: { userId_workDate: { userId, workDate } },
      update: {
        regularHours: dto.regularHours,
        overtimeHours: dto.overtimeHours,
        nightHours: dto.nightHours,
        holidayHours: dto.holidayHours,
        note: dto.note,
      },
      create: {
        userId,
        workDate,
        regularHours: dto.regularHours,
        overtimeHours: dto.overtimeHours,
        nightHours: dto.nightHours,
        holidayHours: dto.holidayHours,
        note: dto.note,
      },
    });
  }
}

@ApiTags('work-log (MOD_004)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('work-logs')
export class WorkLogController {
  constructor(private readonly workLogService: WorkLogService) {}

  @Get()
  @ApiOperation({ summary: 'Danh sách nhật ký giờ làm theo tháng' })
  list(@Req() req: { user: { id: string } }, @Query('month') month?: string) {
    return this.workLogService.list(req.user.id, month);
  }

  @Post()
  @ApiOperation({ summary: 'Ghi nhận / cập nhật giờ làm ngày' })
  upsert(@Req() req: { user: { id: string } }, @Body() dto: UpsertWorkLogDto) {
    return this.workLogService.upsert(req.user.id, dto);
  }
}

@Module({
  controllers: [WorkLogController],
  providers: [WorkLogService],
  exports: [WorkLogService],
})
export class WorkLogModule {}
