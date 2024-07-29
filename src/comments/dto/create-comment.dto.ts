import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  categoryId: string[];
}
