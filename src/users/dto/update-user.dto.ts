import { IsOptional, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Mukti Abdi Syukur' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'muktiabd@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'newpassword123' })
  @IsOptional()
  @IsString()
  password?: string;
}
