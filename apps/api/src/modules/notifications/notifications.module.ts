import { Controller, Get, Module, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('notifications (MOD_015)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Danh sách thông báo & nhắc việc' })
  list(@Req() req: { user: { id: string } }) {
    return this.prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Post(':id/read')
  @ApiOperation({ summary: 'Đánh dấu đã đọc thông báo' })
  markRead(@Req() req: { user: { id: string } }, @Param('id') id: string) {
    return this.prisma.notification.updateMany({
      where: { id, userId: req.user.id },
      data: { readAt: new Date() },
    });
  }
}

@Module({
  controllers: [NotificationsController],
})
export class NotificationsModule {}
