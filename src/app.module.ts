import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeormModule } from './common/typeorm/typeorm.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeormModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
