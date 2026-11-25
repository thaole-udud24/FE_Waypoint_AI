import { Module } from '@nestjs/common';
import { LawPackController } from './law-pack.controller';
import { LawPackService } from './law-pack.service';

@Module({
  controllers: [LawPackController],
  providers: [LawPackService],
  exports: [LawPackService],
})
export class LawPackModule {}
