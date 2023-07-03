import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    this.usersService = usersService;
  }

  @Post()
  async create(@Body() user: User): Promise<string> {
    await this.usersService.create(user);
    return Object.assign({
      data: { ...user },
      statusCode: 200,
      statusMsg: `saved successfully`,
    });
  }

  @Get('list')
  async findAll(): Promise<User[]> {
    const userList = await this.usersService.findAll();
    return Object.assign({
      data: userList,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다`,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const foundUser = await this.usersService.findOne(+id);
    return Object.assign({
      data: foundUser,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다`,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<string> {
    await this.usersService.update(id, user);
    return Object.assign({
      data: { ...user },
      statusCode: 200,
      statusMsg: `updated seccessfully`,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<string> {
    await this.usersService.remove(+id);
    return Object.assign({
      data: { userId: id },
      statusCode: 200,
      statusMsg: `deleted successfully`,
    });
  }
}
