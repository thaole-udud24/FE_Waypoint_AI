import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Injectable,
  Module,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AgentActionStatus, Prisma } from '@prisma/client';
import { IsInt, IsObject, IsString, Max, Min } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class ProposeAgentActionDto {
  @ApiProperty({ example: 'PayGuardAgent' })
  @IsString()
  agentName!: string;

  @ApiProperty({ example: 2, description: 'BR_006/BR_048: mức 0..2' })
  @IsInt()
  @Min(0)
  @Max(2)
  autonomyLevel!: number;

  @ApiProperty({ example: 'DRAFT_INQUIRY_EMAIL' })
  @IsString()
  actionType!: string;

  @ApiProperty({ example: { subject: 'Hỏi lại về giờ tăng ca tháng 10' } })
  @IsObject()
  payloadJson!: Record<string, unknown>;
}

@Injectable()
export class RightsAgentService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.agentAction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  propose(userId: string, dto: ProposeAgentActionDto) {
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // BR_047: 48h
    return this.prisma.agentAction.create({
      data: {
        userId,
        agentName: dto.agentName,
        autonomyLevel: dto.autonomyLevel,
        actionType: dto.actionType,
        payloadJson: dto.payloadJson as Prisma.InputJsonValue,
        expiresAt,
      },
    });
  }

  async approve(userId: string, id: string) {
    const action = await this.prisma.agentAction.findFirst({ where: { id, userId } });
    if (!action) throw new NotFoundException('Không tìm thấy hành động');
    if (action.status !== AgentActionStatus.PENDING_APPROVAL) {
      throw new BadRequestException('Hành động không ở trạng thái chờ duyệt');
    }
    return this.prisma.agentAction.update({
      where: { id },
      data: {
        status: AgentActionStatus.APPROVED,
        undoUntil: new Date(Date.now() + 24 * 60 * 60 * 1000), // BR_047: 24h undo
      },
    });
  }

  async undo(userId: string, id: string) {
    const action = await this.prisma.agentAction.findFirst({ where: { id, userId } });
    if (!action) throw new NotFoundException('Không tìm thấy hành động');
    if (action.status !== AgentActionStatus.APPROVED || !action.undoUntil || action.undoUntil < new Date()) {
      throw new BadRequestException('Đã quá thời hạn hoàn tác 24 giờ (BR_047)');
    }
    return this.prisma.agentAction.update({
      where: { id },
      data: { status: AgentActionStatus.UNDONE },
    });
  }
}

@ApiTags('rights-agent (MOD_009)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rights-agent')
export class RightsAgentController {
  constructor(private readonly rightsAgentService: RightsAgentService) {}

  @Get('actions')
  @ApiOperation({ summary: 'Danh sách đề xuất của 6 AI Agent' })
  list(@Req() req: { user: { id: string } }) {
    return this.rightsAgentService.list(req.user.id);
  }

  @Post('actions')
  @ApiOperation({ summary: 'Tạo đề xuất hành động (mức 0–2, chờ duyệt 48h)' })
  propose(@Req() req: { user: { id: string } }, @Body() dto: ProposeAgentActionDto) {
    return this.rightsAgentService.propose(req.user.id, dto);
  }

  @Post('actions/:id/approve')
  @ApiOperation({ summary: 'Người dùng duyệt hành động (BR_006)' })
  approve(@Req() req: { user: { id: string } }, @Param('id') id: string) {
    return this.rightsAgentService.approve(req.user.id, id);
  }

  @Post('actions/:id/undo')
  @ApiOperation({ summary: 'Hoàn tác hành động trong 24h (BR_047)' })
  undo(@Req() req: { user: { id: string } }, @Param('id') id: string) {
    return this.rightsAgentService.undo(req.user.id, id);
  }
}

@Module({
  controllers: [RightsAgentController],
  providers: [RightsAgentService],
})
export class RightsAgentModule {}
