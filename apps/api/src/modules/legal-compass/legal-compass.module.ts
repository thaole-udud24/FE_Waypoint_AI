import { Body, Controller, Injectable, Module, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class LegalQueryDto {
  @ApiProperty({ example: 'Làm thêm ngày thường tính hệ số bao nhiêu?' })
  @IsString()
  question!: string;

  @ApiProperty({ required: false, default: 'VN-JP' })
  @IsOptional()
  @IsString()
  corridorId?: string;
}

@Injectable()
export class LegalCompassService {
  constructor(private readonly prisma: PrismaService) {}

  async query(dto: LegalQueryDto) {
    const corridorId = dto.corridorId ?? 'VN-JP';
    const rules = await this.prisma.lawRule.findMany({
      where: { lawPack: { corridorId, status: 'PUBLISHED' } },
      take: 5,
    });

    return {
      corridorId,
      question: dto.question,
      citations: rules.map((r) => ({ code: r.code, title: r.title, sourceRef: r.sourceRef })),
      answer:
        rules.length > 0
          ? `Tham khảo ${rules.length} điều khoản từ Law Pack ${corridorId}. Hệ thống không đưa ra kết luận pháp lý ràng buộc.`
          : 'Chưa có quy tắc phù hợp trong Law Pack hiện tại.',
    };
  }
}

@ApiTags('legal-compass (MOD_008)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('legal-compass')
export class LegalCompassController {
  constructor(private readonly legalCompassService: LegalCompassService) {}

  @Post('query')
  @ApiOperation({ summary: 'Tra cứu luật theo Law Pack' })
  query(@Body() dto: LegalQueryDto) {
    return this.legalCompassService.query(dto);
  }
}

@Module({
  controllers: [LegalCompassController],
  providers: [LegalCompassService],
})
export class LegalCompassModule {}
