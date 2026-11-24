import { Body, Controller, Module, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsInt, IsNumber, Min } from 'class-validator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class SimulateSalaryDto {
  @ApiProperty({ example: 185000 })
  @IsInt()
  @Min(0)
  baseSalary!: number;

  @ApiProperty({ example: 1150 })
  @IsNumber()
  @Min(0)
  hourlyRate!: number;

  @ApiProperty({ example: 25 })
  @IsNumber()
  @Min(0)
  projectedOvertimeHours!: number;

  @ApiProperty({ example: 28000 })
  @IsInt()
  @Min(0)
  estimatedDeductions!: number;
}

@ApiTags('salary-twin (MOD_006)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('salary-twin')
export class SalaryTwinController {
  @Post('simulate')
  @ApiOperation({ summary: 'Mô phỏng thu nhập ròng dự kiến' })
  simulate(@Body() dto: SimulateSalaryDto) {
    const overtimePay = Math.round(dto.projectedOvertimeHours * dto.hourlyRate * 1.25);
    const gross = dto.baseSalary + overtimePay;
    const net = Math.max(0, gross - dto.estimatedDeductions);
    return {
      gross,
      overtimePay,
      estimatedDeductions: dto.estimatedDeductions,
      estimatedNet: net,
    };
  }
}

@Module({
  controllers: [SalaryTwinController],
})
export class SalaryTwinModule {}
