import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthDto {
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
}