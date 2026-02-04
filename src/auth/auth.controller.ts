import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        status: 'success',
        message: 'User registered successfully',
        data: {
          id: 'user_id',
          name: 'user_name',
          email: 'user_email@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 409,
    schema: {
      example: {
        status: 'error',
        message: 'Email already registered',
      },
    },
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        status: 'success',
        message: 'Login successfully',
        data: {
          accessToken: 'jwt_token_string',
          expiresIn: 3600,
          user: {
            id: 'user_id',
            name: 'user_name',
            email: 'user_email@example.com',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    schema: {
      example: {
        status: 'error',
        message: 'Invalid credentials',
      },
    },
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
