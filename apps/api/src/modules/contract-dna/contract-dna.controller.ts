import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNumber, IsObject, IsOptional, IsString, Min } from 'class-validator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContractDnaService } from './contract-dna.service';

class UpsertContractDnaDto {
  @ApiProperty()
  @IsString()
  documentId!: string;

  @ApiProperty({ required: false, default: 'VN-JP' })
  @IsOptional()
  @IsString()
  corridorId?: string;

  @ApiProperty({ example: 185000 })
  @IsInt()
  @Min(0)
  baseSalary!: number;

  @ApiProperty({ required: false, example: 1150 })
  @IsOptional()
  @IsNumber()
  hourlyRate?: number;

  @ApiProperty({ required: false, default: 8 })
  @IsOptional()
  @IsNumber()
  standardHoursDay?: number;

  @ApiProperty({ required: false, default: 5 })
  @IsOptional()
  @IsNumber()
  standardDaysWeek?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  allowancesJson?: Record<string, unknown>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  deductionsJson?: Record<string, unknown>;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  verifiedByUser?: boolean;
}

@ApiTags('contract-dna (MOD_003)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('contract-dna')
export class ContractDnaController {
  constructor(private readonly contractDnaService: ContractDnaService) {}

  @Get()
  @ApiOperation({ summary: 'Danh sách Contract DNA của người dùng' })
  list(@Req() req: { user: { id: string } }) {
    return this.contractDnaService.listByUser(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Lưu / cập nhật Contract DNA từ tài liệu' })
  upsert(@Req() req: { user: { id: string } }, @Body() dto: UpsertContractDnaDto) {
    return this.contractDnaService.upsertFromDocument(req.user.id, dto);
  }
}
