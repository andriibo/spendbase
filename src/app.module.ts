import { Module } from '@nestjs/common';
import { WeatherModule } from 'infrastructure/modules/weather/weather.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnectionOptions } from 'config/db.config';
import { CqrsModule } from '@nestjs/cqrs';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from 'presentation/interceptors';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dbConnectionOptions, autoLoadEntities: true }),
    CqrsModule.forRoot(),
    WeatherModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
