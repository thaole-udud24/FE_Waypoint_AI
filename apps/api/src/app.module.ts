import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller';
import { AdminModule } from './modules/admin/admin.module';
import { AnonymousDataModule } from './modules/anonymous-data/anonymous-data.module';
import { AuthModule } from './modules/auth/auth.module';
import { CasePackModule } from './modules/case-pack/case-pack.module';
import { ContractDnaModule } from './modules/contract-dna/contract-dna.module';
import { CostLedgerModule } from './modules/cost-ledger/cost-ledger.module';
import { DebtFamilyModule } from './modules/debt-family/debt-family.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { EvidenceModule } from './modules/evidence/evidence.module';
import { LawPackModule } from './modules/law-pack/law-pack.module';
import { LegalCompassModule } from './modules/legal-compass/legal-compass.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PayGuardModule } from './modules/payguard/payguard.module';
import { PlansModule } from './modules/plans/plans.module';
import { RightsAgentModule } from './modules/rights-agent/rights-agent.module';
import { SalaryTwinModule } from './modules/salary-twin/salary-twin.module';
import { WorkLogModule } from './modules/work-log/work-log.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    LawPackModule,
    DocumentsModule,
    ContractDnaModule,
    WorkLogModule,
    PayGuardModule,
    SalaryTwinModule,
    EvidenceModule,
    LegalCompassModule,
    RightsAgentModule,
    CostLedgerModule,
    DebtFamilyModule,
    CasePackModule,
    AdminModule,
    NotificationsModule,
    PlansModule,
    AnonymousDataModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
