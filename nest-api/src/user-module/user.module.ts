import { Module } from '@nestjs/common';
import { UserService } from './user-service/user-service';
import { UserControllerController } from './user-controller/user.controller';
import { UserProviders } from './user.providers';
import { databaseProviders } from 'src/database/database.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [UserService, ...UserProviders, ...databaseProviders],
  controllers: [UserControllerController],
  exports: [UserService],
  imports: [ConfigModule.forRoot()],
})
export class UserModule {}
