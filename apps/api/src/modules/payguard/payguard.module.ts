import { Body, Controller, Get, Injectable, Module, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsInt, IsNumber, IsString, Min } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { calculatePayGuard } from './payguard.engine';

class RunPayGuardDto {
  @ApiProperty({ example: '2026-10' })
  @IsString()
  periodMonth!: string;

  @ApiProperty({ example: 185000 })
  @IsInt()
  @Min(0)
  baseSalary!: number;

  @ApiProperty({ example: 1150 })
  @IsNumber()
  @Min(0)
  hourlyRate!: number;

  @ApiProperty({ example: 20 })
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

  @ApiProperty({ example: 210000 })
  @IsInt()
  @Min(0)
  actualGross!: number;
}

@Injectable()
export class PayGuardService {
  constructor(private readonly prisma: PrismaService) {}

  async listReports(userId: string) {
    return this.prisma.payGuardReport.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async runCheck(userId: string, dto: RunPayGuardDto) {
    const result = calculatePayGuard(dto);
    return this.prisma.payGuardReport.create({
      data: {
        userId,
        periodMonth: dto.periodMonth,
        corridorId: 'VN-JP',
        lawPackVersion: '2026.1',
        expectedGross: result.expectedGross,
        actualGross: result.actualGross,
        difference: result.difference,
        matchStatus: result.matchStatus,
        legalLabel: result.legalLabel,
        breakdownJson: result.breakdown as unknown as Prisma.InputJsonValue,
      },
    });
  }
}

@ApiTags('payguard (MOD_005)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payguard')
export class PayGuardController {
  constructor(private readonly payGuardService: PayGuardService) {}

  @Get('reports')
  @ApiOperation({ summary: 'Lịch sử đối chiếu lương PayGuard' })
  list(@Req() req: { user: { id: string } }) {
    return this.payGuardService.listReports(req.user.id);
  }

  @Post('check')
  @ApiOperation({ summary: 'Chạy đối chiếu lương cố định theo Law Pack (BR_007)' })
  check(@Req() req: { user: { id: string } }, @Body() dto: RunPayGuardDto) {
    return this.payGuardService.runCheck(req.user.id, dto);
  }
}

@Module({
  controllers: [PayGuardController],
  providers: [PayGuardService],
  exports: [PayGuardService],
})
export class PayGuardModule {}
