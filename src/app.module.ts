import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeormModule } from './common/typeorm/typeorm.module';

import { UserModule } from './modules/user/user.module';
import { InvestmentModule } from './modules/investment/investment.module';
import { AuthModule } from './modules/auth/auth.module';
import { HistoryModule } from './modules/history/history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModule,
    AuthModule,
    UserModule,
    InvestmentModule,
    HistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
