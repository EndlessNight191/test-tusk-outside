import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegistrationDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  readonly email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,100}$/, {message: 'password too weak'})
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @IsNotEmpty()
  readonly nickname: string
}