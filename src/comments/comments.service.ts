import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../comments/entities/comment.entity';
import { CategoriesService } from '../categories/categories.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly categoryService: CategoriesService,
    private readonly userService: UsersService,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      const user = await this.userService.findOne(createCommentDto.userId);
      if (!user) {
        throw new BadRequestException(
          `Usuario con id ${createCommentDto.userId} no encontrado`,
        );
      }

      const categories = await this.categoryService.find(
        createCommentDto.categoryId,
      );
      if (!categories) {
        throw new BadRequestException(
          `Categoria con los id's ${createCommentDto.categoryId} no encontrados`,
        );
      }

      const commentCreated = await this.commentRepository.save({
        comment: createCommentDto.comment,
        user,
        categories,
      });

      return commentCreated;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this.commentRepository.find({});
  }

  async findOne(id: string) {
    return this.commentRepository.find({ where: { id } });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
