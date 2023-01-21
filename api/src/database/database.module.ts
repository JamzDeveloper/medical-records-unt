import { Global, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigType } from '@nestjs/config';

import config from '../config/config';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: 'mysql',
          database: configService.database.databaseName,
          host: configService.database.host,
          username: configService.database.user,
          port: parseInt(configService.database.port, 10),
          password: configService.database.password,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
