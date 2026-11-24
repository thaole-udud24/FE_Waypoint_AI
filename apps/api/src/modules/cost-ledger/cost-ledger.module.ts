import { Body, Controller, Get, Injectable, Module, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { LegalLabel } from '@waypoint/shared';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class CreateCostEntryDto {
  @ApiProperty({ example: 'BROKER_FEE' })
  @IsString()
  category!: string;

  @ApiProperty({ example: 45000000 })
  @IsInt()
  @Min(0)
  amountVnd!: number;

  @ApiProperty({ required: false, example: 36000000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  capVnd?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  note?: string;
}

@Injectable()
export class CostLedgerService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.costEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(userId: string, dto: CreateCostEntryDto) {
    const legalLabel =
      dto.capVnd === undefined
        ? LegalLabel.NO_RULE
        : dto.amountVnd > dto.capVnd
          ? LegalLabel.NEEDS_CLARIFICATION
          : LegalLabel.COMPLIANT;

    return this.prisma.costEntry.create({
      data: {
        userId,
        category: dto.category,
        amountVnd: dto.amountVnd,
        capVnd: dto.capVnd,
        legalLabel,
        note: dto.note,
      },
    });
  }
}

@ApiTags('cost-ledger (MOD_010)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cost-ledger')
export class CostLedgerController {
  constructor(private readonly costLedgerService: CostLedgerService) {}

  @Get()
  @ApiOperation({ summary: 'Danh sách chi phí xuất cảnh' })
  list(@Req() req: { user: { id: string } }) {
    return this.costLedgerService.list(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Ghi nhận chi phí & đối chiếu trần phí (BR_030)' })
  create(@Req() req: { user: { id: string } }, @Body() dto: CreateCostEntryDto) {
    return this.costLedgerService.create(req.user.id, dto);
  }
}

@Module({
  controllers: [CostLedgerController],
  providers: [CostLedgerService],
})
export class CostLedgerModule {}
