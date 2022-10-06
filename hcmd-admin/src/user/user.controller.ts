import { UserCreateDto } from './models/user-create.dto';
import { UserService } from './user.service';
import {Body,
        ClassSerializerInterceptor,
        Controller,
        Delete,
        Get,
        Param,
        Post,
        Put,
        Query,
        UseGuards,
        UseInterceptors 
} from '@nestjs/common';
import { User } from './models/user.entity';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from '@nestjs/passport';
import { UserUpdateDto } from './models/user-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
//@UseGuards(AuthGuard)
@Controller('users')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get()
    async all(@Query('page') page: number = 1): Promise<User[]> {
        return await this.userService.paginate(page);
    }

    @Post()
    async create(@Body() body: UserCreateDto): Promise<User> {
        const password = await bcrypt.hash('1234', '12');
        return this.userService.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: password
        });
    }

    @Get('id')
    async get(@Param('id') id: number) {
        return this.userService.findOne({id});
    }

    @Put('id')
    async update(@Param('id') id: number,
    @Body() body: UserUpdateDto) {

        await this.userService.update(id, {body});

        return this.userService.findOne({id});
    }

    @Delete()
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }


}
