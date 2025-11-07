import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { EcologicalActionModule } from './ecological-action/ecological-action.module';
import jwtConfig from './config/jwt.config';
import { EcologicalAction } from './ecological-action/entities/ecological-action.entity';
import { UserEcologicalActionModule } from './user-ecological-action/user-ecological-action.module';
import { EcologicalActionQrModule } from './ecological-action-qr/ecological-action-qr.module';
import { EcologicalActionQr } from './ecological-action-qr/entities/ecological-action-qr.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const dbConfig = config.get('database');
        return {
          type: 'mysql',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.name,
          entities: [User, EcologicalAction, EcologicalActionQr],
          synchronize: true,
        };
      }
    }),
    AuthModule,
    EcologicalActionModule,
    UserEcologicalActionModule,
    EcologicalActionQrModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
