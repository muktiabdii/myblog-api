import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'Mukti Abdi Syukur' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'muktiabdi@example.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
  @ApiProperty({ example: 'Mukti123' })
  password: string;
}
