import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateLawPackDto {
  @ApiProperty({ example: 'VN-JP' })
  @IsString()
  corridorId!: string;

  @ApiProperty({ example: '2026.1' })
  @IsString()
  version!: string;

  @ApiProperty({ example: 'Japan Labor Standards Act - FY2026' })
  @IsString()
  title!: string;

  @ApiProperty({ example: '2026-04-01T00:00:00.000Z' })
  @IsDateString()
  effectiveFrom!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  effectiveTo?: string;
}

export class CreateLawRuleDto {
  @ApiProperty({ example: 'JP_OT_WEEKDAY' })
  @IsString()
  code!: string;

  @ApiProperty({ example: 'Phụ trội làm thêm ngày thường (trên 8h/ngày hoặc 40h/tuần)' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'OVERTIME' })
  @IsString()
  category!: string;

  @ApiProperty({ example: { multiplier: 1.25 } })
  @IsObject()
  formulaJson!: Record<string, unknown>;

  @ApiProperty({ example: 'Labor Standards Act Art. 37' })
  @IsString()
  sourceRef!: string;
}
