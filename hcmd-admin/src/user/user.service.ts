import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async all(): Promise<User[]> {
        return this.userRepository.find();
    }
    
    async paginate(page: number = 1): Promise<any> {
        const take = 1;

        const [users, total] = await this.userRepository.findAndCount({
            take,
            skip: (page - 1) * take
        });
        
        return {
            data: users.map(user => {
                const {password, ...data} = user;

                return user;
            }),
            meta: {
                total,
                page,
                lastPage: Math.ceil(total/take)
            } 
        }
    }

    async create(data): Promise<User> {
        return this.userRepository.save(data);
    }
    
    async findOne(condition): Promise<User> {
        return this.userRepository.findOne(condition);
    }

    async update(id, data): Promise<any> {
        return this.userRepository.update(id, data);
    }

    async delete(id): Promise<any> {
        return this.userRepository.delete(id);
    }
}
