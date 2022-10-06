import { CommonModule } from './../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
//import { typeOrmConfigAsync } from './config/typeorm.config';
import { UserController } from './user.controller';
import { User } from './models/user.entity';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        //TypeOrmModule.forRootAsync(typeOrmConfigAsync),
        CommonModule
    ],
  controllers: [
    UserController
],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
