import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto, UserResponseDto } from './user.dto';
import { handleError } from 'src/common/utils/handleErrors';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    description: 'All users retrieved',
    type: [UserResponseDto],
  })
  async getAll() {
    const users = await this.userService.getAllUsers();
    return users;
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'User UUID',
  })
  @ApiOkResponse({
    description: 'User with requested id retrieved',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format or invalid body',
  })
  @ApiResponse({
    status: 404,
    description: 'User with this id does not exist',
  })
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const user = await this.userService.getUserById(id);
      return user;
    } catch (err) {
      handleError(err);
    }
  }

  @Post()
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid body',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.createUser(createUserDto);
    return createdUser;
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'User UUID',
  })
  @ApiOkResponse({
    description: 'User password successfully updated',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format or invalid body',
  })
  @ApiResponse({
    status: 404,
    description: 'User with this id does not exist',
  })
  @ApiResponse({
    status: 403,
    description: 'Old password is wrong',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    try {
      const updatedUser = await this.userService.updatePassword(
        id,
        updatePasswordDto,
      );
      return updatedUser;
    } catch (err) {
      handleError(err);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    type: String,
    description: 'User UUID',
  })
  @ApiNoContentResponse({
    description: 'User successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format',
  })
  @ApiResponse({
    status: 404,
    description: 'User with this id does not exist',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.userService.deleteUser(id);
    } catch (err) {
      handleError(err);
    }
  }
}
