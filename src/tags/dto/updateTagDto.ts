import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class updateTagDto {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  @IsOptional()
  readonly name: string;

  @IsNumber()
  @IsOptional()
  sortOrder?: number;
}