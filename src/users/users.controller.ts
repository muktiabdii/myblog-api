import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: 'Profile retrieved successfully',
        data: {
          id: 1,
          name: 'Mukti Abdi Syukur',
          email: 'muktiabdi@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    schema: {
      example: {
        status: 'error',
        message: 'User not found',
      },
    },
  })
  async getProfile(@CurrentUser() user: any) {
    return this.usersService.getProfile(user.userId);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: 'Profile updated successfully',
        data: {
          id: 1,
          name: 'Mukti Abdi Syukur',
          email: 'muktiabdi@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    schema: {
      example: {
        status: 'error',
        message: 'User not found',
      },
    },
  })
  async updateProfile(
    @CurrentUser() user: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(user.userId, updateUserDto);
  }

  @Delete('me')
  @ApiOperation({ summary: 'Delete user profile' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: 'Profile deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    schema: {
      example: {
        status: 'error',
        message: 'User not found',
      },
    },
  })
  async deleteProfile(@CurrentUser() user: any) {
    return this.usersService.deleteProfile(user.userId);
  }
}
