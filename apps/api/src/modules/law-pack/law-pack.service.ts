import { Injectable, NotFoundException } from '@nestjs/common';
import { LawPackStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLawPackDto, CreateLawRuleDto } from './law-pack.dto';

@Injectable()
export class LawPackService {
  constructor(private readonly prisma: PrismaService) {}

  async listCorridors() {
    return this.prisma.corridor.findMany({ where: { isActive: true } });
  }

  async getActiveLawPack(corridorId: string, atDate = new Date()) {
    const pack = await this.prisma.lawPack.findFirst({
      where: {
        corridorId,
        status: LawPackStatus.PUBLISHED,
        effectiveFrom: { lte: atDate },
        OR: [{ effectiveTo: null }, { effectiveTo: { gte: atDate } }],
      },
      orderBy: { effectiveFrom: 'desc' },
      include: { rules: true },
    });
    if (!pack) {
      throw new NotFoundException(`Chưa có Law Pack hiệu lực cho hành lang ${corridorId}`);
    }
    return pack;
  }

  async createLawPack(dto: CreateLawPackDto) {
    return this.prisma.lawPack.create({
      data: {
        corridorId: dto.corridorId,
        version: dto.version,
        title: dto.title,
        effectiveFrom: new Date(dto.effectiveFrom),
        effectiveTo: dto.effectiveTo ? new Date(dto.effectiveTo) : null,
      },
    });
  }

  async addRule(lawPackId: string, dto: CreateLawRuleDto) {
    return this.prisma.lawRule.create({
      data: {
        lawPackId,
        code: dto.code,
        title: dto.title,
        category: dto.category,
        formulaJson: dto.formulaJson as Prisma.InputJsonValue,
        sourceRef: dto.sourceRef,
      },
    });
  }

  async publishLawPack(lawPackId: string, adminId: string) {
    return this.prisma.lawPack.update({
      where: { id: lawPackId },
      data: {
        status: LawPackStatus.PUBLISHED,
        publishedBy: adminId,
        publishedAt: new Date(),
      },
      include: { rules: true },
    });
  }
}
