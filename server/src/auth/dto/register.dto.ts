import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/, {
    message:
      'password must contain at least 1 letter, 1 number, and 1 special character',
  })
  password: string;

  @ApiProperty()
  @IsString()
  name: string;
}
