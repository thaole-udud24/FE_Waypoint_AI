import { Body, Controller, Get, Module, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

class UpsertSystemConfigDto {
  @ApiProperty({ example: 'K_ANONYMITY_THRESHOLD' })
  @IsString()
  key!: string;

  @ApiProperty({ example: '20' })
  @IsString()
  value!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

@ApiTags('admin (MOD_014)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ROLE_ADM)
@Controller('admin')
export class AdminController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('configs')
  @ApiOperation({ summary: 'Danh sách SYSTEM_CONFIG (ROLE_ADM)' })
  listConfigs() {
    return this.prisma.systemConfig.findMany({ orderBy: { key: 'asc' } });
  }

  @Put('configs')
  @ApiOperation({ summary: 'Cập nhật SYSTEM_CONFIG không cần deploy lại' })
  upsertConfig(@Body() dto: UpsertSystemConfigDto) {
    return this.prisma.systemConfig.upsert({
      where: { key: dto.key },
      update: { value: dto.value, description: dto.description },
      create: { key: dto.key, value: dto.value, description: dto.description },
    });
  }

  @Get('audit-logs')
  @ApiOperation({ summary: 'Xem nhật ký kiểm toán (ROLE_ADM)' })
  listAuditLogs() {
    return this.prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
  }
}

@Module({
  controllers: [AdminController],
})
export class AdminModule {}
