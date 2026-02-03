import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    Matches
} from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    password: string;
}