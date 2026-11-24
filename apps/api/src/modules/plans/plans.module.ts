import { Controller, Get, Module, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('plans (MOD_016)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('plans')
export class PlansController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('me')
  @ApiOperation({ summary: 'Xem gói dịch vụ hiện tại (FREE / PRO)' })
  async getMyPlan(@Req() req: { user: { id: string } }) {
    const sub = await this.prisma.subscription.findUnique({ where: { userId: req.user.id } });
    return sub ?? { userId: req.user.id, planCode: 'FREE' };
  }
}

@Module({
  controllers: [PlansController],
})
export class PlansModule {}
