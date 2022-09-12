import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,100}$/, {message: 'password too weak'})
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @IsOptional()
  readonly nickname: string
}