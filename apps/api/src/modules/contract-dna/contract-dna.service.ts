import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ContractDnaService {
  constructor(private readonly prisma: PrismaService) {}

  async listByUser(userId: string) {
    return this.prisma.contractDna.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async upsertFromDocument(
    userId: string,
    input: {
      documentId: string;
      corridorId?: string;
      baseSalary: number;
      hourlyRate?: number;
      standardHoursDay?: number;
      standardDaysWeek?: number;
      allowancesJson?: Record<string, unknown>;
      deductionsJson?: Record<string, unknown>;
      verifiedByUser?: boolean;
    },
  ) {
    const doc = await this.prisma.document.findFirst({
      where: { id: input.documentId, userId },
    });
    if (!doc) {
      throw new NotFoundException('Không tìm thấy tài liệu hợp đồng');
    }

    return this.prisma.contractDna.upsert({
      where: { documentId: input.documentId },
      update: {
        baseSalary: input.baseSalary,
        hourlyRate: input.hourlyRate,
        standardHoursDay: input.standardHoursDay ?? 8,
        standardDaysWeek: input.standardDaysWeek ?? 5,
        allowancesJson: (input.allowancesJson ?? {}) as Prisma.InputJsonValue,
        deductionsJson: (input.deductionsJson ?? {}) as Prisma.InputJsonValue,
        verifiedByUser: input.verifiedByUser ?? false,
      },
      create: {
        userId,
        documentId: input.documentId,
        corridorId: input.corridorId ?? 'VN-JP',
        baseSalary: input.baseSalary,
        hourlyRate: input.hourlyRate,
        standardHoursDay: input.standardHoursDay ?? 8,
        standardDaysWeek: input.standardDaysWeek ?? 5,
        allowancesJson: (input.allowancesJson ?? {}) as Prisma.InputJsonValue,
        deductionsJson: (input.deductionsJson ?? {}) as Prisma.InputJsonValue,
        verifiedByUser: input.verifiedByUser ?? false,
      },
    });
  }
}
