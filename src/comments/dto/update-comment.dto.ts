import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsString } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}

// export class UpdateCommentDto extends PartialType(
//   OmitType(CreateCommentDto, ['userId'] as const),
// ) {
//   @IsString()
//   userId: string;
// }
