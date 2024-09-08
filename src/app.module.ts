import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { TypeormModule } from './common/typeorm/typeorm.module';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { InvestmentModule } from './modules/investment/investment.module';
import { HistoryModule } from './modules/history/history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    CacheModule.register({
      max: 100,
      ttl: 120,
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    TypeormModule,
    AuthModule,
    UserModule,
    InvestmentModule,
    HistoryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
