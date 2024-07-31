import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4} from 'uuid';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Profile } from './entities/profile.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // @InjectRepository(Profile)
    // private readonly profileRepository: Repository<Profile>
  ) {}

  findAll() {
    return this.userRepository.find({});
  }

  async findOne(id: ObjectId) {
    const user = await this.userRepository.findOne({ where: { id }, select: ['id', 'username']});
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  async create(payload: CreateUserDto) {
    // const newProfile = new Profile();
    // newProfile.name = payload.name;
    // newProfile.lastName = payload.lastName;
    // newProfile.email = payload.email;
    // newProfile.age = payload.age;
    // const profileCreated = await this.profileRepository.save(newProfile);

    const newUser = new User();
    newUser.username = payload.username;
    newUser.password = payload.password;
    newUser.activo = true;
    // newUser.profile = profileCreated;
    const userCreated = await this.userRepository.save(newUser);

    return userCreated;    
  }

  async delete(id: ObjectId) {
    const user = await this.userRepository.findOne({ where: { id }});
    console.log(user);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no se encontro y por eso no se puede eliminar`);
    }
    await this.userRepository.delete(id);
    // await this.profileRepository.delete(user.profile.id);
    return user;
  }

  async update(id: ObjectId, payload: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }});
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    user.password = payload.password;
    await this.userRepository.save(user);
    return user;
  }
}
