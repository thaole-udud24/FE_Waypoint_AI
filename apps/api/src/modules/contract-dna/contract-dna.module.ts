import { Module } from '@nestjs/common';
import { ContractDnaController } from './contract-dna.controller';
import { ContractDnaService } from './contract-dna.service';

@Module({
  controllers: [ContractDnaController],
  providers: [ContractDnaService],
  exports: [ContractDnaService],
})
export class ContractDnaModule {}
