import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from './constants/user.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.USER)
  getById(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.update(id, body);
  }
}
