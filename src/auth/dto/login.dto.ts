import {
    IsEmail,
    IsNotEmpty,
    IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'muktiabdi@example.com' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Mukti123' })
    password: string;
}