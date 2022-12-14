import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class addTagDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(40)
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  sortOrder?: number;
}