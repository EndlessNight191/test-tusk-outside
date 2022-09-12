import { IsArray } from "class-validator";

export class arrayTagDto {
  @IsArray()
  readonly tags: number[];
}