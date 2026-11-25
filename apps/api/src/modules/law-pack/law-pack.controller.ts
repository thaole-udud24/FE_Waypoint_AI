import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateLawPackDto, CreateLawRuleDto } from './law-pack.dto';
import { LawPackService } from './law-pack.service';

@ApiTags('law-packs (MOD_012)')
@Controller('law-packs')
export class LawPackController {
  constructor(private readonly lawPackService: LawPackService) {}

  @Get('corridors')
  @ApiOperation({ summary: 'Danh sách hành lang hoạt động (VN-JP)' })
  listCorridors() {
    return this.lawPackService.listCorridors();
  }

  @Get('active/:corridorId')
  @ApiOperation({ summary: 'Lấy Law Pack đang có hiệu lực theo hành lang' })
  getActive(@Param('corridorId') corridorId: string, @Query('date') date?: string) {
    return this.lawPackService.getActiveLawPack(corridorId, date ? new Date(date) : new Date());
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ROLE_ADM)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tạo Law Pack mới (ROLE_ADM)' })
  create(@Body() dto: CreateLawPackDto) {
    return this.lawPackService.createLawPack(dto);
  }

  @Post(':id/rules')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ROLE_ADM)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Thêm quy tắc vào Law Pack (ROLE_ADM)' })
  addRule(@Param('id') id: string, @Body() dto: CreateLawRuleDto) {
    return this.lawPackService.addRule(id, dto);
  }

  @Post(':id/publish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ROLE_ADM)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Phát hành Law Pack (ROLE_ADM)' })
  publish(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.lawPackService.publishLawPack(id, req.user.id);
  }
}
