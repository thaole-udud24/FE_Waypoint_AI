import { Body, Controller, ForbiddenException, Get, Module, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const K_ANONYMITY_THRESHOLD = 20; // BR_043

class ContributeDataDto {
  @ApiProperty({ required: false, example: 'Tokyo' })
  @IsOptional()
  @IsString()
  prefecture?: string;

  @ApiProperty({ required: false, example: 'Manufacturing' })
  @IsOptional()
  @IsString()
  industry?: string;

  @ApiProperty({ example: 185000 })
  @IsInt()
  @Min(0)
  baseSalary!: number;

  @ApiProperty({ required: false, example: 1.25 })
  @IsOptional()
  @IsNumber()
  overtimeRate?: number;
}

@ApiTags('anonymous-data (MOD_017)')
@Controller('anonymous-data')
export class AnonymousDataController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('contribute')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Đóng góp dữ liệu ẩn danh (yêu cầu consent BR_037)' })
  async contribute(@Req() req: { user: { id: string } }, @Body() dto: ContributeDataDto) {
    const consent = await this.prisma.consentRecord.findUnique({
      where: { userId_purpose: { userId: req.user.id, purpose: 'ANONYMOUS_DATA' } },
    });
    if (!consent?.granted) {
      throw new ForbiddenException('Chưa bật đồng ý đóng góp dữ liệu ẩn danh (BR_037)');
    }
    return this.prisma.anonymousContribution.create({ data: dto });
  }

  @Get('stats')
  @ApiOperation({ summary: 'Thống kê lương ẩn danh (chỉ trả về khi đạt ngưỡng k=20, BR_043)' })
  async stats(@Query('prefecture') prefecture?: string) {
    const where = prefecture ? { prefecture } : {};
    const count = await this.prisma.anonymousContribution.count({ where });
    if (count < K_ANONYMITY_THRESHOLD) {
      return {
        suppressed: true,
        reason: `Chưa đủ ngưỡng k-ẩn danh (k = ${K_ANONYMITY_THRESHOLD}, hiện có ${count})`,
      };
    }
    const agg = await this.prisma.anonymousContribution.aggregate({
      where,
      _avg: { baseSalary: true },
      _count: true,
    });
    return { suppressed: false, count: agg._count, avgBaseSalary: Math.round(agg._avg.baseSalary ?? 0) };
  }
}

@Module({
  controllers: [AnonymousDataController],
})
export class AnonymousDataModule {}
