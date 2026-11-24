import { Body, Controller, Get, Injectable, Module, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';
import { createHash, randomBytes } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class CreateDebtDto {
  @ApiProperty({ example: 'Ngân hàng CSXH' })
  @IsString()
  lenderName!: string;

  @ApiProperty({ example: 80000000 })
  @IsInt()
  @Min(0)
  principalVnd!: number;

  @ApiProperty({ example: 60000000 })
  @IsInt()
  @Min(0)
  remainingVnd!: number;

  @ApiProperty({ example: 4000000 })
  @IsInt()
  @Min(0)
  monthlyDueVnd!: number;
}

class CreateFamilyLinkDto {
  @ApiProperty({ example: 'Mẹ ở quê' })
  @IsString()
  label!: string;
}

@Injectable()
export class DebtFamilyService {
  constructor(private readonly prisma: PrismaService) {}

  listDebts(userId: string) {
    return this.prisma.debtRecord.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  createDebt(userId: string, dto: CreateDebtDto) {
    return this.prisma.debtRecord.create({ data: { userId, ...dto } });
  }

  async createFamilyLink(userId: string, dto: CreateFamilyLinkDto) {
    const rawToken = randomBytes(24).toString('hex');
    const tokenHash = createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days

    const link = await this.prisma.familyLink.create({
      data: { userId, tokenHash, label: dto.label, expiresAt },
    });

    return { id: link.id, label: link.label, expiresAt: link.expiresAt, shareToken: rawToken };
  }
}

@ApiTags('debt-family (MOD_011)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('debt-family')
export class DebtFamilyController {
  constructor(private readonly debtFamilyService: DebtFamilyService) {}

  @Get('debts')
  @ApiOperation({ summary: 'Danh sách khoản vay' })
  listDebts(@Req() req: { user: { id: string } }) {
    return this.debtFamilyService.listDebts(req.user.id);
  }

  @Post('debts')
  @ApiOperation({ summary: 'Thêm khoản vay' })
  createDebt(@Req() req: { user: { id: string } }, @Body() dto: CreateDebtDto) {
    return this.debtFamilyService.createDebt(req.user.id, dto);
  }

  @Post('family-links')
  @ApiOperation({ summary: 'Tạo liên kết chia sẻ người thân (90 ngày)' })
  createFamilyLink(@Req() req: { user: { id: string } }, @Body() dto: CreateFamilyLinkDto) {
    return this.debtFamilyService.createFamilyLink(req.user.id, dto);
  }
}

@Module({
  controllers: [DebtFamilyController],
  providers: [DebtFamilyService],
})
export class DebtFamilyModule {}
